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
 bin/eclairjs.sh examples/mllib/lr_example.js [<input_dir>] [<step_size>] [<niters>]"
 */

var directory = "examples/data/mllib/lr-data";
var stepSize = 3.0;
var iterations = 10;

/**
 * Logistic regression based classification using ML Lib.
 */

function run(sc) {
    var lines = sc.textFile(directory);
    var points = lines.map(function (line) {
        var parts = line.split(",");
        var y = parseFloat(parts[0]);
        var tok = parts[1].split(" ");
        var x = [];
        for (var i = 0; i < tok.length; ++i) {
            x[i] = parseFloat(tok[i]);
        }

        return new LabeledPoint(y, Vectors.dense(x));

    }).cache();


    // Another way to configure LogisticRegression
    //
    // LogisticRegressionWithSGD lr = new LogisticRegressionWithSGD();
    // lr.optimizer().setNumIterations(iterations)
    //               .setStepSize(stepSize)
    //               .setMiniBatchFraction(1.0);
    // lr.setIntercept(true);
    // var model = lr.train(points.rdd());

    var model = LogisticRegressionWithSGD.train(points, iterations, stepSize);

    return model.weights();

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    if (args.length > 1) {
        directory = args[1];
    }
    if (args.length > 2) {
        stepSize = parseFloat(args[2]);
    }
    if (args.length > 3) {
        iterations = parseInt(args[3]);
    }

    var sparkConf = new SparkConf().setAppName("LR example").setMaster("local[*]");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Final w: " + result);

    sc.stop();
}