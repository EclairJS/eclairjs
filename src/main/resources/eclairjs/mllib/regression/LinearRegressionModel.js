/*
 * Copyright 2015 IBM Corp.
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
     * @constructor
     * @memberof module:eclairjs/mllib/regression
     * @classdesc Model produced by LinearRegression.
     */
    var LinearRegressionModel = function (jvmObj) {
        this.logger = Logger.getLogger("mllib.regression.LinearRegressionModel_js");

        JavaWrapper.call(this, jvmObj);
    };

    LinearRegressionModel.prototype = Object.create(JavaWrapper.prototype);

    LinearRegressionModel.prototype.constructor = LinearRegressionModel;
    /**
     * Predict label for the given features.
     * @param {Vector} features
     * @returns {float}
     */
    LinearRegressionModel.prototype.predict = function (features) {

        var p = this.getJavaObject().predict(Utils.unwrapObject(features));
        this.logger.debug("p " + p);
        return p;
    };

    module.exports = LinearRegressionModel;

})();



