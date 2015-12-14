package org.eclairjs.tools.generate.org.eclairjs.tools.generate.model

case class File(fileName:String, packageName:String, comment:String, classes: List[Clazz], imports : List[String] ) {

  classes foreach (cls => cls.parent = this)

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

case class Clazz(name:String, comment:String, members: List[Member],parents:List[String],isStatic:Boolean = false) {
  members foreach (member => member.parent = this)

  var parent:File = null

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

  def fullName()={ parent.packageName+"."+name}

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
  def returnType:DataType

  var parent:Clazz = null
  def isConstructor() = false


}

case class Method(name:String,comment:String,returnType:DataType,parms:List[Parm]) extends Member
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
      case Some(parm) => parm.typ.getJSType(parm.typ.name)
      case None => "PARMNOTFOUND"
    }
  }

  def getReturnJSType():String = {
     returnType.getJSType(returnType.name)
  }


  override  def isConstructor() :Boolean = name match {
    case "<init>" | "this" => true
    case _ => false
  }
}

case class Parm(name:String,typ:DataType)
{

}



  trait DataType
{
  def name: String

  def simpleName():String =name.split("\\.").last

  def getJSType(scalaName:String=name):String =
  {


    val simpleName=scalaName.split("\\.").last


    if (simpleName.length==1) // must be a type parm
      return "object"

    simpleName match {
      case "Boolean" => "boolean"
      case "Long" | "Int"  | "Double"| "Float" | "Byte"=> "number"
      case "String" => "string"
      case "List" => "[]"
      case "Unit"   => "undefined"
      case "Any" | "AnyRef"   => "object"

      case _ =>simpleName
    }

  }

  def isVoid(): Boolean =
  {
    val simpleName=name.split("\\.").last
    return "Unit"==simpleName
  }

  def isSparkClass(scalaName:String=name): Boolean =
  {
    val simpleName=scalaName.split("\\.").last
    var rx="Long|Int|Double|Float|Byte|List|Unit|Any|AnyRef|String|Boolean|Array".r
    rx.findFirstMatchIn(simpleName).isEmpty
  }
}
case class SimpleType(name:String) extends DataType
case class ExtendedDataType(name:String,referenceType:String) extends DataType
{
  override def getJSType(scalaName:String=name):String =
  {
    scalaName match {
      case "Option" =>  super.getJSType(referenceType)
      case "List" | "Array" =>  super.getJSType(referenceType) + "[]"
      case _ => super.getJSType(name)
    }
  }
  override def isSparkClass(scalaName:String=name): Boolean =
  {
    scalaName match {
      case "Option" =>  super.isSparkClass(referenceType)
      case _ =>  super.isSparkClass(scalaName)
    }

  }

}
case class FunctionDataType(name:String,parms:List[DataType],returnType:DataType) extends DataType
{
  override def getJSType(scalaName:String=name):String = "func"

}
