
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
 * @classdesc The data type representing Long values. Please use the singleton DataTypes.LongType.
 */

function LongType(jvmObj) {

	NumericType.call(this, jvmObj);
};


LongType.prototype = Object.create(NumericType.prototype); 


LongType.prototype.constructor = LongType;

/**
 * The default size of a value of the LongType is 8 bytes.
 * @returns {integer}
 */
LongType.prototype.defaultSize = function() {
	return this.getJavaObject().defaultSize();
};
LongType.prototype.classTag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().classTag();
};
LongType.prototype.integral = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().integral();
};
LongType.prototype.numeric = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().numeric();
};
LongType.prototype.ordering = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().ordering();
};
LongType.prototype.tag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().tag();
};
LongType.prototype.unapply = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().unapply();
};
/**
 * @returns {string}
 */
LongType.prototype.simpleString = function() {
	return this.getJavaObject().simpleString();
};

