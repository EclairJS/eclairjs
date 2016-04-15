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

/*
 Usage:
 bin/eclairjs.sh examples/accumulator.js"
 */


var run = function(sc){

	sc.parallelize([1, 2, 3, 4]).foreach(function(x, accum) {
		accum.add(x);
	}, [accum]);
	return accum.value();
}
	

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
	var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
	var conf = new SparkConf().setAppName("JavaScript accumulators test");
	var sc = new SparkContext(conf);
    var accum = sc.accumulator([0]);
	print(run(sc));

	sc.stop();
}