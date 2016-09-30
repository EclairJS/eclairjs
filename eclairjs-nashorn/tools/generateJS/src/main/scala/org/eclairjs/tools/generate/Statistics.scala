package org.eclairjs.tools.generate

import java.net.FileNameMap

import _root_.org.eclairjs.tools.generate.org.eclairjs.tools.generate.model.{Clazz, File, Method}
import scala.collection.mutable
import scala.io.Source
import scala.sys.process._
import scala.util.matching.Regex

object Statistics {

  // options  (ideally it would be command line options)

  val infoDistinctMethodNames = true
  val showGeneratedClassList = false
  val showClassInfo=false
  val showSimpleClassNames=false  // class names without package
  val showReferencedTypes=false
  val showClosure=true
  val showClosureClassInfo=true
  val showClosureGenerateClasses=false
  val showImplementedClasses=true   // the scorecard
  val showClassHieracrchy=false

  val jsSourcePath = "./src/main/resources"

  var numClasses=0;
  var numMethods=0;
  var numDocMethods=0;
  var numOverloadedConstructors=0;
  var numOverloadedMethods=0;

  var numTotalImplemented = 0;
  var numImplemented = 0;

  var filter = ""

  val wontImplementFile="./tools/generateJS/wontImplement.txt"


  case class MethodInfo(name:String,num:Int, hasDoc:Boolean)
  {
    var implemented=false

    override  def toString() ={
      val numStr:String=if (num>1) num.toString else " "
      val docStr:String=if (hasDoc) "DOC" else "   "
      val implementedStr:String=if (implemented) "X" else " "
      if (infoDistinctMethodNames)
        s"  * $name  $implementedStr"
      else
        s"  * $name  $numStr $docStr"
    }

  }

  case class ClassInfo(cls: Clazz,numConstructors:Int, var methods:List[MethodInfo], var staticMethods:List[MethodInfo])
  {
    override  def toString() ={
      val fullNameStr=asFileName()

      var supers=
        if (showClassHieracrchy)
        {
          cls.parentClasses().map(_.name).mkString("->")
        }
      else
      ""

// with constructors      s"* $fullNameStr   $numConstructors constructor(s) $supers\n${methods.sortWith(_.name < _.name).mkString("\n")}"
      var str=s"* $fullNameStr    $supers\n${methods.sortWith(_.name < _.name).mkString("\n")}"
      if (!staticMethods.isEmpty)
        {
          str = str +staticMethods.sortWith(_.name < _.name).mkString(" (static) \n")
        }
      str
    }

    def asFileName()=   fullName().split("\\.").drop(3).mkString("/")+".js"

    def javaFullName():String =
    {
      val newName=cls.name.substring(4)
      val newPackage=cls.parent.packageName.replace(".api.java","")
      newPackage+"."+newName
    }


    def fullName():String = {
      if (cls.name.startsWith("Java"))
        javaFullName()
      else
        cls.parent.packageName+"."+cls.name +(if (cls.isStatic) "_static" else "")
    }

    def setImplemented(method:String, isStatic:Boolean): Boolean =
    {
      val methodList = if (isStatic) staticMethods else methods
      methodList.find(_.name==method) match {
        case Some(method)=> {
          method.implemented=true
          true
        }
        case None => false
      }

    }

    def removeMethod(name:String):Unit =
    {
        methods=methods.filter( name!=_.name)
    }

  }
  val generatedFiles= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClasses= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClassInfos= scala.collection.mutable.Map[String,ClassInfo]()
  var referencedTypes=Set("")


  val implementedClasses = scala.collection.mutable.Map[String,List[String]]()
  val wontImplementClasses = scala.collection.mutable.Map[String,List[String]]()
  val implementedClassesStatics = scala.collection.mutable.Map[String,List[String]]()




  def matchFilter(cls:Clazz): Boolean =
  {
    if (filter.length==0)
      return true;
    val packageName=cls.parent.packageName
    if (filter=="org.apache.spark")
      {
          return false
      }
    else
      return packageName.startsWith(filter)
  }

  def reset() = {
     numClasses=0;
     numMethods=0;
     numDocMethods=0;
     numOverloadedConstructors=0;
     numOverloadedMethods=0;
     generatedFiles.clear()
     generatedClasses.clear()
     generatedClassInfos.clear()
     referencedTypes=Set("")
  }

