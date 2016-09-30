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
     * A label indexer that maps a string column of labels to an ML column of label indices.
     * If the input column is numeric, we cast it to string and index the string values.
     * The indices are in [0, numLabels), ordered by label frequencies.
     * So the most frequent label gets index 0.
     *
     * @see {@link module:eclairjs/ml/feature.IndexToString} for the inverse transformation
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var StringIndexer = function (uid) {
        this.logger = Logger.getLogger("ml.feature.StringIndexer_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.StringIndexer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.StringIndexer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.StringIndexer();
        }

        PipelineStage.call(this, jvmObject);

    };

    StringIndexer.prototype = Object.create(PipelineStage.prototype);

    StringIndexer.prototype.constructor = StringIndexer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    StringIndexer.prototype.uid = function () {
        return this.getJavaObject().uid();
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.setHandleInvalid = function (value) {
        var javaObject = this.getJavaObject().setHandleInvalid(value);
        return new StringIndexer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new StringIndexer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new StringIndexer(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexer.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return Utils.javaToJs(this.getJavaObject().fit(dataset_uw));
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StringIndexer.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        return Utils.javaToJs(this.getJavaObject().copy(extra_uw));
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StringIndexer.prototype.validateAndTransformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    StringIndexer.prototype.inputCol = function () {
        var javaObject = this.getJavaObject().inputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    StringIndexer.prototype.getInputCol = function () {
        return this.getJavaObject().getInputCol();
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    StringIndexer.prototype.outputCol = function () {
        var javaObject = this.getJavaObject().outputCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    StringIndexer.prototype.getOutputCol = function () {
        return this.getJavaObject().getOutputCol();
    };

    /**
     * Param for how to handle invalid entries. Options are skip (which will filter out rows with bad values),
     * or error (which will throw an errror). More options may be added later..
     * @returns {module:eclairjs/ml/param.Param}
     */
    StringIndexer.prototype.handleInvalid = function () {
        var javaObject = this.getJavaObject().handleInvalid();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    StringIndexer.prototype.getHandleInvalid = function () {
        return this.getJavaObject().getHandleInvalid();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.load = function (path) {
        return org.apache.spark.ml.feature.StringIndexer.load(path);
    };

    module.exports = StringIndexer;
})();