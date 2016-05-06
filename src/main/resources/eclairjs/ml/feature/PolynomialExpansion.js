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
     * Perform feature expansion in a polynomial space. As said in wikipedia of Polynomial Expansion,
     * which is available at {@link http://en.wikipedia.org/wiki/Polynomial_expansion}, "In mathematics, an
     * expansion of a product of sums expresses it as a sum of products by using the fact that
     * multiplication distributes over addition". Take a 2-variable feature vector as an example:
     * `(x, y)`, if we want to expand it with degree 2, then we get `(x, x * x, y, x * y, y * y)`.
     * @class
     * @extends module:eclairjs/ml.UnaryTransformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var PolynomialExpansion = function (uid) {
        this.logger = Logger.getLogger("ml_feature_PolynomialExpansion_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.PolynomialExpansion) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.PolynomialExpansion(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.PolynomialExpansion();
        }
        UnaryTransformer.call(this, jvmObject);

    };

    PolynomialExpansion.prototype = Object.create(UnaryTransformer.prototype);

    PolynomialExpansion.prototype.constructor = PolynomialExpansion;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    PolynomialExpansion.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * The polynomial degree to expand, which should be >= 1. A value of 1 means no expansion. Default: 2
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    PolynomialExpansion.prototype.degree = function () {
        return Utils.javaToJs(this.getJavaObject().degree());
    };

    /**
     * @returns {number}
     */
    PolynomialExpansion.prototype.getDegree = function () {
        return this.getJavaObject().getDegree();
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.PolynomialExpansion}
     */
    PolynomialExpansion.prototype.setDegree = function (value) {
        var javaObject = this.getJavaObject().setDegree(value);
        return new PolynomialExpansion(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.PolynomialExpansion}
     */
    PolynomialExpansion.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new PolynomialExpansion(javaObject);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.PolynomialExpansion}
     */
    PolynomialExpansion.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.PolynomialExpansion.load(path);
        return new PolynomialExpansion(javaObject);
    };

    module.exports = PolynomialExpansion;
})();