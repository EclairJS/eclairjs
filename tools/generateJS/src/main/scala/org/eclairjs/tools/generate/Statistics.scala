package org.eclairjs.tools.generate

import _root_.org.eclairjs.tools.generate.org.eclairjs.tools.generate.model.{Clazz, File, Method}

object Statistics {


  var numClasses=0;
  var numMethods=0;
  var numDocMethods=0;
  var numOverloadedConstructors=0;
  var numOverloadedMethods=0;


  case class MethodInfo(name:String,num:Int, hasDoc:Boolean)
  {
    override  def toString() ={
      val numStr:String=if (num>1) num.toString else " "
      val docStr:String=if (hasDoc) "DOC" else "   "
      s"  $name  $numStr $docStr"
    }
  }
  case class ClassInfo(name:String,numConstructors:Int, methods:List[MethodInfo])
  {
    override  def toString() ={
      s"$name   $numConstructors constructor(s)\n ${methods.mkString("\n")}"
    }
  }
  val generatedFiles= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClasses= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClassInfos= scala.collection.mutable.Map[String,ClassInfo]()
  var referencedTypes=Set("")

  val allClasses= scala.collection.mutable.Map[String,Clazz]()



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

    model.classes foreach(cls=>{
      val className= if (cls.isStatic) cls.name+"$" else cls.name
        allClasses += (className -> cls)
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
        val name=method.name
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

      generatedClassInfos += (fullName -> ClassInfo(fullName,constructors.length,generatedMethodInfos.toList))

    }
  }

  def calculateClosure() = {
    var referencedClasses=Set[Clazz]()

    val topLevels = List("SparkConf","JavaSparkContext","SQLContext","JavaStreamingContext","CountVectorizerModel","CountVectorizer","HashingTF","Tokenizer","LogisticRegression","Pipeline",
    "CrossValidator","ParamGridBuilder","BinaryClassificationEvaluator","KMeans","IDF","Word2Vec","MatrixFactorizationModel","FPGrowth","ALS$","DecisionTree$"
    )

    def checkType(name:String):Unit = {
      val clsOpt=allClasses.get(name)
      if (clsOpt.isDefined)
        addReference(clsOpt.get)
    }

    def addReference(cls:Clazz) ={
      if (!referencedClasses.contains(cls))
        {
          referencedClasses += cls


              cls.members foreach( member =>{
                member match {
                  case method:Method => {
                    method.parms foreach(parm=> if (parm.typ.isSparkClass()) checkType(parm.typ.simpleName))
                    if (!method.isConstructor() && method.returnType.isSparkClass()) checkType(method.returnType.simpleName())
                  }
                  case _ =>

                }
              })
              cls.parents foreach( checkType(_))


        }

    }


    reset()
    topLevels foreach(checkType(_))
    if (true)
      {

        def isReferenced(name:String):Boolean =
        {
          referencedClasses.find(_.name==name).isDefined
        }
          // see if any unreferenced classes are subclasses of referenced classes, and if so add them
        val unreferencedClasses= allClasses.filter(p=> !p._2.isStatic && !referencedClasses.contains(p._2)).map(_._2)
        unreferencedClasses foreach( cls=>{
           if (cls.parents.find(isReferenced(_) ).isDefined)
             addReference(cls)
        })


      }

    referencedClasses foreach(processClass(_))

    var str= s"""
      Reduced Classes:

      Number of classes: $numClasses
      Number of methods: $numMethods
      Number of jsdoc methods: $numDocMethods
      Number of overloaded methods: $numOverloadedMethods
      Number of overloaded constructors: $numOverloadedConstructors
      """
    val sortedNames=generatedClasses.sorted

    if (false)  // list of classes
      str = str+ "Generated classes :\n"+ sortedNames.mkString("\n")

    if (true)  // class info
    {
      sortedNames foreach( name=> str = str+generatedClassInfos(name).toString+"\n")
    }
    str
  }



  override  def toString () = {
   var str= s"""
      Number of classes: $numClasses
      Number of methods: $numMethods
      Number of jsdoc methods: $numDocMethods
      Number of overloaded methods: $numOverloadedMethods
      Number of overloaded constructors: $numOverloadedConstructors
      """

    val sortedNames=generatedClasses.sorted

    if (false)  // list of classes
      str = str+ "Generated classes :\n"+ sortedNames.mkString("\n")

    if (false)  // class info
      {
        sortedNames foreach( name=> str = str+generatedClassInfos(name).toString+"\n")
      }
    if (false)  // sorted class name (ignoring package)
    {
      str=str+sortedNames.sortWith(_.split("\\.").last < _.split("\\.").last).mkString("\n")

    }
    if (false)  // referenced types
    {
      str=str+"referenced types :\n"+ referencedTypes.toList.sorted.mkString("\n")

    }

    if (true) {
      str = str + calculateClosure()
    }
    str
  }

}
