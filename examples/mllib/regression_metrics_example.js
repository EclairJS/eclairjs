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

var LabeledPoint = require("eclairjs/mllib/regression/LabeledPoint");
var Vectors = require("eclairjs/mllib/linalg/Vectors");

var sparkConf = new SparkConf()
  .setAppName("Regression Metrics Example");

var sc = new SparkContext(sparkConf);
var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_linear_regression_data.txt";
var data = data = sc.textFile(filename);

var parsedData = data.map(function(line, LabeledPoint, Vectors) {
    var arr = line.split(" ");
    var features = arr.slice(1).map(function(item) {
        return parseFloat(item.split(":")[1]);
    });

    return new LabeledPoint(parseFloat(arr[0]), new Vectors.dense(features));
}, [LabeledPoint, Vectors]).cache();

var numIterations = 100;
var model = LinearRegressionWithSGD.train(parsedData, numIterations);

var valuesAndPreds = parsedData.mapToPair(function(lp, model) { // FIXME
    return [
        model.predict(lp.getFeatures()), 
        lp.getLabel()
    ];
}); // end MapToPair

//Instantiate metrics object
var metrics = new RegressionMetrics(valuesAndPreds)

// Squared Error
print("MSE = " + metrics.meanSquaredError());
print("RMSE = " + metrics.rootMeanSquaredError());

// R-squared
print("R-squared = " + metrics.r2());

// Mean absolute error
print("MAE = " + metrics.meanAbsoluteError())

// Explained variance
print("Explained variance = " + metrics.explainedVariance())
