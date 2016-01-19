
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
 * @classdesc The data type representing Decimal values. Please use the singleton DataTypes.DecimalType.
 * @param {integer} precision
 * @param {integer} scale
 */

var DecimalType = function() {
	var jvmObj;
	if (arguments[0] && (arguments[0] instanceof Object)) {
		jvmObj = arguments[0];
	} else if (arguments.length == 2) {
		jvmObj = new org.apache.spark.sql.types.DecimalType(arguments[0], arguments[1]);
	} else if (arguments[0]){
		jvmObj = new org.apache.spark.sql.types.DecimalType(arguments[0]);
	} else {
		jvmObj = new org.apache.spark.sql.types.DecimalType();
	}
	
	NumericType.call(this, jvmObj);
};


DecimalType.prototype = Object.create(NumericType.prototype); 


DecimalType.prototype.constructor = DecimalType;

/**
 * @returns {integer} 
 */
DecimalType.MAX_PRECISION = function() {
	return org.apache.spark.sql.types.DecimalType.MAX_PRECISION();
};
/**
 * @returns {integer} 
 */
DecimalType.MAX_SCALE = function() {
	return org.apache.spark.sql.types.DecimalType.MAX_SCALE();
};
/**
 * @returns {DecimalType} 
 */
DecimalType.SYSTEM_DEFAULT = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.SYSTEM_DEFAULT());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.USER_DEFAULT = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.USER_DEFAULT());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.Unlimited = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.Unlimited());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.ByteDecimal = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.ByteDecimal());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.ShortDecimal = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.ShortDecimal());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.IntDecimal = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.IntDecimal());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.LongDecimal = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.LongDecimal());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.FloatDecimal = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.FloatDecimal());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.DoubleDecimal = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.DoubleDecimal());
};
/**
 * @returns {DecimalType} 
 */
DecimalType.apply = function() {
	return new DecimalType(org.apache.spark.sql.types.DecimalType.apply());
};
/**
 * @param {DataType} t
 * @returns {boolean}
 */
DecimalType.unapply = function(t) {
	return org.apache.spark.sql.types.DecimalType.apply(Utils.unwrapObject(t));
};
/**
 * @returns {integer}
 */
DecimalType.prototype.precision = function() {
	return this.getJavaObject().precision();
};
/**
 * @returns {integer}
 */
DecimalType.prototype.scale = function() {
	return this.getJavaObject().scale();
};
DecimalType.prototype.tag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().tag();
};
DecimalType.prototype.numeric = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().numeric();
};
DecimalType.prototype.fractional = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().numeric();
};
DecimalType.prototype.ordering = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().ordering();
};
DecimalType.prototype.asIntegral = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().asIntegral();
};
/**
 * Description copied from class: {@link DataType} Name of the type used in JSON serialization.
 * @returns {string}
 */
DecimalType.prototype.typeName = function() {
	return this.getJavaObject().typeName();
};
DecimalType.prototype.toString = function() {
	return this.getJavaObject().toString();
};
/**
 * The default size of a value of the DecimalType is 4096 bytes.
 * @returns {integer}
 */
DecimalType.prototype.defaultSize = function() {
	return this.getJavaObject().defaultSize();
};

DecimalType.prototype.classTag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().classTag();
};

/**
 * @returns {string}
 */
DecimalType.prototype.simpleString = function() {
	return this.getJavaObject().simpleString();
};

