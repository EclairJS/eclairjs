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
     * Word2Vec creates vector representation of words in a text corpus.
     * The algorithm first constructs a vocabulary from the corpus
     * and then learns vector representation of words in the vocabulary.
     * The vector representation can be used as features in
     * natural language processing and machine learning algorithms.
     *
     * We used skip-gram model in our implementation and hierarchical softmax
     * method to train the model. The variable names in the implementation
     * matches the original C implementation.
     *
     * For original C implementation, see https://code.google.com/p/word2vec/
     * For research papers, see
     * Efficient Estimation of Word Representations in Vector Space
     * and
     * Distributed Representations of Words and Phrases and their Compositionality.
     * @memberof module:eclairjs/mllib/feature
     * @classdesc
     * @class
     */
    var Word2Vec = function (jvmObject) {

        this.logger = Logger.getLogger("mllib_feature_Word2Vec_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.mllib.feature.Word2Vec();
        }
        JavaWrapper.call(this, jvmObject);

    };

    Word2Vec.prototype = Object.create(JavaWrapper.prototype);

    Word2Vec.prototype.constructor = Word2Vec;


    /**
     * Sets vector size (default: 100).
     * @param {integer} vectorSize
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setVectorSize = function (vectorSize) {
        var javaObject = this.getJavaObject().setVectorSize(vectorSize);
        return new Word2Vec(javaObject);
    };


    /**
     * Sets initial learning rate (default: 0.025).
     * @param {float} learningRate
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setLearningRate = function (learningRate) {
        var javaObject = this.getJavaObject().setLearningRate(learningRate);
        return new Word2Vec(javaObject);
    };


    /**
     * Sets number of partitions (default: 1). Use a small number for accuracy.
     * @param {integer} numPartitions
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setNumPartitions = function (numPartitions) {
        var javaObject = this.getJavaObject().setNumPartitions(numPartitions);
        return new Word2Vec(javaObject);
    };


    /**
     * Sets number of iterations (default: 1), which should be smaller than or equal to number of
     * partitions.
     * @param {integer} numIterations
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setNumIterations = function (numIterations) {
        var javaObject = this.getJavaObject().setNumIterations(numIterations);
        return new Word2Vec(javaObject);
    };


    /**
     * Sets random seed (default: a random integer).
     * @param {integer} seed
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setSeed = function (seed) {
        var javaObject = this.getJavaObject().setSeed(seed);
        return new Word2Vec(javaObject);
    };


    /**
     * Sets the window of words (default: 5)
     * @param {integer} window
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setWindowSize = function (window) {
        var javaObject = this.getJavaObject().setWindowSize(window);
        return new Word2Vec(javaObject);
    };


    /**
     * Sets minCount, the minimum number of times a token must appear to be included in the word2vec
     * model's vocabulary (default: 5).
     * @param {integer} minCount
     * @returns {module:eclairjs/mllib/feature.Word2Vec}
     */
    Word2Vec.prototype.setMinCount = function (minCount) {
        var javaObject = this.getJavaObject().setMinCount(minCount);
        return new Word2Vec(javaObject);
    };


    /**
     * Computes the vector representation of each word in vocabulary.
     * @param {module:eclairjs.RDD} dataset  an RDD of words
     * @returns {module:eclairjs/mllib/feature.Word2VecModel}  a Word2VecModel
     */
    Word2Vec.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };

    module.exports = Word2Vec;

})();

