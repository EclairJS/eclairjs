
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
var Tuple = require('eclairjs/Tuple');

function run(sc) {

    var data = [
        new Tuple([0.0, 1.0], [0.0, 2.0]),
        new Tuple([0.0, 2.0], [0.0, 1.0]),
        new Tuple([2.0], [2.0]),
        new Tuple([2.0, 0.0], [2.0, 0.0]),
        new Tuple([0.0, 1.0, 2.0], [0.0, 1.0]),
        new Tuple([1.0], [1.0, 2.0])
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
    var metrics = run(sc);

// Summary stats
    print("Recall = " + metrics.recall());
    print("Precision = ", +metrics.precision());
    print("F1 measure = ", +metrics.f1Measure());
    print("Accuracy = ", +metrics.accuracy());

// Stats by labels
    for (var i = 0; i < metrics.labels().length - 1; i++) {
        print("Class " + metrics.labels()[i] + " precision = " +  metrics.precision(metrics.labels()[i]));
        print("Class " + metrics.labels()[i] + " recall = " + metrics.recall(metrics.labels()[i]));
        print("Class " + metrics.labels()[i] + " F1 score = " +  metrics.f1Measure(metrics.labels()[i]));
    }

// Micro stats
    print("Micro recall = " + metrics.microRecall());
    print("Micro precision = " + metrics.microPrecision());
    print("Micro F1 measure = " + metrics.microF1Measure());

// Hamming loss
    print("Hamming loss = " + metrics.hammingLoss());

// Subset accuracy
    print("Subset accuracy = " + metrics.subsetAccuracy());

    sc.stop();
}
