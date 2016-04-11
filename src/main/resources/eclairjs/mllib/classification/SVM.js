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

    var ClassificationModel = require(EclairJS_Globals.NAMESPACE + '/mllib/classification/ClassificationModel');

    /**
     * Model for Support Vector Machines (SVMs).
     *
     * @param weights Weights computed for every feature.
     * @param intercept Intercept computed for this model.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     * @param {Vector} weights
     * @param {float} intercept
     *  @class
     */
    var SVMModel = function (weights, intercept) {
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.classification.SVMModel) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.classification.SVMModel(Utils.unwrapObject(weights), intercept);
        }

        this.logger = Logger.getLogger("SVMModel_js");
        ClassificationModel.call(this, jvmObject);

    };

    SVMModel.prototype = Object.create(ClassificationModel.prototype);

    SVMModel.prototype.constructor = SVMModel;


    /**
     * Sets the threshold that separates positive predictions from negative predictions. An example
     * with prediction score greater than or equal to this threshold is identified as an positive,
     * and negative otherwise. The default value is 0.0.
     * @param {float} threshold
     * @returns {}
     */
    SVMModel.prototype.setThreshold = function (threshold) {
       var javaObject =  this.getJavaObject().setThreshold(threshold);
       return new (javaObject);
    };


    /**
     * Returns the threshold (if any) used for converting raw prediction scores into 0/1 predictions.
     * @returns {number}
     */
    SVMModel.prototype.getThreshold = function () {
       return  this.getJavaObject().getThreshold();
    };


    /**
     * Clears the threshold so that `predict` will output raw prediction scores.
     * @returns {SVMModel}
     */
    SVMModel.prototype.clearThreshold = function () {
       var javaObject =  this.getJavaObject().clearThreshold();
       return new SVMModel(javaObject);
    };

    /**
     * @returns {Vector}
     */
    SVMModel.prototype.weights = function () {
        var javaObject =  this.getJavaObject().weights();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {float}
     */
    SVMModel.prototype.intercept = function () {
        return this.getJavaObject().intercept();
    };

    /**
     * @param {SparkContext} sc
     * @param {string} path
     */
    SVMModel.prototype.save = function (sc, path) {
       var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(),path);
    };


    /**
     * @returns {string}
     */
    SVMModel.prototype.toString = function () {
       return  this.getJavaObject().toString();
    };


    /**
     * Train a Support Vector Machine (SVM) using Stochastic Gradient Descent. By default L2
     * regularization is used, which can be changed via {@link optimizer}.
     * NOTE: Labels used in SVM should be {0, 1}.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     */

    /**
     * Construct a SVM object with default parameters: {stepSize: 1.0, numIterations: 100,
     * regParm: 0.01, miniBatchFraction: 1.0}.
     *  @class
     */
    var SVMWithSGD = function (jvmObject) {

        this.logger = Logger.getLogger("SVMWithSGD_js");
        JavaWrapper.call(this, jvmObject);

    };

    SVMWithSGD.prototype = Object.create(JavaWrapper.prototype);

    SVMWithSGD.prototype.constructor = SVMWithSGD;

    //
    // static methods
    //


    /**
     * @param {SparkContext} sc
     * @param {string} path
     * @returns {SVMModel}
     */
    SVMModel.load = function (sc, path) {
       var sc_uw = Utils.unwrapObject(sc);
       var javaObject =  org.apache.spark.mllib.classification.SVMModel.load(sc_uw.sc(),path);
       return new SVMModel(javaObject);
    };


    /**
     * Train a SVM model given an RDD of (label, features) pairs. We run a fixed number
     * of iterations of gradient descent using the specified step size. Each iteration uses
     * `miniBatchFraction` fraction of the data to calculate the gradient. The weights used in
     * gradient descent are initialized using the initial weights provided.
     *
     * NOTE: Labels used in SVM should be {0, 1}.
     *
     * @param {RDD} input  RDD of (label, array of features) pairs.
     * @param {number} numIterations  Number of iterations of gradient descent to run.
     * @param {number} [stepSize]  Step size to be used for each iteration of gradient descent.
     * @param {number} [regParam]  Regularization parameter.
     * @param {number} [miniBatchFraction]  Fraction of data to be used per iteration.
     * @param {Vector} [initialWeights]  Initial set of weights to be used. Array should be equal in size to
     *        the number of features in the data.
     * @returns {SVMModel}
     */
    SVMWithSGD.train = function (input, numIterations, stepSize, regParam, miniBatchFraction, initialWeights) {
        var javaObject;
        var input_uw = Utils.unwrapObject(arguments[0]).rdd();
       if (arguments.length == 2) {
           javaObject =  org.apache.spark.mllib.classification.SVMWithSGD.train(input_uw,arguments[1]);
       } else if (arguments.length == 3) {
           javaObject =  org.apache.spark.mllib.classification.SVMWithSGD.train(input_uw,arguments[1],arguments[2]);
       } else if (arguments.length == 4) {
           javaObject =  org.apache.spark.mllib.classification.SVMWithSGD.train(input_uw,arguments[1],arguments[2],arguments[3]);
       } else if (arguments.length == 5) {
           javaObject =  org.apache.spark.mllib.classification.SVMWithSGD.train(input_uw,arguments[1],arguments[2],arguments[3],arguments[4]);
       } else if (arguments.length == 6) {
           var initialWeights_uw = Utils.unwrapObject(arguments[5]);
           javaObject =  org.apache.spark.mllib.classification.SVMWithSGD.train(input_uw,arguments[1],arguments[2],arguments[3],arguments[4],initialWeights_uw);
       } else {
           throw "SVMWithSGD.train wrong number of arguments."
       }

       return new SVMModel(javaObject);
    };

    module.exports = {
        SVMModel: SVMModel,
        SVMWithSGD: SVMWithSGD
    };

})();
