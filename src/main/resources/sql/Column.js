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
 * 
 * @constructor
 * @classdesc A column in a DataFrame.
 * @param {string} column name of the column
 */
var Column = function(column) {
	var jvmObj;
	if (typeof column === 'string' || column instanceof String) {
		jvmObj = new org.apache.spark.sql.Column(column);
	} else {
		jvmObj = column;
    
	}
	this.logger = Logger.getLogger("sql.Column_js");
    JavaWrapper.call(this, jvmObj);
};

Column.prototype = Object.create(JavaWrapper.prototype); 

//Set the "constructor" property to refer to Column
Column.prototype.constructor = Column;
/**
 * Greater than.
 * @param {object}
 * @returns {Column}
 */
Column.prototype.gt = function(obj) {
	return new Column(this.getJavaObject().gt(Utils.unwrapObject(obj)));
};
/**
 * Equality test
 * @param {object}
 * @returns {Column}
 */
Column.prototype.equalTo = function(obj) {
    return new Column(this.getJavaObject().equalTo(obj));
};
