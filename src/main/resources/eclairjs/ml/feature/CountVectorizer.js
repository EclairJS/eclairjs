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
     * @classdesc
     * :: Experimental ::
     * Extracts a vocabulary from document collections and generates a {@link CountVectorizerModel}.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     * @constructor
     */
    var CountVectorizer = function (uid) {
        this.logger = Logger.getLogger("ml.feature.CountVectorizer_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.CountVectorizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.CountVectorizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.CountVectorizer();
        }
        JavaWrapper.call(this, jvmObject);

    };

    CountVectorizer.prototype = Object.create(JavaWrapper.prototype);

    CountVectorizer.prototype.constructor = CountVectorizer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    CountVectorizer.prototype.uid = function () {
        return this.getJavaObject().uid();
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new CountVectorizer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new CountVectorizer(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setVocabSize = function (value) {
        var javaObject = this.getJavaObject().setVocabSize(value);
        return new CountVectorizer(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setMinDF = function (value) {
        var javaObject = this.getJavaObject().setMinDF(value);
        return new CountVectorizer(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setMinTF = function (value) {
        var javaObject = this.getJavaObject().setMinTF(value);
        return new CountVectorizer(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizer.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    CountVectorizer.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer} 
     */
    CountVectorizer.prototype.setBinary = function(value) {
       var javaObject =  this.getJavaObject().setBinary(value);
       return new CountVectorizer(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new CountVectorizer(javaObject);
    };

    /**
     * Max size of the vocabulary. CountVectorizer will build a vocabulary that only considers the top vocabSize
     * terms ordered by term frequency across the corpus.
     * Default: 2^18^
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    CountVectorizer.prototype.vocabSize = function () {
        var javaObject = this.getJavaObject().vocabSize();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {integer}
     */
    CountVectorizer.prototype.getVocabSize = function () {
        return this.getJavaObject().getVocabSize();
    };

    /**
     * Specifies the minimum number of different documents a term must appear in to be included in the vocabulary.
     * If this is an integer >= 1, this specifies the number of documents the term must appear in;
     * if this is a double in [0,1), then this specifies the fraction of documents.
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    CountVectorizer.prototype.minDF = function () {
        var javaObject = this.getJavaObject().minDF();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {float}
     */
    CountVectorizer.prototype.getMinDF = function () {
        return this.getJavaObject().getMinDF();
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    CountVectorizer.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {float}
     */
    CountVectorizer.prototype.getMinTF = function () {
        return this.getJavaObject().getMinTF();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.CountVectorizer.load(path);
        return new CountVectorizer(javaObject);
    };

    module.exports = CountVectorizer;
})();