  def processFile(model: File, toFile: String) = {


      //    System.out.println("processFile="+model.fileName)
      model.classes foreach(cls=>{
        processClass(cls)
      })
      generatedFiles+=toFile;
  }

  def processClass(cls:Clazz, addStatic:Boolean=false) = {
    if (matchFilter(cls)) //(!cls.isStatic)
    {
      val fullName=cls.parent.packageName+"."+cls.name +(if (cls.isStatic) "_static" else "")

      generatedClasses+=fullName;
      numClasses+=1;
      val constructors=cls.constructors()
      if (constructors.length>1)
        numOverloadedConstructors+=1;

      constructors foreach(meth=> if (meth.comment.trim.length>0) numDocMethods+=1)

      val methods=cls.methods();
      var s = Set("")

      val generatedMethodInfos= scala.collection.mutable.ListBuffer.empty[MethodInfo]
      val generatedStaticMethodInfos= scala.collection.mutable.ListBuffer.empty[MethodInfo]


      def addMethod(method: Method, methodInfos:mutable.ListBuffer[MethodInfo]) =
      {
        val name=if (infoDistinctMethodNames) method.getDistinctName() else method.name
        val seen=s contains(name)
        if (!name.startsWith("$"))
        {
          if (seen)
            numOverloadedMethods+=1
          s += name
          numMethods+=1;
          val hasDoc=method.comment.trim.length>0
          if (hasDoc)
            numDocMethods+=1
          if (!seen)
          {
            val num=method.parent.methods(name).length

            if (name.last.isDigit)
            {
              val methName=name.dropRight(1)
              if (!(s contains(methName)))
              {
                s += methName
                methodInfos+=MethodInfo(methName,num,hasDoc)

              }
            }
            else
              methodInfos+=MethodInfo(name,num,hasDoc)
          }

          method.parms foreach ( parm => referencedTypes += (parm.typ.name +" = "+ parm.typ.getJSType()))
          referencedTypes += method.returnType.name +" = "+ method.returnType.getJSType()

        }

      }

      methods foreach(addMethod(_,generatedMethodInfos))

      if (addStatic && !cls.isStatic) {
        val clsOpt = Main.allClasses.get(cls.name + "$")
        if (clsOpt.isDefined) {
          clsOpt.get.methods() foreach (addMethod(_, generatedStaticMethodInfos))
        }

      }



      generatedClassInfos += (fullName -> ClassInfo(cls,constructors.length,generatedMethodInfos.toList,generatedStaticMethodInfos.toList))

    }
  }

  def loadWontImplementInfo():Unit =
  {

    val fileLines = Source.fromFile(wontImplementFile).getLines
    var fileName=fileLines.next()

    while (fileName!="")
      fileName=addFile(fileName)


    def addFile(name:String): String =
    {
      val methods= scala.collection.mutable.ListBuffer.empty[String]

      var line=if (fileLines.hasNext) fileLines.next() else ""
      while (fileLines.hasNext && line.startsWith("-") )
      {
        methods += line.substring(1)
        line = fileLines.next()
      }
      wontImplementClasses += (name -> methods.toList)
      line
    }

  }

