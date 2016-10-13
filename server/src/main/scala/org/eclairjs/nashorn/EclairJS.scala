package org.eclairjs.nashorn

import org.apache.toree.kernel.api.KernelLike
import org.apache.toree.kernel.protocol.v5.MIMEType
import org.apache.toree.magic._
import org.apache.toree.magic.dependencies.{IncludeKernel, IncludeKernelInterpreter}
import org.apache.toree.plugins.annotations.{Event, Init}
import org.apache.toree.utils.ArgumentParsingSupport


/**
  * Created by bburns on 10/4/16.
  */
class EclairJS extends CellMagic
  with ArgumentParsingSupport
  with IncludeKernel {

  private  val engine = {
    val nashornLoader = classOf[NashornEngineSingleton].getClassLoader
    Thread.currentThread().setContextClassLoader(nashornLoader)
    val e = NashornEngineSingleton.getEngine
    e.eval(
      """
        |function print(str) {java.lang.System.out.println(str);}
      """.stripMargin)

    e
  }

  @Init def initMethod() = {
    engine.put("toreeJavaSparkContext", kernel.javaSparkContext)
    engine.put("toreeSparkSession", kernel.sparkSession)
    engine.eval(
      """
        |var SparkContext = require('eclairjs/SparkContext');
        |var SparkSession = require('eclairjs/sql/SparkSession');
        |var sc = new SparkContext(toreeJavaSparkContext);
        |var sparkSession = new SparkSession(toreeSparkSession);
      """.stripMargin)
  }

  @Event(name = "eclairjs")
  override def execute(code: String): CellMagicOutput = {

    val nashornLoader = classOf[NashornEngineSingleton].getClassLoader
    Thread.currentThread().setContextClassLoader(nashornLoader)
    NashornEngineSingleton.setEngine(engine);

    engine.eval(code) match {
      case res:Object => CellMagicOutput(MIMEType.PlainText -> res.toString())
      case _ => CellMagicOutput()
    }
  }
}
