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

/*
 Usage:
 bin/eclairjs.sh examples/spark_pi.js"
 */

/**
 * Computes an approximation to pi
 */


function run(sc) {
    var slices = 50;

    var n = 10000 * slices;
    var l = [];
    for (var i = 0; i < n; i++) {
        l.push(i);
    }


    var dataSet = sc.parallelize(l, slices);


    var count = dataSet.map(function (i) {
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;
        return (x * x + y * y < 1) ? 1 : 0;
    }).reduce(function (int1, int2) {
        return int1 + int2;
    });

    return (4.0 * count / n)

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var conf = new SparkConf().setAppName("JavaScript Spark Pi");
    var sc = new SparkContext(conf);
    var result = run(sc);
    print("Pi is roughly " + result);
    sc.stop();
}


