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


/**
 * Latent Dirichlet Allocation (LDA) model.
 *
 * This abstraction permits for different underlying representations,
 * including local and distributed data structures.
 * @classdesc
 * @abstract
 * @class
 */


var LDAModel = function (jvmObject) {

    this.logger = Logger.getLogger("LDAModel_js");
    JavaWrapper.call(this, jvmObject);

};

LDAModel.prototype = Object.create(JavaWrapper.prototype);

LDAModel.prototype.constructor = LDAModel;


/**
 * @returns {number}
 */
LDAModel.prototype.k = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().k();
};


/**
 * @returns {number}
 */
LDAModel.prototype.vocabSize = function () {
   return  this.getJavaObject().vocabSize();
};


/**
 * Concentration parameter (commonly named "alpha") for the prior placed on documents'
 * distributions over topics ("theta").
 *
 * This is the parameter to a Dirichlet distribution.
 * @returns {Vector}
 */
LDAModel.prototype.docConcentration = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().docConcentration();
//   return Utils.javaToJs(javaObject);
};


/**
 * Concentration parameter (commonly named "beta" or "eta") for the prior placed on topics'
 * distributions over terms.
 *
 * This is the parameter to a symmetric Dirichlet distribution.
 *
 * Note: The topics' distributions over terms are called "beta" in the original LDA paper
 * by Blei et al., but are called "phi" in many later papers such as Asuncion et al., 2009.
 * @returns {number}
 */
LDAModel.prototype.topicConcentration = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().topicConcentration();
};


/**
 * Inferred topics, where each topic is represented by a distribution over terms.
 * This is a matrix of size vocabSize x k, where each column is a topic.
 * No guarantees are given about the ordering of the topics.
 * @returns {Matrix}
 */
LDAModel.prototype.topicsMatrix = function () {
   var javaObject =  this.getJavaObject().topicsMatrix();
   return Utils.javaToJs(javaObject);
};


/**
 * Return the topics described by weighted terms.
 *
 * @param {number} [maxTermsPerTopic]   Maximum number of terms to collect for each topic.
 *          (term indices, term weights in topic).
 *          Each topic's terms are sorted in order of decreasing weight.
 * @returns {Tuple2[]}   Array over topics.  Each topic is represented as a pair of matching arrays:
 */
LDAModel.prototype.describeTopics = function (maxTermsPerTopic) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[0]) {
//   var javaObject =  this.getJavaObject().describeTopics(maxTermsPerTopic);
//   return Utils.javaToJs(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().describeTopics();
//   return Utils.javaToJs(javaObject);
//   }
};


/**
 * Local LDA model.
 * This model stores only the inferred topics.
 *
 * @param topics Inferred topics (vocabSize x k matrix).
 * @classdesc
 * @class
 * @extends LDAModel
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
 * @returns {Matrix}
 */
LocalLDAModel.prototype.topicsMatrix = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().topicsMatrix();
//   return Utils.javaToJs(javaObject);
};


/**
 * @param {number} maxTermsPerTopic
 * @returns {Tuple2[]}
 */
LocalLDAModel.prototype.describeTopics = function (maxTermsPerTopic) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().describeTopics(maxTermsPerTopic);
//   return Utils.javaToJs(javaObject);
};


/**
 * @param {SparkContext} sc
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
 * @param {RDD} documents  test corpus to use for calculating log likelihood
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
 * @param {JavaPairRDD} documents
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
 * @param {RDD} documents  test corpus to use for calculating perplexity
 * @returns {number}  Variational upper bound on log perplexity per token.
 */
LocalLDAModel.prototype.logPerplexitywithRDD = function (documents) {
    throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'documents'
//   var documents_uw = Utils.unwrapObject(documents);
//   return  this.getJavaObject().logPerplexity(documents_uw);
};