  def loadImplmentedInfo(): Unit =
  {

    val functionRX="""\s*(\w+)\.prototype.(\w+).+""".r
    val staticFunctionRX="""\s*(\w+)\.(\w+)\s*=\s*function.+""".r
    val notImplementedRX="""\s*throw\s+"not implemented.+""".r

    var baseDir = new java.io.File(jsSourcePath)
    var isCore=false;

        if (filter.length>0)
        {
          if (filter=="org.apache.spark")
            {
             isCore=true;
            }
          else {
            val component=filter.split("\\.").last
            baseDir=new java.io.File(baseDir,component)
          }
        }

    loadImplementedDir(baseDir)



    def loadImplementedDir(dir:java.io.File) : Unit=
    {
      val files=dir.listFiles()
      files foreach(file=>{
        if (file.getName.endsWith(".js"))
          loadImplementedFile(file)
        else
        if (file.isDirectory)
          {
            if (isCore)
              file.getName match {
                case "sql" | "streaming" | "mllib" | "mlib" | "graph" =>
                case _ =>  loadImplementedDir(file)
              }
            else
              loadImplementedDir(file)
          }
      })

    }

    def loadImplementedFile(file:java.io.File) =
    {

      val fileLines = Source.fromFile(file).getLines

      def addFunction(cls: String, method: String,implClasses:mutable.Map[String, List[String]]): Unit = {

        val nextLine = if (fileLines.hasNext) fileLines.next() else ""
        if (!nextLine.matches( """\s*throw\s+"not implemented""")) {

          numTotalImplemented += 1
          implClasses.get(cls) match {
            case Some(list) => implClasses.put(cls, list ++ List(method))
            case None => implClasses.put(cls, List(method))
          }
        }
      }
      do {
        val line=fileLines.next()
        line match {
          case functionRX(cls, method) => {

            addFunction(cls, method,implementedClasses)
          }
          case staticFunctionRX(cls, method) => {
            addFunction(cls, method,implementedClassesStatics)
          }
          case _ =>
        }
      } while (fileLines.hasNext)


    }

//    val functionRX="""[\/\w.]+:\s*(\w+).prototype.(\w+).+""".r
//
//    var srcPath=jsSourcePath
//    var recursive="-r"
//    if (filter.length>0)
//    {
//      if (filter=="org.apache.spark")
//        {
//          recursive="""  --include="*.js" """
//        }
//      else {
//        var component=filter.split("\\.").last
//        srcPath = srcPath+"/"+component
//      }
//    }
//
//    val grep=s"""grep $recursive function """+srcPath
////    val grep="""grep -r "= function" """+jsSourcePath
//    println("EXECUTING: "+grep)
//    val grepLines = grep.!!
//    grepLines.split("\\n") foreach( line=>
//         line match {
//           case functionRX(cls,method) => {
//             numTotalImplemented +=1
//             implementedClasses.get(cls) match {
//               case Some(list) => implementedClasses.put(cls,list++List(method))
//               case None => implementedClasses.put(cls,List(method))
//             }
//
//           }
//           case _ =>
//
//         }
//      )

  }

  def findGeneratedClass(name:String) : Option[ClassInfo] = {
      val checkName="."+name
      generatedClassInfos.find(_._1.endsWith(checkName)) match {

        case Some(tuple) => {
          Some(tuple._2)
        }
        case None => None

      }

    }


