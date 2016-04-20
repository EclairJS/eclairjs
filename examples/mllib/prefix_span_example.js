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
 bin/eclairjs.sh examples/mllib/prefix_span_example.js"
 */

var PrefixSpan = require('eclairjs/mllib/fpm/PrefixSpan');

function run(sc) {
    var List = require('eclairjs/List');

    var sequences = sc.parallelize([
        new List([new List([1, 2]), new List([3])]),
        new List([new List([1]), new List([3, 2]), new List([1, 2])]),
        new List([new List([1, 2]), new List([5])]),
        new List([new List([6])])
    ], 2);

    var prefixSpan = new PrefixSpan()
        .setMinSupport(0.5)
        .setMaxPatternLength(5);
    var model = prefixSpan.run(sequences);

    return model.freqSequences().collect();

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("PrefixSpanExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.forEach(function (freqSeq) {
        print(JSON.stringify(freqSeq.sequence()) + ", " + freqSeq.freq());
    });

    sc.stop();
}
