package org.eclairjs.tools.generate

import org.eclairjs.tools.generate.model._

class GenerateNode  extends  GenerateJSBase {



  override def generateConstructor(cls:Clazz, sb:StringBuilder): Unit = {
    val clsName=cls.name

    val constr = getTemplate("node_constructorDefault",clsName)

    sb++=constr

  }
  override def generateObject(cls:Clazz, sb:StringBuilder): Unit={}

  override def generatePostlude(cls:Clazz, sb:StringBuilder): Unit= {
    val clsName=cls.name

    val constr = getTemplate("node_postlude",clsName)

    sb++=constr

  }

  override def generateIncludes(file:File, sb:StringBuilder): Unit = {
    val constr = getTemplate("node_defaultRequires")

    sb++=constr
  }

  }
