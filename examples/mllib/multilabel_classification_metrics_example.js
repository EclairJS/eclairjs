
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
 bin/eclairjs.sh examples/mllib/multilabel_classification_metrics_example.js"
 */

var MultilabelMetrics = require('eclairjs/mllib/evaluation').MultilabelMetrics;
var Tuple2 = require('eclairjs/Tuple2');

function run(sc) {

    var data = [
        new Tuple2([0.0, 1.0], [0.0, 2.0]),
        new Tuple2([0.0, 2.0], [0.0, 1.0]),
        new Tuple2([2.0],[2.0]),
        new Tuple2([2.0, 0.0], [2.0, 0.0]),
        new Tuple2([0.0, 1.0, 2.0], [0.0, 1.0]),
        new Tuple2([1.0], [1.0, 2.0])
    ];

    var scoreAndLabels = sc.parallelize(data);

// Instantiate metrics object
    var metrics = new MultilabelMetrics(scoreAndLabels);

    return metrics;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("Multilabel Classification Metrics Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

// Summary stats
    print("Recall = " + result.recall());
    print("Precision = ", +result.precision());
    print("F1 measure = ", +result.f1Measure());
    print("Accuracy = ", +result.accuracy());

// Stats by labels
    for (var i = 0; i < result.labels().length - 1; i++) {
        print("Class " + result.labels()[i] + " precision = " +  result.precision(result.labels()[i]));
        print("Class " + result.labels()[i] + " recall = " + result.recall(result.labels()[i]));
        print("Class " + result.labels()[i] + " F1 score = " +  result.f1Measure(result.labels()[i]));
    }

// Micro stats
    print("Micro recall = " + result.microRecall());
    print("Micro precision = " + result.microPrecision());
    print("Micro F1 measure = " + result.microF1Measure());

// Hamming loss
    print("Hamming loss = " + result.hammingLoss());

// Subset accuracy
    print("Subset accuracy = " + result.subsetAccuracy());

    sc.stop();
}
