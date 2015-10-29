var Accumulator = function(initialValue, accumulatorParam, name) {
	this._jvmAccumulator = new org.apache.spark.Accumulator(initialValue, accumulatorParam, name);
} 

Accumulator.prototype.getJavaObject = function() {
    return this._jvmAccumulator;
};