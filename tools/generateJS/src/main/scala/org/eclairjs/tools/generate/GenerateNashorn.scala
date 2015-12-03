package org.eclairjs.tools.generate

import org.eclairjs.tools.generate.model.Clazz

/**
 * Created by berkland on 11/19/15.
 */
class GenerateNashorn  extends  GenerateJSBase {



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

    val constr = getTemplate("nashorn_constructorDefault",clsName,clsName,parmlist,clsName,constrBody)

    sb++=constr

  }

  override def generateObject(cls:Clazz, sb:StringBuilder): Unit= {
    val clsName=cls.name

    val constr = getTemplate("nashorn_objectDefault",clsName,clsName,clsName,clsName)

    sb++=constr

  }

  override def generatePostlude(cls:Clazz, sb:StringBuilder): Unit= {}


  }
