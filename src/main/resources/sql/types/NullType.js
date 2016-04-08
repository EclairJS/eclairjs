
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
{
    var DataType = require('sql/types/DataType');

	/**
	 * @constructor
	 * @extends DataType
	 * @classdesc The data type representing NULL values. Please use the singleton DataTypes.NullType.
     * @memberof module:sql/types
	 */

	var NullType = function(jvmObj) {
		var jvmObj = arguments[0];
		DataType.call(this, jvmObj);
	};


	NullType.prototype = Object.create(DataType.prototype);


	NullType.prototype.constructor = NullType;

	/**
	 * The default size of a value of this data type, used internally for size estimation.
	 * @returns {integer}
	 */
	NullType.prototype.defaultSize = function () {
		return this.getJavaObject().defaultSize();
	};

	module.exports = NullType;
}