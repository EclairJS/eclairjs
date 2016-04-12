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
     * Word2Vec model
     * @param wordIndex maps each word to an index, which can retrieve the corresponding
     *                  vector from wordVectors
     * @param wordVectors array of length numWords * vectorSize, vector corresponding
     *                    to the word mapped with index i can be retrieved by the slice
     *                    (i * vectorSize, i * vectorSize + vectorSize)
     * @memberof module:eclairjs/mllib/feature
     * @classdesc
     */

    /**
     * @param {Map} model
     * @returns {??} 
     *  @class
     */
    var Word2VecModel = function(jvmObject) {

         //var jvmObject = new org.apache.spark.mllib.feature.Word2VecModel(model);
         this.logger = Logger.getLogger("Word2VecModel_js");
         JavaWrapper.call(this, jvmObject);

    };

    Word2VecModel.prototype = Object.create(JavaWrapper.prototype);

    Word2VecModel.prototype.constructor = Word2VecModel;



    /**
     * @param {SparkContext} sc
     * @param {string} path
     */
    Word2VecModel.prototype.save = function(sc,path) {
    throw "not implemented by ElairJS";
    //   var sc_uw = Utils.unwrapObject(sc);
    //    this.getJavaObject().save(sc_uw,path);
    };


    /**
     * Transforms a word to its vector representation
     * @param {string} word  a word
     * @returns {Vector}  vector representation of word
     */
    Word2VecModel.prototype.transform = function(word) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().transform(word);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Find synonyms of a word
     * @param {string} word  a word
     * @param {number} num  number of synonyms to find
     * @returns {Tuple2[]}  array of (word, cosineSimilarity)
     */
    Word2VecModel.prototype.findSynonyms = function(word,num) {
        var javaObject =  this.getJavaObject().findSynonyms(word,num);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Find synonyms of the vector representation of a word
     * @param {Vector} vector  vector representation of a word
     * @param {number} num  number of synonyms to find
     * @returns {Tuple2[]}  array of (word, cosineSimilarity)
     */
    Word2VecModel.prototype.findSynonymswithnumber = function(vector,num) {
    throw "not implemented by ElairJS";
    //   var vector_uw = Utils.unwrapObject(vector);
    //   var javaObject =  this.getJavaObject().findSynonyms(vector_uw,num);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Returns a map of words to their vector representations.
     * @returns {Map} 
     */
    Word2VecModel.prototype.getVectors = function() {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().getVectors();
    //   return new Map(javaObject);
    };

    //
    // static methods
    //

    /**
     * @param {SparkContext} sc
     * @param {string} path
     * @returns {Word2VecModel} 
     */
    Word2VecModel.load = function(sc,path) {
    throw "not implemented by ElairJS";
    //   var sc_uw = Utils.unwrapObject(sc);
    //   var javaObject =  org.apache.spark.mllib.feature.Word2VecModel.load(sc_uw,path);
    //   return new Word2VecModel(javaObject);
    };

    module.exports = Word2VecModel;

})();

