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

    var UnaryTransformer = require(EclairJS_Globals.NAMESPACE + '/ml/UnaryTransformer');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * A feature transformer that converts the input array of strings into an array of n-grams. Null
     * values in the input array are ignored.
     * It returns an array of n-grams where each n-gram is represented by a space-separated string of
     * words.
     *
     * When the input is empty, an empty array is returned.
     * When the input array length is less than n (number of elements per n-gram), no n-grams are
     * returned.
     * @class
     * @extends module:eclairjs/ml.UnaryTransformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} uid
     */
    var NGram = function (uid) {
        this.logger = Logger.getLogger("ml_feature_NGram_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.NGram) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.NGram(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.NGram();
        }
        UnaryTransformer.call(this, jvmObject);

    };

    NGram.prototype = Object.create(UnaryTransformer.prototype);

    NGram.prototype.constructor = NGram;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    NGram.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * Minimum n-gram length, >= 1. Default: 2, bigram features
     * @returns {module:eclairjs/ml/param.IntParam}}
     */
    NGram.prototype.n = function () {
        var javaObject = this.getJavaObject().n();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.NGram}
     */
    NGram.prototype.setN = function (value) {
        var javaObject = this.getJavaObject().setN(value);
        return new NGram(javaObject);
    };


    /**
     * @returns {integer}
     */
    NGram.prototype.getN = function () {
        return this.getJavaObject().getN();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.NGram}
     */
    NGram.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.NGram.load(path);
        return new NGram(javaObject);
    };

    module.exports = NGram;
})();