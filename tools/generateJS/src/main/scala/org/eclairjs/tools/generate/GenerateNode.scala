package org.eclairjs.tools.generate


import org.eclairjs.tools.generate.model._

class GenerateNode  extends  GenerateJSBase {



  override def generateConstructor(cls:Clazz, sb:StringBuilder): Unit = {
    val clsName=cls.name
    var parmlist=""
    var constrBody=""

    val constructor=mainConstructor(cls);

    if (constructor!=null)
      {
         parmlist=constructor.parmList();
        if (parmlist.length>0)
          parmlist=", "+parmlist


         constrBody=constructor.parms.map(parm=> s"  this.${parm.name} = ${parm.name}").mkString("/n")

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

    val sparkPrefix="org.apache.spark."
    file.imports.filter(_.startsWith(sparkPrefix)).foreach( fullName=>{
        val name=fullName.substring(sparkPrefix.length).replace('.','/')+".js"
        val file= new java.io.File(Main.generatedDir,name)
        if  (file.exists())   // check if there is something there before includeing
        {
          val varname=fullName.split("\\.").last
          val filename=prefix+"/"+name
          sb++=s"""var $varname = require('$filename');\n"""
        }


    })

  }


  def getMethodBody(method:Method): String =
  {
    val sb=new StringBuilder

    val returnType=method.returnType
    val isStatic=method.parent.isStatic


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

    val templateParms= method.parms.map("{{"+_.name+"}}").toArray.mkString(",")
    val assignParms= method.parms.map(parm=> parm.name+" : "+parm.name).toArray.mkString(",")
    val parms = if (method.parms.isEmpty) "" else {
      s", {$assignParms}"
    }

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

    sb.toString()

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
