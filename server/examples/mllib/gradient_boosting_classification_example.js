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
 bin/eclairjs.sh examples/mllib/gradient_boosting_classification_example.js"
 */


function run(sc) {
    var MLUtils = require("eclairjs/mllib/MLUtils");
    var GradientBoostedTrees = require('eclairjs/mllib/tree/GradientBoostedTrees');
    var BoostingStrategy = require('eclairjs/mllib/tree/configuration/BoostingStrategy');
    var Tuple2 = require('eclairjs/Tuple2');

    // Load and parse the data file.
    var datapath = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_libsvm_data.txt";
    var data = MLUtils.loadLibSVMFile(sc, datapath);
    // Split the data into training and test sets (30% held out for testing)
    var splits = data.randomSplit([0.7, 0.3]);
    var trainingData = splits[0];
    var testData = splits[1];

// Train a GradientBoostedTrees model.
// The defaultParams for Classification use LogLoss by default.
    var boostingStrategy = BoostingStrategy.defaultParams("Classification");
    boostingStrategy.setNumIterations(3); // Note: Use more iterations in practice.
    boostingStrategy.getTreeStrategy().setNumClasses(2);
    boostingStrategy.getTreeStrategy().setMaxDepth(5);
// Empty categoricalFeaturesInfo indicates all features are continuous.
    var categoricalFeaturesInfo = {};
    boostingStrategy.getTreeStrategy().setCategoricalFeaturesInfo(categoricalFeaturesInfo);

    var model = GradientBoostedTrees.train(trainingData, boostingStrategy);


    var predictionAndLabel = testData.mapToPair(function (lp, model, Tuple2) {
        return new Tuple2(model.predict(lp.getFeatures()), lp.getLabel());
    }, [model, Tuple2]);


    var testErr = predictionAndLabel.filter(function (tuple) {
            return tuple._1() != tuple._2();
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
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("Gradient Boosting Classification");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Test Error: " + result.testErr);
    print("Learned classification GBT model:\n" + result.model.toDebugString());
    // Save and load model
    result.model.save(sc, "target/tmp/myGradientBoostingClassificationModel");
    var GradientBoostedTreesModel = require('eclairjs/mllib/tree/GradientBoostedTreesModel');
    var sameModel = GradientBoostedTreesModel.load(sc, "target/tmp/myGradientBoostingClassificationModel");

    sc.stop();
}
