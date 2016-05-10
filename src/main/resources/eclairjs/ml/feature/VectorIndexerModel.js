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

    var PipelineStage = require(EclairJS_Globals.NAMESPACE + '/ml/PipelineStage');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Transform categorical features to use 0-based indices instead of their original values.
     *  - Categorical features are mapped to indices.
     *  - Continuous features (columns) are left unchanged.
     * This also appends metadata to the output column, marking features as Numeric (continuous),
     * Nominal (categorical), or Binary (either continuous or categorical).
     * Non-ML metadata is not carried over from the input to the output column.
     *
     * This maintains vector sparsity.
     *
     *  numFeatures  Number of features, i.e., length of Vectors which this transforms
     *  categoryMaps  Feature value index.  Keys are categorical feature indices (column indices).
     *                      Values are maps from original features values to 0-based category indices.
     *                      If a feature is not in this map, it is treated as continuous.
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     */


    var VectorIndexerModel = function (jvmObject) {

        this.logger = Logger.getLogger("ml.feature.VectorIndexerModel_js");
        PipelineStage.call(this, jvmObject);

    };

    VectorIndexerModel.prototype = Object.create(PipelineStage.prototype);

    VectorIndexerModel.prototype.constructor = VectorIndexerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    VectorIndexerModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {integer}
     */
    VectorIndexerModel.prototype.numFeatures = function () {
        return this.getJavaObject().numFeatures();
    };

    /**
     * @returns {object} Map object<integer,object<float,integer>>
     */
    VectorIndexerModel.prototype.categoryMaps = function () {
        var javaObject = this.getJavaObject().javaCategoryMaps();
        return Utils.javaToJs(javaObject); // java.util.Map
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new VectorIndexerModel(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new VectorIndexerModel(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    VectorIndexerModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    VectorIndexerModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new VectorIndexerModel(javaObject);
    };


    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    VectorIndexerModel.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    VectorIndexerModel.prototype.maxCategories = function () {
        var javaObject = this.getJavaObject().maxCategories();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    VectorIndexerModel.prototype.getMaxCategories = function () {
        return this.getJavaObject().getMaxCategories();
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    VectorIndexerModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.feature.VectorIndexerModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.VectorIndexerModel.load(path);
        return new VectorIndexerModel(javaObject);
    };

    module.exports = VectorIndexerModel;
})();