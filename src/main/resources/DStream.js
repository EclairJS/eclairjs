/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
