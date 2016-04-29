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
     * learning algorithm for classification.
     * It supports binary labels, as well as both continuous and categorical features.
     * Note: Multiclass labels are not currently supported.
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    var GBTClassifier = function (uid) {
        this.logger = Logger.getLogger("ml_classification_GBTClassifier_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.classification.GBTClassifier) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.classification.GBTClassifier(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.classification.GBTClassifier();
        }
        Predictor.call(this, jvmObject);

    };

    GBTClassifier.prototype = Object.create(Predictor.prototype);

    GBTClassifier.prototype.constructor = GBTClassifier;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    GBTClassifier.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxDepth = function (value) {
        var javaObject = this.getJavaObject().setMaxDepth(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxBins = function (value) {
        var javaObject = this.getJavaObject().setMaxBins(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMinInstancesPerNode = function (value) {
        var javaObject = this.getJavaObject().setMinInstancesPerNode(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMinInfoGain = function (value) {
        var javaObject = this.getJavaObject().setMinInfoGain(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxMemoryInMB = function (value) {
        var javaObject = this.getJavaObject().setMaxMemoryInMB(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setCacheNodeIds = function (value) {
        var javaObject = this.getJavaObject().setCacheNodeIds(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setCheckpointInterval = function (value) {
        var javaObject = this.getJavaObject().setCheckpointInterval(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * The impurity setting is ignored for GBT models.
     * Individual trees are built using impurity "Variance."
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setImpurity = function (value) {
        var javaObject = this.getJavaObject().setImpurity(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setSubsamplingRate = function (value) {
        var javaObject = this.getJavaObject().setSubsamplingRate(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxIter = function (value) {
        var javaObject = this.getJavaObject().setMaxIter(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setStepSize = function (value) {
        var javaObject = this.getJavaObject().setStepSize(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setLossType = function (value) {
        var javaObject = this.getJavaObject().setLossType(value);
        return new GBTClassifier(javaObject);
    };


    /**
     * @returns {string}
     */
    GBTClassifier.prototype.getLossType = function () {
        return this.getJavaObject().getLossType();
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new GBTClassifier(javaObject);
    };

    /*
     Static methods
     */

    /**
     * Accessor for supported loss settings: logistic
     * @returns {string[]}
     */
    GBTClassifier.supportedLossTypes = function () {
        return org.apache.spark.ml.classification.GBTClassifier.supportedLossTypes();
    };

    module.exports = GBTClassifier;
})();