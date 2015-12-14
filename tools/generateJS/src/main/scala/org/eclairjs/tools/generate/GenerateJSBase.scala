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
    if (method.comment.length>0)
    {
      sb ++= convertToJSDoc(method.comment,method)
    }
  }

  def generateMethod(method:Method,sb:StringBuilder)  = {
    addNewlines(2,sb)
    generateMethodDoc(method,sb)
    addNewlines(1,sb)

    // if method has multiple parm lists, generate unique name
    val methodName=getMethodName(method)

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




  def getMethodName(method:Method):String ={
    val name=method.name
    val methods=method.parent.methods(name)

    if (methods.length==1)
      return name;
    else
    {
      val others=methods.filter(_!=method)
      if (others.length==1)
      {
        val otherList=others(0).parms;
        val thisList=method.parms
        if (otherList.length>thisList.length)
          // shorter parmlist, don't rename
           return name;
        else if (otherList.length<thisList.length)
          {
            val lastParm=thisList(otherList.length)  // first additional parm
            return name+"with"+lastParm.name.capitalize
          }
        else {   //same length, use typename
            val lastParmType=method.getParmJSType(thisList.last.name)
            return name+"with"+lastParmType
        }

      }
      // for now just number, should get more intelligent
      else
      {
          val index=methods.indexOf(method)
          return name+index
      }

    }
  }

def convertToJSDoc(comment:String, model:AnyRef):String = {


  val jsDoc=new Comment(comment)





  val parmRX="""\s\*\s+@param ([\w\d]+)(.*)""".r

  model match {
    case method:Method => {
      // add parm types
      jsDoc.lines=jsDoc.lines.map(str=> {
        str match {
          case parmRX(name,rest) => s""" * @param {${method.getParmJSType(name)}} $name $rest"""
          case _ => str
        }
      })
      val returnType=method.getReturnJSType()
      if (returnType!="undefined")
        jsDoc.addReturn(returnType)
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
