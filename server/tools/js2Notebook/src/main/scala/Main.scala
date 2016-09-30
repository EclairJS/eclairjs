
import scala.collection.mutable
import scala.io.Source
import scala.util.matching.Regex
import scala.collection.mutable.ListBuffer
import java.io.{File=>JFile}


object Main extends App{


  class FileLines(fileLines:Iterator[String]) extends Iterator[String]
  {
    var pushedLine:String=null;
    var codeLines:Iterator[String] = null;



    override def hasNext: Boolean = {
        if (codeLines!=null)
          codeLines.hasNext
      else
        fileLines.hasNext
    }

    override def next(): String = {
      val line=if (pushedLine==null) {
        if (codeLines!=null)
          {
            val s=codeLines.next()
            if (!codeLines.hasNext)
              codeLines=null;
            s
          }
        else
          fileLines.next()
      }
      else
        pushedLine
      pushedLine=null
      line
    }

    def switchInput(lines:ListBuffer[String]) = codeLines=lines.iterator
    def push(line:String) = pushedLine = line
  }

  val  blockCommentRX="""\s*\/\*+(.*)""".r
  val  blockCommentLineRX="""\s*\*(.*)""".r
  val  blockCommentEndRX="""(.*)\*\/""".r
  val  lineCommentRX="""\s*\/\/(.*)""".r
  val  ifSparkContextRX="""\s*if\s*\(typeof\s*sparkContext(.*)""".r
  val  callRunRX="""\s*var\s*result\s*=\s*run\((.*)""".r
  val  returnRX="""\s*return\s*(.*)""".r
  val  argsVarRX="""\s*var\s*(\w+)\s*=.*\(args\.length.*\:(.*)""".r

  val  functionRX="""\s*function (.*)""".r

  val codeLines= ListBuffer.empty[String]


  val skipFiles=Set("streaming","spark_status_tracker.js","als.js","sparkjdbc","word2vec","sampled_rdds")

  var directoryDepth=1


//  convertFile(new JFile("/Users/berkland/git2/tmpnb/eclairjs-nashorn/examples/mllib/svm_with_sgd_example.js"),new JFile("/Users/berkland/temp/notebooks"))
  //  convertFile(new JFile("/Users/berkland/git2/tmpnb/eclairjs-nashorn/examples/sql/sparksql.js"),new JFile("/Users/berkland/temp/notebooks"))
  //    convertFile(new JFile("/Users/berkland/git2/tmpnb/eclairjs-nashorn/examples/logQuery.js"),new JFile("/Users/berkland/temp/notebooks"))
//      convertFile(new JFile("/Users/berkland/git2/tmpnb/eclairjs-nashorn/examples/mllib/bisecting_k_means_example.js"),new JFile("/Users/berkland/temp/notebooks"))

  convertDir(new JFile("/Users/berkland/git2/tmpnb/eclairjs-nashorn/examples"),new JFile("/Users/berkland/git2/eclairjs-examples/notebooks"))

  def convertDir(dir:JFile, outDir:JFile) : Unit=
  {
    val files=dir.listFiles()
    files foreach(file=>{
      if (file.getName.endsWith(".js") && !skipFiles.contains(file.getName))
        convertFile(file,outDir)
      else
      if (file.isDirectory)
      {
        directoryDepth += 1
        if (!skipFiles.contains(file.getName))
          convertDir(file, new JFile(outDir,file.getName) )
        directoryDepth -= 1
      }
    })

  }

