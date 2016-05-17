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

var aggregateByKey = function() {

    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');
    var Serializable = require(EclairJS_Globals.NAMESPACE + '/Serializable');
    var s = new Serializable();

    var pairRdd =sparkContext.parallelizePairs([
        new Tuple(1, 1),
        new Tuple(1, 1),
        new Tuple(3, 2),
        new Tuple(5, 1),
        new Tuple(new Tuple(5, 3), 2)
    ]);
    var result = pairRdd.aggregateByKey(s,
        function(hashSetA, b) {
            hashSetA[b] = hashSetA[b] ? hashSetA[b] + 1 : 1;
            return hashSetA;
        },
        function(setA, setB){
            for (var k in setA) {
                if (setB.hasOwnProperty(k)) {
                    setA[k] += setB[k];
                }
            }
            return setA;
        });

    var sets = result.collect();

    return JSON.stringify(sets);

}

var foldByKey = function() {

    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');
    var Serializable = require(EclairJS_Globals.NAMESPACE + '/Serializable');
    var s = new Serializable();

    var pairRdd =sparkContext.parallelizePairs([
        new Tuple(2, 1),
        new Tuple(2, 1),
        new Tuple(1, 1),
        new Tuple(3, 2),
        new Tuple(3, 1)
    ]);
    var sums = pairRdd.foldByKey(0,
        function(a, b) {
            return a + b;
        });

    return JSON.stringify(sums.collect());

}

var cogroup = function() {

    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');

    var categories =sparkContext.parallelizePairs([
        new Tuple("Apples", "Fruit"),
        new Tuple("Oranges", "Fruit"),
        new Tuple("Oranges", "Citrus")
    ]);
    var prices =sparkContext.parallelizePairs([
        new Tuple("Oranges", 2),
        new Tuple("Apples", 3)
    ]);
    var cogrouped = categories.cogroup(prices);

    return JSON.stringify(cogrouped.collect());

}

var cogroup2 = function() {

    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');

    var categories =sparkContext.parallelizePairs([
        new Tuple("Apples", "Fruit"),
        new Tuple("Oranges", "Fruit"),
        new Tuple("Oranges", "Citrus")
    ]);
    var prices =sparkContext.parallelizePairs([
        new Tuple("Oranges", 2),
        new Tuple("Apples", 3)
    ]);
    var quantities =sparkContext.parallelizePairs([
        new Tuple("Oranges", 21),
        new Tuple("Apples", 42)
    ]);
    var cogrouped = categories.cogroup(prices, quantities);

    return JSON.stringify(cogrouped.collect());

}

var cogroup3 = function() {

    var Tuple = require(EclairJS_Globals.NAMESPACE + '/Tuple');

    var categories =sparkContext.parallelizePairs([
        new Tuple("Apples", "Fruit"),
        new Tuple("Oranges", "Fruit"),
        new Tuple("Oranges", "Citrus")
    ]);
    var prices =sparkContext.parallelizePairs([
        new Tuple("Oranges", 2),
        new Tuple("Apples", 3)
    ]);
    var quantities =sparkContext.parallelizePairs([
        new Tuple("Oranges", 21),
        new Tuple("Apples", 42)
    ]);
    var origin =sparkContext.parallelizePairs([
        new Tuple("Oranges", "FL"),
        new Tuple("Apples", "WA")
    ]);
    var cogrouped = categories.cogroup(prices, quantities, origin);

    return JSON.stringify(cogrouped.collect());

}