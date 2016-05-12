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
 * We need to load SparkContext.js and SparkConf.js in order to create SparkContext
 * The SparkContext will load the rest of sparkJS files. So these are the oly two
 * the user has to explicitly load.
 */
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');
var sparkContext = new SparkContext("local[*]", "PairRDD unit test");


var combineByKey = function() {
    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');
    var pairRdd =sparkContext.parallelizePairs([
        new Tuple("coffee", 1),
        new Tuple("coffee", 2),
        new Tuple("coffee", 4),
        new Tuple("pandas", 3)
    ]);
    var avgCounts = pairRdd.combineByKey(
        function(x, Tuple) {
            // createAcc
            return new Tuple(x, 1);
        },
        function(tuple, x) {
            // addAndCount
            tuple[0] += x; // total
            tuple[1] += 1; // num
            return tuple;
        },
        function(t1, t2) {
            // combine
            t1[0] += t2[0]; // total
            t1[1] += t2[1]; // num
            return t1;
        },
    1,
    [Tuple]);
    var countMap = avgCounts.collectAsMap();
    return JSON.stringify(countMap);

}

var countByKey = function() {
    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');
    var pairRdd =sparkContext.parallelizePairs([
        new Tuple("coffee", 1),
        new Tuple("coffee", 2),
        new Tuple("coffee", 4),
        new Tuple("pandas", 3)
    ]);
    var count = pairRdd.countByKey();
    return JSON.stringify(count);

}