package org.eclairjs.nashorn

import java.util.HashMap

import org.apache.toree.comm.CommWriter
import org.apache.toree.kernel.api.{Kernel, KernelLike}
import org.apache.toree.kernel.protocol.v5._
import org.apache.toree.magic._
import org.apache.toree.magic.dependencies.{IncludeKernel, IncludeKernelInterpreter}
import org.apache.toree.plugins.annotations.{Event, Init}
import org.apache.toree.utils.ArgumentParsingSupport
import play.api.libs.json.Json


class Comm(val kernel: Kernel, val commWriter:CommWriter = null) {

  def open(target: String): Comm = {
    new Comm(kernel, kernel.comm.open(target))
  }

  def send(target: String, msg: String): Unit = {
    val jsValue = Json.parse(msg)
    //commWriter.writeMsg(JsObject(Seq(
    //  "repsonse" -> jsValue
    //)))
    commWriter.writeMsg(jsValue)
  }

  def close(): Unit = {
    commWriter.close()
  }
}

/**
  * Created by bburns on 10/4/16.
  */
class EclairJS extends CellMagic
  with ArgumentParsingSupport
  with IncludeKernel {

  type CommMap = java.util.HashMap[String, Comm]

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

  private var comm:Comm = null

  @Init def initMethod() = {
    val  kernelImpl = kernel.asInstanceOf[Kernel]

    kernelImpl.comm.register("foreachrdd").addOpenHandler {
      (commWriter, commId, targetName, data) =>
        System.out.println("got comm open for foreachrdd")
        System.out.println(data)

        comm = new Comm(kernelImpl, commWriter)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .put("foreachrdd:"+commId, comm)
    }
    kernelImpl.comm.register("foreachrdd").addCloseHandler {
      (commWriter, commId, data: MsgData) =>
        System.out.println("got  foreachrdd close " + commId)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .remove("foreachrdd:"+commId)
    }
    /*
     * Comms for streamingQueryManagerListener
     */
    kernelImpl.comm.register("streamingQueryManagerListener").addOpenHandler {
      (commWriter, commId, targetName, data) =>
        System.out.println("got comm open for streamingQueryManagerListener")
        System.out.println(data)

        comm = new Comm(kernelImpl, commWriter)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .put("streamingQueryManagerListener:"+commId, comm)
    }
    kernelImpl.comm.register("streamingQueryManagerListener").addCloseHandler {
      (commWriter, commId, data: MsgData) =>
        System.out.println("got  streamingQueryManagerListener close " + commId)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .remove("streamingQueryManagerListener:"+commId)
    }
    /*
     * Comms for dataStreamWriterForeach
     */
    kernelImpl.comm.register("dataStreamWriterForeach").addOpenHandler {
      (commWriter, commId, targetName, data) =>
        System.out.println("got comm open for dataStreamWriterForeach")
        System.out.println(data)

        comm = new Comm(kernelImpl, commWriter)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .put("dataStreamWriterForeach:"+commId, comm)
    }

    kernelImpl.comm.register("dataStreamWriterForeach").addCloseHandler {
      (commWriter, commId, data: MsgData) =>
        System.out.println("got  dataStreamWriterForeach close " + commId)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .remove("dataStreamWriterForeach:"+commId)
    }
    /*
    Comms for logger
     */
    kernelImpl.comm.register("logger").addOpenHandler {
      (commWriter, commId, targetName, data) =>
        System.out.println("got logger open")
        System.out.println(data)

        EclairjsLoggerAppender.create(commWriter,data.toString())

        comm = new Comm(kernelImpl, commWriter)
    }
    kernelImpl.comm.register("logger").addCloseHandler {
      (commWriter, commId, data: MsgData) =>
        System.out.println("got logger close " + commId)
    }

    engine.put("kernel", kernel)
    engine.put("commMap", new CommMap())
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
