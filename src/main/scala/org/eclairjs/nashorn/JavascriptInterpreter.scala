package org.eclairjs.nashorn

import java.net.URL
import javax.script.ScriptEngineManager

import com.ibm.spark.interpreter._
import com.ibm.spark.interpreter.Interpreter
import com.ibm.spark.interpreter.Results.Result
import com.ibm.spark.kernel.api.KernelLike
import org.apache.spark.SparkContext
import org.apache.spark.sql.SQLContext

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

import scala.tools.nsc.interpreter.{InputStream, OutputStream}

import scala.concurrent.ExecutionContext.Implicits.global

class JavascriptInterpreter() extends com.ibm.spark.interpreter.Interpreter {

  private val engine = {
    val manager = new ScriptEngineManager()
    val e = manager.getEngineByName("nashorn")
    val bootstrap = new SparkBootstrap()
    bootstrap.load(e)
    e
  }

  override def init(kernel: KernelLike) = {
    engine.put("kernel", kernel)
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
