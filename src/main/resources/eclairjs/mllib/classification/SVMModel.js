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

    var ClassificationModel = require(EclairJS_Globals.NAMESPACE + '/mllib/classification/ClassificationModel');
    //var Vector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vector');

    /**
     * Model for Support Vector Machines (SVMs).
     *
     * @param weights Weights computed for every feature.
     * @param intercept Intercept computed for this model.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     * @param {Vector} weights
     * @param {float} intercept
     * @class
     */
    var SVMModel = function (weights, intercept) {
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.classification.SVMModel) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.classification.SVMModel(Utils.unwrapObject(weights), intercept);
        }

        this.logger = Logger.getLogger("SVMModel_js");
        ClassificationModel.call(this, jvmObject);

    };

    SVMModel.prototype = Object.create(ClassificationModel.prototype);

    SVMModel.prototype.constructor = SVMModel;


    /**
     * Sets the threshold that separates positive predictions from negative predictions. An example
     * with prediction score greater than or equal to this threshold is identified as an positive,
     * and negative otherwise. The default value is 0.0.
     * @param {float} threshold
     * @returns {}
     */
    SVMModel.prototype.setThreshold = function (threshold) {
       var javaObject =  this.getJavaObject().setThreshold(threshold);
       return new (javaObject);
    };


    /**
     * Returns the threshold (if any) used for converting raw prediction scores into 0/1 predictions.
     * @returns {number}
     */
    SVMModel.prototype.getThreshold = function () {
       return  this.getJavaObject().getThreshold();
    };


    /**
     * Clears the threshold so that `predict` will output raw prediction scores.
     * @returns {SVMModel}
     */
    SVMModel.prototype.clearThreshold = function () {
       var javaObject =  this.getJavaObject().clearThreshold();
       return new SVMModel(javaObject);
    };

    /**
     * @returns {Vector}
     */
    SVMModel.prototype.weights = function () {
        var javaObject =  this.getJavaObject().weights();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    SVMModel.prototype.intercept = function () {
        return this.getJavaObject().intercept();
    };

    /**
     * @param {SparkContext} sc
     * @param {string} path
     */
    SVMModel.prototype.save = function (sc, path) {
       var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(),path);
    };


    /**
     * @returns {string}
     */
    SVMModel.prototype.toString = function () {
       return  this.getJavaObject().toString();
    };


    //
    // static methods
    //

    /**
     * @param {SparkContext} sc
     * @param {string} path
     * @returns {SVMModel}
     */
    SVMModel.load = function (sc, path) {
       var sc_uw = Utils.unwrapObject(sc);
       var javaObject =  org.apache.spark.mllib.classification.SVMModel.load(sc_uw.sc(),path);
       return new SVMModel(javaObject);
    };

    module.exports = SVMModel;

})();
