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
     * Naive Bayes Classifiers.
     * It supports both Multinomial NB
     * {@link http://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html}
     * which can handle finitely supported discrete data. For example, by converting documents into
     * TF-IDF vectors, it can be used for document classification. By making every vector a
     * binary (0/1) data, it can also be used as Bernoulli NB
     * {@link http://nlp.stanford.edu/IR-book/html/htmledition/the-bernoulli-model-1.html}.
     * The input feature values must be nonnegative.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassifier
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    var NaiveBayes = function (uid) {
        this.logger = Logger.getLogger("ml_classification_NaiveBayes_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.classification.NaiveBayes) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.classification.NaiveBayes(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.classification.NaiveBayes();
        }
        ProbabilisticClassifier.call(this, jvmObject);

    };

    NaiveBayes.prototype = Object.create(ProbabilisticClassifier.prototype);

    NaiveBayes.prototype.constructor = NaiveBayes;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    NaiveBayes.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * Set the smoothing parameter.
     * Default is 1.0.
     * @param {float} value
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.setSmoothing = function (value) {
        var javaObject = this.getJavaObject().setSmoothing(value);
        return new NaiveBayes(javaObject);
    };


    /**
     * Set the model type using a string (case-sensitive).
     * Supported options: "multinomial" and "bernoulli".
     * Default is "multinomial"
     * @param {string} value
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.setModelType = function (value) {
        var javaObject = this.getJavaObject().setModelType(value);
        return new NaiveBayes(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new NaiveBayes(javaObject);
    };

    /**
     * The smoothing parameter. (default = 1.0).
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    NaiveBayes.prototype.smoothing = function () {
        var javaObject = this.getJavaObject().smoothing();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {double}
     */
    NaiveBayes.prototype.getSmoothing = function () {
        return this.getJavaObject().getSmoothing();
    };

    /**
     * The model type which is a string (case-sensitive). Supported options: "multinomial" and "bernoulli". (default = multinomial)
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayes.prototype.modelType = function () {
        var javaObject = this.getJavaObject().modelType();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {string}
     */
    NaiveBayes.prototype.getModelType = function () {
        return this.getJavaObject().getModelType();
    };

    /**
     *
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    NaiveBayes.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    NaiveBayes.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayes.prototype.labelCol = function () {
        var javaObject = this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    NaiveBayes.prototype.getLabelCol = function () {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayes.prototype.featuresCol = function () {
        var javaObject = this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    NaiveBayes.prototype.getFeaturesCol = function () {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayes.prototype.predictionCol = function () {
        var javaObject = this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    NaiveBayes.prototype.getPredictionCol = function () {
        return this.getJavaObject().getPredictionCol();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.load = function (path) {
        var javaObject = org.apache.spark.ml.classification.NaiveBayes.load(path);
        return new NaiveBayes(javaObject);
    };

    module.exports = NaiveBayes;
})();