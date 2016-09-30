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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Model fitted by {@link module:eclairjs/ml.MinMaxScaler}.
     *
     *
     * TODO: The transformer does not yet set the metadata in the output column (SPARK-8529).
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Model
     */


    var MinMaxScalerModel = function (jvmObject) {

        this.logger = Logger.getLogger("MinMaxScalerModel_js");
        Model.call(this, jvmObject);

    };

    MinMaxScalerModel.prototype = Object.create(Model.prototype);

    MinMaxScalerModel.prototype.constructor = MinMaxScalerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MinMaxScalerModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    MinMaxScalerModel.prototype.originalMin = function () {
        var javaObject = this.getJavaObject().originalMin();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    MinMaxScalerModel.prototype.originalMax = function () {
        var javaObject = this.getJavaObject().originalMax();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new MinMaxScalerModel(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new MinMaxScalerModel(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setMin = function (value) {
        var javaObject = this.getJavaObject().setMin(value);
        return new MinMaxScalerModel(javaObject);
    };


    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setMax = function (value) {
        var javaObject = this.getJavaObject().setMax(value);
        return new MinMaxScalerModel(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    MinMaxScalerModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new MinMaxScalerModel(javaObject);
    };


    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    MinMaxScalerModel.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    /**
     * lower bound after transformation, shared by all features Default: 0.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScalerModel.prototype.min = function () {
        var javaObject = this.getJavaObject().min();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    MinMaxScalerModel.prototype.getMin = function () {
        return this.getJavaObject().getMin();
    };

    /**
     * upper bound after transformation, shared by all features Default: 1.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScalerModel.prototype.max = function () {
        var javaObject = this.getJavaObject().max();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    MinMaxScalerModel.prototype.getMax = function () {
        return this.getJavaObject().getMax();
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    MinMaxScalerModel.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     */
    MinMaxScalerModel.prototype.validateParams = function () {
        return this.getJavaObject().validateParams();
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    MinMaxScalerModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.feature.MinMaxScalerModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.MinMaxScalerModel.load(path);
        return new MinMaxScalerModel(javaObject);
    };

    module.exports = MinMaxScalerModel;
})();