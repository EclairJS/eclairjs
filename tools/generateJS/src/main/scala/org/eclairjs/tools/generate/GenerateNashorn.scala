package org.eclairjs.tools.generate

import _root_.org.eclairjs.tools.generate.org.eclairjs.tools.generate.model._

/**
 * Created by berkland on 11/19/15.
 */
class GenerateNashorn  extends  GenerateJSBase {



  override def generateConstructor(cls:Clazz, sbMain:StringBuilder): Unit = {
    val clsName=cls.name
    var parmlist=""
    var constrBody=""
    val constructor=mainConstructor(cls);


    if (constructor!=null)
      {
         parmlist=constructor.parmList();

        if (parmlist.length==0)
        {
          parmlist="jvmObject"
        }
        else
        {
          val fullName=constructor.parent.fullName()
          constrBody= s"var jvmObject = new $fullName($parmlist);"
        }


      }

    val parentName = parentClass(cls)

    val constr = if (!cls.isAbstract)
      getTemplate("nashorn_constructorDefault",clsName,parmlist,constrBody,clsName,parentName)
    else
       getTemplate("abstractConstructor",clsName,parmlist,clsName,clsName,parentName)

    sbMain++=constr

  }

  override def generateObject(cls:Clazz, sb:StringBuilder): Unit= {
    val clsName=cls.name

    val constr = getTemplate("nashorn_objectDefault",clsName,parentClass(cls),clsName,clsName,clsName)

    sb++=constr

  }

  def getMethodBody(method:Method): String =
  {
    val sb=new StringBuilder

    val isStatic=method.parent.isStatic

    val parmNames= scala.collection.mutable.ListBuffer.empty[String]


    var funcCounter=1;

    def parmUnwrap(parm:Parm): Unit =
    {
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
      parm.typ match {
        case   FunctionDataType(name,parms ,returnType ) =>
        {
          val funcMac = Map("JFunction"->"JSFunction","VoidFunction"->"JSVoidFunction","JFunction2"->"JSFunction2",
            "JFunction3"->"JSFunction3","PairFunction"->"JSPairFunction","PairFlatMapFunction"->"JSPairFlatMapFunction",
            "Function"->"JSFunction","Function2"->"JSFunction2","Function3"->"JSFunction3",
            "Function0"->"JSFunction"
          )
          val funcCounterStr= if (funcCounter==1) "" else ""+funcCounter
          sb++=s"  var bindArgs;\n"

          val functionClass=funcMac.getOrElse(name,"JSFunction")
          sb++=s" var fn$funcCounterStr = Utils.createLambdaFunction(${parm.name},org.eclairjs.nashorn.${functionClass}, bindArgs);\n"

          parmNames+="fn"+funcCounterStr
          funcCounter+=1;
        }
        case _ => if (parm.typ.isSparkClass() || parm.typ.getJSType()=="object")
        {
          sb ++= s"  var ${parm.name}_uw = Utils.unwrapObject(${parm.name});\n"
          parmNames+=parm.name+"_uw"
        }
        else
          parmNames+=parm.name
      }
    }

    val nonOptionalParms=method.requiredParms()

    nonOptionalParms   foreach( parmUnwrap(_) )



    // return this.getJavaObject().div(Utils.unwrapObject(that));
    val returnsStr=if (method.returnType.isVoid())  "" else
      {
        if (needsWrapper(method.returnType))
          {
            "var javaObject = "
          }
        else
          "return "
      }


    val onObject = if (isStatic) method.parent.fullName()
      else "this.getJavaObject()"



   def genCall(parmNames:List[String]): Unit = {
     sb ++= s"  $returnsStr $onObject.${method.name}(${parmNames.mkString(",")});"
     if (needsWrapper(method.returnType))
     {
       var returnType=method.getReturnJSType()
       if (returnType!="object" && !method.returnType.isAbstract() && !method.returnType.isArray())
         sb ++= s"\n  return new ${returnType}(javaObject);"
       else
         sb ++= s"\n  return Utils.javaToJs(javaObject);"

     }

   }

    if (nonOptionalParms.length==method.parms.length)
      genCall(parmNames.toList);
    else {    // has optional parms
      val nonOptionalNames=parmNames.toList
      val optionalParms=method.optionalParms()
      optionalParms foreach( parmUnwrap(_) )
      sb ++= s"\n  if (arguments[${nonOptionalParms.length}]) {\n"
      genCall(parmNames.toList)

      sb ++= s"\n  } else {\n"
      genCall(nonOptionalNames)
      sb ++= s"\n  }"
    }

    sb.toString()

  }

  def needsWrapper(returnType:DataType): Boolean =
  {
    if (returnType.isSparkClass())
      {
        return true
      }
    false
  }



  override def getFileStart(cls:Clazz): String =
  {

    val sparkPrefix="org.apache.spark"

    val parent=cls.parent
    var dir = if (parent.packageName.length>0 && parent.packageName!="<empty>")
      parent.packageName.substring(sparkPrefix.length)
    else ""
    if (dir.startsWith("."))
      dir = dir.drop(1);
    val name=s"$dir.${cls.name}_js"

    var start = s"""(function () {
                  |
                  |    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
                  |    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
                  |    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
                  |    var logger = Logger.getLogger("$name");
                  |
                  |
                  |""".stripMargin
    start
  }

  override def getFileEnd(): String =
  {
    "\n})();"
  }

  override def generatePostlude(cls:Clazz, sb:StringBuilder): Unit= {
    val clsName=cls.name

    val constr = getTemplate("nashorn_postlude",clsName)

    sb++=constr

  }

}
