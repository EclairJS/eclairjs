package org.eclairjs.tools.generate.org.eclairjs.tools.generate.model

import scala.util.matching.Regex

/**
 * Created by berkland on 11/25/15.
 */
class Comment(comment:String) {

  var lines= comment.split("\n")

  lines= lines.slice(1,lines.length-1)

  val newLines= scala.collection.mutable.ListBuffer.empty[String]
  val endLines= scala.collection.mutable.ListBuffer.empty[String]

  newLines +="/**"



  // make one leading space for each line
  val docStart="""\s+\*"""
  lines=lines.map(str=> str.replaceFirst(docStart," *"))

  def addReturn(returnType: String) = {
    val returnsText=getTagValue("return")
    removeTag("return")
    endLines+=s""" * @returns {$returnType} $returnsText"""
  }


  def getTagValue(tag:String): String =
  {
    val rx=tagRX(tag)
    var lineOpt=lines.find(str=> {
      str match {
        case rx(rest) => true
        case _ => false
      }
    })
    lineOpt match {
      case Some(line) => line match {
        case rx(rest) => rest
        case _ => ""

      }
      case None =>""
    }

  }

  def changeTagValue(tag:String, callback: String => String)
  {
    val rx=tagRX(tag)
    changeLines(rx,rest=> s"@$tag ${callback(rest)}")
  }

  def changeLines(rx:Regex, callback: String => String)
  {
    lines=lines.map(str=> {
      str match {
        case rx(rest) => s" * ${callback(rest)}"
        case _ => str
      }
    })
  }

  def fixExamples()
  {
    val rxStart="\\s+\\*\\s+\\{\\{\\{(.*)".r
    val rxEnd="\\s+\\*(.*)\\}\\}\\}.*".r
    changeLines(rxStart,rest=> s"@example $rest")
    changeLines(rxEnd,rest=> rest)
  }
  def tagRX(tag:String) =
  {
    val str="\\s\\*\\s+@"+tag+"(.*)"
    str.r
  }

  def removeTag(tag:String): Unit =
  {
     val rx=tagRX(tag)
     lines=lines.filter(str=> {
      str match {
        case rx(rest) => false
        case _ => true
      }
    })

  }

  def removeUnusedTags()={
    removeTag("tparam")
    removeTag("group")
    removeTag("author")
    removeTag("version")
    removeTag("groupname")
    removeTag("groupdesc")
    removeTag("groupprio")
  }

  //  should we convert org.apache.spark.d1.cls to ./d1/cls ??
  //  for now, just return last segmen
  def convertQualifiedName(name:String):String =
  {
     val parts = name.split("\\.")
      parts.last
  }

  def fixLinks()={
   val regx="(.+)\\[\\[([\\w\\.]*)\\]\\](.*)".r
    lines=lines.map(str=> {
      str match {
        case regx(p1,name,p3) => {p1+"{@link "+convertQualifiedName(name)+"}"+p3}
        case _ => str
      }
    })

  }



  def asJSDoc():String = {
    removeUnusedTags()
    fixLinks();
    fixExamples()

    newLines++=lines

    newLines++=endLines
    newLines +=" */"

    newLines.mkString("\n")
  }
}
