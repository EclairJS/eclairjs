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

    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * Word2Vec trains a model of `Map(String, Vector)`, i.e. transforms a word into a code for further
     * natural language processing or machine learning process.
     * @classdesc
     * @param {string} [uid]
     *  @class
     *  @extends module:eclairjs/ml.Estimator
     *  @memberof module:eclairjs/ml/feature
     */


    Word2Vec = function (obj) {
        this.logger = Logger.getLogger("ml_feature_Word2Vec_js");
        var jvmObject;
        if (obj instanceof org.apache.spark.ml.feature.Word2Vec) {
            jvmObject = obj;
        } else if ((typeof obj) == 'string') {
            jvmObject = new org.apache.spark.ml.feature.Word2Vec(obj);
        } else {
            jvmObject = new org.apache.spark.ml.feature.Word2Vec();
        }

        Estimator.call(this, jvmObject);

    };

    Word2Vec.prototype = Object.create(Estimator.prototype);

    Word2Vec.prototype.constructor = Word2Vec;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Word2Vec.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

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
     */
    Word2Vec.prototype.copy = function (extra) {
   var extra_uw = Utils.unwrapObject(extra);
   return  this.getJavaObject().copy(extra_uw);
    }

    /**
     * The dimension of the code that you want to transform from words. Default: 100
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2Vec.prototype.vectorSize = function () {
        return Utils.javaToJs(this.getJavaObject().vectorSize());
    };

    /**
     *
     * @returns {integer}
     */
    Word2Vec.prototype.getVectorSize = function () {
        return this.getJavaObject().getVectorSize();
    };

    /**
     * The window size (context words from [-window, window]) default 5.
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2Vec.prototype.windowSize = function () {
        return Utils.javaToJs(this.getJavaObject().windowSize());
    };

    /**
     *
     * @returns {integer}
     */
    Word2Vec.prototype.getWindowSize = function () {
        return this.getJavaObject().getWindowSize();
    };

    /**
     * Number of partitions for sentences of words. Default: 1
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2Vec.prototype.numPartitions = function () {
        return Utils.javaToJs(this.getJavaObject().numPartitions());
    };

    /**
     *
     * @returns {integer}
     */
    Word2Vec.prototype.getNumPartitions = function () {
        return this.getJavaObject().getNumPartitions();
    };

    /**
     * The minimum number of times a token must appear to be included in the word2vec model's vocabulary. Default: 5
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2Vec.prototype.minCount = function () {
        return Utils.javaToJs(this.getJavaObject().minCount());
    };

    /**
     *
     * @returns {integer}
     */
    Word2Vec.prototype.getMinCount = function () {
        return this.getJavaObject().getMinCount();
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Word2Vec.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    Word2Vec.prototype.inputCol = function () {
        var javaObject = this.getJavaObject().inputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    Word2Vec.prototype.getInputCol = function () {
        return this.getJavaObject().getInputCol();
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    Word2Vec.prototype.outputCol = function () {
        var javaObject = this.getJavaObject().outputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    Word2Vec.prototype.getOutputCol = function () {
        return this.getJavaObject().getOutputCol();
    };

    /**
     * Param for maximum number of iterations (>= 0).
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    Word2Vec.prototype.maxIter = function () {
        var javaObject = this.getJavaObject().maxIter();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    Word2Vec.prototype.getMaxIter = function () {
        return this.getJavaObject().getMaxIter();
    };

    /**
     * Param for Step size to be used for each iteration of optimization
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    Word2Vec.prototype.stepSize = function () {
        var javaObject = this.getJavaObject().stepSize();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    Word2Vec.prototype.getStepSize = function () {
        return this.getJavaObject().getStepSize();
    };

    /**
     * Param for random seed.
     * @returns {module:eclairjs/ml/param.LongParam}
     */
    Word2Vec.prototype.seed = function () {
        var javaObject = this.getJavaObject().seed();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    Word2Vec.prototype.getSeed = function () {
        return this.getJavaObject().getSeed();
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     *
     */
    Word2Vec.load = function (path) {
        return new Word2Vec(org.apache.spark.ml.feature.Word2Vec.load(path));
    }

    module.exports = Word2Vec;

})();