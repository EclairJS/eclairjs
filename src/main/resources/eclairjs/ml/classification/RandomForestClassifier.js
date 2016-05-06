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

    var ProbabilisticClassifier = require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassifier');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * {@link http://en.wikipedia.org/wiki/Random_forest  Random Forest} learning algorithm for
     * classification.
     * It supports both binary and multiclass labels, as well as both continuous and categorical
     * features.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassifier
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    var RandomForestClassifier = function (uid) {
        this.logger = Logger.getLogger("ml_classification_RandomForestClassifier_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.classification.RandomForestClassifier) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.classification.RandomForestClassifier(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.classification.RandomForestClassifier();
        }
        ProbabilisticClassifier.call(this, jvmObject);

    };

    RandomForestClassifier.prototype = Object.create(ProbabilisticClassifier.prototype);

    RandomForestClassifier.prototype.constructor = RandomForestClassifier;


    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    RandomForestClassifier.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMaxDepth = function (value) {
        var javaObject = this.getJavaObject().setMaxDepth(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMaxBins = function (value) {
        var javaObject = this.getJavaObject().setMaxBins(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMinInstancesPerNode = function (value) {
        var javaObject = this.getJavaObject().setMinInstancesPerNode(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMinInfoGain = function (value) {
        var javaObject = this.getJavaObject().setMinInfoGain(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMaxMemoryInMB = function (value) {
        var javaObject = this.getJavaObject().setMaxMemoryInMB(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setCacheNodeIds = function (value) {
        var javaObject = this.getJavaObject().setCacheNodeIds(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setCheckpointInterval = function (value) {
        var javaObject = this.getJavaObject().setCheckpointInterval(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setImpurity = function (value) {
        var javaObject = this.getJavaObject().setImpurity(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setSubsamplingRate = function (value) {
        var javaObject = this.getJavaObject().setSubsamplingRate(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setNumTrees = function (value) {
        var javaObject = this.getJavaObject().setNumTrees(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setFeatureSubsetStrategy = function (value) {
        var javaObject = this.getJavaObject().setFeatureSubsetStrategy(value);
        return new RandomForestClassifier(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new RandomForestClassifier(javaObject);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    RandomForestClassifier.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassifier.prototype.rawPredictionCol = function () {
        var javaObject = this.getJavaObject().rawPredictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassifier.prototype.getRawPredictionCol = function () {
        return this.getJavaObject().getRawPredictionCol();
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassifier.prototype.labelCol = function () {
        var javaObject = this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassifier.prototype.getLabelCol = function () {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassifier.prototype.featuresCol = function () {
        var javaObject = this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassifier.prototype.getFeaturesCol = function () {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassifier.prototype.predictionCol = function () {
        var javaObject = this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassifier.prototype.getPredictionCol = function () {
        return this.getJavaObject().getPredictionCol();
    };

    /*
     static methods

     */

    /**
     * Accessor for supported impurity settings: entropy, gini
     * @returns {string[]}
     */
    RandomForestClassifier.supportedImpurities = function () {
        var javaObject = org.apache.spark.ml.classification.RandomForestClassifier.supportedImpurities();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Accessor for supported featureSubsetStrategy settings: auto, all, onethird, sqrt, log2
     * @returns {string[]}
     */
    RandomForestClassifier.supportedFeatureSubsetStrategies = function () {
        var javaObject = org.apache.spark.ml.classification.RandomForestClassifier.supportedFeatureSubsetStrategies();
        return Utils.javaToJs(javaObject);
    };

    module.exports = RandomForestClassifier;
})();