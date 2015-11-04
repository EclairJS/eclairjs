/**
 * @author billreed
 *
 */

/**
 * Represents a datatype that can be accumulated, ie has an commutative and associative "add" operation, but where the result type, R, may be different from the element type being added, T. 
 * @constructor
 * @param {object} initialValue - initial value of accumulator param
 * @param {object} accumulatorParam - helper object defining how to add elements of type R and T param
 * @param {object} name - human-readable name for use in Spark's web UI param
 */
var Accumulator = function(initialValue, accumulatorParam, name) {
	this._jvmAccumulator = new org.apache.spark.Accumulator(initialValue, accumulatorParam, name);
} 

Accumulator.prototype.getJavaObject = function() {
    return this._jvmAccumulator;
};