  def calculateClosure() = {

    if (showImplementedClasses)
    {
      loadImplmentedInfo()
      loadWontImplementInfo()
    }
    var referencedClasses=Set[Clazz]()

//    val topLevels = List("JavaRDD"    )
    val topLevels = List("SparkConf","JavaSparkContext","SQLContext","JavaStreamingContext","CountVectorizerModel","CountVectorizer","HashingTF","Tokenizer","LogisticRegression","Pipeline",
      "CrossValidator","ParamGridBuilder","BinaryClassificationEvaluator","KMeans","IDF","Word2Vec","MatrixFactorizationModel","FPGrowth","ALS$","DecisionTree$"
    )

    def checkType(name:String):Unit = {
//      System.out.println("checkTYpe="+name)
      val clsOpt=Main.allClasses.get(name)
      if (clsOpt.isDefined)
        {
//          // Dont add scala classes which have Java api
//          val clsOptJava=Main.allClasses.get("Java"+name)
//          if (!clsOptJava.isDefined)
            addReference(clsOpt.get)

        }
    }

    def addReference(cls:Clazz) ={
//      System.out.println("addReference="+cls.name)
      if (!referencedClasses.contains(cls))
        {
          referencedClasses += cls


              cls.members foreach( member =>{
                member match {
                  case method:Method => {
                    method.parms foreach(parm=> if (parm.typ.isSparkClass()) checkType(parm.typ.refName()))
                    if (!method.isConstructor() && method.returnType.isSparkClass()) checkType(method.returnType.refName())
                  }
                  case _ =>

                }
              })
              cls.parents foreach( checkType(_))


        }

    }


    reset()
    topLevels foreach(checkType(_))
    if (false)  // sublcasses of referenced classes
      {

        def isReferenced(name:String):Boolean =
        {
          referencedClasses.find(_.name==name).isDefined
        }
          // see if any unreferenced classes are subclasses of referenced classes, and if so add them
        val unreferencedClasses= Main.allClasses.filter(p=> !p._2.isStatic && !referencedClasses.contains(p._2)).map(_._2)
        unreferencedClasses foreach( cls=>{
           if (cls.parents.find(isReferenced(_) ).isDefined)
             addReference(cls)
        })


      }


    referencedClasses foreach(processClass(_,true))

    var numberImplemented=0

    if (showImplementedClasses)
    {
      // first update implemented flag in class infos

      def updateImplementedClass(name:String,methods:List[String],isStatic:Boolean): Unit = {
        findGeneratedClass(name) match {

          case Some(classInfo) => {
            methods foreach( name=>
              if (classInfo.setImplemented(name,isStatic))
                numberImplemented+=1
              )
          }
          case None =>

        }

      }
      def removeGenClass(fullName:String) = {
        generatedClassInfos.remove(fullName)
        generatedClasses.-=(fullName)
      }


      for ((cls, methods) <- implementedClasses)
      {
        updateImplementedClass(cls,methods,false)
        updateImplementedClass("Java"+cls,methods,false)
      }
      for ((cls, methods) <- implementedClassesStatics)
      {
        updateImplementedClass(cls,methods,false)
        updateImplementedClass("Java"+cls,methods,false)
      }


      // merge java into base

      val javaClasses  =generatedClassInfos.filter(tuple=>{
        val shortName=tuple._1.split("\\.").last
        (shortName.startsWith("Java"))
      }).map(_._2)



      javaClasses foreach ( clsInfo=>{
        val oldFullName=clsInfo.cls.parent.packageName+"."+clsInfo.cls.name
        val fullName=clsInfo.javaFullName()
        if (!(generatedClasses.contains(fullName)))
          generatedClasses +=fullName
        generatedClassInfos+=(fullName -> ClassInfo(clsInfo.cls,clsInfo.numConstructors,clsInfo.methods,clsInfo.staticMethods))
        removeGenClass(oldFullName)
      })



      for ((cls, methods) <- wontImplementClasses)
      {
          generatedClassInfos.find(tuple=>{
            tuple._2.asFileName()==cls
          }).map(_._2) match {
            case Some(clsInfo)=> {
              if (methods.isEmpty)
                {
                  removeGenClass(clsInfo.fullName())
                  numClasses-= 1
                  numMethods -= clsInfo.methods.size
                }
              else
                {
                    for (methodName <- methods)
                      {
                        clsInfo.removeMethod(methodName)
                        numMethods -= 1
                      }
                }
            }
            case None =>
          }
      }

    }



    val filterStr=if (filter.length>0) " for package "+filter else ""
    var str= s"""
      Reduced Classes$filterStr:

      Number of classes: $numClasses
      Number of functions: $numMethods
      Number of jsdoc functions: $numDocMethods
      Number of overloaded functions: $numOverloadedMethods
      Number of overloaded constructors: $numOverloadedConstructors"""+"\n\n"

    if (showImplementedClasses)
    {

      // results
      str=str+
          s"""
       Number of implemented classes: ${implementedClasses.size}
       Number of implemented functions (exact name match): $numberImplemented
       Number of total implemented functions: $numTotalImplemented
            """+"\n\n"

    }



    val sortedNames=generatedClasses.sorted

    if (showClosureGenerateClasses)  // list of classes
      str = str+ "Generated classes :\n"+ sortedNames.mkString("\n")

    if (showClosureClassInfo)  // class info
    {
      sortedNames foreach( name=> str = str+generatedClassInfos(name).toString+"\n")
    }
    str
  }



  override  def toString () = {
   var str= s"""
      Number of classes: $numClasses
      Number of functions: $numMethods
      Number of jsdoc functions: $numDocMethods
      Number of overloaded functions: $numOverloadedMethods
      Number of overloaded constructors: $numOverloadedConstructors
      """

    val sortedNames=generatedClasses.sorted

    if (showGeneratedClassList)  // list of classes
      str = str+ "Generated classes :\n"+ sortedNames.mkString("\n")

    if (showClassInfo)  // class info
      {
        sortedNames foreach( name=> str = str+generatedClassInfos(name).toString+"\n")
      }
    if (showSimpleClassNames)  // sorted class name (ignoring package)
    {
      str=str+sortedNames.sortWith(_.split("\\.").last < _.split("\\.").last).mkString("\n")

    }
    if (showReferencedTypes)  // referenced types
    {
      str=str+"referenced types :\n"+ referencedTypes.toList.sorted.mkString("\n")

    }

    if (showClosure) {
      str = str + calculateClosure()
    }
    str
  }

}
