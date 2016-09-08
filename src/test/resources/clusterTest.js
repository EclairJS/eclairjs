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
var Tuple2 = require('eclairjs/Tuple2');
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');

var conf = new SparkConf().setAppName("datasets unit test").setMaster(spark_master);
var sparkContext = new SparkContext(conf);



function test1() {
        var rdd = sparkContext.parallelize([1, 2, 3]);
        var rdd2 = rdd.flatMap(function(num){return [num+1]});
        var ret = JSON.stringify(rdd2.collect());
        return ret;
}


function  testTuple() {
        var Tuple2 = require(EclairJS_Globals.NAMESPACE +'/Tuple2');
        var rdd = sparkContext.parallelize([1, 2, 3]);
        var rdd2 = rdd.mapToPair(function(num, Tuple2) {return new Tuple2(num,num+1)},[Tuple2]);
        var ret = JSON.stringify(rdd2.collect());
        return ret;
 }

function testLabeledPoint() {
       var LabeledPoint = require('eclairjs/mllib/regression/LabeledPoint');
        var rdd = sparkContext.parallelize([1, 2, 3]);
        var rdd2 = rdd.flatMap(function(num,labeledPoint){return [num+1]},[LabeledPoint]);
        var ret = JSON.stringify(rdd2.collect());
        return ret;
}
function testUserModule() {
       var addOne = require('examples/simple/addOne');
        var rdd = sparkContext.parallelize([1, 2, 3]);
        var rdd2 = rdd.flatMap(function(num,addOne){return [addOne(num)]},[addOne]);
        var ret = JSON.stringify(rdd2.collect());
        return ret;
}

function testExternalModule() {
        var mustache = require('https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js');
        var rdd = sparkContext.parallelize([1, 2, 3]);
        var rdd2 = rdd.flatMap(function(num,mustache){return [Mustache.escape(num)]},[mustache]);
        var ret = JSON.stringify(rdd2.collect());
        return ret;
}
