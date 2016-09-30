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
     * A {@link module:eclairjs/ml/Transformer} that maps a column of indices back to a new column of corresponding
     * string values.
     * The index-string mapping is either from the ML attributes of the input column,
     * or from user-supplied labels (which take precedence over ML attributes).
     *
     * @see {@link module:eclairjs/ml/feature.StringIndexer} for converting strings into indices
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     */
    var IndexToString = function (jvmObject) {

        this.logger = Logger.getLogger("ml.feature.IndexToString_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.ml.feature.IndexToString();
        }
        PipelineStage.call(this, jvmObject);

    };

    IndexToString.prototype = Object.create(PipelineStage.prototype);

    IndexToString.prototype.constructor = IndexToString;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    IndexToString.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new IndexToString(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new IndexToString(javaObject);
    };


    /**
     * @param {string[]} value
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.setLabels = function (value) {
        var javaObject = this.getJavaObject().setLabels(value);
        return new IndexToString(javaObject);
    };


    /**
     * @returns {module:eclairjs/ml/param.StringArrayParam}
     */
    IndexToString.prototype.labels = function () {
        return Utils.javaToJs(this.getJavaObject().labels());
    };

    /**
     * @returns {string[]}
     */
    IndexToString.prototype.getLabels = function () {
        return this.getJavaObject().getLabels();
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    IndexToString.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    IndexToString.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        return this.getJavaObject().copy(extra_uw);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.load = function (path) {
        return Utils.javaToJs(org.apache.spark.ml.feature.IndexToString.load(path));
    };

    module.exports = IndexToString;
})();