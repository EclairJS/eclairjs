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
 * @classdesc Represents a datatype that can be accumulated, ie has an commutative and associative "add" operation, but where the result type, 
 * R, may be different from the element type being added, T. 
 * @param {object} initialValue - initial value of accumulator param
 * @param {object} accumulatorParam - helper object defining how to add elements of type R and T param
 * @param {object} name - human-readable name for use in Spark's web UI param
 */
var Accumulator = function(initialValue, accumulatorParam, name) {
	var jvmObj = new org.apache.spark.Accumulator(initialValue, accumulatorParam, name);
    this.logger = Logger.getLogger("Accumulator_js");
    JavaWrapper.call(this, jvmObj);
};

Accumulator.prototype = Object.create(JavaWrapper.prototype); 

Accumulator.prototype.constructor = Accumulator;
