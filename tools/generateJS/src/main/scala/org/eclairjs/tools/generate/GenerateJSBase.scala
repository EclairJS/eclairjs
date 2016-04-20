package org.eclairjs.tools.generate

import java.io.{File=>JFile}
import java.util.Properties
import java.io.FileInputStream
import org.eclairjs.tools.generate.model._

import scala.collection.parallel.mutable

abstract class GenerateJSBase {


  lazy val templates = {
    try {
      val prop = new Properties()
      prop.load(new FileInputStream("./src/main/resources/template.properties"))
      prop
    } catch { case e: Exception =>
      e.printStackTrace()
      sys.exit(1)
    }

  }


  def generate(file:File, destDir:JFile) : Unit = {

    var generatedClasses= Set("")

    file.classes.filter(!_.isStatic) foreach( cls => {
      generateClassFile(file,cls,destDir)
      generatedClasses += cls.name
    } )

    val statics=file.classes.filter(cls=>cls.isStatic && !generatedClasses.contains(cls.name))
    val non_emptyStatics=statics.filter(cls=> cls.members.filter(!_.isConstructor()).length>0)
    if (!non_emptyStatics.isEmpty)
      {

        non_emptyStatics foreach( generateClassFile(file,_,destDir))

      }

  }


  def generateClassFile(file:File, cls:Clazz, destDir:JFile) : Unit = {
    val sbFile=new StringBuilder

    sbFile ++= getTemplate("copyright")

    sbFile ++= getFileStart()

    generateIncludes(file:File, sbFile:StringBuilder)

    val sb=new StringBuilder

    generateClass(cls,sb)

    val staticCls=file.classes.find( clazz=> clazz.isStatic && clazz.name==cls.name)
    if (staticCls.isDefined && staticCls.get.members.filter(!_.isConstructor()).length>0)
    {

      sb.append("\n//\n// static methods\n//\n")
      staticCls.get.members.filter(!_.isConstructor()) foreach( member =>
          member match {
            case method:Method => generateMethod(method,sb)
          }
          )


    }
    generatePostlude(cls,sb)

    val body =if (isForNode()) sb.toString()
    else {        // indent
      sb.toString().split("\\n").map("    "+_).mkString("\n")
    }

    sbFile ++= body
    sbFile ++= getFileEnd()
    val src :String = sbFile.toString()

    if (Main.isConsole) {
      System.out.println("SOURCE: "+cls.fullName())
      System.out.println("")
      System.out.println(src)
    }
    else
    {
      if (!destDir.exists())
        destDir.mkdirs();
      val toFile=destDir.getAbsolutePath+"/"+cls.name+".js"
      //            System.out.println("WRITING: "+toFile)
      scala.tools.nsc.io.File(toFile).writeAll(src)
    }
  }

  def generateIncludes(file:File, sb:StringBuilder): Unit =
  {

  }

  def getFileStart(): String =
  {
    ""
  }

  def getFileEnd(): String =
  {
    ""
  }

  def isForNode()=false

   def generateConstructor(cls:Clazz, sb:StringBuilder): Unit
  def generateObject(cls:Clazz, sb:StringBuilder): Unit
  def generatePostlude(cls:Clazz, sb:StringBuilder): Unit

   def generateClass(cls:Clazz,sb:StringBuilder)  = {
      addNewlines(2,sb)
     generateClassDoc(cls:Clazz,sb:StringBuilder)
     addNewlines(2,sb)
     generateConstructorDoc(cls:Clazz,sb:StringBuilder)
     addNewlines(1,sb)
     generateConstructor(cls,sb)
     addNewlines(1,sb)
    generateObject(cls,sb)

     cls.members.filter(!_.isConstructor()) foreach( member =>
        member match {
          case method:Method => generateMethod(method,sb)
        }
       )


  }

  def generateClassDoc(cls:Clazz, sb:StringBuilder): Unit =
  {
    if (cls.comment.length>0)
    {
      sb ++= convertToJSDoc(cls.comment,cls)
    }
  }


  def mainConstructor(cls:Clazz):Method = {
    val constructors=cls.constructors()
    if (constructors.length==0)
      return null;
    if (constructors.length==1)
      return constructors(0)

    constructors.sortWith(_.parms.length < _.parms.length).last
  }

  def generateConstructorDoc(cls:Clazz, sb:StringBuilder): Unit =
  {
      val constr = mainConstructor(cls)
      if (constr!=null)
        {
          generateMethodDoc(constr,sb)
        }

  }

  def generateMethodDoc(method:Method, sb:StringBuilder): Unit =
  {
    val comment = if (method.comment.length>0) method.comment
          else """ /** \n */"""
    sb ++= convertToJSDoc(comment,method)
  }

  def generateMethod(method:Method,sb:StringBuilder)  = {

    method.getOverloaded()
    addNewlines(2,sb)
    generateMethodDoc(method,sb)
    addNewlines(1,sb)

    // if method has multiple parm lists, generate unique name
    val methodName=method.getDistinctName()

    sb.append(method.parent.name)
    if (method.parent.isStatic)
      sb.append(".")
    else
      sb.append(".prototype.")
    sb.append(methodName).append(" = function(")
      .append(method.parmList()).append(") {\n")

    sb ++= getTemplate("defaultBody")

    val body =getMethodBody(method)
    if (body.length>0)
      sb ++= body.split("\n").map("// "+_).mkString("\n")  // body commented out

    sb.append("\n};\n")

  }

