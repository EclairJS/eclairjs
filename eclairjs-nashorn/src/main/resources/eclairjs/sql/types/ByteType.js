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
(function () {

    var NumericType = require(EclairJS_Globals.NAMESPACE + '/sql/types/NumericType');

	/*
     * @memberof module:eclairjs/sql/types
     *
	 * Not a valid type for JavaScript
	 */
	var ByteType = function (jvmObj) {
		throw "not implemented by ElairJS";
		NumericType.call(this, jvmObj);
	};


	ByteType.prototype = Object.create(NumericType.prototype);


	ByteType.prototype.constructor = ByteType;

	ByteType.prototype.defaultSize = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().defaultSize();
	};
	ByteType.prototype.classTag = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().classTag();
	};
	ByteType.prototype.integral = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().integral();
	};
	ByteType.prototype.numeric = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().numeric();
	};
	ByteType.prototype.ordering = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().ordering();
	};
	ByteType.prototype.tag = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().tag();
	};
	ByteType.prototype.unapply = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().unapply();
	};
	ByteType.prototype.simpleString = function () {
		throw "not implemented by ElairJS";
		//return this.getJavaObject().simpleString();
	};

    module.exports = ByteType;

})();
