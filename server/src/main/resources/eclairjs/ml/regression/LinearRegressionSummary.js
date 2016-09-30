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

(function () {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Linear regression results evaluated on a dataset.
     * @class
     * @memberof module:eclairjs/ml/regression
     */


    var LinearRegressionSummary = function (jvmObject) {

        this.logger = Logger.getLogger("ml_regression_LinearRegressionSummary_js");
        JavaWrapper.call(this, jvmObject);

    };

    LinearRegressionSummary.prototype = Object.create(JavaWrapper.prototype);

    LinearRegressionSummary.prototype.constructor = LinearRegressionSummary;

    /**
     *
     * @returns {module:eclairjs/sql.DataFrame}
     */
    LinearRegressionSummary.prototype.predictions = function () {
        return Utils.javaToJs(this.getJavaObject().predictions());
    };

    /**
     *
     * @returns {string}
     */
    LinearRegressionSummary.prototype.predictionCol = function () {
        return this.getJavaObject().predictionCol();
    };

    /**
     *
     * @returns {string}
     */
    LinearRegressionSummary.prototype.labelCol = function () {
        return this.getJavaObject().labelCol();
    };

    /**
     *
     * @returns {module:eclairjs/ml/regression.LinearRegressionModel}
     */
    LinearRegressionSummary.prototype.model = function () {
        return Utils.javaToJs(this.getJavaObject().model());
    };

    /**
     *
     * @returns {float}
     */
    LinearRegressionSummary.prototype.explainedVariance = function () {
        return this.getJavaObject().explainedVariance();
    };

    /**
     * Returns the mean absolute error, which is a risk function corresponding to the expected value of the absolute error loss or l1-norm loss.
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {float}
     */
    LinearRegressionSummary.prototype.meanAbsoluteError = function () {
        return this.getJavaObject().meanAbsoluteError();
    };

    /**
     * Returns the mean squared error, which is a risk function corresponding to the expected value of the squared error loss or quadratic loss.
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {float}
     */
    LinearRegressionSummary.prototype.meanSquaredError = function () {
        return this.getJavaObject().meanSquaredError();
    };

    /**
     * Returns the root mean squared error, which is defined as the square root of the mean squared error.
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {float}
     */
    LinearRegressionSummary.prototype.rootMeanSquaredError = function () {
        return this.getJavaObject().rootMeanSquaredError();
    };

    /**
     * Returns R^2^, the coefficient of determination. Reference: http://en.wikipedia.org/wiki/Coefficient_of_determination
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {float}
     */
    LinearRegressionSummary.prototype.r2 = function () {
        return this.getJavaObject().r2();
    };

    /**
     * Residuals (label - predicted value)
     * @returns {module:eclairjs/sql.DataFrame}
     */
    LinearRegressionSummary.prototype.residuals = function () {
        return Utils.javaToJs(this.getJavaObject().residuals());
    };

    /**
     * Number of instances in DataFrame predictions
     * @returns {integer}
     */
    LinearRegressionSummary.prototype.numInstances = function () {
        return this.getJavaObject().numInstances();
    };

    /**
     * The weighted residuals, the usual residuals rescaled by the square root of the instance weights.
     * @returns {float[]}
     */
    LinearRegressionSummary.prototype.devianceResiduals = function () {
        return Utils.javaToJs(this.getJavaObject().devianceResiduals());
    };

    /**
     * Standard error of estimated coefficients and intercept.
     * @returns {float[]}
     */
    LinearRegressionSummary.prototype.coefficientStandardErrors = function () {
        return Utils.javaToJs(this.getJavaObject().coefficientStandardErrors());
    };

    /**
     * T-statistic of estimated coefficients and intercept.
     * @returns {float[]}
     */
    LinearRegressionSummary.prototype.tValues = function () {
        return Utils.javaToJs(this.getJavaObject().tValues());
    };

    /**
     * Two-sided p-value of estimated coefficients and intercept.
     * @returns {float[]}
     */
    LinearRegressionSummary.prototype.pValues = function () {
        return Utils.javaToJs(this.getJavaObject().pValues());
    };

    module.exports = LinearRegressionSummary;
})();