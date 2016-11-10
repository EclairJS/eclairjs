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
    //val nashornLoader = classOf[NashornEngineSingleton].getClassLoader
    //Thread.currentThread().setContextClassLoader(nashornLoader)

    val e = NashornEngineSingleton.getEngine
    //e.eval(
    //  """
    //    |function print(str) {java.lang.System.out.println(str);}
    //  """.stripMargin)

    e
  }

  @Init def initMethod() = {
    System.out.println("thread context loader = " + Thread.currentThread().getContextClassLoader())
    System.out.println("engine class loader = " + engine.getClass().getClassLoader());
    val loader = classOf[NashornEngineSingleton].getClassLoader();
    System.out.println("loader = " + loader);
    engine.put("toreeJavaSparkContext", kernel.javaSparkContext)
    engine.put("toreeSparkSession", kernel.sparkSession)
    //engine.put("eclairjsLoader", loader)
    engine.eval(
      """
        |print('loader from eval = ' + eclairjsLoader);
        |var SparkContext = require('eclairjs/SparkContext');
        |var SparkSession = require('eclairjs/sql/SparkSession');
        |var sc = new SparkContext(toreeJavaSparkContext);
        |var sparkSession = new SparkSession(toreeSparkSession);
        |var rdd = sc.parallelize([1,2,3,4,5]);
      """.stripMargin)
  }

  @Event(name = "eclairjs")
  override def execute(code: String): CellMagicOutput = {

    //val nashornLoader = classOf[NashornEngineSingleton].getClassLoader
    //Thread.currentThread().setContextClassLoader(nashornLoader)
    //NashornEngineSingleton.setEngine(engine);

    System.out.println("engine class loader execute = " + engine.getClass().getClassLoader());
    engine.eval(code) match {
      case res:Object => CellMagicOutput(MIMEType.PlainText -> res.toString())
      case _ => CellMagicOutput()
    }
  }
}
