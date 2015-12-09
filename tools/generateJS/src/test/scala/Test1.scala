/**
 * Class Comment
 */

/**
 * constructor doc.
 */
  class Test1[T](str:String) {

  def func1()={}


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


  /** Assign a name to this RDD */
  def setName(name: String): List[T] = {
    List()
  }
  /** Assign a name to this RDD int */
  def setName(name: Int): Option[String] = {
    Some("")
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

  }
