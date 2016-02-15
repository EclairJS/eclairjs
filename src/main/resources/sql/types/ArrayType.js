
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
 * @protected
 * @param {DataType} elementType
 * @param {boolean} containsNull
 * @classdesc The Array type of all Spark SQL data types.
 */

var ArrayType = function() {
	var jvmObj;
	if (arguments.length == 1) {
		jvmObj = arguments[0];
	} else if (arguments.length == 2) {
		jvmObj = new org.apache.spark.sql.types.ArrayType(Utils.unwrapObject(arguments[0]), arguments[1]);
	} else {
		jvmObj = new org.apache.spark.sql.types.ArrayType();
	}
	DataType.call(this, jvmObj);
};


ArrayType.prototype = Object.create(DataType.prototype); 


ArrayType.prototype.constructor = ArrayType;

/**
 * Construct a ArrayType object with the given element type. The `containsNull` is true.
 * @param {DataType}
 * @returns {ArrayType}
 */
ArrayType.apply = function(elementType) {
	return new ArrayType(org.apache.spark.sql.types.ArrayType.apply(Utils.unwrapObject(elementType)));
};
/**
 * @returns {DataType}
 */
ArrayType.prototype.elementType = function() {
	// FIXME this should be wrappered with the correct sub-class
	//return new DataType(this.getJavaObject().elementType());
	return Utils.javaToJs(this.getJavaObject().elementType());
};
/**
 * @returns {boolean}
 */
ArrayType.prototype.containsNull = function() {
	return this.getJavaObject().containsNull();
};
/**
 * The default size of a value of the ArrayType is 100 * the default size of the element type. (We assume that there are 100 elements).
 * @returns {integer}
 */
ArrayType.prototype.defaultSize = function() {
	return this.getJavaObject().defaultSize();
};
/**
 * Readable string representation for the type.
 * @returns {string}
 */
ArrayType.prototype.simpleString = function() {
	return this.getJavaObject().simpleString();
};
