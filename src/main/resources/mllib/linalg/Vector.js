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
 * @classdesc Represents a numeric vector, whose index type is Int and value type is Double.
 */

var Vector = function() { 
	this.logger = Logger.getLogger("mllib.linalg.Vector_js");
	var jvmObj;

	JavaWrapper.call(this, jvmObj);
};

Vector.prototype = Object.create(JavaWrapper.prototype); 

Vector.prototype.constructor = Vector;
/**
 * Converts the instance to a float array.
 * @returns {float[]}
 */
Vector.prototype.toArray = function() {
	this.getJavaObject().toArray()
};