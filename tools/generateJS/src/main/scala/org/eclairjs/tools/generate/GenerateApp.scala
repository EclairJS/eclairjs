package org.eclairjs.tools.generate

import java.io
import java.io.File

import joptsimple.{OptionSpec, OptionParser}

import scala.tools.nsc.doc.Settings

import scala.collection.JavaConverters._

object Main extends App {


  var source:io.File=_
  var repoDir:io.File=_
  var generatedDir:io.File=_
  var isConsole=true;
  var statistics=false
  var generateNode=false

  parseCommandLine()

    val settings=new Settings(str => Console.println("Error: " + str));
  settings processArgumentString "-usejavacp"
  var parser=new ParseSource(settings)

//  val model=parser.compileFile("./src/test/scala/Test1.scala");
//    val model=parser.compileFile("/Users/berkland/git/spark/core/src/main/scala/org/apache/spark/api/java/JavaRDD.scala");
//    val model=parser.compileFile("/Users/berkland/git/spark/core/src/main/scala/org/apache/spark/api/java/JavaSparkContext.scala");


  if (repoDir!=null &&repoDir.exists())
    {
      val srcDirs=List("core/src/main/scala/org/apache/spark",
        "graphx/src/main/scala/org/apache/spark",
        "mllib/src/main/scala/org/apache/spark",
        "sql/core/src/main/scala/org/apache/spark",
        "streaming/src/main/scala/org/apache/spark"
      )
      srcDirs foreach( dir=> {
        val srcDir=new File(repoDir,dir)
        processDirectory(srcDir,generatedDir)

      })

    }
  else if (source.isDirectory)
    {
      processDirectory(source,generatedDir)
    }
  else
    processFile(source,generatedDir)

  if (statistics)
    {
      System.out.println("Statistics")
      System.out.println(Statistics.toString)
    }


  def processFile(file:io.File,destDir:io.File): Unit =
  {
    val model=parser.compileFile(file.getAbsolutePath);

    if (model.hasClasses)
    {
      if (statistics)
        {
          val toFile=destDir.getAbsolutePath+"/"+file.getName.replace(".scala",".js")
          Statistics.processFile(model,toFile)
        }
      else
        {
          val generator= if (generateNode) new GenerateNode else new GenerateNashorn

          val src= generator.generate(model)

          if (isConsole) {
            System.out.println("SOURCE: "+file.getAbsolutePath)
            System.out.println("")
            System.out.println(src)
          }
          else
          {
            if (!destDir.exists())
              destDir.mkdirs();
            val toFile=destDir.getAbsolutePath+"/"+file.getName.replace(".scala",".js")
//            System.out.println("WRITING: "+toFile)
                      scala.tools.nsc.io.File(toFile).writeAll(src)
          }

        }

    }

  }


  def processDirectory(fromFile:io.File,destDir:io.File): Unit =
  {
//    System.out.println(fromFile.getAbsolutePath)
        val files=fromFile.listFiles()
        files foreach(file=>{
          if (file.getName.endsWith(".scala"))
            processFile(file,destDir)
          else
            if (file.isDirectory && !(file.getName.equals("internal") || file.getName.equals("python")|| file.getName.equals("r")))
              processDirectory(file,new File(destDir,file.getName))
        })
  }

  def parseCommandLine(): Unit = {
    val optionParser = new OptionParser()
    //  optionParser.allowsUnrecognizedOptions()


    val sourcePath = optionParser.accepts("source", "path to a source directory").withRequiredArg().ofType(classOf[String])

    val gitRepoPath = optionParser.accepts("gitrepo", "path to spark git repo").withRequiredArg().ofType(classOf[String])

    val generatedPath = optionParser.accepts("generatedPath", "path to generated javascript").withRequiredArg().ofType(classOf[String])

    val stats = optionParser.accepts("statistics", "generate statistics (no js generated)")

    val genNodeOption = optionParser.accepts("generateNode", "generate code for node (default is nashorn)")

    val _help =
      optionParser.acceptsAll(Seq("help", "h").asJava, "display help information").forHelp()



    val options = optionParser.parse(args: _*)

    def has[T](spec: OptionSpec[T]): Boolean =
      options.has(spec)

    def showError(msg:String) = {
      System.err.println(msg)
      System.exit(0)
    }

    if (has(_help) || args.length == 0) {
      optionParser.printHelpOn(System.out)

      System.exit(0)
    }
    if (has(sourcePath) && has(gitRepoPath)) {
      showError(" --source and --gitrepo parameters are mutally exclusive")
    }

    if (!has(sourcePath) && !has(gitRepoPath)) {
      showError("missing either --source or --gitrepo parameter")
    }
    else if (has(sourcePath))
      {
        val fileName=options.valueOf(sourcePath)
        source=new File(fileName)
        if (!source.exists())
          showError("source not found - "+fileName)

      }
    else if (has(gitRepoPath))
    {
      val fileName=options.valueOf(gitRepoPath)
      repoDir=new File(fileName)
      if (!repoDir.exists())
        showError("gitrepo path not found - "+fileName)

    }

    if (has(generatedPath)) {
      val pathName=options.valueOf(generatedPath)
      generatedDir=new File(pathName)
      if (!generatedDir.exists())
        generatedDir.mkdirs();
      isConsole=false;

    }

    generateNode = has(genNodeOption)

    if (has(stats)) {
      statistics=true
      if (!has(generatedPath))
        {
          generatedDir=new File("/tmp")
        }
    }

  }
}
