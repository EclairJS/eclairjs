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
var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
var sparkSession = SparkSession
	.builder()
	.appName("spark context tests")
	.master("local[*]")
	.getOrCreate();
var sparkContext = sparkSession.sparkContext();


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

var  objectFile = function() {
    var Rating = require(EclairJS_Globals.NAMESPACE + '/mllib/recommendation/Rating');
    var new_user_ratings = [
        new Rating(0, 260, 9)
    ];
    var new_user_ratings_RDD = sparkContext.parallelize(new_user_ratings);
    new_user_ratings_RDD.saveAsObjectFile('target/tmp/rdd_save_object_file_test', true);
    var loadedRdd = sparkContext.objectFile('target/tmp/rdd_save_object_file_test');
    return JSON.stringify(loadedRdd.take(1));

}

var  textFile = function() {
    var Rating = require(EclairJS_Globals.NAMESPACE + '/mllib/recommendation/Rating');
    var new_user_ratings = [
        new Rating(0, 260, 9)
    ];
    var new_user_ratings_RDD = sparkContext.parallelize(new_user_ratings);
    new_user_ratings_RDD.saveAsTextFile('target/tmp/rdd_save_text_file_test', true);
    var loadedRdd = sparkContext.textFile('target/tmp/rdd_save_text_file_test');
    return JSON.stringify(loadedRdd.take(1));

}

var  setHadoopConfiguration = function() {
    var prefix = "fs.swift.service.test";
    sparkContext.setHadoopConfiguration(prefix + ".username", "userid");
    sparkContext.setHadoopConfiguration(prefix + ".http.port", 8080);
    sparkContext.setHadoopConfiguration(prefix + ".public", false);
    sparkContext.setHadoopConfiguration(prefix + ".float", 1.1);

    var result = {};
    result.user_id = sparkContext.getHadoopConfiguration(prefix + ".username");
    result.port =sparkContext.getHadoopConfiguration(prefix + ".http.port", 8080);
    result.public =sparkContext.getHadoopConfiguration(prefix + ".public", false);
    result.float =sparkContext.getHadoopConfiguration(prefix + ".float", 1.1);

    return JSON.stringify(result);

}


