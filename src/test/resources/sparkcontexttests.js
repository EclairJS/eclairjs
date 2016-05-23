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
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');

var sparkContext = new SparkContext("local[*]", "spark context tests");

var accum;

var addInt = function() {
    var IntAccumulatorParam = require('eclairjs/IntAccumulatorParam');
	accum = sparkContext.accumulator(0, new IntAccumulatorParam());
	sparkContext.parallelize([1, 2, 3, 4]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var addFloat = function() {
	accum = sparkContext.accumulator(0.0);
	sparkContext.parallelize([1.10, 2.2, 3.3, 4.4]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var addFloatAccumulable = function() {
	var FloatAccumulatorParam = require('eclairjs/FloatAccumulatorParam');
	var f = 0;
	var floatAccumParam = new FloatAccumulatorParam();
	accum = sparkContext.accumulable(f, floatAccumParam);
	sparkContext.parallelize([1.10, 2.2, 3.3, 4.4]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var intAccumulatorParam = function() {
    var IntAccumulatorParam = require('eclairjs/IntAccumulatorParam');
    var Accumulable = require('eclairjs/Accumulable');
	var intAccumParam = new IntAccumulatorParam();
	accum = new Accumulable(0, intAccumParam);
	sparkContext.parallelize([1, 2, 3, 4]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var floatAccumulatorParam = function() {
    var FloatAccumulatorParam = require('eclairjs/FloatAccumulatorParam');
    var Accumulable = require('eclairjs/Accumulable');
	var floatAccumParam = new FloatAccumulatorParam();
	accum = new Accumulable(0.000, floatAccumParam);
	sparkContext.parallelize([1.10, 2.20, 3.30, 4.40]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var floatAccumulator = function() {
    var FloatAccumulatorParam = require('eclairjs/FloatAccumulatorParam');
    var Accumulator = require('eclairjs/Accumulator');
	var floatAccumParam = new FloatAccumulatorParam();
	accum = new Accumulator(0.000, floatAccumParam);
	sparkContext.parallelize([1.10, 2.20, 3.30, 4.40]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var scFloatAccumulator = function() {
	accum = sparkContext.floatAccumulator(0, "floatAccum");
	sparkContext.parallelize([1.10, 2.20, 3.30, 4.40]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var scIntAccumulator = function() {
	accum = sparkContext.intAccumulator(0, "intAccum");
	sparkContext.parallelize([1, 2, 3, 4]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();

}

var broadcast = function() {
	var b = sparkContext.broadcast([1,2]);
	return JSON.stringify(b.value());

}



