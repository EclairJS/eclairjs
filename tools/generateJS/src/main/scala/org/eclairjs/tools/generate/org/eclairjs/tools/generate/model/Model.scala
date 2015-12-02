package org.eclairjs.tools.generate.org.eclairjs.tools.generate.model

case class File(fileName:String, packageName:String, comment:String, classes: List[Clazz], imports : List[String] ) {

  override def  toString() = {
      val sb=new StringBuilder
      sb ++= "file="+fileName +"\n"
      imports foreach( s=>
        sb ++= "import "+s+"\n"
        )
      classes foreach( cls=> {
        sb ++= cls.toString + "\n"

      }
        )
      sb.toString()
  }

  def hasClasses=classes.length>0
}

case class Clazz(name:String, comment:String, members: List[Member],isStatic:Boolean = false) {
  members foreach (member => member.parent = this)

  override def toString() = {
    val sb = new StringBuilder
    if (comment.length > 0)
      sb ++= comment + "\n";
    val keyword = if (isStatic) "object" else "class"
    sb ++= keyword + " " + name + "\n"

    members foreach (member => {
      sb ++= "    " + member.toString + "\n"

    })


    sb.toString()
  }

  def constructors(): List[Method] =
  {
    val list=members.filter(member=>{
      member match {
        case method:Method => method.isConstructor()
        case _ => false
      }
    })
    list.asInstanceOf[List[Method]]

  }
  def methods (): List[Method] =
  {
    val list=members.filter(member=>{
      member match {
        case method:Method => !method.isConstructor()
        case _ => false
      }
    })
    list.asInstanceOf[List[Method]]
  }

  def methods (name:String): List[Method] =
  {
    val list=members.filter(member=>{
      member match {
        case method:Method => !method.isConstructor() && method.name==name
        case _ => false
      }
    })
    list.asInstanceOf[List[Method]]
  }

}

abstract class Member
{
  def name:String
  def comment:String
  def returnType:String

  var parent:Clazz = null
  def isConstructor() = false


  def toJSType(scalaType:String): String =
  {

    val optionRX="""Option\[([,\w\[\]]+)\]""".r

    val typeStr=scalaType match {
      case optionRX(typeName) => typeName
      case _ => scalaType
    }

    val typeParmRX="""([\w\d]+)\[[,\w\[\]]+\]""".r


    typeStr match {
      case "Boolean" => "boolean"
      case "Long" | "Int"  | "Double"=> "Number"
      case "String" => "String"
      case "Unit" | "scala.Unit" => "undefined"
      case typeParmRX(typ) => typ match {
        case "List" | "Array" => "Array"
        case _ => typ
      }
      case _ =>typeStr
    }
  }
}

case class Method(name:String,comment:String,returnType:String,parms:List[Parm]) extends Member
{
  override def  toString() = {
    val sb=new StringBuilder
    if (comment.length>0)
      sb++=comment+"\n    ";
    val keyword= if (isConstructor) "constructor" else "function"
    sb ++= keyword+" "+name +"("

    parms foreach( parm=> {
      sb ++= parm.name +" : "+parm.typ + ", "
    })

    sb ++= ") : "+returnType


    sb.toString()
  }

  def parmList() : String =
  {
     parms.map(_.name).toArray.mkString(",")
  }

  def getParm(name:String) =
  {
    parms.find(_.name==name)
  }

  def getParmJSType(name:String):String = {
    getParm(name) match {
      case Some(parm) => toJSType(parm.typ)
      case None => "PARMNOTFOUND"
    }
  }

  def getReturnJSType():String = {
     toJSType(returnType)
  }


  override  def isConstructor() :Boolean = name match {
    case "<init>" | "this" => true
    case _ => false
  }
}

case class Parm(name:String,typ:String)
{

}

case class DataType()
{

}