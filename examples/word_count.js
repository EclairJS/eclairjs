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
 bin/eclairjs.sh examples/word_count.js"
 */

function run(sparkContext) {
    var Tuple2 = require('eclairjs/Tuple2');

    var file = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "./examples/data/dream.txt";


    var rdd = sparkContext.textFile(file).cache();


    var rdd2 = rdd.flatMap(function (sentence) {
        return sentence.split(" ");
    });

    var rdd3 = rdd2.filter(function (word) {
        return word.trim().length > 0;
    });

    var rdd4 = rdd3.mapToPair(function (word, Tuple2) {
        return new Tuple2(word, 1);
    }, [Tuple2]);

    var rdd5 = rdd4.reduceByKey(function (a, b) {
        return a + b;
    });

    var rdd6 = rdd5.mapToPair(function (tuple, Tuple2) {
        return new Tuple2(tuple._2() + 0.0, tuple._1());
    }, [Tuple2])

    var rdd7 = rdd6.sortByKey(false);
    return JSON.stringify(rdd7.take(10));


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var conf = new SparkConf().setAppName("JavaScript word count");
    var sc = new SparkContext(conf);
    var result = run(sc);
    print("top 10 words = " + result);

    sc.stop();
}



