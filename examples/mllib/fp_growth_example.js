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
 bin/eclairjs.sh examples/mllib/fp_growth_example.js [input_file] [minSupport] [numPartition]"
 */

var FPGrowth = require('eclairjs/mllib/fpm/FPGrowth');
var List = require('eclairjs/List');

function run(sc, useTake) {

    var transactions = sc.textFile(inputFile).map(function(s, List){
        return new List(s.split(" "));
    }, [List]);

    var model = new FPGrowth()
        .setMinSupport(minSupport)
        .setNumPartitions(numPartition)
        .run(transactions);

    var freqItemsRDD = model.freqItemsets();
    var items;
    if (useTake) {
        items = freqItemsRDD.take(3);
    } else {
        items = freqItemsRDD.collect();
    }
    return items;


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */
var inputFile = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_fpgrowth.txt";
var minSupport = 0.3;
var numPartition = -1;

if (typeof sparkContext === 'undefined') {
    if (args.length >= 2) {
        inputFile = args[1];
    }

    if (args.length >= 3) {
        minSupport = parseFloat(args[2]);
    }
    if (args.length >= 4) {
        numPartition = parseInt(args[3]);
    }
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("FPGrowthExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.forEach(function(item){
        print(item.items() + " " + item.freq());
    });

    sc.stop();
}
