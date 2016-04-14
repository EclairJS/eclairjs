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


var SparkConf= require('eclairjs/SparkConf');
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');

var logFile = "/tmp/dream.txt"; // Should be some file on your system
//var master = "spark://MacBook-Pro.local:7077";
var master = "local[*]";
var conf = new SparkConf().setAppName("Simple Application").setMaster(master); 
//var sc = new JavaSparkContext(conf);
var sc = new SparkContext(conf);
var logData = sc.textFile(logFile).cache();
//var x = 2;
var numAs = logData.filter(function (s) {
    //print("filter x = " + x);
    var ret = (s.indexOf("a") > -1);
    print(ret);
    return ret;
}).count();
var numBs = logData.filter(function (s) {
    print("filter 2 " + s);
    var ret = (s.indexOf("b") > -1);
    print(ret);
    return ret;
}).count();
//var y = x.count();
print(" numAs = " + numAs + " numBs = " + numBs);
print(" count = " + logData.count());
