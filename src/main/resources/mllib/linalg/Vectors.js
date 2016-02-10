/*
 * Copyright 2016 IBM Corp.
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
 * @classdesc A dense vector represented by a value array.
 * @param {float[]} values
 */

var DenseVector = function(arg) { 
	this.logger = Logger.getLogger("mllib.linalg.DenseVector_js");
	var jvmObj;
	if (Array.isArray(arg)) {
		jvmObj = new org.apache.spark.mllib.linalg.DenseVector(arg);
	} else {
		jvmObj = arg;
	}
	

	JavaWrapper.call(this, jvmObj);
};

DenseVector.prototype = Object.create(JavaWrapper.prototype); 

DenseVector.prototype.constructor = DenseVector;
/**
 * Converts the instance to a float array.
 * @returns {float[]}
 */
DenseVector.prototype.toArray = function() {
	this.getJavaObject().toArray()
};


var Vectors = {}

Vectors.dense = function(vals) {
    return new DenseVector(vals);
};
