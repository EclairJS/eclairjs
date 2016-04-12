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
 bin/eclairjs.sh examples/mllib/lda_example.js"
 */

var LDA = require('eclairjs/mllib/clustering/LDA');
var Vectors = require('eclairjs/mllib/linalg/Vectors');

function run(sc) {

    // Load and parse the data
    var path = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_lda_data.txt";
    var data = sc.textFile(path);
    var parsedData = data.map(function (s) {
       var sarray = s.trim().split(" ");
        var values = [];
        for (var i = 0; i < sarray.length; i++) {
            values[i] = parseFloat(sarray[i]);
        }
        return Vectors.dense(values);
    });
// Index documents with unique IDs
    var data = parsedData.zipWithIndex().map(function (doc_id) {
        return new Tuple(doc_id[1], doc_id[0]); // swap
    });
    var corpus = PairRDD.fromRDD(data).cache();

// Cluster the documents into three topics using LDA
    var ldaModel = new LDA().setK(3).run(corpus);

// Output topics. Each is a distribution over words (matching word count vectors)
    var ret = {};
    ret.vocabSize = ldaModel.vocabSize();
    ret.topics = [];

    var topics = ldaModel.topicsMatrix();
    for (var topic = 0; topic < 3; topic++) {
        var str = "";
        for (var word = 0; word < ldaModel.vocabSize(); word++) {
            str += " " + topics.apply(word, topic);
        }
        ret.topics[topic] = str;
    }
    return ret;
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("LDA Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Learned topics (as distributions over vocab of " + result.vocabSize + " words):");
    for (var t in result.topics) {
        print("Topic " + t + ":");
        print(result.topics[t]);
    }

    sc.stop();
}


