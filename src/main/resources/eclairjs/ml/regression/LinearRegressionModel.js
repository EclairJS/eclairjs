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

    var RegressionModel = require(EclairJS_Globals.NAMESPACE + '/ml/regression/RegressionModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Model produced by {@link module:eclairjs/ml/regression.LinearRegression}.
     * @class
     * @extends module:eclairjs/mllib/regression.RegressionModel
     * @memberof module:eclairjs/ml/regression
     */


    var LinearRegressionModel = function (jvmObject) {

        this.logger = Logger.getLogger("ml_regression_LinearRegressionModel_js");
        RegressionModel.call(this, jvmObject);

    };

    LinearRegressionModel.prototype = Object.create(RegressionModel.prototype);

    LinearRegressionModel.prototype.constructor = LinearRegressionModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    LinearRegressionModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LinearRegressionModel.prototype.coefficients = function () {
        var javaObject = this.getJavaObject().coefficients();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {flaot[]}
     */
    LinearRegressionModel.prototype.intercept = function () {
        return Utils.javaToJs(this.getJavaObject().intercept());
    };

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LinearRegressionModel.prototype.weights = function () {
        var javaObject = this.getJavaObject().weights();
        return Utils.javaToJs(javaObject);
    };


    /**
     * Gets summary (e.g. residuals, mse, r-squared ) of model on training set. An exception is
     * thrown if `trainingSummary == None`.
     * @returns {module:eclairjs/ml/regression.LinearRegressionTrainingSummary}
     */
    LinearRegressionModel.prototype.summary = function () {
        var javaObject = this.getJavaObject().summary();
        return Utils.javaToJs(javaObject);
    };


    /**
     *  Indicates whether a training summary exists for this model instance.
     * @returns {boolean}
     */
    LinearRegressionModel.prototype.hasSummary = function () {
        return this.getJavaObject().hasSummary();
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/regression.LinearRegressionModel}
     */
    LinearRegressionModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new LinearRegressionModel(javaObject);
    };


    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[LinearRegressionModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * This also does not save the {@link parent} currently.
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    LinearRegressionModel.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    LinearRegressionModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.regression.LinearRegressionModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/regression.LinearRegressionModel}
     */
    LinearRegressionModel.load = function (path) {
        var javaObject = org.apache.spark.ml.regression.LinearRegressionModel.load(path);
        return new LinearRegressionModel(javaObject);
    };

    module.exports = LinearRegressionModel;
})();