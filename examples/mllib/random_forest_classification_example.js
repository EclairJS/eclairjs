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
 bin/eclairjs.sh examples/mllib/random_forest_classification_example.js [file]
 */

function run(sc) {
    var MLUtils = require("eclairjs/mllib/MLUtils");
    var RandomForest = require('eclairjs/mllib/tree/RandomForest');

    var datapath = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_libsvm_data.txt";

    var data = MLUtils.loadLibSVMFile(sc, datapath);

// Split the data into training and test sets (30% held out for testing)
    var splits = data.randomSplit([0.7, 0.3]);
    var trainingData = splits[0];
    var testData = splits[1];

// Train a RandomForest model.
// Empty categoricalFeaturesInfo indicates all features are continuous.
    var numClasses = 2;
    var categoricalFeaturesInfo = {};
    var numTrees = 3; // Use more in practice.
    var featureSubsetStrategy = "auto"; // Let the algorithm choose.
    var impurity = "gini";
    var maxDepth = 5;
    var maxBins = 32;
    var seed = 12345;

// Train a RandomForest model.
    var model = RandomForest.trainClassifier(
        trainingData,
        numClasses,
        categoricalFeaturesInfo,
        numTrees,
        featureSubsetStrategy,
        impurity,
        maxDepth,
        maxBins,
        seed
    );

// Evaluate model on test instances and compute test error
    var predictionAndLabel = testData.mapToPair(function (p, model) {
        return new Tuple(model.predict(p.getFeatures()), p.getLabel());
    }, [model]);

    var testErr = 1.0 * predictionAndLabel.filter(function (tup) {
            return (tup[0] !== tup[1]);
        }).count() / testData.count();
    var ret = {};
    ret.testErr = testErr;
    ret.model = model;
    return ret;
}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("Random Forest Classification Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Test Error: " + result.testErr);
    print("Learned classification forest model:\n" + result.model.toDebugString());

// Save and load model
    result.model.save(sc, "target/tmp/myRandomForestClassificationModel");
    var RandomForestModel = require('eclairjs/mllib/tree/model/RandomForestModel');
    var sameModel = RandomForestModel.load(
        sc,
        "target/tmp/myRandomForestClassificationModel"
    );

    sc.stop();
}
