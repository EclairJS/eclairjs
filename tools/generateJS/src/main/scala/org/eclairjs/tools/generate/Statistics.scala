package org.eclairjs.tools.generate

import _root_.org.eclairjs.tools.generate.org.eclairjs.tools.generate.model.{Clazz, File, Method}
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
  val showImplementedClasses=false   // the scorecard
  val showClassHieracrchy=false

  val jsSourcePath = "./src/main/resources"

  var numClasses=0;
  var numMethods=0;
  var numDocMethods=0;
  var numOverloadedConstructors=0;
  var numOverloadedMethods=0;

  var numTotalImplemented = 0;
  var numImplemented = 0;



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

  case class ClassInfo(cls: Clazz,numConstructors:Int, methods:List[MethodInfo])
  {
    override  def toString() ={
      val fullName=cls.parent.packageName+"."+cls.name +(if (cls.isStatic) "_static" else "")

      var supers=
        if (showClassHieracrchy)
        {
          cls.parentClasses().map(_.name).mkString("->")
        }
      else
      ""

      s"* $fullName   $numConstructors constructor(s) $supers\n${methods.sortWith(_.name < _.name).mkString("\n")}"
    }

    def setImplemented(method:String): Boolean =
    {
      methods.find(_.name==method) match {
        case Some(method)=> {
          method.implemented=true
          true
        }
        case None => false
      }
    }

  }
  val generatedFiles= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClasses= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClassInfos= scala.collection.mutable.Map[String,ClassInfo]()
  var referencedTypes=Set("")


  val implementedClasses = scala.collection.mutable.Map[String,List[String]]()


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

  def processClass(cls:Clazz) = {
    if (true) //(!cls.isStatic)
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

      methods foreach(method=>{
        val name=if (infoDistinctMethodNames) method.getDistinctName() else method.name
        val seen=s contains(name)
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
          generatedMethodInfos+=MethodInfo(name,num,hasDoc)
        }

        method.parms foreach ( parm => referencedTypes += (parm.typ.name +" = "+ parm.typ.getJSType()))
        referencedTypes += method.returnType.name +" = "+ method.returnType.getJSType()

      })

      generatedClassInfos += (fullName -> ClassInfo(cls,constructors.length,generatedMethodInfos.toList))

    }
  }

  def loadImplmentedInfo(): Unit =
  {
    val functionRX="""[\/\w.]+:\s*(\w+).prototype.(\w+).+""".r

    val grep="""grep -r function """+jsSourcePath
//    val grep="""grep -r "= function" """+jsSourcePath
    val grepLines = grep.!!
    grepLines.split("\\n") foreach( line=>
         line match {
           case functionRX(cls,method) => {
             numTotalImplemented +=1
             implementedClasses.get(cls) match {
               case Some(list) => implementedClasses.put(cls,list++List(method))
               case None => implementedClasses.put(cls,List(method))
             }

           }
           case _ =>

         }
      )
  }

  def calculateClosure() = {

    if (showImplementedClasses)
      loadImplmentedInfo()
    var referencedClasses=Set[Clazz]()

    val topLevels = List("SparkConf","JavaSparkContext","SQLContext","JavaStreamingContext","CountVectorizerModel","CountVectorizer","HashingTF","Tokenizer","LogisticRegression","Pipeline",
    "CrossValidator","ParamGridBuilder","BinaryClassificationEvaluator","KMeans","IDF","Word2Vec","MatrixFactorizationModel","FPGrowth","ALS$","DecisionTree$"
    )

    def checkType(name:String):Unit = {
//      System.out.println("checkTYpe="+name)
      val clsOpt=Main.allClasses.get(name)
      if (clsOpt.isDefined)
        addReference(clsOpt.get)
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

    referencedClasses foreach(processClass(_))

    var str= s"""
      Reduced Classes:

      Number of classes: $numClasses
      Number of functions: $numMethods
      Number of jsdoc functions: $numDocMethods
      Number of overloaded functions: $numOverloadedMethods
      Number of overloaded constructors: $numOverloadedConstructors"""+"\n\n"

    if (showImplementedClasses)
    {
      // first update implemented flag in class infos
      var numberImplemented=0

      def updateImplementedClass(name:String,methods:List[String]): Unit = {
        val checkName="."+name
        generatedClassInfos.find(_._1.endsWith(checkName)) match {

          case Some(tuple) => {
            methods foreach( name=>
              if (tuple._2.setImplemented(name))
                numberImplemented+=1
              )
          }
          case None =>

        }

      }


      for ((cls, methods) <- implementedClasses)
        {
          updateImplementedClass(cls,methods)
          updateImplementedClass("Java"+cls,methods)
        }

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
