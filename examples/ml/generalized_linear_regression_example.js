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
 bin/eclairjs.sh examples/ml/generalized_linear_regression_example.js"
 */

function run(spark) {
    var GeneralizedLinearRegression = require("eclairjs/ml/regression/GeneralizedLinearRegression");
    //var Vectors = require("eclairjs/mllib/linalg/Vectors");

    // Load training data
    var dataset = spark.read().format("libsvm")
        .load("examples/data/mllib/sample_linear_regression_data.txt");

    var glr = new GeneralizedLinearRegression()
        .setFamily("gaussian")
        .setLink("identity")
        .setMaxIter(10)
        .setRegParam(0.3);

    // Fit the model
    var model = glr.fit(dataset);

    var ret = {};
    ret.coefficients = model.coefficients();
    ret.intercept = model.intercept();

    // Summarize the model over the training set and get some metrics to print out
    var summary = model.summary();

    ret.stderrs = summary.coefficientStandardErrors();
    ret.tvals = summary.tValues();
    ret.pvals = summary.pValues();
    ret.dispersion = summary.dispersion();
    ret.nullDeviance = summary.nullDeviance();
    ret.nullFreedom = summary.residualDegreeOfFreedomNull();
    ret.deviance = summary.deviance();
    ret.freedom = summary.residualDegreeOfFreedom();
    ret.aic = summary.aic();
    ret.residuals = summary.residuals();

    return ret;

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript GeneralizedLinearRegression Example")
            .getOrCreate();
    var result = run(spark);
    // Print the coefficients and intercept for logistic regression
    print("Coefficients: "
        + result.coefficients + " Intercept: " + result.intercept);
    print("Coefficient Standard Errors: " + result.stderrs);
    print("T Values: " + result.tvals);
    print("P Values: " + result.pvals);
    print("Dispersion: " + result.dispersion);
    print("Null Deviance: " + result.nullDeviance);
    print("Residual Degree Of Freedom Null: " + result.nullFreedom);
    print("Deviance: " + result.deviance);
    print("Residual Degree Of Freedom: " + result.freedom);
    print("AIC: " + result.aic);
    print("Deviance Residuals: ");
    result.residuals.show(5);

    spark.stop();
}
