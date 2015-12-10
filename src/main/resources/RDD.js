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
  * @constructor
  * @classdesc A Resilient Distributed Dataset (RDD), the basic abstraction in Spark. Represents an immutable, 
 * partitioned collection of elements that can be operated on in parallel. 

 */
var RDD = function(jrdd) { // jrdd - JavaRDD object. don't expose this in the JSDocs for the public API
	var jvmObj = jrdd;
	this.logger = Logger.getLogger("RDD_js");
	JavaWrapper.call(this, jvmObj);
};

RDD.prototype = Object.create(JavaWrapper.prototype); 

RDD.prototype.constructor = RDD;

/**
 * Persist this RDD with the default storage level (`MEMORY_ONLY`).
 * @returns {RDD}
 */
RDD.prototype.cache = function() {
	this.getJavaObject().cache();
	return this;
};
/**
 * Return an array that contains all of the elements in this RDD.
 * @returns {Array}
 */
RDD.prototype.collect = function() {
	var res = this.getJavaObject().collect();
	var results = [];
	for (var i = 0; i < res.size(); i++) {
		var value = res.get(i);
		this.logger.debug("take value: " + value.getClass().getName());
		var o = Utils.javaToJs(value);
		this.logger.debug("take o:" + o.toString());
		results.push(o);
	}
	this.logger.debug("results " + results);
	return results;
};

/**
 * Return the number of elements in the RDD.
 * @returns {integer}
 */
RDD.prototype.count = function() {
	var c = this.getJavaObject().count();
	return c;
};
/**
 * Return a new RDD containing only the elements that satisfy a predicate.
 * @param func
 * @returns {RDD}
 */
RDD.prototype.filter = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.getJavaObject().filter(fn));

	return result;

};
/**
* Return a new RDD by first applying a function to all elements of this RDD, and then flattening the results.
* @param func
* @returns {RDD}
*/
RDD.prototype.flatMap = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.getJavaObject().flatMap(fn));

	return result;

};
/**
 * Applies a function to all elements of this RDD.
 * @example
 * rdd3.foreach(function(record) {
 *    var connection = createNewConnection()
 *    connection.send(record);	
 *    connection.close()
 * });
 * @param {function} Function with one parameter
 * @returns {void}
 */
RDD.prototype.foreach = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSVoidFunction(sv.funcStr, sv.scopeVars);
	this.getJavaObject().foreach(fn);

};
/**
 * Applies a function to each partition of this RDD.
 * @example
 * rdd3.foreachPartition(function(partitionOfRecords) {
 *    var connection = createNewConnection()
 *    partitionOfRecords.forEach(function(record){
 *       connection.send(record);	
 *    });
 *    connection.close()
 * });
 * @param {function} Function with one Array parameter
 * @returns {void}
 */
RDD.prototype.foreachPartition = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSVoidFunction(sv.funcStr, sv.scopeVars);
	this.getJavaObject().foreachPartition(fn);

};
/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param func
 * @returns {RDD}
 */
RDD.prototype.map = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.getJavaObject().map(fn));

	return result;

};
/**
 * Return a new RDD by applying a function to each partition of this RDD. 
 * Similar to map, but runs separately on each partition (block) of the RDD, so func must accept an Array.  
 * func should return a array rather than a single item.
 * @param {function}  
 * @returns {RDD}
 */
RDD.prototype.mapPartitions = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.getJavaObject().mapPartitions(fn));

	return result;

};
/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param func
 * @returns {RDD}
 */
RDD.prototype.mapToPair = function(func) {

	var sv = Utils.createJavaParams(func);

	var fn = new org.eclairjs.nashorn.JSPairFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.getJavaObject().mapToPair(fn));

	return result;

};

/**
 * Reduces the elements of this RDD using the specified function.
 * @param func
 * @returns {RDD}
 */
RDD.prototype.reduceByKey = function(func) {
	var sv = Utils.createJavaParams(func, 2);
	var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.getJavaObject().reduceByKey(fn));

	return result;

};
/**
 * Return this RDD sorted by the given key function.
 * @param {boolean} ascending
 * @returns {RDD}
 */
RDD.prototype.sortByKey = function(ascending) {
	var result = new RDD(this.getJavaObject().sortByKey(ascending));

	return result;
}

/**
 * Take the first num elements of the RDD.
 * @param num
 * @returns {Array}
 */
RDD.prototype.take = function(num) {
	var res = this.getJavaObject().take(num);
	this.logger.debug("take " + res.getClass().getName());
	var results = [];
	for (var i = 0; i < res.size(); i++) {
		var value = res.get(i);
		this.logger.debug("take value: " + value.getClass().getName());
		var o = Utils.javaToJs(value);
		this.logger.debug("take o:" + o.toString());
		results.push(o);
	}
	this.logger.debug("results " + results);
	return results;
};

RDD.prototype.isEmpty = function() {
	return this.getJavaObject().isEmpty();
}

/**
 * Return an array that contains all of the elements in this RDD.
 * @returns {Array}
 */
RDD.prototype.toArray = function() {
	var res = this.getJavaObject().toArray();
	var results = [];
	for (var i = 0; i < res.length; i++) {
		var value = res[i];
		var o = Utils.javaToJs(value);
		results.push(o);
	}
	return results;
	
};

