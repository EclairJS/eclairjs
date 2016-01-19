
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
 * @classdesc The data type representing Byte values. Please use the singleton DataTypes.ByteType.
 */

function ByteType(jvmObj) {

	NumericType.call(this, jvmObj);
};


ByteType.prototype = Object.create(NumericType.prototype); 


ByteType.prototype.constructor = ByteType;

/**
 * The default size of a value of the ByteType is 1 byte.
 * @returns {integer}
 */
ByteType.prototype.defaultSize = function() {
	return this.getJavaObject().defaultSize();
};
ByteType.prototype.classTag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().classTag();
};
ByteType.prototype.integral = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().integral();
};
ByteType.prototype.numeric = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().numeric();
};
ByteType.prototype.ordering = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().ordering();
};
ByteType.prototype.tag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().tag();
};
ByteType.prototype.unapply = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().unapply();
};
/**
 * @returns {string}
 */
ByteType.prototype.simpleString = function() {
	return this.getJavaObject().simpleString();
};

