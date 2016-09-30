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

    var Transformer = require(EclairJS_Globals.NAMESPACE + '/ml/Transformer');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * A one-hot encoder that maps a column of category indices to a column of binary vectors, with
     * at most a single one-value per row that indicates the input category index.
     * For example with 5 categories, an input value of 2.0 would map to an output vector of
     * `[0.0, 0.0, 1.0, 0.0]`.
     * The last category is not included by default (configurable via OneHotEncoder!.dropLast
     * because it makes the vector entries sum up to one, and hence linearly dependent.
     * So an input value of 4.0 maps to `[0.0, 0.0, 0.0, 0.0]`.
     * Note that this is different from scikit-learn's OneHotEncoder, which keeps all categories.
     * The output vectors are sparse.
     *
     * @see {@link module:eclairjs/ml/feature.StringIndexer} for converting categorical values into category indices
     * @class
     * @extends module:eclairjs/ml.Transformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var OneHotEncoder = function (uid) {
        this.logger = Logger.getLogger("ml_feature_OneHotEncoder_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.OneHotEncoder) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.OneHotEncoder(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.OneHotEncoder();
        }
        Transformer.call(this, jvmObject);

    };

    OneHotEncoder.prototype = Object.create(Transformer.prototype);

    OneHotEncoder.prototype.constructor = OneHotEncoder;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    OneHotEncoder.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {module:eclairjs/ml/param.BooleanParam}
     */
    OneHotEncoder.prototype.dropLast = function () {
        var javaObject = this.getJavaObject().dropLast();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.setDropLast = function (value) {
        var javaObject = this.getJavaObject().setDropLast(value);
        return new OneHotEncoder(javaObject);
    };

    /**
       * @returns {boolean}
      */
     OneHotEncoder.prototype.getDropLast = function() {
        return  this.getJavaObject().getDropLast();
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new OneHotEncoder(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new OneHotEncoder(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new OneHotEncoder(javaObject);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.OneHotEncoder.load(path);
        return new OneHotEncoder(javaObject);
    };

    module.exports = OneHotEncoder;
})();