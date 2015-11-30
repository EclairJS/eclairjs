package org.eclairjs.tools.generate

import org.eclairjs.tools.generate.model.File

object Statistics {


  var numClasses=0;
  var numMethods=0;
  var numDocMethods=0;
  var numOverloadedConstructors=0;
  var numOverloadedMethods=0;

  val generatedFiles= scala.collection.mutable.ListBuffer.empty[String]
  val generatedClasses= scala.collection.mutable.ListBuffer.empty[String]

  def processFile(model: File, toFile: String) = {

    model.classes foreach(cls=>{
      if (!cls.isStatic)
      {
        generatedClasses+=model.packageName+"."+cls.name
        numClasses+=1;
        val constructors=cls.constructors()
        if (constructors.length>1)
          numOverloadedConstructors+=1;

        constructors foreach(meth=> if (meth.comment.trim.length>0) numDocMethods+=1)

        val methods=cls.methods();
        var s = Set("")
        methods foreach(method=>{
          val name=method.name
          if (s contains(name))
            numOverloadedMethods+=1
          s += name
          numMethods+=1;
          if (method.comment.trim.length>0)
            numDocMethods+=1
        })
      }
    })
    generatedFiles+=toFile;
  }

  override  def toString () = {
    s"""
      Number of classes: $numClasses
      Number of methods: $numMethods
      Number of jsdoc methods: $numDocMethods
      Number of overloaded methods: $numOverloadedMethods
      Number of overloaded constructors: $numOverloadedConstructors

      Generated files :
       ${ generatedClasses.sorted.mkString("\n")}
      """
  }

}
