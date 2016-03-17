
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
 * @classdesc The data type representing java.sql.Timestamp values. Please use the singleton DataTypes.TimestampType.
 */

function TimestampType(jvmObj) {

	DataType.call(this, jvmObj);
};


TimestampType.prototype = Object.create(DataType.prototype); 


TimestampType.prototype.constructor = TimestampType;

/**
 * The default size of a value of the TimestampType is 8 bytes.
 * @returns {integer}
 */
TimestampType.prototype.defaultSize = function() {
	return this.getJavaObject().defaultSize();
};
TimestampType.prototype.classTag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().classTag();
};
TimestampType.prototype.ordering = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().ordering();
};
TimestampType.prototype.tag = function() {
	throw "not implemented by ElairJS";
	//return this.getJavaObject().tag();
};

