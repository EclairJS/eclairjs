/**
 * @author billreed
 *
 */

/**
 * Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming, is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
 * @constructor
 * @param {object} jDStream 
  */
var DStream = function(jDStream) {
    this.jDStream = jDStream;
}

DStream.prototype.getJavaObject = function() {
    return this.jDStream;
}

/**
 * Return a new DStream by first applying a function to all elements of this DStream, and then flattening the results.
 * @param func
 * @returns {DStream}
 */
DStream.prototype.flatMap = function(func) {
    var sv = Utils.createJavaParams(func);
    var fn = new com.ibm.eclair.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
    return new DStream(this.jDStream.flatMap(fn));
};

/**
 * Return a new RDD by applying a function to all elements of this DStream.
 * @param func
 * @returns {DStream}
 */
DStream.prototype.map = function(func) {
    var sv = Utils.createJavaParams(func);
    var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
    return new DStream(this.jDStream.map(fn));
};

/**
 * Return a new DStream in which each RDD contains all the elements in seen in a sliding window of time over this DStream. The new DStream generates RDDs with the same interval as this DStream.
 * @param duration - width of the window; must be a multiple of this DStream's interval.
 * @returns {DStream}
 */
DStream.prototype.window = function(duration) {
    return new DStream(this.jDStream.window(duration.getJavaObject()));
};

/**
 * Apply a function to each RDD in this DStream. This is an output operator, so 'this' DStream will be registered as an output stream and therefore materialized.
 * @param func
 * @returns {void}
 */
DStream.prototype.foreachRDD = function(func) {
    var sv = Utils.createJavaParams(func);
    var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
    this.jDStream.foreachRDD(fn);
}

/**
 * Print the first ten elements of each RDD generated in this DStream. This is an output operator, so this DStream will be registered as an output stream and there materialized.
 * @returns {void}
 */
DStream.prototype.print = function() {
    this.jDStream.print();
};
