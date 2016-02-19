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
 bin/eclairjs.sh examples/mllib/decision_tree_classification_example.js
 */


function run(sc) {
    // Load and parse the data file.
    var datapath = "examples/data/mllib/sample_libsvm_data.txt";
    var data = MLUtils.loadLibSVMFile(sc, datapath);

    // Split the data into training and test sets (30% held out for testing)
    var splits = data.randomSplit([0.7, 0.3]);
    var trainingData = splits[0];
    var testData = splits[1];


// Set parameters.
//  Empty categoricalFeaturesInfo indicates all features are continuous.
    var numClasses = 2;
    var categoricalFeaturesInfo = {};
    var impurity = "gini";
    var maxDepth = 5;
    var maxBins = 32;

// Train a DecisionTree model for classification.
    var model = DecisionTree.trainClassifier(trainingData, numClasses,
        categoricalFeaturesInfo, impurity, maxDepth, maxBins);

// Evaluate model on test instances and compute test error

    var predictionAndLabel = testData.mapToPair(function (labeledPoint, model) {
        return [model.predict(labeledPoint.getFeatures()), labeledPoint.getLabel()];
    }, [model]);


    var result = predictionAndLabel.filter(function (tuple2) {
        return (tuple2[0] != tuple2[1]);
    });
    var testErr = result.count() / testData.count();
    var ret = {};
    ret.testErr = testErr;
    ret.model = model;
    return ret;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("DecisionTreeClassificationExample").setMaster("local[*]");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Test Error: " + result.testErr);
    print("Learned classification tree model:\n" + result.model.toDebugString());

// Save and load model
    result.model.save(sc, "/tmp/myDecisionTreeClassificationModel");
    var sameModel = DecisionTreeModel
        .load(sc, "/tmp/myDecisionTreeClassificationModel");

    sc.stop();
}