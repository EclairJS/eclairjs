package org.eclairjs.tools.generate

import _root_.org.eclairjs.tools.generate.org.eclairjs.tools.generate.model.{FunctionDataType, Method, Clazz,DataType}

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
       getTemplate("abstractConstructor",clsName,parmlist,clsName)

    sbMain++=constr

  }

  def parentClass(cls:Clazz):String =
  {
   cls.parentClass() match {
      case Some(cls) => cls.name
      case None => "JavaWrapper"
    }

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
    method.parms  foreach( parm => parm.typ match {

      case   FunctionDataType(name,parms ,returnType ) =>
        {
          val funcMac = Map("JFunction"->"JSFunction","VoidFunction"->"JSVoidFunction","JFunction2"->"JSFunction2",
            "JFunction3"->"JSFunction3","PairFunction"->"JSPairFunction","PairFlatMapFunction"->"JSPairFlatMapFunction",
            "Function"->"JSFunction","Function2"->"JSFunction2","Function3"->"JSFunction3",
            "Function0"->"JSFunction"
          )
          val funcCounterStr= if (funcCounter==1) "" else ""+funcCounter
          sb++=s"  var sv$funcCounterStr = Utils.createJavaParams(${parm.name});\n"

          val functionClass=funcMac.getOrElse(name,"JSFunction")
          sb++=s"  var fn$funcCounterStr = new org.eclairjs.nashorn.${functionClass}(sv$funcCounterStr.funcStr, sv$funcCounterStr.scopeVars);\n"
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
    })


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


    sb ++= s"  $returnsStr $onObject.${method.name}(${parmNames.mkString(",")});"
    if (needsWrapper(method.returnType))
    {
      var returnType=method.returnType.getJSType()
      if (returnType!="object" && !method.returnType.isAbstract() && !method.returnType.isArray())
        sb ++= s"\n  return new ${returnType}(javaObject);"
      else
        sb ++= s"\n  return Utils.javaToJs(javaObject);"

    }

    sb.toString()

  }

  def needsWrapper(returnType:DataType): Boolean =
  {
    if (returnType.isSparkClass())
      {
        true
      }
    false
  }


  override def generatePostlude(cls:Clazz, sb:StringBuilder): Unit= {}


  }
