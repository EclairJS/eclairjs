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

    var LinearRegressionSummary = require(EclairJS_Globals.NAMESPACE + '/ml/regression/LinearRegressionSummary');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Linear regression training results. Currently, the training summary ignores the
     * training coefficients except for the objective trace.
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/regression.LinearRegressionSummary
     */


    var LinearRegressionTrainingSummary = function (jvmObject) {

        this.logger = Logger.getLogger("ml_regression_LinearRegressionTrainingSummary_js");
        LinearRegressionSummary.call(this, jvmObject);

    };

    LinearRegressionTrainingSummary.prototype = Object.create(LinearRegressionSummary.prototype);

    LinearRegressionTrainingSummary.prototype.constructor = LinearRegressionTrainingSummary;

    /**
     *
     * @returns {string}
     */
    LinearRegressionTrainingSummary.prototype.featuresCol = function () {
        return this.getJavaObject().featuresCol();
    };

    /**
     *
     * @returns {float[]}
     */
    LinearRegressionTrainingSummary.prototype.objectiveHistory = function () {
        return Utils.javaToJs(this.getJavaObject().objectiveHistory());
    };

    /**
     *
     * @returns {integer}
     */
    LinearRegressionTrainingSummary.prototype.totalIterations = function () {
        return this.getJavaObject().totalIterations();
    };

    module.exports = LinearRegressionTrainingSummary;
})();