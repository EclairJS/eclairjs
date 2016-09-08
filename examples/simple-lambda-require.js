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
var hello = require('examples/hello');
var goodbye = require('examples/simple/goodbye');
var LabeledPoint = require('eclairjs/mllib/regression/LabeledPoint');
var test = require('https://raw.githubusercontent.com/jtbarbetta/testrepo/master/public/javascript/test-external.js');
var mustache = require('https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js');

var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');

var conf = new SparkConf().setAppName("Simple module binding to lambda function example").setMaster("spark://MacBook-Pro.nc.rr.com:7077");
//var conf = new SparkConf().setAppName("Simple module binding to lambda function example").setMaster("local[*]");
var sc = new SparkContext(conf);

var doHello = function(){
    sc.parallelize([1, 2, 3, 4]).foreach(function(x, hello, goodbye, LabeledPoint, test, mustache) {
        hello(x);
        goodbye(1);
        test(2);
        print('mustache.escapeHtml: ' + Mustache.escape("<span>Hello from mustache!</span>"));
        print('mustache.version: '+Mustache.version);
    }, [hello, goodbye, LabeledPoint, test, mustache]);
}

doHello();
