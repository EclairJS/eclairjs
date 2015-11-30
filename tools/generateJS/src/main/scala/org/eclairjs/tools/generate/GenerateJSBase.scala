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
    if (!statics.isEmpty)
      {
        sb.append("//\n// static methods\n//\n")
        statics foreach( cls => {
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

  def generateConstructorDoc(cls:Clazz, sb:StringBuilder): Unit =
  {

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

    sb.append(method.parent.name)
    if (method.parent.isStatic)
      sb.append(".")
    else
      sb.append(".prototype.")
    sb.append(method.name).append(" = function(")
      .append(method.parmList()).append(") {\n")

    sb ++= getTemplate("defaultBody")

    sb.append("\n}\n")

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
    }
    case cls:Clazz => {

    }
    case _ =>{}
  }

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
