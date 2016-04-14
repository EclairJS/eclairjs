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


/**
 * Computes the PageRank of URLs from an input file. Input file should
 * be in format of:
 * URL         neighbor URL
 * URL         neighbor URL
 * URL         neighbor URL
 * ...
 * where URL and their neighbors are separated by space(s).
 *
 * This is an example implementation for learning how to use Spark. For more conventional use,
 * please refer to org.apache.spark.graphx.lib.PageRank
 * @class
 */

/*
 * to run this example:
 * bin/eclairjs.sh examples/page_rank.js  <path pagerank_data file> < number of iters>
 */

function run(sc) {
    var List = require('eclairjs/List');
    var Tuple = require('eclairjs/Tuple');

    // Loads in input file. It should be in format of:
    //     URL         neighbor URL
    //     URL         neighbor URL
    //     URL         neighbor URL
    //     ...
    var lines = sc.textFile(filename, 1);

    // Loads all URLs from input file and initialize their neighbors.
    var links = lines.mapToPair(function (s, Tuple) {
        var parts = s.split(/\s+/);
        return new Tuple(parts[0], parts[1]);
    }, [Tuple]).distinct().groupByKey().cache();


    // Loads all URLs with other URL(s) link to from input file and initialize ranks of them to one.
    var ranks = links.mapValues(function () {
        return 1.0;
    });

    // Calculates and updates URL ranks continuously using PageRank algorithm.
    for (var current = 0; current < iters; current++) {
        // Calculates URL contributions to the rank of other URLs.
        var contribs = links.join(ranks).values()
            .flatMapToPair(function (tuple, List, Tuple) {
                var t = tuple[0];
                var urlCount = t.length;
                var results = new List();
                for (var n = 0; n < urlCount; n++) {
                    results.add(new Tuple(t[n], tuple[1] / urlCount));
                }
                return results;
            }, [List, Tuple]);

        // Re-calculates URL ranks based on neighbor contributions.
        ranks = contribs.reduceByKey(function (a, b) {
            return a + b;
        }).mapValues(function (sum) {
            return 0.15 + sum * 0.85;
        });
    }


    // Collects all URL ranks and dump them to console.
    var output = ranks.collect();
    var result = "";
    for (var i = 0; i < output.length; i++) {
        result += output[i][0] + " has rank: " + output[i][1] + ".\n";
    }
    return result;
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */


var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/pagerank_data.txt";
var iters = ((typeof args !== "undefined") && (args.length > 2)) ? 0 + args[2] : 10;

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var conf = new SparkConf().setAppName("JavaScript Page Rank");
    var sc = new SparkContext(conf);
    var result = run(sc);
    print(result);

    sc.stop();
}



