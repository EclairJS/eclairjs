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

    var LDAModel = require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/LDAModel');

    /**
     * Local LDA model.
     * This model stores only the inferred topics.
     *
     * @param topics Inferred topics (vocabSize x k matrix).
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * @class
     * @extends module:eclairjs/mllib/clustering.LDAModel
     */


    var LocalLDAModel = function (jvmObject) {

        this.logger = Logger.getLogger("LocalLDAModel_js");
        LDAModel.call(this, jvmObject);

    };

    LocalLDAModel.prototype = Object.create(LDAModel.prototype);

    LocalLDAModel.prototype.constructor = LocalLDAModel;


    /**
     * @returns {number}
     */
    LocalLDAModel.prototype.k = function () {
        throw "not implemented by ElairJS";
    //   return  this.getJavaObject().k();
    };


    /**
     * @returns {number}
     */
    LocalLDAModel.prototype.vocabSize = function () {
        throw "not implemented by ElairJS";
    //   return  this.getJavaObject().vocabSize();
    };


    /**
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    LocalLDAModel.prototype.topicsMatrix = function () {
        throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().topicsMatrix();
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * @param {number} maxTermsPerTopic
     * @returns {module:eclairjs.Tuple2[]}
     */
    LocalLDAModel.prototype.describeTopics = function (maxTermsPerTopic) {
        throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().describeTopics(maxTermsPerTopic);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     */
    LocalLDAModel.prototype.save = function (sc, path) {
        throw "not implemented by ElairJS";
    //   var sc_uw = Utils.unwrapObject(sc);
    //    this.getJavaObject().save(sc_uw,path);
    };


    /**
     * Calculates a lower bound on the log likelihood of the entire corpus.
     *
     * See Equation (16) in original Online LDA paper.
     *
     * @param {module:eclairjs.RDD} documents  test corpus to use for calculating log likelihood
     * @returns {number}  variational lower bound on the log likelihood of the entire corpus
     */
    LocalLDAModel.prototype.logLikelihoodwithRDD = function (documents) {
        throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'documents'
    //   var documents_uw = Utils.unwrapObject(documents);
    //   return  this.getJavaObject().logLikelihood(documents_uw);
    };


    /**
     * Java-friendly version of {@link logLikelihood}
     * @param {module:eclairjs.PairRDD} documents
     * @returns {number}
     */
    LocalLDAModel.prototype.logLikelihoodwithJavaPairRDD = function (documents) {
        throw "not implemented by ElairJS";
    //   var documents_uw = Utils.unwrapObject(documents);
    //   return  this.getJavaObject().logLikelihood(documents_uw);
    };


    /**
     * Calculate an upper bound bound on perplexity.  (Lower is better.)
     * See Equation (16) in original Online LDA paper.
     *
     * @param {module:eclairjs.RDD} documents  test corpus to use for calculating perplexity
     * @returns {number}  Variational upper bound on log perplexity per token.
     */
    LocalLDAModel.prototype.logPerplexitywithRDD = function (documents) {
        throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'documents'
    //   var documents_uw = Utils.unwrapObject(documents);
    //   return  this.getJavaObject().logPerplexity(documents_uw);
    };


    /**
     * @param {module:eclairjs.PairRDD} documents
     * @returns {number}
     */
    LocalLDAModel.prototype.logPerplexitywithJavaPairRDD = function (documents) {
        throw "not implemented by ElairJS";
    //   var documents_uw = Utils.unwrapObject(documents);
    //   return  this.getJavaObject().logPerplexity(documents_uw);
    };


    /**
     * Predicts the topic mixture distribution for each document (often called "theta" in the
     * literature).  Returns a vector of zeros for an empty document.
     *
     * This uses a variational approximation following Hoffman et al. (2010), where the approximate
     * distribution is called "gamma."  Technically, this method returns this approximation "gamma"
     * for each document.
     * @param {module:eclairjs.RDD} documents  documents to predict topic mixture distributions for
     * @returns {module:eclairjs.RDD}  An RDD of (document ID, topic mixture distribution for document)
     */
    LocalLDAModel.prototype.topicDistributionswithRDD = function (documents) {
        throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'documents'
    //   var documents_uw = Utils.unwrapObject(documents);
    //   var javaObject =  this.getJavaObject().topicDistributions(documents_uw);
    //   return new RDD(javaObject);
    };


    /**
     * Java-friendly version of {@link topicDistributions}
     * @param {module:eclairjs.PairRDD} documents
     * @returns {module:eclairjs.PairRDD}
     */
    LocalLDAModel.prototype.topicDistributionswithJavaPairRDD = function (documents) {
        throw "not implemented by ElairJS";
    //   var documents_uw = Utils.unwrapObject(documents);
    //   var javaObject =  this.getJavaObject().topicDistributions(documents_uw);
    //   return new JavaPairRDD(javaObject);
    };


    //
    // static methods
    //


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.LocalLDAModel}
     */
    LocalLDAModel.load = function (sc, path) {
        throw "not implemented by ElairJS";
    //   var sc_uw = Utils.unwrapObject(sc);
    //   var javaObject =  org.apache.spark.mllib.clustering.LocalLDAModel.load(sc_uw,path);
    //   return new LocalLDAModel(javaObject);
    };

    module.exports = LocalLDAModel;

})();
