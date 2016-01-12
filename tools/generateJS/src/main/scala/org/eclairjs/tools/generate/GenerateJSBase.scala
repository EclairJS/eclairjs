package org.eclairjs.tools.generate

import java.util.Properties
import java.io.FileInputStream
import org.eclairjs.tools.generate.model._

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


  def generate(file:File) : String = {
    val sb=new StringBuilder

    sb ++= getTemplate("copyright")

    generateIncludes(file:File, sb:StringBuilder)

    file.classes.filter(!_.isStatic) foreach( cls => generateClass(cls,sb))

    val statics=file.classes.filter(_.isStatic)
    val non_emptyStatics=statics.filter(cls=> cls.members.filter(!_.isConstructor()).length>0)
    if (!non_emptyStatics.isEmpty)
      {

        sb.append("//\n// static methods\n//\n")
        non_emptyStatics foreach( cls => {
          cls.members.filter(!_.isConstructor()) foreach( member =>
            member match {
              case method:Method => generateMethod(method,sb)
            }
            )

        })

      }
    sb.toString()
  }

  def generateIncludes(file:File, sb:StringBuilder): Unit =
  {

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
     generateConstructor(cls,sb)
     addNewlines(1,sb)
    generateObject(cls,sb)

     cls.members.filter(!_.isConstructor()) foreach( member =>
        member match {
          case method:Method => generateMethod(method,sb)
        }
       )

     generatePostlude(cls,sb)

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

    sb.append("\n}\n")

  }

  def getMethodBody(method:Method): String






def convertToJSDoc(comment:String, model:AnyRef):String = {


  val jsDoc=new Comment(comment)





  val parmRX="""\s\*\s+@param ([\w\d]+)(.*)""".r

  model match {
    case method:Method => {

      if (!method.parms.isEmpty && jsDoc.getTagValue("param")=="")   // if no @param there, add them
        {

          method.parms.foreach( parm=>
              jsDoc.addTag("param",s"{${method.getParmJSType(parm.name)}}")
          )
        }
      else
      {
        // add parm types to existing @param
        jsDoc.lines=jsDoc.lines.map(str=> {
          str match {
            case parmRX(name,rest) => s""" * @param {${method.getParmJSType(name)}} $name $rest"""
            case _ => str
          }
        })

      }
      val returnType=jsDocReturnType(method)
      if (returnType!="undefined")
        jsDoc.addReturn(returnType)
      else if (isForNode())
        {
          jsDoc.endLines+=s""" * @returns {Promise.<Void>} A Promise that resolves to nothing."""
        }
      if (method.isConstructor())
        jsDoc.endLines+=" *  @class"
    }
    case cls:Clazz => {
        jsDoc.endLines+=" * @classdesc"
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

}
