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


var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
var sparkSession = SparkSession
    .builder()
    .appName("PairRDD unit test")
    .master("local[*]")
    .getOrCreate();
var sparkContext = sparkSession.sparkContext();

var combineByKey = function() {
    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');
    var pairRdd =sparkContext.parallelizePairs([
        new Tuple2("coffee", 1),
        new Tuple2("coffee", 2),
        new Tuple2("coffee", 4),
        new Tuple2("pandas", 3)
    ]);
    var avgCounts = pairRdd.combineByKey(
        function(x, Tuple2) {
            // createAcc
            return new Tuple2(x, 1);
        },
        function(tuple, x, Tuple2) {
            // addAndCount
            return new Tuple2(tuple._1() + x, tuple._2() + 1);
        },
        function(t1, t2, Tuple2) {
            // combine
            return new Tuple2(t1._1() + t2._1(), t1._2() + t2._2());
        },
    1,
    [Tuple2]);
    var countMap = avgCounts.collectAsMap();
    return JSON.stringify(countMap);

}

var countByKey = function() {
    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');
    var pairRdd =sparkContext.parallelizePairs([
        new Tuple2("coffee", 1),
        new Tuple2("coffee", 2),
        new Tuple2("coffee", 4),
        new Tuple2("pandas", 3)
    ]);
    var count = pairRdd.countByKey();
    return JSON.stringify(count);

}

var aggregateByKey = function() {

    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');
    var Serializable = require(EclairJS_Globals.NAMESPACE + '/Serializable');
    var s = new Serializable();

    var pairRdd =sparkContext.parallelizePairs([
        new Tuple2(1, 1),
        new Tuple2(1, 1),
        new Tuple2(3, 2),
        new Tuple2(5, 1),
        new Tuple2(new Tuple2(5, 3), 2)
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

    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');
    var Serializable = require(EclairJS_Globals.NAMESPACE + '/Serializable');

    var pairRdd =sparkContext.parallelizePairs([
        new Tuple2(2, 1),
        new Tuple2(2, 1),
        new Tuple2(1, 1),
        new Tuple2(3, 2),
        new Tuple2(3, 1)
    ]);
    var sums = pairRdd.foldByKey(0,
        function(a, b) {
            return a + b;
        });

    return JSON.stringify(sums.collect());

}

var cogroup = function() {

    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');

    var categories =sparkContext.parallelizePairs([
        new Tuple2("Apples", "Fruit"),
        new Tuple2("Oranges", "Fruit"),
        new Tuple2("Oranges", "Citrus")
    ]);
    var prices =sparkContext.parallelizePairs([
        new Tuple2("Oranges", 2),
        new Tuple2("Apples", 3)
    ]);
    var cogrouped = categories.cogroup(prices);

    return JSON.stringify(cogrouped.collect());

}

var cogroup2 = function() {

    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');

    var categories =sparkContext.parallelizePairs([
        new Tuple2("Apples", "Fruit"),
        new Tuple2("Oranges", "Fruit"),
        new Tuple2("Oranges", "Citrus")
    ]);
    var prices =sparkContext.parallelizePairs([
        new Tuple2("Oranges", 2),
        new Tuple2("Apples", 3)
    ]);
    var quantities =sparkContext.parallelizePairs([
        new Tuple2("Oranges", 21),
        new Tuple2("Apples", 42)
    ]);
    var cogrouped = categories.cogroup(prices, quantities);

    return JSON.stringify(cogrouped.collect());

}

var cogroup3 = function() {

    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');

    var categories =sparkContext.parallelizePairs([
        new Tuple2("Apples", "Fruit"),
        new Tuple2("Oranges", "Fruit"),
        new Tuple2("Oranges", "Citrus")
    ]);
    var prices =sparkContext.parallelizePairs([
        new Tuple2("Oranges", 2),
        new Tuple2("Apples", 3)
    ]);
    var quantities =sparkContext.parallelizePairs([
        new Tuple2("Oranges", 21),
        new Tuple2("Apples", 42)
    ]);
    var origin =sparkContext.parallelizePairs([
        new Tuple2("Oranges", "FL"),
        new Tuple2("Apples", "WA")
    ]);
    var cogrouped = categories.cogroup(prices, quantities, origin);

    return JSON.stringify(cogrouped.collect());

}

var join = function() {
    var Tuple2 = require(EclairJS_Globals.NAMESPACE + '/Tuple2');

    var movies = sparkContext.parallelizePairs([
        new Tuple2(1, "Toy Story"),
        new Tuple2(2, "Cars"),
        new Tuple2(3, "Star Wars")
    ]);

    var rating =sparkContext.parallelizePairs([
        new Tuple2(1, 10.0),
        new Tuple2(2, 9.734),
        new Tuple2(3, 10.0)
    ]);
    var movies_ratings = movies.join(rating);
    return JSON.stringify(movies_ratings.collect());
}