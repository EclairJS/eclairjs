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
 bin/eclairjs.sh examples/mllib/linear_regression_example.js"
 */

/*
 * Require modules needed within lambda functions.
 */
//var RDD = require('RDD');
LabeledPoint = 21;
var LinearRegressionWithSGD = require('eclairjs/mllib/regression').LinearRegressionWithSGD;
var myLabeledPoint = require('eclairjs/mllib/regression/LabeledPoint');
var myDenseVector = require('eclairjs/mllib/linalg/DenseVector');
var LinearRegressionWithSGD = require('eclairjs/mllib/regression/LinearRegressionWithSGD');
var Tuple = require('eclairjs/Tuple');

function run(sc) {
    var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/lpsa.data";
    var data = sc.textFile(filename).cache();
    var parsedData = data.map(function (s, myLabeledPoint, myDenseVector) {
        var parts = s.split(",");
        var features = parts[1].split(" ");
        return new myLabeledPoint(parts[0], new myDenseVector(features));
    }, [myLabeledPoint, myDenseVector]);

    var numIterations = 3;
    var linearRegressionModel = LinearRegressionWithSGD.train(parsedData, numIterations);

    var delta = 17;
    var valuesAndPreds = parsedData.mapToPair(function (lp, linearRegressionModel, delta) {
        var label = lp.getLabel();
        var f = lp.getFeatures();
        var prediction = linearRegressionModel.predict(f) + delta;
        return new Tuple(prediction, label);
    }, [linearRegressionModel, delta]); // end MapToPair

    return  valuesAndPreds.take(10);

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf()
        .setAppName("Linear Regression Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("valuesAndPreds: " + result.toString());

    sc.stop();
}
