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
     * Implements the transforms required for fitting a dataset against an R model formula. Currently
     * we support a limited subset of the R operators, including '~', '.', ':', '+', and '-'. Also see
     * the R formula docs here: http://stat.ethz.ch/R-manual/R-patched/library/stats/html/formula.html
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var RFormula = function (uid) {
        this.logger = Logger.getLogger("ml_feature_RFormula_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.RFormula) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.RFormula(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.RFormula();
        }
        Estimator.call(this, jvmObject);

    };

    RFormula.prototype = Object.create(Estimator.prototype);

    RFormula.prototype.constructor = RFormula;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    RFormula.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * R formula parameter. The formula is provided in string form.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RFormula.prototype.formula = function () {
        var javaObject = this.getJavaObject().formula();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Sets the formula to use for this transformer. Must be called before use.
     * @param {string} value  an R formula in string form (e.g. "y ~ x + z")
     * @returns {module:eclairjs/ml/feature.RFormula}
     */
    RFormula.prototype.setFormula = function (value) {
        var javaObject = this.getJavaObject().setFormula(value);
        return new RFormula(javaObject);
    };


    /**
     * @returns {string}
     */
    RFormula.prototype.getFormula = function () {
        return this.getJavaObject().getFormula();
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.RFormula}
     */
    RFormula.prototype.setFeaturesCol = function (value) {
        var javaObject = this.getJavaObject().setFeaturesCol(value);
        return new RFormula(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.RFormula}
     */
    RFormula.prototype.setLabelCol = function (value) {
        var javaObject = this.getJavaObject().setLabelCol(value);
        return new RFormula(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/feature.RFormulaModel}
     */
    RFormula.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    RFormula.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.RFormula}
     */
    RFormula.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new RFormula(javaObject);
    };


    /**
     * @returns {string}
     */
    RFormula.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * @param {module:eclairjs/sql/types.StructType}
     * @returns {boolean}
     */
    RFormula.prototype.hasLabelCol = function (schema) {
        return this.getJavaObject().hasLabelCol(schema);
    };

    module.exports = RFormula;
})();