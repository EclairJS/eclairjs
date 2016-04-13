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
     * Distributed LDA model.
     * This model stores the inferred topics, the full training dataset, and the topic distributions.
     * @memberof module:eclairjs/mllib/clustering
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
     * @returns {DistributedLDAModel}
     */
    DistributedLDAModel.load = function (sc, path) {
        throw "not implemented by ElairJS";
    //   var sc_uw = Utils.unwrapObject(sc);
    //   var javaObject =  org.apache.spark.mllib.clustering.DistributedLDAModel.load(sc_uw,path);
    //   return new DistributedLDAModel(javaObject);
    };

    module.exports = DistributedLDAModel;

})();
