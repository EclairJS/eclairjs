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
 bin/eclairjs.sh examples/ml/logistic_regression_with_elastic_net_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var functions = require('eclairjs/sql/functions');
    var LogisticRegression = require("eclairjs/ml/classification/LogisticRegression");
    //var Vectors = require("eclairjs/mllib/linalg/Vectors");

    var sqlContext = new SQLContext(sc);

    // Load training data
    var training = sqlContext.read().format("libsvm")
        .load("examples/data/mllib/sample_libsvm_data.txt");

    var lr = new LogisticRegression()
        .setMaxIter(10)
        .setRegParam(0.3)
        .setElasticNetParam(0.8);

    // Fit the model
    var lrModel = lr.fit(training);
    var ret = {};
    ret.coefficients = lrModel.coefficients();
    ret.intercept = lrModel.intercept();

    return ret;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    // Print the coefficients and intercept for logistic regression
    print("Coefficients: "
        + results.coefficients + " Intercept: " + results.intercept);

    sc.stop();
}