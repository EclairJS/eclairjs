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



var RegressionMetrics = function(rdd) {
    var javaRdd = rdd.getJavaObject();
    JavaWrapper.call(this,
                     new org.apache.spark.mllib.evaluation.RegressionMetrics(javaRdd.rdd()));
};

RegressionMetrics.prototype = Object.create(JavaWrapper.prototype); 

/**
 * Returns the mean squared error, which is a risk function corresponding to the
 * expected value of the squared error loss or quadratic loss.
 */
RegressionMetrics.prototype.meanSquaredError = function() {
    return this.getJavaObject().meanSquaredError();
};

/**
 * Returns the root mean squared error, which is defined as the square root of
 * the mean squared error.
 */
RegressionMetrics.prototype.rootMeanSquaredError = function() {
    return this.getJavaObject().rootMeanSquaredError();
};

/**
 * Returns R^2^, the unadjusted coefficient of determination.
 * @see [[http://en.wikipedia.org/wiki/Coefficient_of_determination]]
 * In case of regression through the origin, the definition of R^2^ is to be modified.
 * @see J. G. Eisenhauer, Regression through the Origin. Teaching Statistics 25, 76-80 (2003)
 * [[https://online.stat.psu.edu/~ajw13/stat501/SpecialTopics/Reg_thru_origin.pdf]]
 */
RegressionMetrics.prototype.r2 = function() {
    return this.getJavaObject().r2();
};

/**
 * Returns the mean absolute error, which is a risk function corresponding to the
 * expected value of the absolute error loss or l1-norm loss.
 */
RegressionMetrics.prototype.meanAbsoluteError = function() {
    return this.getJavaObject().meanAbsoluteError();
};

/**
 * Returns the variance explained by regression.
 * explainedVariance = \sum_i (\hat{y_i} - \bar{y})^2 / n
 * @see [[https://en.wikipedia.org/wiki/Fraction_of_variance_unexplained]]
 */
RegressionMetrics.prototype.explainedVariance = function() {
    return this.getJavaObject().explainedVariance();
};

/**
 * Evaluator for ranking algorithms.
 */
var RankingMetrics = function(jvmObj) {
    JavaWrapper.call(this, jvmObj);
};

RankingMetrics.prototype = Object.create(JavaWrapper.prototype); 

RankingMetrics.prototype.constructor = RankingMetrics;

RankingMetrics.prototype.precisionAt = function(k) {
    return this.getJavaObject().precisionAt(k);
};

RankingMetrics.prototype.ndcgAt = function(k) {
    return this.getJavaObject().ndcgAt(k);
};

RankingMetrics.prototype.meanAveragePrecision = function() {
    return this.getJavaObject().meanAveragePrecision();
};

RankingMetrics.of = function(predictionAndLabels) {
    var rm = org.apache.spark.mllib.evaluation.RankingMetrics.of(predictionAndLabels.getJavaObject());
    return new RankingMetrics(rm);
};
