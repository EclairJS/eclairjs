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
 * Compute the avg value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.avg = function(cols) {
    return new DataFrame(this.getJavaObject().avg(cols));
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

