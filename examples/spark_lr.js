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
 bin/eclairjs.sh examples/spark_lr.js"
 */

function showWarning() {
    var warning = "WARN: This is a naive implementation of Logistic Regression " +
        "and is given as an example!\n" +
        "Please use either org.apache.spark.mllib.classification.LogisticRegressionWithSGD " +
        "or org.apache.spark.mllib.classification.LogisticRegressionWithLBFGS " +
        "for more conventional use.";
    print(warning);
}

function printWeights(a) {
    print(a);
}


function dot(a, b) {
    var x = 0;
    for (var i = 0; i < D; i++) {
        x += a[i] * b[i];
    }
    return x;
}


showWarning();


var D = 10;   // Number of dimensions

var file =  "./examples/data/lr_data.txt";
var ITERATIONS = 10;

function run(sc) {

    var lines = sc.textFile(file);
    var points = lines.map(function (line,D) {
        var tok = line.split(/\s+/);
        var y = tok[0];
        var x = [];
        for (var i = 0; i < D; i++) {
            x[i] = tok[i + 1];
        }
        return {x: x, y: y};

    },[D]).cache();

    // Initialize w to a random value
    var weights = [];
    var x = 1;
    for (var i = 0; i < D; i++) {
        weights[i] = 2 * Math.random() - 1;
    }

    print("Initial w: ");
    printWeights(weights);

    for (var i = 1; i <= ITERATIONS; i++) {
        print("On iteration " + i);
        var gradient = points.map(function (datapoint, weights,D,dot) {
            var gradient = [];
            for (var i = 0; i < D; i++) {

//                var d = dot(weights, datapoint.x);
//     Lambda functions cannot call other functions,  inline the dot() function
                var d = 0;
                for (var j = 0; j < D; j++) {
                    d += weights[j] * datapoint.x[j];
                }
                gradient[i] = (1 / (1 + Math.exp(-datapoint.y * d)) - 1) * datapoint.y * datapoint.x[i];
            }
            return gradient;
        }, [weights,D,dot]).reduce(function (a, b,D) {
            var result = [];
            for (var j = 0; j < D; j++) {
                result[j] = a[j] + b[j];
            }
            return result;
        },[D]);

        for (var j = 0; j < D; j++) {
            weights[j] -= gradient[j];
        }

    }

    return weights;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {

    file = (args.length > 1) ? args[1] : file;
    ITERATIONS = (args.length > 2) ? 0 + args[2] : ITERATIONS;

    var conf = new SparkConf().setAppName("JavaScript Logistic Regression");
    var sc = new SparkContext(conf);
    var result = run(sc, file);
    print("Final w: ");
    printWeights(result);
    sc.stop();
}



