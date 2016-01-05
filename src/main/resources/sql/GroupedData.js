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
 * @classdec A set of methods for aggregations on a DataFrame, created by DataFrame.groupBy.
 */
var GroupedData = function(jvmGroupedData) {
	
    JavaWrapper.call(this, jvmGroupedData);

	  // Initialize our Row-specific properties
	this.logger = Logger.getLogger("sql.GroupData_js");
}

GroupedData.prototype = Object.create(JavaWrapper.prototype); 

//Set the "constructor" property to refer to GroupedData
GroupedData.prototype.constructor = GroupedData;

/**
 * Compute aggregates by specifying a series of aggregate columns. Note that this function by default retains the grouping columns in its output. 
 * To not retain grouping columns, set spark.sql.retainGroupColumns to false.
 * The available aggregate methods are defined in {@link functions}.
 * @example
 * // Java:
 * df.groupBy("department").agg(max("age"), sum("expense"));
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} columnExpr,...columnExpr or columnName, ...columnName
 * @returns {DataFrame} 
 */
GroupedData.prototype.agg = function() {
	/*
	 * First convert any strings to Columns
	 */

	var args = Utils.createJavaObjectArguments(arguments, Column);
	/*
	 * Create a argument list we can send to Java
	 */
	var str = "this.getJavaObject().agg("
	for (var i = 0; i < args.length; i++) {
		var spacer = i < 1 ? "" : ",";
		str += spacer + "args[" + i + "]";
	}	
	str += ");";

	var javaObject = eval(str);
    return new DataFrame(javaObject);
};
/**
 * Compute the avg value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.avg = function(cols) {
    return new DataFrame(this.getJavaObject().avg(cols));
};

GroupedData.prototype.apply = function(cols) {
	throw "not implemented by ElairJS";
};
/**
 * Count the number of rows for each group.
 * @returns {DataFrame}
 */
GroupedData.prototype.count = function() {
    var jdf = this.getJavaObject().count();
    var df = new DataFrame(jdf);

    return df;
};
/**
 * Compute the max value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.max = function(cols) {
    return new DataFrame(this.getJavaObject().max(cols));
};
/**
 * Compute the mean value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.mean = function(cols) {
    return new DataFrame(this.getJavaObject().mean(cols));
};
/**
 * Compute the min value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.min = function(cols) {
    return new DataFrame(this.getJavaObject().min(cols));
};
/**
 * Compute the sum value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.sum = function(cols) {
    return new DataFrame(this.getJavaObject().sum(cols));
};

