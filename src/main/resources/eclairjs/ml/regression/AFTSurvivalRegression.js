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
     * Fit a parametric survival regression model named accelerated failure time (AFT) model
     * ([[https://en.wikipedia.org/wiki/Accelerated_failure_time_model]])
     * based on the Weibull distribution of the survival time.
     * @classdesc
     *
     * @param {string} uid An immutable unique ID for the object and its derivatives.
     *  @class
     *  @memberof module:eclairjs/ml/regression
     */
    var AFTSurvivalRegression = function (uid) {
        this.logger = Logger.getLogger("ml/regression/AFTSurvivalRegression_js");
        var jvmObject;
        if (arguments.length > 0) {
            if (arguments[0] instanceof org.apache.spark.ml.regression.AFTSurvivalRegression) {
                jvmObject = arguments[0];
            } else {
                jvmObject = new org.apache.spark.ml.regression.AFTSurvivalRegression(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.regression.AFTSurvivalRegression();
        }

        JavaWrapper.call(this, jvmObject);

    };

    AFTSurvivalRegression.prototype = Object.create(JavaWrapper.prototype);

    AFTSurvivalRegression.prototype.constructor = AFTSurvivalRegression;


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setFeaturesCol = function (value) {
        var javaObject = this.getJavaObject().setFeaturesCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setLabelCol = function (value) {
        var javaObject = this.getJavaObject().setLabelCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setCensorCol = function (value) {
        var javaObject = this.getJavaObject().setCensorCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setPredictionCol = function (value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {float[]} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setQuantileProbabilities = function (value) {
       var javaObject =  this.getJavaObject().setQuantileProbabilities(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setQuantilesCol = function (value) {
       var javaObject =  this.getJavaObject().setQuantilesCol(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * Set if we should fit the intercept
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setFitIntercept = function (value) {
       var javaObject =  this.getJavaObject().setFitIntercept(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setMaxIter = function (value) {
       var javaObject =  this.getJavaObject().setMaxIter(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setTol = function (value) {
       var javaObject =  this.getJavaObject().setTol(value);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegression.prototype.fit = function (dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    AFTSurvivalRegression.prototype.transformSchema = function (schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.copy = function (extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    AFTSurvivalRegression.prototype.uid = function () {
       return this.getJavaObject().uid();
    };

    /**
     * Param for censor column name. The value of this column could be 0 or 1.
     * If the value is 1, it means the event has occurred i.e. uncensored; otherwise censored.
     * @returns {module:eclairjs/ml/param.Param}
     */
    AFTSurvivalRegression.prototype.censorCol = function () {
        var javaObject =  this.getJavaObject().censorCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    AFTSurvivalRegression.prototype.getCensorCol = function () {
        return this.getJavaObject().getCensorCol();
    };

    /**
     * Param for quantile probabilities array. Values of the quantile probabilities array should be in the range (0, 1) and the array should be non-empty.
     * @returns {module:eclairjs/ml/param.DoubleArrayParam}
     */
    AFTSurvivalRegression.prototype.quantileProbabilities = function () {
        var javaObject =  this.getJavaObject().quantileProbabilities();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float[]}
     */
    AFTSurvivalRegression.prototype.getQuantileProbabilities = function () {
        return this.getJavaObject().getQuantileProbabilities();
    };

    /**
     * Param for quantiles column name. This column will output quantiles of corresponding quantileProbabilities if it is set.
     * @returns {module:eclairjs/ml/param.Param}
     */
    AFTSurvivalRegression.prototype.quantilesCol = function () {
        var javaObject = this.getJavaObject().quantilesCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    AFTSurvivalRegression.prototype.getQuantilesCol = function () {
        return this.getJavaObject().getQuantilesCol();
    };

    /**
     * Checks whether the input has quantiles column name.
     * @returns {boolean}
     */
    AFTSurvivalRegression.prototype.hasQuantilesCol = function () {
        return this.getJavaObject().hasQuantilesCol();
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema  input schema
     * @param {boolean} fitting whether this is in fitting or prediction
     * @returns {module:eclairjs/sql/types.StructType}
     */
    AFTSurvivalRegression.prototype.validateAndTransformSchema = function (schema, fitting) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject =  this.getJavaObject().validateAndTransformSchema(schema_uw, fitting);
        return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.load = function (path) {
        var javaObject =  this.getJavaObject().load(path);
        return Utils.javaToJs(javaObject);
    };

    module.exports = AFTSurvivalRegression;

})();