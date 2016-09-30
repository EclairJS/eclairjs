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

    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Rescale each feature individually to a common range [min, max] linearly using column summary
     * statistics, which is also known as min-max normalization or Rescaling. The rescaled value for
     * feature E is calculated as,
     *
     * Rescaled(e_i) = \frac{e_i - E_{min}}{E_{max} - E_{min}} * (max - min) + min
     *
     * For the case E_{max} == E_{min}, Rescaled(e_i) = 0.5 * (max + min)
     * Note that since zero values will probably be transformed to non-zero values, output of the
     * transformer will be DenseVector even for sparse input.
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var MinMaxScaler = function (uid) {
        var jvmObject = new org.apache.spark.ml.feature.MinMaxScaler(uid);
        this.logger = Logger.getLogger("ml_feature_MinMaxScaler_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.MinMaxScaler) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.MinMaxScaler(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.MinMaxScaler();
        }
        Estimator.call(this, jvmObject);

    };

    MinMaxScaler.prototype = Object.create(Estimator.prototype);

    MinMaxScaler.prototype.constructor = MinMaxScaler;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MinMaxScaler.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new MinMaxScaler(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new MinMaxScaler(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setMin = function (value) {
        var javaObject = this.getJavaObject().setMin(value);
        return new MinMaxScaler(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setMax = function (value) {
        var javaObject = this.getJavaObject().setMax(value);
        return new MinMaxScaler(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScaler.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    MinMaxScaler.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new MinMaxScaler(javaObject);
    };

    /**
     * lower bound after transformation, shared by all features Default: 0.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScaler.prototype.min = function () {
        var javaObject = this.getJavaObject().min();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    MinMaxScaler.prototype.getMin = function () {
        return this.getJavaObject().getMin();
    };

    /**
     * upper bound after transformation, shared by all features Default: 1.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScaler.prototype.max = function () {
        var javaObject = this.getJavaObject().max();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    MinMaxScaler.prototype.getMax = function () {
        return this.getJavaObject().getMax();
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    MinMaxScaler.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     */
    MinMaxScaler.prototype.validateParams = function () {
        return this.getJavaObject().validateParams();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.MinMaxScaler.load(path);
        return new MinMaxScaler(javaObject);
    };

    module.exports = MinMaxScaler;
})();