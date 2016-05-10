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
     * :: Experimental ::
     * Converts a text document to a sparse vector of token counts.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string[]} vocabulary  An Array over terms. Only the terms in the vocabulary will be counted.
     * @param {string} [uid]
     */
    var CountVectorizerModel = function (vocabulary, uid) {
        this.logger = Logger.getLogger("ml.feature.CountVectorizerModel_js");
        var jvmObject;
        if (vocabulary instanceof org.apache.spark.ml.feature.CountVectorizerModel) {
            jvmObject = vocabulary;
        } else {
            if (uid) {
                jvmObject = new org.apache.spark.ml.feature.CountVectorizerModel(uid, vocabulary);
            } else {
                jvmObject = new org.apache.spark.ml.feature.CountVectorizerModel(vocabulary);
            }
        }

        // MLWritable.call(this, jvmObject);
        JavaWrapper.call(this, jvmObject);

    };

    //CountVectorizerModel.prototype = Object.create(MLWritable.prototype);
    CountVectorizerModel.prototype = Object.create(JavaWrapper.prototype);
    CountVectorizerModel.prototype.constructor = CountVectorizerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    CountVectorizerModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {string[]}
     */
    CountVectorizerModel.prototype.vocabulary = function () {
        return this.getJavaObject().vocabulary();
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new CountVectorizerModel(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new CountVectorizerModel(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.setMinTF = function (value) {
        var javaObject = this.getJavaObject().setMinTF(value);
        return new CountVectorizerModel(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    CountVectorizerModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    CountVectorizerModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new CountVectorizerModel(javaObject);
    };


    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    CountVectorizerModel.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    /**
     * Max size of the vocabulary. CountVectorizer will build a vocabulary that only considers the top vocabSize
     * terms ordered by term frequency across the corpus.
     * Default: 2^18^
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    CountVectorizerModel.prototype.vocabSize = function () {
        var javaObject = this.getJavaObject().vocabSize();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {integer}
     */
    CountVectorizerModel.prototype.getVocabSize = function () {
        return this.getJavaObject().getVocabSize();
    };

    /**
     * Specifies the minimum number of different documents a term must appear in to be included in the vocabulary.
     * If this is an integer >= 1, this specifies the number of documents the term must appear in;
     * if this is a double in [0,1), then this specifies the fraction of documents.
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    CountVectorizerModel.prototype.minDF = function () {
        var javaObject = this.getJavaObject().minDF();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {float}
     */
    CountVectorizerModel.prototype.getMinDF = function () {
        return this.getJavaObject().getMinDF();
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    CountVectorizerModel.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {float}
     */
    CountVectorizerModel.prototype.getMinTF = function () {
        return this.getJavaObject().getMinTF();
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    CountVectorizerModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.feature.CountVectorizerModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.CountVectorizerModel.load(path);
        return new CountVectorizerModel(javaObject);
    };

    module.exports = CountVectorizerModel;
})();