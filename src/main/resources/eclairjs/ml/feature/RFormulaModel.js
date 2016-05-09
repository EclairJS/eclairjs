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
     * A fitted RFormula. Fitting is required to determine the factor levels of formula terms.
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml/feature
     */


    var RFormulaModel = function (jvmObject) {

        this.logger = Logger.getLogger("RFormulaModel_js");
        Model.call(this, jvmObject);

    };

    RFormulaModel.prototype = Object.create(Model.prototype);

    RFormulaModel.prototype.constructor = RFormulaModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    RFormulaModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    RFormulaModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    RFormulaModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.RFormulaModel}
     */
    RFormulaModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new RFormulaModel(javaObject);
    };


    /**
     * @returns {string}
     */
    RFormulaModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * @param {module:eclairjs/sql/types.StructType}
     * @returns {boolean}
     */
    RFormulaModel.prototype.hasLabelCol = function (schema) {
        return this.getJavaObject().hasLabelCol(schema);
    };

    module.exports = RFormulaModel;
})();