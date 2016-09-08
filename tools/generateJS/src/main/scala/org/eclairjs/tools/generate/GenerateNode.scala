package org.eclairjs.tools.generate


import org.eclairjs.tools.generate.model._

class GenerateNode  extends  GenerateJSBase {

    val NewCodeGen=true;
  val sparkPrefix="org.apache.spark."


  override def generateConstructor(cls:Clazz, sb:StringBuilder): Unit = {
    val clsName=cls.name
    var parmlist=""
    var constrBody=""

    cls.parentClass() match {
      case Some(parentCls) => genInclude(cls,cls.parent)
      case _ =>
    }

    val constructor=mainConstructor(cls);

    if (constructor!=null)
      {
         parmlist=constructor.parmList();
        if (parmlist.length>0)
          parmlist=", "+parmlist


         constrBody=constructor.parms.map(parm=> s"  this.${parm.name} = ${parm.name}").mkString("\n")

      }


    val constr = if (!cls.isAbstract)
      getTemplate("node_constructorDefault",clsName,parmlist,constrBody)
    else
      getTemplate("node_constructorAbstract",clsName,parmlist,clsName)

    sb++=constr

  }
  override def generateObject(cls:Clazz, sb:StringBuilder): Unit={}

  override def generatePostlude(cls:Clazz, sb:StringBuilder): Unit= {
    val clsName=cls.name

    val constr = getTemplate("node_postlude",clsName)

    sb++=constr

  }

  override def isForNode()=true


  override def generateIncludes(file:File, sb:StringBuilder): Unit = {

    // determine path to root directory
    val rootDir="apache/spark/"
    val inx=file.fileName.indexOf(rootDir)
    val segments=file.fileName.substring(inx+rootDir.length).split("/").length-1
    val prefix= if (segments==0) "."
    else
      {
        List("..","..","..","..","..","..","..","..","..","..","..","..").take(segments).mkString("/")
      }
    val constr = getTemplate("node_defaultRequires",prefix,prefix)
    sb++=constr

//    file.imports.filter(_.startsWith(sparkPrefix)).foreach( fullName=>{
//        val name=fullName.substring(sparkPrefix.length).replace('.','/')+".js"
//        val file= new java.io.File(Main.generatedDir,name)
//        if  (file.exists())   // check if there is something there before includeing
//        {
//          val varname=fullName.split("\\.").last
//          val filename=prefix+"/"+name
//          sb++=s"""var $varname = require('$filename');\n"""
//        }
//
//
//    })

  }


  def genInclude(cls:Clazz,file:File):String =
  {
    // determine path to root directory
    val rootDir="apache/spark/"
    val inx=file.fileName.indexOf(rootDir)
    val segments=file.fileName.substring(inx+rootDir.length).split("/").length-1
    val prefix= if (segments==0) "."
    else
    {
      List("..","..","..","..","..","..","..","..","..","..","..","..").take(segments).mkString("/")
    }
    val fullName=cls.fullName()
    val name=fullName.substring(sparkPrefix.length).replace('.','/')+".js"
    val jfile= new java.io.File(Main.generatedDir,name)
    if  (jfile.exists())   // check if there is something there before includeing
    {
      val varname=fullName.split("\\.").last
      val filename=prefix+"/"+name
      s"""var $varname = require('$filename');\n"""
    }
    else ""

  }

  def genInclude(dataType: DataType,file:File):String = {
    val clsOpt = Main.allClasses.get(dataType.name)
    clsOpt match {
      case Some(cls) => genInclude(cls,file)
      case _ => ""
    }
  }

