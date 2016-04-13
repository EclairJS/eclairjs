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

    var Word2VecModel = require(EclairJS_Globals.NAMESPACE + '/mllib/feature/Word2VecModel');

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
    var Word2Vec = function(jvmObject) {
         
         this.logger = Logger.getLogger("Word2Vec_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.mllib.feature.Word2Vec();
        }
         JavaWrapper.call(this, jvmObject);

    };

    Word2Vec.prototype = Object.create(JavaWrapper.prototype);

    Word2Vec.prototype.constructor = Word2Vec;



    /**
     * Sets vector size (default: 100).
     * @param {number} vectorSize
     * @returns {} 
     */
    Word2Vec.prototype.setVectorSize = function(vectorSize) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setVectorSize(vectorSize);
    //   return new (javaObject);
    };


    /**
     * Sets initial learning rate (default: 0.025).
     * @param {number} learningRate
     * @returns {} 
     */
    Word2Vec.prototype.setLearningRate = function(learningRate) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setLearningRate(learningRate);
    //   return new (javaObject);
    };


    /**
     * Sets number of partitions (default: 1). Use a small number for accuracy.
     * @param {number} numPartitions
     * @returns {} 
     */
    Word2Vec.prototype.setNumPartitions = function(numPartitions) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setNumPartitions(numPartitions);
    //   return new (javaObject);
    };


    /**
     * Sets number of iterations (default: 1), which should be smaller than or equal to number of
     * partitions.
     * @param {number} numIterations
     * @returns {} 
     */
    Word2Vec.prototype.setNumIterations = function(numIterations) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setNumIterations(numIterations);
    //   return new (javaObject);
    };


    /**
     * Sets random seed (default: a random long integer).
     * @param {number} seed
     * @returns {} 
     */
    Word2Vec.prototype.setSeed = function(seed) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setSeed(seed);
    //   return new (javaObject);
    };


    /**
     * Sets the window of words (default: 5)
     * @param {number} window
     * @returns {} 
     */
    Word2Vec.prototype.setWindowSize = function(window) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setWindowSize(window);
    //   return new (javaObject);
    };


    /**
     * Sets minCount, the minimum number of times a token must appear to be included in the word2vec
     * model's vocabulary (default: 5).
     * @param {number} minCount
     * @returns {} 
     */
    Word2Vec.prototype.setMinCount = function(minCount) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().setMinCount(minCount);
    //   return new (javaObject);
    };


    /**
     * Computes the vector representation of each word in vocabulary.
     * @param {RDD} dataset  an RDD of words
     * @returns {Word2VecModel}  a Word2VecModel
     */
    Word2Vec.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
       return new Word2VecModel(javaObject);
    };

    module.exports = Word2Vec;

})();