  def convertFile(file:JFile,outDir:JFile) = {

    var outFile=new JFile(outDir,file.getName.replace(".js",".ipynb"))
    val fileLines = new FileLines(Source.fromFile(file).getLines)


    val noteBookLines=ListBuffer.empty[String]

    noteBookLines+=
      """
        |{
        | "cells": [
      """.stripMargin

    val notebookEnd = """  }
                        | ],
                        | "metadata": {
                        |  "kernelspec": {
                        |   "display_name": "Spark 1.6.1 (Javascript)",
                        |   "language": "javascript",
                        |   "name": "eclair"
                        |  },
                        |  "language_info": {
                        |   "name": "scala"
                        |  }
                        | },
                        | "nbformat": 4,
                        | "nbformat_minor": 0
                        |}""".stripMargin

    var cellCount=0


    codeLines.clear()

    var blankLines=0
    var isIfSparkContext=false
    var runFunction:ListBuffer[String] = ListBuffer.empty[String]
    var braceLevel=0;

    while (fileLines.hasNext)
      {
        val fileLine = fileLines.next()


        System.out.println("BRACE: "+braceLevel+" : "+fileLine)
        fileLine match {
          case blockCommentRX(rest) => {
            if (braceLevel == 0)
              {
                val lines=readBlockComment(rest)
                if (!isIgnorableComment(lines))
                  addCommentCell(lines)

              }
              else
                addCodeLine(fileLine)

          }
          case lineCommentRX(rest) =>
            if (braceLevel == 0)
            {
              addCommentCell(readLineComment(rest))
            }
            else
              codeLines+=fileLine
          case functionRX(rest) =>{
            if (braceLevel == 0) {

              if (!codeLines.isEmpty) {
                addCodeCell(codeLines)
                codeLines.clear()
              }
              val functionLines = readFunction(rest)
              if (functionLines.head.contains(" run(")) {
                runFunction = functionLines.drop(1).dropRight(1)
                runFunction = runFunction.reverse.dropWhile(_.trim.isEmpty).reverse
                val lastLine = runFunction.last
                lastLine match {
                  case returnRX(rest) => {
                    runFunction = runFunction.dropRight(1)
                    if (rest.trim != "result" && rest.trim != "result;")
                      runFunction    += "var result = " + rest
                  }
                  case _ =>
                }


              }
              else
                addCodeCell(functionLines)
            }
            else
              addCodeLine(fileLine)
          }

          case ifSparkContextRX(rest) => isIfSparkContext=true
          case argsVarRX(varName,rest) => codeLines+=s"var $varName = ${fixDataPath(rest)}"
          case callRunRX(rest) =>
            fileLines.switchInput(runFunction)

          case _ =>
            addCodeLine(fileLine)

        }


      }
    addCodeCell(codeLines)
    noteBookLines+=notebookEnd
//    System.out.println(noteBookLines.mkString("\n"))
    writeFile(outFile)


    def addCodeLine(fileLine: String): Unit = {
      braceLevel += braceCount(fileLine)
      if (fileLine.trim.isEmpty)
        blankLines += 1
      else
        blankLines = 0
      if (blankLines == 2 && braceLevel==0) {
          blankLines = 0
          addCodeCell(codeLines)
          codeLines.clear()
      }
      else {

        codeLines += fileLine
      }
    }



    def writeFile(toFile:JFile) = {
      val destDir=toFile.getParentFile
      if (!destDir.exists())
        destDir.mkdirs();

      val pw = new java.io.PrintWriter(toFile)
      try pw.write(noteBookLines.mkString("\n")) finally pw.close()
    }

    def isIgnorableComment(lines:ListBuffer[String]) :Boolean = {
      val isIgnore=lines.find(line=>
        line.contains("License") || line.contains("Copyright")||
          line.contains("bin/eclairjs") || line.contains("Unit Test")
      )
      isIgnore.isDefined
    }

    def readBlockComment(firstLine:String) :ListBuffer[String] = {
      val lines= ListBuffer.empty[String]
      if (!firstLine.trim.isEmpty)
        lines += firstLine
      var done=false
      while (fileLines.hasNext && !done)
        {
          val line=fileLines.next()
          line match {
            case blockCommentEndRX(start) => {
              if (!start.trim.isEmpty)
                lines += firstLine
              done=true;
            }
            case blockCommentLineRX(rest) => lines+=rest
            case _=> lines += line
          }
        }
      lines
    }
    def readLineComment(firstLine:String):ListBuffer[String] = {
      val lines= ListBuffer.empty[String]
      if (!firstLine.trim.isEmpty)
        lines += firstLine
      var done=false
      while (fileLines.hasNext && !done)
      {
        val line=fileLines.next()
        line match {
          case lineCommentRX(rest) => lines += rest
          case _=> {
            fileLines.push(line)
            done=true
          }
        }
      }
      lines
    }


    def braceCount(line:String) :Int = {
      val left=line.count(_=='{')
      val right=line.count(_=='}')
      left-right
    }

    def readFunction(firstLine:String) :ListBuffer[String]= {

      val lines= ListBuffer.empty[String]
      lines += "function "+firstLine

      var braces=braceCount(firstLine)
      var done=false
      while (fileLines.hasNext && !done)
      {
        val line=fileLines.next()
        lines+=line
        braces += braceCount(line)
        done=braces<=0
      }
      lines
    }

    def jsonEscape(s:String):String = {
      s.replace("\\","\\\\").replace("\t","    ")
       .replace("\"","\\\"").replace("/","\\/")
    }

    def addCommentCell(lines: ListBuffer[String] ): Unit = {

 System.out.println("ADD COMMENT: "+lines.mkString("\n"))
      if (!codeLines.isEmpty)
      {
        addCodeCell(codeLines)
        codeLines.clear()
      }

      if (noteBookLines.size>1)
        noteBookLines+="\n  },"
      val srcLines=lines.map("    \""+jsonEscape(_)+"\\n\"").mkString(",\n")
      val cell=s"""   {
                       |   "cell_type": "markdown",
                       |   "metadata": {},
                       |   "source": [
                       |$srcLines
                       |   ]""".stripMargin
      noteBookLines += cell
    }

    def addCodeCell(lines: ListBuffer[String] ): Unit = {
 System.out.println("ADD CODE: "+lines.mkString("\n"))
      // remove trailing blank lines
      var codeLines = lines.reverse.dropWhile(_.trim.isEmpty).reverse
      if (!codeLines.isEmpty)
        {

          if (isIfSparkContext && codeLines.last.trim=="}" && codeLines.length>1 && codeLines(codeLines.length-2).contains("sc.stop"))
            codeLines=codeLines.dropRight(1)
          cellCount += 1

          val srcLines=codeLines.map("    \""+jsonEscape(_)+"\\n\"").mkString(",\n")
          if (noteBookLines.size>1)
            noteBookLines+="\n  },"
          noteBookLines+=
            s"""  {
               |   "cell_type": "code",
               |   "execution_count": $cellCount,
               |   "metadata": {
               |    "collapsed": false
               |   },
               |   "outputs": [],
               |   "source": [
               |$srcLines
               |   ]""".stripMargin
        }


    }

    def fixDataPath(path:String):String =
    {

      var dir= if (directoryDepth==0) ".."
      else
      {
        List("..","..","..","..","..","..","..","..","..","..","..","..").take(directoryDepth).mkString("/")
      }
      dir = dir + "/"

      path.replace("examples/",dir)
    }

  }



}
