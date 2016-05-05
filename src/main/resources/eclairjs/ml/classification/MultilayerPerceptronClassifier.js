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
     * Classifier trainer based on the Multilayer Perceptron.
     * Each layer has sigmoid activation function, output layer has softmax.
     * Number of inputs has to be equal to the size of feature vectors.
     * Number of outputs has to be equal to the total number of labels.
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    var MultilayerPerceptronClassifier = function (uid) {
        this.logger = Logger.getLogger("ml_classification_MultilayerPerceptronClassifier_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.classification.MultilayerPerceptronClassifier) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.classification.MultilayerPerceptronClassifier(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.classification.MultilayerPerceptronClassifier();
        }
        Predictor.call(this, jvmObject);

    };

    MultilayerPerceptronClassifier.prototype = Object.create(Predictor.prototype);

    MultilayerPerceptronClassifier.prototype.constructor = MultilayerPerceptronClassifier;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MultilayerPerceptronClassifier.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {integer[]} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setLayers = function (value) {
        var javaObject = this.getJavaObject().setLayers(value);
        return new MultilayerPerceptronClassifier(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setBlockSize = function (value) {
        var javaObject = this.getJavaObject().setBlockSize(value);
        return new MultilayerPerceptronClassifier(javaObject);
    };


    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setMaxIter = function (value) {
        var javaObject = this.getJavaObject().setMaxIter(value);
        return new MultilayerPerceptronClassifier(javaObject);
    };


    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-4.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setTol = function (value) {
        var javaObject = this.getJavaObject().setTol(value);
        return new MultilayerPerceptronClassifier(javaObject);
    };


    /**
     * Set the seed for weights initialization.
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return new MultilayerPerceptronClassifier(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new MultilayerPerceptronClassifier(javaObject);
    };

    /**
     * Layer sizes including input size and output size. Default: Array(1, 1)
     * @returns {module:eclairjs/ml/param.IntArrayParam}
     */
    MultilayerPerceptronClassifier.prototype.layers = function () {
        var javaObject = this.getJavaObject().layers();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {integer[]}
     */
    MultilayerPerceptronClassifier.prototype.getLayers = function () {
        var javaObject = this.getJavaObject().getLayers();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Block size for stacking input data in matrices to speed up the computation.
     * Data is stacked within partitions. If block size is more than remaining data in
     * a partition then it is adjusted to the size of this data. Recommended size is between 10 and 1000. Default: 128
     * @returns {module:eclairjs/ml/param.IntArrayParam}
     */
    MultilayerPerceptronClassifier.prototype.blockSize = function () {
        var javaObject = this.getJavaObject().blockSize();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {integer}
     */
    MultilayerPerceptronClassifier.prototype.getBlockSize = function () {
        return this.getJavaObject().getBlockSize();
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    MultilayerPerceptronClassifier.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassifier.prototype.labelCol = function () {
        var javaObject = this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    MultilayerPerceptronClassifier.prototype.getLabelCol = function () {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassifier.prototype.featuresCol = function () {
        var javaObject = this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    MultilayerPerceptronClassifier.prototype.getFeaturesCol = function () {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassifier.prototype.predictionCol = function () {
        var javaObject = this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    MultilayerPerceptronClassifier.prototype.getPredictionCol = function () {
        return this.getJavaObject().getPredictionCol();
    };

    module.exports = MultilayerPerceptronClassifier;
})();