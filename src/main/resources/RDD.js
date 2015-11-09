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
 * A Resilient Distributed Dataset (RDD), the basic abstraction in Spark. Represents an immutable, 
 * partitioned collection of elements that can be operated on in parallel. 
 * @constructor
 */
var RDD = function(jrdd) { // jrdd - JavaRDD object. don't expose this in the JSDocs for the public API
	this.jvmRdd = jrdd;
	this.logger = Logger.getLogger("RDD_js");
};
/**
 * Persist this RDD with the default storage level (`MEMORY_ONLY`).
 * @returns {RDD}
 */
RDD.prototype.cache = function() {
	this.jvmRdd.cache();
	return this;
};
/**
 * Return an array that contains all of the elements in this RDD.
 * @returns {Array}
 */
RDD.prototype.collect = function() {
	var res = this.jvmRdd.collect();
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
	var c = this.jvmRdd.count();
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
	var result = new RDD(this.jvmRdd.filter(fn));

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
	var result = new RDD(this.jvmRdd.flatMap(fn));

	return result;

};
RDD.prototype.getJavaObject = function() {
	return this.jvmRdd;
};
/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param func
 * @returns {RDD}
 */
RDD.prototype.map = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.map(fn));

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
	var result = new RDD(this.jvmRdd.mapToPair(fn));

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
	var result = new RDD(this.jvmRdd.reduceByKey(fn));

	return result;

};
/**
 * Return this RDD sorted by the given key function.
 * @param {boolean} sascending
 * @returns {RDD}
 */
RDD.prototype.sortByKey = function(ascending) {
	var result = new RDD(this.jvmRdd.sortByKey(ascending));

	return result;
}

/**
 * Take the first num elements of the RDD.
 * @param num
 * @returns {Array}
 */
RDD.prototype.take = function(num) {
	var res = this.jvmRdd.take(num);
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
