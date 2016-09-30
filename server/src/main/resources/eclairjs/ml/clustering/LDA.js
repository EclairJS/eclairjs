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

    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     *
     * Latent Dirichlet Allocation (LDA), a topic model designed for text documents.
     *
     * Terminology:
     *  - "term" = "word": an element of the vocabulary
     *  - "token": instance of a term appearing in a document
     *  - "topic": multinomial distribution over terms representing some concept
     *  - "document": one piece of text, corresponding to one row in the input data
     *
     * References:
     *  - Original LDA paper (journal version):
     *    Blei, Ng, and Jordan.  "Latent Dirichlet Allocation."  JMLR, 2003.
     *
     * Input data (featuresCol):
     *  LDA is given a collection of documents as input data, via the featuresCol parameter.
     *  Each document is specified as a {@link Vector} of length vocabSize, where each entry is the
     *  count for the corresponding term (word) in the document.  Feature transformers such as
     *  [[org.apache.spark.ml.feature.Tokenizer]] and {@link CountVectorizer}
     *  can be useful for converting text to word count vectors.
     *
     * @see [Latent Dirichlet allocation(Wikipedia)]{@link http://en.wikipedia.org/wiki/Latent_Dirichlet_allocation}
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/clustering
     * @param {string} [uid]
     */
    var LDA = function (uid) {
        var jvmObject;
        this.logger = Logger.getLogger("ml_clusstering_LDA_js");
        if (uid) {
            if (uid instanceof org.apache.spark.ml.clustering.LDA) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.clustering.LDA(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.clustering.LDA();
        }
        Estimator.call(this, jvmObject);

    };

    LDA.prototype = Object.create(Estimator.prototype);

    LDA.prototype.constructor = LDA;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    LDA.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * The features for LDA should be a {@link Vector} representing the word counts in a document.
     * The vector should be of length vocabSize, with counts for each term (word).
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setFeaturesCol = function (value) {
        var javaObject = this.getJavaObject().setFeaturesCol(value);
        return new LDA(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setMaxIter = function (value) {
        var javaObject = this.getJavaObject().setMaxIter(value);
        return new LDA(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return new LDA(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setCheckpointInterval = function (value) {
        var javaObject = this.getJavaObject().setCheckpointInterval(value);
        return new LDA(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setK = function (value) {
        var javaObject = this.getJavaObject().setK(value);
        return new LDA(javaObject);
    };


    /**
     * @param {float[]} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setDocConcentrationwithnumber = function (value) {
        var javaObject = this.getJavaObject().setDocConcentration(value);
        return new LDA(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setDocConcentrationwithnumber = function (value) {
        var javaObject = this.getJavaObject().setDocConcentration(value);
        return new LDA(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setTopicConcentration = function (value) {
        var javaObject = this.getJavaObject().setTopicConcentration(value);
        return new LDA(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setOptimizer = function (value) {
        var javaObject = this.getJavaObject().setOptimizer(value);
        return new LDA(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setTopicDistributionCol = function (value) {
        var javaObject = this.getJavaObject().setTopicDistributionCol(value);
        return new LDA(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setLearningOffset = function (value) {
        var javaObject = this.getJavaObject().setLearningOffset(value);
        return new LDA(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setLearningDecay = function (value) {
        var javaObject = this.getJavaObject().setLearningDecay(value);
        return new LDA(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setSubsamplingRate = function (value) {
        var javaObject = this.getJavaObject().setSubsamplingRate(value);
        return new LDA(javaObject);
    };


    /**
     * @param {boolean} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setOptimizeDocConcentration = function (value) {
        var javaObject = this.getJavaObject().setOptimizeDocConcentration(value);
        return new LDA(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new LDA(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/clustering.LDAModel}
     */
    LDA.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
      * @param {boolean} value
      * @returns {module:eclairjs/mllib/clustering.LDA} 
      */
     LDA.prototype.setKeepLastCheckpoint = function(value) {
     throw "not implemented by ElairJS";
     //   var javaObject =  this.getJavaObject().setKeepLastCheckpoint(value);
     //   return new LDA(javaObject);
     };
     

    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    LDA.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return new StructType(javaObject);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.load = function (path) {
        var javaObject = org.apache.spark.ml.clustering.LDA.load(path);
        return new LDA(javaObject);
    };
    module.exports = LDA;
})();