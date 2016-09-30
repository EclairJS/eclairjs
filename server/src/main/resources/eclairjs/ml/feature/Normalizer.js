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
     * Normalize a vector to have unit norm using the given p-norm.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.UnaryTransformer
     * @param {string} [uid]
     */
    var Normalizer = function (uid) {
        this.logger = Logger.getLogger("ml_feature_Normalizer_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.Normalizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.Normalizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.Normalizer();
        }
        UnaryTransformer.call(this, jvmObject);

    };

    Normalizer.prototype = Object.create(UnaryTransformer.prototype);

    Normalizer.prototype.constructor = Normalizer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Normalizer.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * Normalization in L^p^ space. Must be >= 1. (default: p = 2)
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    Normalizer.prototype.p = function () {
        var javaObject = this.getJavaObject().p();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    Normalizer.prototype.getP = function () {
        return this.getJavaObject().getP();
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.Normalizer}
     */
    Normalizer.prototype.setP = function (value) {
        var javaObject = this.getJavaObject().setP(value);
        return new Normalizer(javaObject);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Normalizer}
     */
    Normalizer.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.Normalizer.load(path);
        return new Normalizer(javaObject);
    };

    module.exports = Normalizer;
})();