  def getMethodBody(method:Method): String =
  {
     val sb=new StringBuilder

    val returnType=method.returnType
    val isStatic=method.parent.isStatic

    if (returnType.isSparkClass())
      {
          sb ++= genInclude(returnType,method.parent.parent);
      }


    if (method.optionalParms().length>0)
      sb++=s"// TODO: handle optional parms '${method.optionalParms().map(_.name).mkString(",")}'\n"

    method.parms.foreach(parm =>{
      if (parm.isRepeated)
        sb++=s"// TODO: handle repeated parm '${parm.name}'\n"

      parm.typ match {
        case ExtendedDataType(name,referenceType)  =>
        {
          if (referenceType.contains("Tuple") || name.contains("Tuple"))
            sb++=s"// TODO: handle Tuple conversion for '${parm.name}'\n"
        }
        case SimpleType(name)  =>
        {
          if ( name.contains("Tuple"))
            sb++=s"// TODO: handle Tuple conversion for '${parm.name}'\n"
        }
        case _ =>
      }
    })


    if (isPromise(returnType) )
      {
        var result="result"

        if (returnType.isArray())
          result="JSON.parse(result)"
        else
          result = returnType.getJSType() match {
            case "boolean" => "result === 'true'"
            case "number" => "parseInt(result)"
            case _ =>"result"

          }

        sb ++= getTemplate("node_resolve",result)

      }


    if (!NewCodeGen)
    {
      val templateParms= method.parms.map("{{"+_.name+"}}").toArray.mkString(",")
      val assignParms= method.parms.map(parm=> parm.name+" : "+parm.name).toArray.mkString(",")
      val parms = if (method.parms.isEmpty) "" else {
        s", {$assignParms}"
      }
      val onObject =
        if (isStatic)
          method.parent.name
        else
          "{{inRefId}}"
      if (returnType.isSparkClass())
      {

        sb ++= getTemplate("node_templateStrAssign",onObject,method.name,templateParms)


        sb ++= getTemplate("node_genAssign",returnType.getJSType(),parms)

      }
      else if (isVoidPromise(returnType))
      {
        sb ++= getTemplate("node_templateVoidPromise",onObject,method.name,templateParms)


        sb ++= getTemplate("node_genVoidPromise",parms)

      }
      else if (isPromise(returnType))
      {
        if (returnType.isArray())
          sb ++= getTemplate("node_templatePromiseArray",onObject,method.name,templateParms)
        else
          sb ++= getTemplate("node_templatePromise",onObject,method.name,templateParms)

        val promiseParms= if (!method.parms.isEmpty) parms else ", null"

        sb ++= getTemplate("node_genPromise",parms)

      }
      else
        throw new RuntimeException("SHOULD NOT HAPPEN")

    }
    else   // new code gen
    {
      sb ++="  var args ={\n"

      val targetStr = if (isStatic) method.parent.name else "this"
      sb ++= s"    target: ${targetStr}, \n"
      sb ++= s"    method: '${method.name}', \n"

      if (!method.parms.isEmpty)
      {
//        sb ++= s"    args: [ \n"
//        sb ++= method.parms.map(getParmEntry(_)).mkString(",\n")
//        sb ++= s"\n    ], \n"

        sb ++= s"    args: Utils.wrapArguments(arguments),\n"

      }
      if (method.parent.isStatic)
        sb ++= s"    static: true,\n"

      if (returnType.isArray() && !returnType.isSparkClass())
        sb++="    stringify: true,\n"
      if (isPromise(returnType))
        sb++="    resolver: _resolve,\n"

      val returnTypeStr= getReturnTypeStr(method)
      sb ++=s"    returnType: $returnTypeStr\n"
      sb ++="\n  };\n\n  return Utils.generate(args);\n"
    }

    sb.toString()

  }


  def getParmEntry( parm:Parm) : String =
  {
    val sb=new StringBuilder
    val parmTypeStr=parm.typ.getJSType() match
    {
      case _ => parm.typ.getJSType()
    }
    sb ++=s"      { value: ${parm.name}, type: '$parmTypeStr' "
    if (parm.isOptional)
      sb ++=s",  optional: true"
    sb ++="}"
    sb.toString()
  }

  def getReturnTypeStr(method:Method):String =
  {
    val returnType=method.returnType
    val name=method.getReturnJSType()
    if (returnType.isArray())
      {
        s"[${returnType.refName()}]"
      }
    else
      name match {
        case "number" => "Number"
        case "string" => "String"
        case "undefined" => "null"
        case _ => name
      }
  }

  def jsDocType(typ:DataType):String = {
    val jsType=typ.getJSType(typ.name)
    if (isPromise(typ))
      s"Promise.<$jsType>"
    else
      jsType
  }

  def isPromise(typ:DataType):Boolean = {
    val jsType=typ.getJSType()
    !typ.isSparkClass() && jsType!="undefined"
  }
  def isVoidPromise(typ:DataType):Boolean = {
    typ.getJSType()=="undefined"
  }


  override def jsDocReturnType(method:Method):String = jsDocType(method.returnType)

}
