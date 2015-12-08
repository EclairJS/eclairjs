package org.eclairjs.tools.generate

import org.eclairjs.tools.generate.model.File

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

  def processFile(model: File, toFile: String) = {

    model.classes foreach(cls=>{
      if (!cls.isStatic)
      {
        val fullName=model.packageName+"."+cls.name
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
    })
    generatedFiles+=toFile;
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
    if (true)  // referenced types
    {
      str=str+"referenced types :\n"+ referencedTypes.toList.sorted.mkString("\n")

    }

    str
  }

}
