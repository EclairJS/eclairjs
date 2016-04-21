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
     * Word2Vec trains a model of `Map(String, Vector)`, i.e. transforms a word into a code for further
     * natural language processing or machine learning process.
     * @classdesc
     * @param {string}
     *  @class
     *  @memberof module:eclairjs/ml/feature
     */


    Word2Vec = function (obj) {
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

    Word2Vec.prototype = Object.create(JavaWrapper.prototype);

    Word2Vec.prototype.constructor = Word2Vec;


    /**
     * @param {string}
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setInputCol = function (value) {
        return new Word2Vec(this.getJavaObject().setInputCol(value));
    }


    /**
     * @param {string}
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setOutputCol = function (value) {
        return new Word2Vec(this.getJavaObject().setOutputCol(value));
    }


    /**
     * @param {integer}
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setVectorSize = function (value) {
        return new Word2Vec(this.getJavaObject().setVectorSize(value));
    }


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setWindowSize = function (value) {
        return new Word2Vec(this.getJavaObject().setWindowSize(value));
    }


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setStepSize = function (value) {
        return new Word2Vec(this.getJavaObject().setStepSize(value));
    }


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setNumPartitions = function (value) {
        return new Word2Vec(this.getJavaObject().setNumPartitions(value));
    }


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setMaxIter = function (value) {
        return new Word2Vec(this.getJavaObject().setMaxIter(value));
    }


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setSeed = function (value) {
        return new Word2Vec(this.getJavaObject().setSeed(value));
    }


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setMinCount = function (value) {
        return new Word2Vec(this.getJavaObject().setMinCount(value));
    }


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2Vec.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return Utils.javaToJs(this.getJavaObject().fit(dataset_uw));
    }


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Word2Vec.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        return Utils.javaToJs(this.getJavaObject().transformSchema(schema_uw));
    }


    /**
     * @param {module:eclairjs/ml.param.ParamMap}
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     * @private
     */
    Word2Vec.prototype.copy = function (extra) {
        throw "not implemented by ElairJS";
//   var extra_uw = Utils.unwrapObject(extra);
//   return  this.getJavaObject().copy(extra_uw);
    }


    module.exports = Word2Vec;

})();