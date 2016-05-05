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

    var ProbabilisticClassificationModel = require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassificationModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Model produced by {@link module:eclairjs/ml/classification.NaiveBayes}
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.ProbabilisticClassificationModel
     */


    var NaiveBayesModel = function (jvmObject) {

        this.logger = Logger.getLogger("ml_classification_NaiveBayesModel_js");
        ProbabilisticClassificationModel.call(this, jvmObject);

    };

    NaiveBayesModel.prototype = Object.create(ProbabilisticClassificationModel.prototype);

    NaiveBayesModel.prototype.constructor = NaiveBayesModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    NaiveBayesModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    NaiveBayesModel.prototype.pi = function () {
        return Utils.javaToJs(this.getJavaObject().pi());
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    NaiveBayesModel.prototype.theta = function () {
        return Utils.javaToJs(this.getJavaObject().theta());
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayesModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new NaiveBayesModel(javaObject);
    };


    /**
     * @returns {string}
     */
    NaiveBayesModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };


    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    NaiveBayesModel.prototype.write = function () {
        var javaObject = this.getJavaObject().write();
        return Utils.javaToJs(javaObject);
    };

    /**
     * The smoothing parameter. (default = 1.0).
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    NaiveBayesModel.prototype.smoothing = function () {
        var javaObject = this.getJavaObject().smoothing();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {double}
     */
    NaiveBayesModel.prototype.getSmoothing = function () {
        return this.getJavaObject().getSmoothing();
    };

    /**
     * The model type which is a string (case-sensitive). Supported options: "multinomial" and "bernoulli". (default = multinomial)
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayesModel.prototype.modelType = function () {
        var javaObject = this.getJavaObject().modelType();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {string}
     */
    NaiveBayesModel.prototype.getModelType = function () {
        return this.getJavaObject().getModelType();
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    NaiveBayesModel.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayesModel.prototype.rawPredictionCol = function () {
        var javaObject = this.getJavaObject().rawPredictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {string}
     */
    NaiveBayesModel.prototype.getRawPredictionCol = function () {
        return this.getJavaObject().getRawPredictionCol();
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    NaiveBayesModel.read = function () {
        var javaObject = org.apache.spark.ml.classification.NaiveBayesModel.read();
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayesModel.load = function (path) {
        var javaObject = org.apache.spark.ml.classification.NaiveBayesModel.load(path);
        return new NaiveBayesModel(javaObject);
    };

    module.exports = NaiveBayesModel;
})();