/**
 * @param {JavaPairRDD} documents
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
 * @param {RDD} documents  documents to predict topic mixture distributions for
 * @returns {RDD}  An RDD of (document ID, topic mixture distribution for document)
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
 * @param {JavaPairRDD} documents
 * @returns {JavaPairRDD}
 */
LocalLDAModel.prototype.topicDistributionswithJavaPairRDD = function (documents) {
    throw "not implemented by ElairJS";
//   var documents_uw = Utils.unwrapObject(documents);
//   var javaObject =  this.getJavaObject().topicDistributions(documents_uw);
//   return new JavaPairRDD(javaObject);
};


/**
 * Distributed LDA model.
 * This model stores the inferred topics, the full training dataset, and the topic distributions.
 * @classdesc
 * @class
 * @extends LDAModel
 */


var DistributedLDAModel = function (jvmObject) {

    this.logger = Logger.getLogger("DistributedLDAModel_js");
    LDAModel.call(this, jvmObject);

};

DistributedLDAModel.prototype = Object.create(LDAModel.prototype);

DistributedLDAModel.prototype.constructor = DistributedLDAModel;


/**
 * Convert model to a local model.
 * The local model stores the inferred topics but not the topic distributions for training
 * documents.
 * @returns {LocalLDAModel}
 */
DistributedLDAModel.prototype.toLocal = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().toLocal();
//   return new LocalLDAModel(javaObject);
};


/**
 * @param {number} maxTermsPerTopic
 * @returns {Tuple2[]}
 */
DistributedLDAModel.prototype.describeTopics = function (maxTermsPerTopic) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().describeTopics(maxTermsPerTopic);
//   return Utils.javaToJs(javaObject);
};


/**
 * Return the top documents for each topic
 *
 * @param {number} maxDocumentsPerTopic   Maximum number of documents to collect for each topic.
 *          (IDs for the documents, weights of the topic in these documents).
 *          For each topic, documents are sorted in order of decreasing topic weights.
 * @returns {Tuple2[]}   Array over topics.  Each element represent as a pair of matching arrays:
 */
DistributedLDAModel.prototype.topDocumentsPerTopic = function (maxDocumentsPerTopic) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().topDocumentsPerTopic(maxDocumentsPerTopic);
//   return Utils.javaToJs(javaObject);
};


/**
 * For each document in the training set, return the distribution over topics for that document
 * ("theta_doc").
 *
 * @returns {RDD}   RDD of (document ID, topic distribution) pairs
 */
DistributedLDAModel.prototype.topicDistributions = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().topicDistributions();
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of {@link topicDistributions}
 * @returns {JavaPairRDD}
 */
DistributedLDAModel.prototype.javaTopicDistributions = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().javaTopicDistributions();
//   return new JavaPairRDD(javaObject);
};


/**
 * For each document, return the top k weighted topics for that document and their weights.
 * @param {number} k
 * @returns {RDD}  RDD of (doc ID, topic indices, topic weights)
 */
DistributedLDAModel.prototype.topTopicsPerDocument = function (k) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().topTopicsPerDocument(k);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of {@link topTopicsPerDocument}
 * @param {number} k
 * @returns {JavaRDD}
 */
DistributedLDAModel.prototype.javaTopTopicsPerDocument = function (k) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().javaTopTopicsPerDocument(k);
//   return new JavaRDD(javaObject);
};


/**
 * Java-friendly version of {@link topicDistributions}
 * @param {SparkContext} sc
 * @param {string} path
 */
DistributedLDAModel.prototype.save = function (sc, path) {
    throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//    this.getJavaObject().save(sc_uw,path);
};
//
// static methods
//


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {LocalLDAModel}
 */
LocalLDAModel.load = function (sc, path) {
    throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.clustering.LocalLDAModel.load(sc_uw,path);
//   return new LocalLDAModel(javaObject);
};


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {DistributedLDAModel}
 */
DistributedLDAModel.load = function (sc, path) {
    throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.clustering.DistributedLDAModel.load(sc_uw,path);
//   return new DistributedLDAModel(javaObject);
};
