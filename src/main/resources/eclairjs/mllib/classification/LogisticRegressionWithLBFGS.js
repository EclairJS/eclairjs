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
    //var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    var LogisticRegressionModel = require(EclairJS_Globals.NAMESPACE + '/mllib/classification/LogisticRegressionModel');
    //var Vector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vector');

    /**
     * Train a classification model for Multinomial/Binary Logistic Regression using
     * Limited-memory BFGS. Standard feature scaling and L2 regularization are used by default.
     * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
     * for k classes multi-label classification problem.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     *  @class
     */

    var LogisticRegressionWithLBFGS = function(jvmObj) {
        this.logger = Logger.getLogger("LogisticRegressionWithLBFGS_js");
        if(jvmObj == undefined) {
            jvmObj =
                new org.apache.spark.mllib.classification.LogisticRegressionWithLBFGS();
        }

        JavaWrapper.call(this, jvmObj);
    };

    LogisticRegressionWithLBFGS.prototype = Object.create(JavaWrapper.prototype);

    LogisticRegressionWithLBFGS.prototype.constructor = LogisticRegressionWithLBFGS;


    /**
     * Set the number of possible outcomes for k classes classification problem in
     * Multinomial Logistic Regression.
     * By default, it is binary logistic regression so k will be set to 2.
     * @param {integer} numClasses
     * @returns {LogisticRegressionWithLBFGS}
     */
    LogisticRegressionWithLBFGS.prototype.setNumClasses = function(n) {
        return new LogisticRegressionWithLBFGS(this.getJavaObject().setNumClasses(n));
    };

    /**
     *
     * @param {RDD} input
     * @param {Vector} [initialWeights]
     * @returns {LogisticRegressionModel}
     */
    LogisticRegressionWithLBFGS.prototype.run = function(input, initialWeights) {
        var jvmObj;
        var input_uw = Utils.unwrapObject(input).rdd();
        if(initialWeights == undefined) {
            jvmObj = this.getJavaObject().run(input_uw);
        } else {
            jvmObj = this.getJavaObject().run(input_uw, Utils.unwrapObject(initialWeights));
        }
        return new LogisticRegressionModel(jvmObj);
    };

    module.exports = LogisticRegressionWithLBFGS;

})();
