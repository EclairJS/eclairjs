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


/**
 * Classification model trained using Multinomial/Binary Logistic Regression.
 *
 * @classdesc
 *
 * @param {Vector} weights Weights computed for every feature.
 * @param {float} intercept Intercept computed for this model. (Only used in Binary Logistic Regression.
 * In Multinomial Logistic Regression, the intercepts will not be a single value,
 * so the intercepts will be part of the weights.)
 * @param {int} numFeatures Optional the dimension of the features.
 * @param {int} numClasses Optional the number of possible outcomes for k classes classification problem in
 * Multinomial Logistic Regression. By default, it is binary logistic regression
 * so numClasses will be set to 2.
 *  @class
 */
var LogisticRegressionModel = function (weights, intercept, numFeatures, numClasses) {
    this.logger = Logger.getLogger("LogisticRegressionModel_js");
    var weights_uw = Utils.unwrapObject(weights)
    var jvmObject;
    if (arguments[0] instanceof org.apache.spark.mllib.classification.LogisticRegressionModel) {
        jvmObject = arguments[0];
    } else if (arguments.length === 4) {
        jvmObject = new org.apache.spark.mllib.classification.LogisticRegressionModel(weights_uw, intercept, numFeatures, numClasses);
    } else if (arguments.length === 2) {
        jvmObject = new org.apache.spark.mllib.classification.LogisticRegressionModel(weights_uw, intercept);
    } else {
        throw "LogisticRegressionModel constructor invalid arguments"
    }


    GeneralizedLinearModel.call(this, jvmObject);

};

LogisticRegressionModel.prototype = Object.create(GeneralizedLinearModel.prototype);

LogisticRegressionModel.prototype.constructor = LogisticRegressionModel;


/**
 * Sets the threshold that separates positive predictions from negative predictions
 * in Binary Logistic Regression. An example with prediction score greater than or equal to
 * this threshold is identified as an positive, and negative otherwise. The default value is 0.5.
 * It is only used for binary classification.
 * @param {number} threshold
 * @returns {}
 */
LogisticRegressionModel.prototype.setThreshold = function (threshold) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().setThreshold(threshold);
//   return new (javaObject);
};


/**
 * Returns the threshold (if any) used for converting raw prediction scores into 0/1 predictions.
 * It is only used for binary classification.
 * @returns {number}
 */
LogisticRegressionModel.prototype.getThreshold = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().getThreshold();
};


/**
 * Clears the threshold so that `predict` will output raw prediction scores.
 * It is only used for binary classification.
 * @returns {LogisticRegressionModel}
 */
LogisticRegressionModel.prototype.clearThreshold = function () {
   var javaObject =  this.getJavaObject().clearThreshold();
   return new LogisticRegressionModel(javaObject);
};


/**
 * @param {SparkContext} sc
 * @param {string} path
 */
LogisticRegressionModel.prototype.save = function (sc, path) {
    throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//    this.getJavaObject().save(sc_uw,path);
};


/**
 * @returns {string}
 */
/*LogisticRegressionModel.prototype.toString = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toString();
};
*/
/**
 * @returns {Vector}
 */
LogisticRegressionModel.prototype.weights = function () {
   return  Serialize.javaToJs(this.getJavaObject().weights());
};


/**
 * Train a classification model for Binary Logistic Regression
 * using Stochastic Gradient Descent. By default L2 regularization is used,
 * which can be changed via {@link optimizer}.
 * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
 * for k classes multi-label classification problem.
 * Using {@link LogisticRegressionWithLBFGS} is recommended over this.
 * @classdesc
 */

/**
 * Construct a LogisticRegression object with default parameters: {stepSize: 1.0,
 * numIterations: 100, regParm: 0.01, miniBatchFraction: 1.0}.
 * @returns {??}
 *  @class
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
 * @param {number} stepSize  Optional step size to be used for each iteration of gradient descent, defaults to 1.0.
 * @param {number} miniBatchFraction  Optional fraction of data to be used per iteration.
 * @param {Vector} initialWeights  Optional: initial set of weights to be used. Array should be equal in size to
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







/**
 * Train a classification model for Multinomial/Binary Logistic Regression using
 * Limited-memory BFGS. Standard feature scaling and L2 regularization are used by default.
 * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
 * for k classes multi-label classification problem.
 * @classdesc
 */

/**
 * @returns {??}
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
 * @param {number} numClasses
 * @returns {}
 */
LogisticRegressionWithLBFGS.prototype.setNumClasses = function(n) {
    return new LogisticRegressionWithLBFGS(
        this.getJavaObject().setNumClasses(n));
};

/**
 *
 * @param {RDD} input
 * @param {Vector} initialWeights Optional
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

//
// static methods
//


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {LogisticRegressionModel}
 */
LogisticRegressionModel.load = function (sc, path) {
    throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.classification.LogisticRegressionModel.load(sc_uw,path);
//   return new LogisticRegressionModel(javaObject);
};


