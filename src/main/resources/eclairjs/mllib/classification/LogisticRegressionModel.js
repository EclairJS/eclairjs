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

    var GeneralizedLinearModel = require(EclairJS_Globals.NAMESPACE + '/mllib/regression/GeneralizedLinearModel');
    //var Vector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vector');

    /**
     * Classification model trained using Multinomial/Binary Logistic Regression.
     *
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     *
     * @param {Vector} weights Weights computed for every feature.
     * @param {float} intercept Intercept computed for this model. (Only used in Binary Logistic Regression.
     * In Multinomial Logistic Regression, the intercepts will not be a single value,
     * so the intercepts will be part of the weights.)
     * @param {int} [numFeatures] the dimension of the features.
     * @param {int} [numClasses] the number of possible outcomes for k classes classification problem in
     * Multinomial Logistic Regression. By default, it is binary logistic regression
     * so numClasses will be set to 2.
     * @class
     * @extends GeneralizedLinearModel
     */
    var LogisticRegressionModel = function (weights, intercept, numFeatures, numClasses) {
        this.logger = Logger.getLogger("LogisticRegressionModel_js");
        var weights_uw = Utils.unwrapObject(weights)
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.classification.LogisticRegressionModel) {
            jvmObject = arguments[0];
        } else if (arguments.length === 4) {
            jvmObject = new org.apache.spark.mllib.classification.LogisticRegressionModel(weights_uw, intercept, numFeatures, numClasses);
        } else if (arguments.length === 2) {
            jvmObject = new org.apache.spark.mllib.classification.LogisticRegressionModel(weights_uw, intercept);
        } else {
            throw "LogisticRegressionModel constructor invalid arguments"
        }


        GeneralizedLinearModel.call(this, jvmObject);

    };

    LogisticRegressionModel.prototype = Object.create(GeneralizedLinearModel.prototype);

    LogisticRegressionModel.prototype.constructor = LogisticRegressionModel;


    /**
     * Sets the threshold that separates positive predictions from negative predictions
     * in Binary Logistic Regression. An example with prediction score greater than or equal to
     * this threshold is identified as an positive, and negative otherwise. The default value is 0.5.
     * It is only used for binary classification.
     * @param {number} threshold
     * @returns {}
     */
    LogisticRegressionModel.prototype.setThreshold = function (threshold) {
        throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setThreshold(threshold);
    //   return new (javaObject);
    };


    /**
     * Returns the threshold (if any) used for converting raw prediction scores into 0/1 predictions.
     * It is only used for binary classification.
     * @returns {number}
     */
    LogisticRegressionModel.prototype.getThreshold = function () {
        throw "not implemented by ElairJS";
    //   return  this.getJavaObject().getThreshold();
    };


    /**
     * Clears the threshold so that `predict` will output raw prediction scores.
     * It is only used for binary classification.
     * @returns {LogisticRegressionModel}
     */
    LogisticRegressionModel.prototype.clearThreshold = function () {
       var javaObject =  this.getJavaObject().clearThreshold();
       return new LogisticRegressionModel(javaObject);
    };


    /**
     * @param {SparkContext} sc
     * @param {string} path
     */
    LogisticRegressionModel.prototype.save = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(),path);
    };


    /**
     * @returns {string}
     */
    /*LogisticRegressionModel.prototype.toString = function () {
        throw "not implemented by ElairJS";
    //   return  this.getJavaObject().toString();
    };
    */
    /**
     * @returns {Vector}
     */
    LogisticRegressionModel.prototype.weights = function () {
       return  Serialize.javaToJs(this.getJavaObject().weights());
    };


    //
    // static methods
    //

    /**
     * @param {SparkContext} sc
     * @param {string} path
     * @returns {LogisticRegressionModel}
     */
    LogisticRegressionModel.load = function (sc, path) {
       var sc_uw = Utils.unwrapObject(sc);
       var javaObject =  org.apache.spark.mllib.classification.LogisticRegressionModel.load(sc_uw.sc(),path);
       return new LogisticRegressionModel(javaObject);
    };

    module.exports = LogisticRegressionModel;

})();
