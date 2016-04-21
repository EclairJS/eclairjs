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
     * Regression model for isotonic regression.
     *
     * @param boundaries Array of boundaries for which predictions are known.
     *                   Boundaries must be sorted in increasing order.
     * @param predictions Array of predictions associated to the boundaries at the same index.
     *                    Results of isotonic regression and therefore monotone.
     * @param isotonic indicates whether this is isotonic or antitonic.
     *
     * @memberof module:eclairjs/mllib/regression
     * @classdesc
     */

    /**
     * @param {float[]} boundaries
     * @param {float[]} predictions
     * @param {boolean} isotonic
     *  @class
     */
    var IsotonicRegressionModel = function (boundaries, predictions, isotonic) {
        this.logger = Logger.getLogger("IsotonicRegressionModel_js");
        var jvmObject;
        if (boundaries instanceof org.apache.spark.mllib.regression.IsotonicRegressionModel) {
            jvmObject = boundaries;
        } else {
            jvmObject = new org.apache.spark.mllib.regression.IsotonicRegressionModel(boundaries, predictions, isotonic);
        }

        JavaWrapper.call(this, jvmObject);

    };

    IsotonicRegressionModel.prototype = Object.create(JavaWrapper.prototype);

    IsotonicRegressionModel.prototype.constructor = IsotonicRegressionModel;


    /**
     * Predict labels for provided features, or single label..
     * Using a piecewise linear function.
     *
     * @param {RDD | DoubleRDD | float} testData  Features to be labeled, if float.
     *          1) If testData exactly matches a boundary then associated prediction is returned.
     *           In case there are multiple predictions with the same boundary then one of them
     *           is returned. Which one is undefined (same as java.util.Arrays.binarySearch).
     *         2) If testData is lower or higher than all boundaries then first or last prediction
     *           is returned respectively. In case there are multiple predictions with the same
     *           boundary then the lowest or highest is returned respectively.
     *         3) If testData falls between two values in boundary array then prediction is treated
     *           as piecewise linear function and interpolated value is returned. In case there are
     *           multiple values with the same boundary then the same rules as in 2) are used.
     *
     * @returns {RDD | number}  Predicted labels or label.
     */
    IsotonicRegressionModel.prototype.predict = function (testData) {
        var testData_uw = Utils.unwrapObject(testData);
        var javaObject = this.getJavaObject().predict(testData_uw);

        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     */
    IsotonicRegressionModel.prototype.save = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(), path);
    };


    //
    // static methods
    //


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/regression.IsotonicRegressionModel}
     */
    IsotonicRegressionModel.load = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        var javaObject = org.apache.spark.mllib.regression.IsotonicRegressionModel.load(sc_uw.sc(), path);
        return Utils.javaToJs(javaObject);
    };

    module.exports = IsotonicRegressionModel;

})();

