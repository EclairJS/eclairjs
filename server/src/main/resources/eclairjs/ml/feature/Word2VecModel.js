/*
 * Copyright 2015 IBM Corp.
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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * Model fitted by {@link module:eclairjs/ml/feature.Word2Vec}.
     * @classdesc
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml/feature
     */


    Word2VecModel = function (jvmObject) {

        this.logger = Logger.getLogger("Word2VecModel_js");
        Model.call(this, jvmObject);

    };

    Word2VecModel.prototype = Object.create(Model.prototype);

    Word2VecModel.prototype.constructor = Word2VecModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Word2VecModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * Returns a Dataset with two fields, "word" and "vector", with "word" being a String and and the vector the DenseVector that it is mapped to.
     * @returns {module:eclairjs/sql.Dataset}
     */
    Word2VecModel.prototype.getVectors = function () {
        return Utils.javaToJs(this.getJavaObject().getVectors());
    };


    /**
     * Find "num" number of words closest in similarity to the given word or vector representation.
     * Returns a Dataset with the words and the cosine similarities between the
     * synonyms and the given word.
     * @param {string | module:eclairjs/mllib/linalg.Vector}
     * @param {integer}
     * @returns {module:eclairjs/sql.Dataset}
     *
     */
    Word2VecModel.prototype.findSynonyms = function (word, num) {
        return Utils.javaToJs(this.getJavaObject().findSynonyms(Utils.unwrapObject(word), num));
    };

    /**
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2VecModel.prototype.setInputCol = function (value) {
        return Utils.javaToJs(this.getJavaObject().setInputCol(value));
    };

    /**
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2VecModel.prototype.setOutputCol = function (value) {
        return Utils.javaToJs(this.getJavaObject().setOutputCol(value));
    };

    /**
     * Transform a sentence column to a vector column to represent the whole sentence. The transform
     * is performed by averaging all word vectors it contains.
     * @param {module:eclairjs/sql.Dataset}
     * @returns {module:eclairjs/sql.Dataset}
     *
     */
    Word2VecModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return Utils.javaToJs(this.getJavaObject().transform(dataset_uw));
    }


    /**
     * Derives the output schema from the input schema.
     * @param {module:eclairjs/sql/types.StructType}
     * @returns {module:eclairjs/sql/types.StructType}
     *
     */
    Word2VecModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        return this.getJavaObject().transformSchema(schema_uw);
    }


    /**
     * Creates a copy of this instance with the same UID and some extra params. Subclasses should implement this method and set the return type properly.
     * @param {module:eclairjs/ml/param.ParamMap}
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     *
     */
    Word2VecModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        return this.getJavaObject().copy(extra_uw);
    };


    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     *
     */
    Word2VecModel.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    /**
     * The dimension of the code that you want to transform from words. Default: 100
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2VecModel.prototype.vectorSize = function () {
        return Utils.javaToJs(this.getJavaObject().vectorSize());
    };

    /**
     *
     * @returns {integer}
     */
    Word2VecModel.prototype.getVectorSize = function () {
        return this.getJavaObject().getVectorSize();
    };

    /**
     * The window size (context words from [-window, window]) default 5.
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2VecModel.prototype.windowSize = function () {
        return Utils.javaToJs(this.getJavaObject().windowSize());
    };

    /**
     *
     * @returns {integer}
     */
    Word2VecModel.prototype.getWindowSize = function () {
        return this.getJavaObject().getWindowSize();
    };

    /**
     * Number of partitions for sentences of words. Default: 1
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2VecModel.prototype.numPartitions = function () {
        return Utils.javaToJs(this.getJavaObject().numPartitions());
    };

    /**
     *
     * @returns {integer}
     */
    Word2VecModel.prototype.getNumPartitions = function () {
        return this.getJavaObject().getNumPartitions();
    };

    /**
     * The minimum number of times a token must appear to be included in the word2vec model's vocabulary. Default: 5
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2VecModel.prototype.minCount = function () {
        return Utils.javaToJs(this.getJavaObject().minCount());
    };

    /**
     *
     * @returns {integer}
     */
    Word2VecModel.prototype.getMinCount = function () {
        return this.getJavaObject().getMinCount();
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Word2VecModel.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    Word2VecModel.prototype.inputCol = function () {
        var javaObject = this.getJavaObject().inputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    Word2VecModel.prototype.getInputCol = function () {
        return this.getJavaObject().getInputCol();
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    Word2VecModel.prototype.outputCol = function () {
        var javaObject = this.getJavaObject().outputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    Word2VecModel.prototype.getOutputCol = function () {
        return this.getJavaObject().getOutputCol();
    };

    /**
     * Param for maximum number of iterations (>= 0).
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2VecModel.prototype.maxIter = function () {
        var javaObject = this.getJavaObject().maxIter();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    Word2VecModel.prototype.getMaxIter = function () {
        return this.getJavaObject().getMaxIter();
    };

    /**
     * Param for Step size to be used for each iteration of optimization
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    Word2VecModel.prototype.stepSize = function () {
        var javaObject = this.getJavaObject().stepSize();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    Word2VecModel.prototype.getStepSize = function () {
        return this.getJavaObject().getStepSize();
    };

    /**
     * Param for random seed.
     * @returns {module:eclairjs/ml/param.LongParam}
     */
    Word2VecModel.prototype.seed = function () {
        var javaObject = this.getJavaObject().seed();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    Word2VecModel.prototype.getSeed = function () {
        return this.getJavaObject().getSeed();
    };

//
// static methods
//


    /**
     * @param {string}
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     *  @private
     *
     */
    Word2Vec.load = function (path) {
        throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.Word2Vec.load(path);
    }


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     *
     */
    Word2VecModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.feature.Word2Vec.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    }


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     *
     */
    Word2VecModel.load = function (path) {
        return new Word2VecModel(org.apache.spark.ml.feature.Word2VecModel.load(path));
    }

    module.exports = Word2VecModel;

})();
