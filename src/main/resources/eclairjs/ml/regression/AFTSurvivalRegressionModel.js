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
     * :: Experimental ::
     * Model produced by {@link AFTSurvivalRegression}.
     * @classdesc
     * @class
     * @memberof module:eclairjs/ml/regression
     */


    var AFTSurvivalRegressionModel = function (jvmObject) {

        this.logger = Logger.getLogger("AFTSurvivalRegressionModel_js");
        //MLWritable.call(this, jvmObject);
        JavaWrapper.call(this, jvmObject);

    };

    //AFTSurvivalRegressionModel.prototype = Object.create(MLWritable.prototype);
    AFTSurvivalRegressionModel.prototype = Object.create(JavaWrapper.prototype);

    AFTSurvivalRegressionModel.prototype.constructor = AFTSurvivalRegressionModel;


    /**
     * @param {string} value
     * @returns {AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setFeaturesCol = function (value) {
       var javaObject =  this.getJavaObject().setFeaturesCol(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setPredictionCol = function (value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {float[]} value
     * @returns {AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setQuantileProbabilities = function (value) {
       var javaObject =  this.getJavaObject().setQuantileProbabilities(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setQuantilesCol = function (value) {
       var javaObject =  this.getJavaObject().setQuantilesCol(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {Vector} features
     * @returns {Vector}
     */
    AFTSurvivalRegressionModel.prototype.predictQuantiles = function (features) {
       var features_uw = Utils.unwrapObject(features);
       var javaObject =  this.getJavaObject().predictQuantiles(features_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {Vector} features
     * @returns {float}
     */
    AFTSurvivalRegressionModel.prototype.predict = function (features) {
       var features_uw = Utils.unwrapObject(features);
       return  this.getJavaObject().predict(features_uw);
    };


    /**
     * @param {DataFrame} dataset
     * @returns {DataFrame}
     */
    AFTSurvivalRegressionModel.prototype.transform = function (dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    AFTSurvivalRegressionModel.prototype.transformSchema = function (schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {ParamMap} extra
     * @returns {AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.copy = function (extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {MLWriter}
     */
    AFTSurvivalRegressionModel.prototype.write = function () {
       var javaObject =  this.getJavaObject().write();
       return Utils.javaToJs(javaObject);
    };

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    AFTSurvivalRegressionModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {Vector}
     */
    AFTSurvivalRegressionModel.prototype.coefficients = function () {
        var javaObject = this.getJavaObject().coefficients();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {flaot}
     */
    AFTSurvivalRegressionModel.prototype.intercept = function () {
        return this.getJavaObject().intercept();
    };

    /**
     *
     * @returns {flaot}
     */
    AFTSurvivalRegressionModel.prototype.scale = function () {
        return this.getJavaObject().scale();
    };


    /**
     * Param for censor column name. The value of this column could be 0 or 1.
     * If the value is 1, it means the event has occurred i.e. uncensored; otherwise censored.
     * @returns {Param}
     */
    AFTSurvivalRegressionModel.prototype.censorCol = function () {
        var javaObject =  this.getJavaObject().censorCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    AFTSurvivalRegressionModel.prototype.getCensorCol = function () {
        return this.getJavaObject().getCensorCol();
    };

    /**
     * Param for quantile probabilities array. Values of the quantile probabilities array should be in the range (0, 1) and the array should be non-empty.
     * @returns {DoubleArrayParam}
     */
    AFTSurvivalRegressionModel.prototype.quantileProbabilities = function () {
        var javaObject =  this.getJavaObject().quantileProbabilities();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float[]}
     */
    AFTSurvivalRegressionModel.prototype.getQuantileProbabilities = function () {
        return this.getJavaObject().getQuantileProbabilities();
    };

    /**
     * Param for quantiles column name. This column will output quantiles of corresponding quantileProbabilities if it is set.
     * @returns {Param}
     */
    AFTSurvivalRegressionModel.prototype.quantilesCol = function () {
        var javaObject = this.getJavaObject().quantilesCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    AFTSurvivalRegressionModel.prototype.getQuantilesCol = function () {
        return this.getJavaObject().getQuantilesCol();
    };

    /**
     * Checks whether the input has quantiles column name.
     * @returns {boolean}
     */
    AFTSurvivalRegressionModel.prototype.hasQuantilesCol = function () {
        return this.getJavaObject().hasQuantilesCol();
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {StructType} schema  input schema
     * @param {boolean} fitting whether this is in fitting or prediction
     * @returns {StructType}
     */
    AFTSurvivalRegressionModel.prototype.validateAndTransformSchema = function (schema, fitting) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject =  this.getJavaObject().validateAndTransformSchema(schema_uw, fitting);
        return Utils.javaToJs(javaObject);
    };

//
// static methods
//


    /**
     * @returns {MLReader}
     */
    AFTSurvivalRegressionModel.read = function () {
       var javaObject =  org.apache.spark.ml.regression.AFTSurvivalRegressionModel.read();
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} path
     * @returns {AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.load = function (path) {
       var javaObject =  org.apache.spark.ml.regression.AFTSurvivalRegressionModel.load(path);
       return Utils.javaToJs(javaObject);
    };

    module.exports = AFTSurvivalRegressionModel;

})();