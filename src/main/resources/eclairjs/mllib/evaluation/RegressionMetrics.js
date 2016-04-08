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



/**
 * Evaluator for regression.
 *
 * @param predictionAndObservations an RDD of (prediction, observation) pairs.
 * @classdesc
 * @param {RDD} predictionAndObservations
 *  @class
 */
var RegressionMetrics = function (predictionAndObservations) {
    this.logger = Logger.getLogger("RegressionMetrics_js");
    var jvmObject;
    if (predictionAndObservations instanceof org.apache.spark.mllib.evaluation.RegressionMetrics) {
        jvmObject = predictionAndObservations;
    } else {
        jvmObject = new org.apache.spark.mllib.evaluation.RegressionMetrics(Utils.unwrapObject(predictionAndObservations).rdd());
    }


    JavaWrapper.call(this, jvmObject);

};


RegressionMetrics.prototype = Object.create(JavaWrapper.prototype);

RegressionMetrics.prototype.constructor = RegressionMetrics;


/**
 * Returns the variance explained by regression.
 * explainedVariance = \sum_i (\hat{y_i} - \bar{y})^2 / n
 * @see [[https://en.wikipedia.org/wiki/Fraction_of_variance_unexplained]]
 * @returns {number}
 */
RegressionMetrics.prototype.explainedVariance = function () {
   return  this.getJavaObject().explainedVariance();
};


/**
 * Returns the mean absolute error, which is a risk function corresponding to the
 * expected value of the absolute error loss or l1-norm loss.
 * @returns {number}
 */
RegressionMetrics.prototype.meanAbsoluteError = function () {
   return  this.getJavaObject().meanAbsoluteError();
};


/**
 * Returns the mean squared error, which is a risk function corresponding to the
 * expected value of the squared error loss or quadratic loss.
 * @returns {number}
 */
RegressionMetrics.prototype.meanSquaredError = function () {
   return  this.getJavaObject().meanSquaredError();
};


/**
 * Returns the root mean squared error, which is defined as the square root of
 * the mean squared error.
 * @returns {number}
 */
RegressionMetrics.prototype.rootMeanSquaredError = function () {
    return  this.getJavaObject().rootMeanSquaredError();
};


/**
 * Returns R^2^, the unadjusted coefficient of determination.
 * @see [[http://en.wikipedia.org/wiki/Coefficient_of_determination]]
 * @returns {number}
 */
RegressionMetrics.prototype.r2 = function () {
   return  this.getJavaObject().r2();
};

