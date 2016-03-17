
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
 * @extends DataType
 * @classdesc A date type, supporting "0001-01-01" through "9999-12-31".
 * Please use the singleton DataTypes.DateType.
 * Internally, this is represented as the number of days from epoch (1970-01-01 00:00:00 UTC).
 */

function DateType(jvmObj) {

	DataType.call(this, jvmObj);
};


DateType.prototype = Object.create(DataType.prototype); 


DateType.prototype.constructor = DateType;

/**
 * The default size of a value of the DateType is 4 bytes.
 * @returns {integer}
 */
DateType.prototype.defaultSize = function() {
	return this.getJavaObject().defaultSize();
};
DateType.prototype.classTag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().classTag();
};
DateType.prototype.ordering = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().ordering();
};
DateType.prototype.tag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().tag();
};

