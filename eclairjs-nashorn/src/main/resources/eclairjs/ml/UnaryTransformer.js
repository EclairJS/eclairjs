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
     * Abstract class for transformers that take one input column, apply transformation, and output the
     * result as a new column.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Transformer
     */

    var UnaryTransformer = function (jvmObject) {
        this.logger = Logger.getLogger("ml.UnaryTransformer_js");
        Transformer.call(this, jvmObject);

    };

    UnaryTransformer.prototype = Object.create(Transformer.prototype);

    UnaryTransformer.prototype.constructor = UnaryTransformer;


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.UnaryTransformer}
     */
    UnaryTransformer.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.UnaryTransformer}
     */
    UnaryTransformer.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    UnaryTransformer.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    UnaryTransformer.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.UnaryTransformer}
     */
    UnaryTransformer.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return Utils.javaToJs(javaObject);
    };

    module.exports = UnaryTransformer;
})();