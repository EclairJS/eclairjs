/**
 * Class Comment
 */

/**
 * constructor doc.
 */
class Test1[T](str:String) {



  def func11(a:Int)(b:Int) : Unit={}


  /**
   * simple function
   */
  def func1(a:Int) : Unit={}

  def
  sort(sortExprs: String*): String =""

  /**
   * Return an RDD with the elements from `this` that are not in `other`.
   */
  def subtract(other: String, p: String): List[T] =
    List()

  /**
   * Return a sampled subset of this RDD [[org.apache.spark.RDD]].
   *
   * @param withReplacement can elements be sampled multiple times (replaced when sampled out)
   * @param fraction expected size of the sample as a fraction of this RDD's size
   *  without replacement: probability that each element is chosen; fraction must be [0, 1]
   *  with replacement: expected number of times each element is chosen; fraction must be >= 0
   * @param seed seed for the random number generator
   * @return description of return value
   */
  def sample(withReplacement: Boolean, fraction: Double, seed: Long): String = ""


  /** Assign a name to this RDD
    *   Note that before Spark 1.4, the default behavior is to NOT retain grouping columns. To change
    * to that behavior, set config variable `spark.sql.retainGroupColumns` to `false`.
    * {{{
    *   // Scala, 1.3.x:
    *   df.groupBy("department").agg($"department", max("age"), sum("expense"))
    *
    *   // Java, 1.3.x:
    *   df.groupBy("department").agg(col("department"), max("age"), sum("expense"));
    * }}}
    *
    *  @since 1.0
    * */
  def setName(name: String): List[T] = {
    List()
  }
  /** Assign a name to this RDD int */
  def setName(name: Int): Option[String] = {
    Some("")
  }


  def funcOverload(name: Int): Unit = {
  }
  def funcOverload(name: Int,b:Boolean): Unit = {
  }
  def funcParmRep(name: Int,s:String*): Unit = {
  }



  /**
   * return (this + plus) dot other, but without creating any intermediate storage
   * @param plus
   * @param other
   * @return
   */
  def plusDot(plus: Int, other: Test1[T]): Double = {
    1.0
  }

  def jars: Seq[String] = Seq("")

  def nothing():Unit = {}

  }

