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
     * Train a classification model for Binary Logistic Regression
     * using Stochastic Gradient Descent. By default L2 regularization is used,
     * which can be changed via {@link optimizer}.
     * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
     * for k classes multi-label classification problem.
     * Using {@link LogisticRegressionWithLBFGS} is recommended over this.
     *
     * @classdesc
     */

    /**
     * Construct a LogisticRegression object with default parameters: {stepSize: 1.0,
     * numIterations: 100, regParm: 0.01, miniBatchFraction: 1.0}.
     * @returns {??}
     *  @class
     *   @memberof module:eclairjs/mllib/classification
     */
    var LogisticRegressionWithSGD = function (jvmObject) {

        this.logger = Logger.getLogger("LogisticRegressionWithSGD_js");
        JavaWrapper.call(this, jvmObject);

    };

    LogisticRegressionWithSGD.prototype = Object.create(JavaWrapper.prototype);

    LogisticRegressionWithSGD.prototype.constructor = LogisticRegressionWithSGD;


    /**
     * Train a logistic regression model given an RDD of (label, features) pairs. We run a fixed
     * number of iterations of gradient descent using the specified step size. Each iteration uses
     * `miniBatchFraction` fraction of the data to calculate the gradient. The weights used in
     * gradient descent are initialized using the initial weights provided.
     * NOTE: Labels used in Logistic Regression should be {0, 1}
     *
     * @param {RDD} input  RDD of (label, array of features) pairs.
     * @param {number} numIterations  Number of iterations of gradient descent to run.
     * @param {number} [stepSize]  step size to be used for each iteration of gradient descent, defaults to 1.0.
     * @param {number} [miniBatchFraction]  fraction of data to be used per iteration.
     * @param {Vector} [initialWeights] initial set of weights to be used. Array should be equal in size to
     *        the number of features in the data.
     * @returns {LogisticRegressionModel}
     */
    LogisticRegressionWithSGD.train = function (input, numIterations, stepSize, miniBatchFraction, initialWeights) {
        var lrdd = input.getJavaObject().rdd();
        //var lrdd = org.apache.spark.api.java.JavaRDD.toRDD(jo);
        var model;
        if (arguments.length === 5) {
            model = org.apache.spark.mllib.classification.LogisticRegressionWithSGD.train(lrdd, numIterations, stepSize, miniBatchFraction, Utils.unwrapObject(initialWeights));
        } else if (arguments.length === 4) {
            model = org.apache.spark.mllib.classification.LogisticRegressionWithSGD.train(lrdd, numIterations, stepSize, miniBatchFraction);
        } else if (arguments.length === 3) {
            model = org.apache.spark.mllib.classification.LogisticRegressionWithSGD.train(lrdd, numIterations, stepSize);
        } else if (arguments.length === 2) {
            model = org.apache.spark.mllib.classification.LogisticRegressionWithSGD.train(lrdd, numIterations);
        } else {
            throw "LogisticRegressionWithSGD.train invalid arguments"
        }

        return new LogisticRegressionModel(model);
    };


    module.exports = LogisticRegressionWithSGD;

})();