  def getMethodBody(method:Method): String



  def parentClass(cls:Clazz):String =
  {
    cls.parentClass() match {
      case Some(cls) => cls.name
      case None => "JavaWrapper"
    }

  }


def getJSDocType(method:Method, parmName:String) : String = {
  method.getParm(parmName) match {
    case Some(parm) =>{
      var typeName=parm.typ.getJSType(parm.typ.name)
      if (parm.isRepeated)
        typeName="..."+typeName
      typeName
    }
    case None => "PARMNOTFOUND"
  }
}

  def getJSDocParmName(method:Method, parmName:String) : String = {
    method.getParm(parmName) match {
      case Some(parm) =>{
        if (parm.isOptional)
          s"""[$parmName]"""
        else
          parmName
      }
      case None => "PARMNOTFOUND"
    }
  }

def convertToJSDoc(comment:String, model:AnyRef):String = {



  val jsDoc=new Comment(comment)

  val parmRX="""\s\*\s+@param ([\w\d]+)(.*)""".r



  def addClassInfo(cls:Clazz): Unit =
  {

    val sparkPrefix="org.apache.spark"

    val module= cls.parent.packageName.substring(sparkPrefix.length).replace('.','/')

    jsDoc.endLines += s" * @memberof module:eclairjs$module"

    val parent=parentClass(cls)
    if (parent!="JavaWrapper")
    {
      jsDoc.endLines+=s" * @extends $parent"
    }
  }


  model match {
    case method:Method => {

      if (!method.parms.isEmpty && jsDoc.getTagValue("param")=="")   // if no @param there, add them
        {

          method.parms.foreach( parm=>
              jsDoc.addTag("param",s"{${getJSDocType(method,parm.name)}} ${getJSDocParmName(method,parm.name)}")
          )
        }
      else
      {
        // add parm types to existing @param
        jsDoc.lines=jsDoc.lines.map(str=> {
          str match {
            case parmRX(name,rest) => {
              s""" * @param {${getJSDocType(method,name)}} ${getJSDocParmName(method,name)} $rest"""
            }
            case _ => str
          }
        })

      }
      val returnType=jsDocReturnType(method)
      if (returnType!="undefined" && !method.isConstructor())
        jsDoc.addReturn(returnType)
      else if (isForNode())
        {
          jsDoc.endLines+=s""" * @returns {Promise.<Void>} A Promise that resolves to nothing."""
        }
      if (method.isConstructor())
        {
          jsDoc.endLines+=" * @class"
          jsDoc.endLines+=" * @constructor"
          if (method.parent.comment.length==0)  // no class comment
            addClassInfo(method.parent)

        }
    }
    case cls:Clazz => {
        jsDoc.newLines+=" * @classdesc"
      addClassInfo(cls)
    }
    case _ =>{}
  }

  val version_str=getTemplate("eclair_version")
  jsDoc.changeTagValue("since", currentSince=>

     getTemplate("since_tag",version_str,currentSince)
  )

    jsDoc.asJSDoc();
  }



  def jsDocReturnType(method:Method):String = method.getReturnJSType()

  def addNewlines(count:Integer,sb:StringBuilder) : Unit = {
    val newLines="\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\n\n\n".toCharArray
    sb.appendAll(newLines,0,count)
  }

  def getTemplate(name:String,args: AnyRef*):String =
  {
    val prop=templates.get(name).asInstanceOf[String]
    val template=prop.format(args.map(_.asInstanceOf[AnyRef]) : _*)
    template
  }


  def generateModuleFile(fromFile: JFile, destDir: JFile) = {
    var dir = destDir.getAbsolutePath.substring(Main.generatedDir.getAbsolutePath.length)
    if (dir.length>0)
    {
      val pkgName="org.apache.spark"+dir.replace("/",".")
      System.out.println("   Package="+pkgName)
      val pkgClasses=Main.allClasses.filter(_._2.parent.packageName==pkgName).map(_._2.name)
//      System.out.println("   CLASSES="+pkgClasses.mkString(","))

      var dirs=fromFile.listFiles().filter(_.isDirectory).map(_.getName)
      val s=List.fromArray(fromFile.listFiles())

      if (!pkgClasses.isEmpty || !dirs.isEmpty)
        {
          val allEntries=pkgClasses++dirs
          val modules=allEntries.map(clsName=> s"// $clsName: require(EclairJS_Globals.NAMESPACE + '$dir/$clsName')").mkString(",\n       ")

          val moduleComment= dir.replace("/"," ")

          var moduleName=destDir.getName

          val body = s"""(function () {
        |    /**
        |     *$moduleComment module.
        |     * @example
        |     * var $moduleName = require('eclairjs$dir');
        |     * @module eclairjs$dir
        |     */
        |    module.exports = {
        |      $modules
        |    }
        |})();""".stripMargin

          System.out.println(body)

          val moduleFileDir=destDir.getParentFile
          if (!moduleFileDir.exists())
            moduleFileDir.mkdirs();
          val toFile=moduleFileDir.getAbsolutePath+"/"+destDir.getName+".js"
          //            System.out.println("WRITING: "+toFile)
          scala.tools.nsc.io.File(toFile).writeAll(body)

        }

    }
  }


}
