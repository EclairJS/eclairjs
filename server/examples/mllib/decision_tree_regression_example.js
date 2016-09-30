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
 bin/eclairjs.sh examples/mllib/decision_tree_regression_example.js
 */


function run(sc) {
    var MLUtils = require("eclairjs/mllib/MLUtils");
    var DecisionTree = require('eclairjs/mllib/tree/DecisionTree');
    var Tuple2 = require('eclairjs/Tuple2');

    // Load and parse the data file.
    var datapath = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_libsvm_data.txt";
    var data = MLUtils.loadLibSVMFile(sc, datapath);

    // Split the data into training and test sets (30% held out for testing)
    var splits = data.randomSplit([0.7, 0.3]);
    var trainingData = splits[0];
    var testData = splits[1];


// Set parameters.
//  Empty categoricalFeaturesInfo indicates all features are continuous.
    var categoricalFeaturesInfo = {};
    var impurity = "variance";
    var maxDepth = 5;
    var maxBins = 32;

    // Train a DecisionTree model.
    var model = DecisionTree.trainRegressor(trainingData,
        categoricalFeaturesInfo, impurity, maxDepth, maxBins);


// Evaluate model on test instances and compute test error

    var predictionAndLabel = testData.mapToPair(function (labeledPoint, model, Tuple2) {
        return new Tuple2(model.predict(labeledPoint.getFeatures()), labeledPoint.getLabel());
    }, [model, Tuple2]);

    var testMSE = predictionAndLabel.map(function (tuple2) {
            var diff = parseFloat(tuple2._1() - tuple2._2());
            return diff * diff;
        }).reduce(function (a, b) {
            return a + b;
        }) / data.count();

    var ret = {};
    ret.testMSE = testMSE;
    ret.model = model;
    return ret;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("DecisionTreeRegressionnExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Test Mean Squared Error: " + result.testMSE);
    print("Learned regression tree model:\n" + result.model.toDebugString());

// Save and load model
    result.model.save(sc, "target/tmp/myDecisionTreeRegressionModel");
    var DecisionTreeModel = require('eclairjs/mllib/tree/model/DecisionTreeModel');
    var sameModel = DecisionTreeModel
        .load(sc, "target/tmp/myDecisionTreeRegressionModel");

    sc.stop();
}
