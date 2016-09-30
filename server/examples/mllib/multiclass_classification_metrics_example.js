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
 bin/eclairjs.sh examples/mllib/multiclass_classification_metrics_example.js"
 */



function run(sc) {
    var MLUtils = require("eclairjs/mllib/MLUtils");
    var LogisticRegressionWithLBFGS = require('eclairjs/mllib/classification').LogisticRegressionWithLBFGS;
    var MulticlassMetrics = require('eclairjs/mllib/evaluation').MulticlassMetrics;
    var Tuple2 = require('eclairjs/Tuple2');

    var path =  ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_multiclass_classification_data.txt";
    var data = MLUtils.loadLibSVMFile(sc, path);

    // Split initial RDD into two... [60% training data, 40% testing data].
    var splits = data.randomSplit([0.6, 0.4], 11);
    var training = splits[0].cache();
    var test = splits[1];

// Run training algorithm to build the model.
    var model = new LogisticRegressionWithLBFGS()
        .setNumClasses(3)
        .run(training);

// Compute raw scores on the test set.
    var predictionAndLabels = test.map(function (lp, model, Tuple2) {
        var prediction = model.predict(lp.getFeatures());
        return new Tuple2(prediction, lp.getLabel());
    }, [model, Tuple2]);
    var ret = {};
    ret.model = model;
// Get evaluation metrics.
    ret.metrics = new MulticlassMetrics(predictionAndLabels);

    return ret;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("Multi class Classification Metrics Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

// Confusion matrix
    var confusion = result.metrics.confusionMatrix();
    print("Confusion matrix: \n" + confusion);

// Overall statistics
    print("Precision = " + result.metrics.precision());
    print("Recall = " + result.metrics.recall());
    print("F1 Score = " + result.metrics.fMeasure());

// Stats by labels
    for (var i = 0; i < result.metrics.labels().length; i++) {
        print("Class " + result.metrics.labels()[i] + " precision = " + result.metrics.precision(result.metrics.labels()[i]));
        print("Class " + result.metrics.labels()[i] + " recall = " + result.metrics.recall(result.metrics.labels()[i]));
        print("Class " + result.metrics.labels()[i] + " F1 score = " + result.metrics.fMeasure(result.metrics.labels()[i]));
    }

//Weighted stats
    print("Weighted precision = " + result.metrics.weightedPrecision());
    print("Weighted recall = " + result.metrics.weightedRecall());
    print("Weighted F1 score = " + result.metrics.weightedFMeasure());
    print("Weighted false positive rate = " + result.metrics.weightedFalsePositiveRate());

// Save and load model
    result.model.save(sc, "target/tmp/LogisticRegressionModel");
    var LogisticRegressionModel = require('eclairjs/mllib/classification/LogisticRegressionModel');
    var sameModel = LogisticRegressionModel.load(sc, "target/tmp/LogisticRegressionModel");

    sc.stop();
}
