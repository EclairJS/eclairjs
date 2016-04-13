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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * :: Experimental ::
     * Model fitted by {@link Word2Vec}.
     * @classdesc
     * @constructor
     * @memberof module:eclairjs/ml/feature
     */


    Word2VecModel = function (jvmObject) {

        this.logger = Logger.getLogger("Word2VecModel_js");
        JavaWrapper.call(this, jvmObject);

    };

    Word2VecModel.prototype = Object.create(JavaWrapper.prototype);

    Word2VecModel.prototype.constructor = Word2VecModel;


    /**
     * Find "num" number of words closest in similarity to the given word.
     * Returns a dataframe with the words and the cosine similarities between the
     * synonyms and the given word.
     * @param {string}
     * @param {number}
     * @returns {DataFrame}
     * @private
     *
     */
    Word2VecModel.prototype.findSynonymswithnumber = function (word, num) {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().findSynonyms(word,num);
    }


    /**
     * Find "num" number of words closest to similarity to the given vector representation
     * of the word. Returns a dataframe with the words and the cosine similarities between the
     * synonyms and the given word vector.
     * @param {Vector}
     * @param {number}
     * @returns {DataFrame}
     * @private
     *
     */
    Word2VecModel.prototype.findSynonymswithnumber = function (word, num) {
        throw "not implemented by ElairJS";
//   var word_uw = Utils.unwrapObject(word);
//   return  this.getJavaObject().findSynonyms(word_uw,num);
    }


    /**
     * @param {string}
     * @returns {string}
     *  @private
     *
     */
    Word2VecModel.prototype.setInputCol = function (value) {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().setInputCol(value);
    }


    /**
     * @param {string}
     * @returns {string}
     *  @private
     *
     */
    Word2VecModel.prototype.setOutputCol = function (value) {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().setOutputCol(value);
    }


    /**
     * Transform a sentence column to a vector column to represent the whole sentence. The transform
     * is performed by averaging all word vectors it contains.
     * @param {DataFrame}
     * @returns {DataFrame}
     *  @private
     *
     */
    Word2VecModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return Utils.javaToJs(this.getJavaObject().transform(dataset_uw));
    }


    /**
     * @param {StructType}
     * @returns {StructType}
     *  @private
     *
     */
    Word2VecModel.prototype.transformSchema = function (schema) {
        throw "not implemented by ElairJS";
//   var schema_uw = Utils.unwrapObject(schema);
//   return  this.getJavaObject().transformSchema(schema_uw);
    }


    /**
     * @param {ParamMap}
     * @returns {Word2VecModel}
     *  @private
     *
     */
    Word2VecModel.prototype.copy = function (extra) {
        throw "not implemented by ElairJS";
//   var extra_uw = Utils.unwrapObject(extra);
//   return  this.getJavaObject().copy(extra_uw);
    }


    /**
     * @returns {MLWriter}
     *  @private
     *
     */
    Word2VecModel.prototype.write = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().write();
    }
//
// static methods
//


    /**
     * @param {string}
     * @returns {Word2Vec}
     *  @private
     *
     */
    Word2Vec.load = function (path) {
        throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.Word2Vec.load(path);
    }


    /**
     * @returns {MLReader}
     *  @private
     *
     */
    Word2VecModel.read = function () {
        throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.Word2VecModel.read();
    }


    /**
     * @param {string}
     * @returns {Word2VecModel}
     *  @private
     *
     */
    Word2VecModel.load = function (path) {
        throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.Word2VecModel.load(path);
    }

    module.exports = Word2VecModel;

})();
