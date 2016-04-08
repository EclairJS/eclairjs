package org.eclairjs.nashorn

import java.net.URL
import javax.script.ScriptEngineManager

import org.apache.toree.comm.{CommWriter, CommRegistrar}
import org.apache.toree.interpreter._
import org.apache.toree.interpreter.Interpreter
import org.apache.toree.interpreter.Results.Result
import org.apache.toree.kernel.api.KernelLike
import org.apache.toree.kernel.api.Kernel
import org.apache.spark.SparkContext
import org.apache.spark.sql.SQLContext
import org.apache.toree.kernel.protocol._
import org.apache.toree.kernel.protocol.v5.MsgData
import play.api.libs.json.{JsString, JsObject, Json}

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

import scala.tools.nsc.interpreter.{InputStream, OutputStream}

import scala.concurrent.ExecutionContext.Implicits.global

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


class JavascriptInterpreter() extends org.apache.toree.interpreter.Interpreter {

  type CommMap = java.util.HashMap[String, Comm]

  private val engine = {
    val manager = new ScriptEngineManager()
    val e = manager.getEngineByName("nashorn")
    val bootstrap = new SparkBootstrap()
    bootstrap.load(e)
    e
  }

  private var comm:Comm = null

  //private var register:CommRegistrar = null

  override def init(kernel: KernelLike) = {
    engine.put("kernel", kernel)
    engine.put("commMap", new CommMap())
    //val comm = new Comm(kernel.asInstanceOf[Kernel]).open("foreachrdd")

    val  kernelImpl = kernel.asInstanceOf[Kernel]
    kernelImpl.comm.register("foreachrdd").addOpenHandler {
      (commWriter, commId, targetName, data) =>
        System.out.println("got comm open")
        System.out.println(data)

        comm = new Comm(kernelImpl, commWriter)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .put("foreachrdd:"+commId, comm)
    }
    kernelImpl.comm.register("foreachrdd").addCloseHandler {
      (commWriter, commId, data: MsgData) =>
        System.out.println("got close " + commId)
        engine.get("commMap")
          .asInstanceOf[CommMap]
          .remove("foreachrdd:"+commId)
    }
    /*
    kernelImpl.comm.register("foreachrdd").addMsgHandler {
      (commWriter, commId, data: MsgData) =>
        System.out.println("got comm message");
        commWriter.writeMsg(JsObject(Seq(
          "response" -> data
        )))
    }
    */


    this
  }


  override def start(): Interpreter = this

  /**
   * Executes body and will not print anything to the console during the execution
   * @param body The function to execute
   * @tparam T The return type of body
   * @return The return value of body
   */
  override def doQuietly[T](body: => T): T = ???

  override def bindSparkContext(sparkContext: SparkContext) = {
    System.out.println("************HERE***************")
    System.out.println(sparkContext)
    engine.put("sc", sparkContext)
  }

  override def bindSqlContext(sqlContext: SQLContext) = {
    engine.put("kernelSqlContext", sqlContext)
  }

  /**
   * Stops the interpreter, removing any previous internal state.
   * @return A reference to the interpreter
   */
  override def stop(): Interpreter = this

  /**
   * Adds external jars to the internal classpaths of the interpreter.
   * @param jars The list of jar locations
   */
  override def addJars(jars: URL*): Unit = ???

  /**
   * @return Returns a string to reference the URI of where the interpreted class files are created
   */
  override def classServerURI: String = ""

  /**
   * Returns the name of the variable created from the last execution.
   * @return Some String name if a variable was created, otherwise None
   */
  override def lastExecutionVariableName: Option[String] = None

  /**
   * Mask the Console and System objects with our wrapper implementations
   * and dump the Console methods into the public namespace (similar to
   * the Predef approach).
   * @param in The new input stream
   * @param out The new output stream
   * @param err The new error stream
   */
  override def updatePrintStreams(in: InputStream, out: OutputStream, err: OutputStream): Unit = ???

  /**
   * Returns the class loader used by this interpreter.
   * @return The runtime class loader used by this interpreter
   */
  override def classLoader: ClassLoader = ???

  /**
   * Retrieves the contents of the variable with the provided name from the
   * interpreter.
   * @param variableName The name of the variable whose contents to read
   * @return An option containing the variable contents or None if the
   *         variable does not exist
   */
  override def read(variableName: String): Option[AnyRef] = ???

  /**
   * Interrupts the current code being interpreted.
   * @return A reference to the interpreter
   */
  override def interrupt(): Interpreter = ???


  /**
   * Binds a variable in the interpreter to a value.
   * @param variableName The name to expose the value in the interpreter
   * @param typeName The type of the variable, must be the fully qualified class name
   * @param value The value of the variable binding
   * @param modifiers Any annotation, scoping modifiers, etc on the variable
   */
  override def bind(variableName: String, typeName: String, value: Any, modifiers: scala.List[String]): Unit = ???

  /**
   * Executes the provided code with the option to silence output.
   * @param code The code to execute
   * @param silent Whether or not to execute the code silently (no output)
   * @return The success/failure of the interpretation and the output from the
   *         execution or the failure
   */
  override def interpret(code: String, silent: Boolean): (Result, scala.Either[ExecuteOutput, ExecuteFailure]) = {
    val futureResult = Future {
      engine.eval(code) match {
        case res:Object => res.toString()
        case _ => null
      }
    }.map(results => (Results.Success, Left(results)))
      .recover({ case ex: Exception =>
      (Results.Error, Right(ExecuteError(
        name = ex.getClass.getName,
        value = ex.getLocalizedMessage,
        stackTrace = ex.getStackTrace.map(_.toString).toList
      )))
    })

    Await.result(futureResult, Duration.Inf)
  }

  /**
   * Attempts to perform code completion via the <TAB> command.
   * @param code The current cell to complete
   * @param pos The cursor position
   * @return The cursor position and list of possible completions
   */
  override def completion(code: String, pos: Int): (Int, scala.List[String]) = ???

}
