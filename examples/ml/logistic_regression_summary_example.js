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
 bin/eclairjs.sh examples/ml/logistic_regression_summary_example.js"
 */


function run(spark) {
    var functions = require('eclairjs/sql/functions');
    var LogisticRegression = require("eclairjs/ml/classification/LogisticRegression");
    //var Vectors = require("eclairjs/mllib/linalg/Vectors");

    // Load training data
    var training = spark.read().format("libsvm")
        .load("examples/data/mllib/sample_libsvm_data.txt");

    var lr = new LogisticRegression()
        .setMaxIter(10)
        .setRegParam(0.3)
        .setElasticNetParam(0.8);

    // Fit the model
    var lrModel = lr.fit(training);

    // Extract the summary from the returned LogisticRegressionModel instance trained in the earlier
    // example
    var binarySummary = lrModel.summary();

    var ret = {};
    // Obtain the loss per iteration.
    ret.objectiveHistory = binarySummary.objectiveHistory();


    // Obtain the receiver-operating characteristic as a dataframe and areaUnderROC.
    ret.roc = binarySummary.roc();
    ret.areaUnderROC = binarySummary.areaUnderROC();

    // Get the threshold corresponding to the maximum F-Measure and rerun LogisticRegression with
    // this selected threshold.
    var fMeasure = binarySummary.fMeasureByThreshold();
    var maxFMeasure = fMeasure.select(functions.max("F-Measure")).head().getDouble(0);
    var bestThreshold = fMeasure.where(fMeasure.col("F-Measure").equalTo(maxFMeasure))
        .select("threshold").head().getDouble(0);
    lrModel.setThreshold(bestThreshold);

    return ret;

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript LogisticRegressionSummary Example")
            .getOrCreate();
    var result = run(spark);
    result.objectiveHistory.forEach(function (lossPerIteration) {
        print(lossPerIteration);
    });
    result.roc.show();
    result.roc.select("FPR").show();
    print(result.areaUnderROC);

    spark.stop();
}
