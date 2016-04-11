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
 bin/eclairjs.sh examples/mllib/isotonic_regression_example.js"
 */

var IsotonicRegression = require('eclairjs/mllib/regression/IsotonicRegression');

function run(sc) {

    var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_isotonic_regression_data.txt";
    var data = sc.textFile(filename);

    // Create label, feature, weight tuples from input data with weight set to default value 1.0.
    var parsedData = data.map(function (line) {
        var parts = line.split(",");
        return new Tuple(parseFloat(parts[0]), parseFloat(parts[1]), 1.0);
    });

    // Split data into training (60%) and test (40%) sets.
    var splits = parsedData.randomSplit([0.6, 0.4], 11);
    var training = splits[0];
    var test = splits[1];

    // Create isotonic regression model from training data.
    // Isotonic parameter defaults to true so it is only shown for demonstration
    var model = new IsotonicRegression().setIsotonic(true).run(training);

    // Create tuples of predicted and real labels.
    var predictionAndLabel = test.mapToPair(function (point, model) {
        var predictedLabel = model.predict(point[1]);
        return new Tuple(predictedLabel, point[0]);

    }, [model]);

    // Calculate mean squared error between predicted and real labels.

    var meanSquaredError = new FloatRDD(predictionAndLabel.map(function (pl) {
        return Math.pow(pl[0] - pl[1], 2);
    })).mean();

    var result = {};
    result.meanSquaredError = meanSquaredError;
    result.model = model;
    return result;


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("Isotonic Regression Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Mean Squared Error = " + result.meanSquaredError);

    // Save and load model
    result.model.save(sc, "target/tmp/myIsotonicRegressionModel");
    var sameModel = IsotonicRegressionModel.load(sc, "target/tmp/myIsotonicRegressionModel");


    sc.stop();
}

