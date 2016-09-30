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

    var Predictor = require(EclairJS_Globals.NAMESPACE + '/ml/Predictor');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * [Gradient-Boosted Trees (GBTs)]{@link http://en.wikipedia.org/wiki/Gradient_boosting}
     * learning algorithm for regression.
     * It supports both continuous and categorical features.
     *
     * The implementation is based upon: J.H. Friedman. "Stochastic Gradient Boosting." 1999.
     *
     * Notes on Gradient Boosting vs. TreeBoost:
     *  - This implementation is for Stochastic Gradient Boosting, not for TreeBoost.
     *  - Both algorithms learn tree ensembles by minimizing loss functions.
     *  - TreeBoost (Friedman, 1999) additionally modifies the outputs at tree leaf nodes
     *    based on the loss function, whereas the original gradient boosting method does not.
     *     - When the loss is SquaredError, these methods give the same result, but they could differ
     *       for other loss functions.
     *  - We expect to implement TreeBoost in the future:
     *    [https://issues.apache.org/jira/browse/SPARK-4240]
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/regression
     * @param {string} [uid]
     */
    var GBTRegressor = function (uid) {
        this.logger = Logger.getLogger("ml_regression_GBTRegressor_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.regression.GBTRegressor) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.regression.GBTRegressor(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.regression.GBTRegressor();
        }
        Predictor.call(this, jvmObject);

    };

    GBTRegressor.prototype = Object.create(Predictor.prototype);

    GBTRegressor.prototype.constructor = GBTRegressor;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    GBTRegressor.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setMaxDepth = function (value) {
        var javaObject = this.getJavaObject().setMaxDepth(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setMaxBins = function (value) {
        var javaObject = this.getJavaObject().setMaxBins(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setMinInstancesPerNode = function (value) {
        var javaObject = this.getJavaObject().setMinInstancesPerNode(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setMinInfoGain = function (value) {
        var javaObject = this.getJavaObject().setMinInfoGain(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setMaxMemoryInMB = function (value) {
        var javaObject = this.getJavaObject().setMaxMemoryInMB(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setCacheNodeIds = function (value) {
        var javaObject = this.getJavaObject().setCacheNodeIds(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setCheckpointInterval = function (value) {
        var javaObject = this.getJavaObject().setCheckpointInterval(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * The impurity setting is ignored for GBT models.
     * Individual trees are built using impurity "Variance."
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setImpurity = function (value) {
        var javaObject = this.getJavaObject().setImpurity(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setSubsamplingRate = function (value) {
        var javaObject = this.getJavaObject().setSubsamplingRate(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setMaxIter = function (value) {
        var javaObject = this.getJavaObject().setMaxIter(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setStepSize = function (value) {
        var javaObject = this.getJavaObject().setStepSize(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.setLossType = function (value) {
        var javaObject = this.getJavaObject().setLossType(value);
        return new GBTRegressor(javaObject);
    };


    /**
     * @returns {string}
     */
    GBTRegressor.prototype.getLossType = function () {
        return this.getJavaObject().getLossType();
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     */
    GBTRegressor.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new GBTRegressor(javaObject);
    };

    /*
     Static methods
     */

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.GBTRegressor}
     * @function
     * @name module:eclairjs/ml/regression.GBTRegressor#load
     * @static
     */
     GBTRegressor.load = function(path) {
        var javaObject =  org.apache.spark.ml.regression.GBTRegressor.load(path);
        return new GBTRegressor(javaObject);
     };


    module.exports = GBTRegressor;
})();