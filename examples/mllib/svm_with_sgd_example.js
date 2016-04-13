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
 bin/eclairjs.sh examples/mllib/svm_with_sgd_example.js"
 */



function run(sc) {
    var MLUtils = require("eclairjs/mllib/MLUtils");
    var SVMWithSGD = require('eclairjs/mllib/classification').SVMWithSGD;
    var BinaryClassificationMetrics = require('eclairjs/mllib/evaluation/BinaryClassificationMetrics');

    var path = "examples/data/mllib/sample_libsvm_data.txt";
    var data = MLUtils.loadLibSVMFile(sc, path);

// Split initial RDD into two... [60% training data, 40% testing data].
    var training = data.sample(false, 0.6, 11);
    training.cache();
    var test = data.subtract(training);

// Run training algorithm to build the model.
    var numIterations = 100;
    var model = SVMWithSGD.train(training, numIterations);

// Clear the default threshold.
    model.clearThreshold();

// Compute raw scores on the test set.
    var scoreAndLabels = test.map(function (lp, model) {
        var score = model.predict(lp.getFeatures());
        return new Tuple(score, lp.getLabel());
    }, [model]);


// Get evaluation metrics.
    var metrics =
        new BinaryClassificationMetrics(scoreAndLabels);
    var ret = {};
    ret.model = model;
    ret.auROC = metrics.areaUnderROC();

    return ret;
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {

    var sparkConf = new SparkConf().setAppName("SVMWithSGDExample");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    print("Area under ROC = " + results.auROC);

// Save and load model
    results.model.save(sc, "target/tmp/SVMWithSGDModel");
    var SVMModel = require('eclairjs/mllib/classification/SVMModel');
    var sameModel = SVMModel.load(sc, "target/tmp/SVMWithSGDModel");

    sc.stop();
}
