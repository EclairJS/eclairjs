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


/**
 * :: Experimental ::
 * Word2Vec trains a model of `Map(String, Vector)`, i.e. transforms a word into a code for further
 * natural language processing or machine learning process.
 * @classdesc
 * @param {string}
 *  @class
 */


MLWord2Vec = function (obj) {
    this.logger = Logger.getLogger("Word2Vec_js");
    var jvmObject;
    if (obj instanceof org.apache.spark.ml.feature.Word2Vec) {
        jvmObject = obj;
    } else if ((typeof obj) == 'string') {
        jvmObject = new org.apache.spark.ml.feature.Word2Vec(obj);
    } else {
        jvmObject = new org.apache.spark.ml.feature.Word2Vec();
    }

    JavaWrapper.call(this, jvmObject);

};

MLWord2Vec.prototype = Object.create(JavaWrapper.prototype);

MLWord2Vec.prototype.constructor = MLWord2Vec;


/**
 * @param {string}
 * @returns {MLWord2Vec}
 */
MLWord2Vec.prototype.setInputCol = function (value) {
    return new MLWord2Vec(this.getJavaObject().setInputCol(value));
}


/**
 * @param {string}
 * @returns {MLWord2Vec}
 */
MLWord2Vec.prototype.setOutputCol = function (value) {
    return new MLWord2Vec(this.getJavaObject().setOutputCol(value));
}


/**
 * @param {integer}
 * @returns {MLWord2Vec}
 */
MLWord2Vec.prototype.setVectorSize = function (value) {
    return new MLWord2Vec(this.getJavaObject().setVectorSize(value));
}


/**
 * @param {number}
 * @returns {??Sing??}
 */
MLWord2Vec.prototype.setWindowSize = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setWindowSize(value);
}


/**
 * @param {number}
 * @returns {??Sing??}
 */
MLWord2Vec.prototype.setStepSize = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setStepSize(value);
}


/**
 * @param {number}
 * @returns {??Sing??}
 */
MLWord2Vec.prototype.setNumPartitions = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setNumPartitions(value);
}


/**
 * @param {number}
 * @returns {??Sing??}
 */
MLWord2Vec.prototype.setMaxIter = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setMaxIter(value);
}


/**
 * @param {number}
 * @returns {??Sing??}
 */
MLWord2Vec.prototype.setSeed = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setSeed(value);
}


/**
 * @param {integer}
 * @returns {MLWord2Vec}
 */
MLWord2Vec.prototype.setMinCount = function (value) {
    return new MLWord2Vec(this.getJavaObject().setMinCount(value));
}


/**
 * @param {DataFrame}
 * @returns {MLWord2VecModel}
 */
MLWord2Vec.prototype.fit = function (dataset) {
    var dataset_uw = Utils.unwrapObject(dataset);
    return new MLWord2VecModel(this.getJavaObject().fit(dataset_uw));
}


/**
 * @param {StructType}
 * @returns {StructType}
 */
MLWord2Vec.prototype.transformSchema = function (schema) {
    throw "not implemented by ElairJS";
//   var schema_uw = Utils.unwrapObject(schema);
//   return  this.getJavaObject().transformSchema(schema_uw);
}


/**
 * @param {ParamMap}
 * @returns {MLWord2Vec}
 */
MLWord2Vec.prototype.copy = function (extra) {
    throw "not implemented by ElairJS";
//   var extra_uw = Utils.unwrapObject(extra);
//   return  this.getJavaObject().copy(extra_uw);
}


/**
 * :: Experimental ::
 * Model fitted by {@link MLWord2Vec}.
 * @classdesc
 * @constructor
 */


MLWord2VecModel = function (jvmObject) {

    this.logger = Logger.getLogger("MLWord2VecModel_js");
    JavaWrapper.call(this, jvmObject);

};

MLWord2VecModel.prototype = Object.create(JavaWrapper.prototype);

MLWord2VecModel.prototype.constructor = MLWord2VecModel;


/**
 * Find "num" number of words closest in similarity to the given word.
 * Returns a dataframe with the words and the cosine similarities between the
 * synonyms and the given word.
 * @param {string}
 * @param {number}
 * @returns {DataFrame}
 */
MLWord2VecModel.prototype.findSynonymswithnumber = function (word, num) {
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
 */
MLWord2VecModel.prototype.findSynonymswithnumber = function (word, num) {
    throw "not implemented by ElairJS";
//   var word_uw = Utils.unwrapObject(word);
//   return  this.getJavaObject().findSynonyms(word_uw,num);
}


/**
 * @param {string}
 * @returns {??Sing??}
 */
MLWord2VecModel.prototype.setInputCol = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setInputCol(value);
}


/**
 * @param {string}
 * @returns {??Sing??}
 */
MLWord2VecModel.prototype.setOutputCol = function (value) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setOutputCol(value);
}


/**
 * Transform a sentence column to a vector column to represent the whole sentence. The transform
 * is performed by averaging all word vectors it contains.
 * @param {DataFrame}
 * @returns {DataFrame}
 */
MLWord2VecModel.prototype.transform = function (dataset) {
    var dataset_uw = Utils.unwrapObject(dataset);
    return new DataFrame(this.getJavaObject().transform(dataset_uw));
}


/**
 * @param {StructType}
 * @returns {StructType}
 */
MLWord2VecModel.prototype.transformSchema = function (schema) {
    throw "not implemented by ElairJS";
//   var schema_uw = Utils.unwrapObject(schema);
//   return  this.getJavaObject().transformSchema(schema_uw);
}


/**
 * @param {ParamMap}
 * @returns {MLWord2VecModel}
 */
MLWord2VecModel.prototype.copy = function (extra) {
    throw "not implemented by ElairJS";
//   var extra_uw = Utils.unwrapObject(extra);
//   return  this.getJavaObject().copy(extra_uw);
}


/**
 * @returns {MLWriter}
 */
MLWord2VecModel.prototype.write = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().write();
}
//
// static methods
//


/**
 * @param {string}
 * @returns {MLWord2Vec}
 */
MLWord2Vec.load = function (path) {
    throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.MLWord2Vec.load(path);
}


/**
 * @returns {MLReader}
 */
MLWord2VecModel.read = function () {
    throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.MLWord2VecModel.read();
}


/**
 * @param {string}
 * @returns {MLWord2VecModel}
 */
MLWord2VecModel.load = function (path) {
    throw "not implemented by ElairJS";
//   return  org.apache.spark.ml.feature.Word2VecModel.load(path);
}
