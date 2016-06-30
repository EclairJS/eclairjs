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
     * Model fitted by {@link module:eclairjs/ml/feature.StringIndexer}.
     *
     * NOTE: During transformation, if the input column does not exist,
     * {@link module:eclairjs/ml.Transformer#transform} would return the input dataset unmodified.
     * This is a temporary fix for the case when target labels do not exist during prediction.
     *
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string[]} labels Ordered list of labels, corresponding to indices to be assigned.
     * @param {string} [uid]
     */
    var StringIndexerModel = function (uid, labels) {

        this.logger = Logger.getLogger("ml.feature.StringIndexerModel_js");
        var jvmObject;
        if (uid instanceof org.apache.spark.ml.feature.StringIndexerModel) {
            jvmObject = uid;
        } else {
            if (uid) {
                jvmObject = new org.apache.spark.ml.feature.StringIndexerModel(uid, labels);
            } else {
                jvmObject = new org.apache.spark.ml.feature.StringIndexerModel(labels);
            }
        }
        JavaWrapper.call(this, jvmObject);

    };

    StringIndexerModel.prototype = Object.create(JavaWrapper.prototype);

    StringIndexerModel.prototype.constructor = StringIndexerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    StringIndexerModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {string[]}
     */
    StringIndexerModel.prototype.labels = function () {
        return Utils.javaToJs(this.getJavaObject().labels());
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.setHandleInvalid = function (value) {
        var javaObject = this.getJavaObject().setHandleInvalid(value);
        return new StringIndexerModel(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new StringIndexerModel(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new StringIndexerModel(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    StringIndexerModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StringIndexerModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        return Utils.javaToJs(this.getJavaObject().copy(extra_uw));
    };


    /**
     * @returns {StringIndexModelWriter}
     */
    StringIndexerModel.prototype.write = function () {
        return Utils.javaToJs(this.getJavaObject().write());
    };

    /**
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StringIndexerModel.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    StringIndexerModel.prototype.inputCol = function () {
        var javaObject = this.getJavaObject().inputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    StringIndexerModel.prototype.getInputCol = function () {
        return this.getJavaObject().getInputCol();
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    StringIndexerModel.prototype.outputCol = function () {
        var javaObject = this.getJavaObject().outputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    StringIndexerModel.prototype.getOutputCol = function () {
        return this.getJavaObject().getOutputCol();
    };

    /**
     * Param for how to handle invalid entries. Options are skip (which will filter out rows with bad values),
     * or error (which will throw an errror). More options may be added later..
     * @returns {module:eclairjs/ml/param.Param}
     */
    StringIndexerModel.prototype.handleInvalid = function () {
        var javaObject = this.getJavaObject().handleInvalid();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    StringIndexerModel.prototype.getHandleInvalid = function () {
        return this.getJavaObject().getHandleInvalid();
    };
    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    StringIndexerModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.feature.StringIndexerModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.load = function (path) {
        return Utils.javaToJs(org.apache.spark.ml.feature.StringIndexerModel.load(path));
    };

    module.exports = StringIndexerModel;
})();