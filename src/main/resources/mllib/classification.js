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
 * @classdesc
 * @param {Vector} weights Weights computed for every feature. param: intercept Intercept computed for this model.
 * (Only used in Binary Logistic Regression. In Multinomial Logistic Regression, the intercepts will not be a single value,
 * so the intercepts will be part of the weights.)
 * @param {float} intercept
 * @parma {integer} numFeatures the dimension of the features.
 * @param {integer} numClasses the number of possible outcomes for k classes classification problem in Multinomial Logistic Regression.
 * By default, it is binary logistic regression so numClasses will be set to 2.
 * @constructor
 */
var LogisticRegressionModel = function() {
    var jvmObj = arguments[0];
    if (arguments.length === 2) {
        jvmObj = new org.apache.spark.mllib.classification.LogisticRegressionModel(Utils.unwrapObject(arguments[0]), arguments[1]);
    } else if (arguments.length === 4) {
        jvmObj = new org.apache.spark.mllib.classification.LogisticRegressionModel(Utils.unwrapObject(arguments[0]), arguments[1], arguments[2], arguments[3]);
    }
    GeneralizedLinearModel.call(this, jvmObj);
};

LogisticRegressionModel.prototype = Object.create(GeneralizedLinearModel.prototype);
LogisticRegressionModel.prototype.constructor = LogisticRegressionModel;

LogisticRegressionModel.prototype.clearThreshold = function() {
    this.getJavaObject().clearThreshold();
};

/*LogisticRegressionModel.prototype.predict = function(testData) {
	var p = this.getJavaObject().predict(Utils.unwrapObject(testData));
    return p;
}*/


var LogisticRegressionWithLBFGS = function(jvmObj) {

    if(jvmObj == undefined) {
        jvmObj = 
            new org.apache.spark.mllib.classification.LogisticRegressionWithLBFGS();
    }

    JavaWrapper.call(this, jvmObj);
};

LogisticRegressionWithLBFGS.prototype = Object.create(JavaWrapper.prototype);

LogisticRegressionWithLBFGS.prototype.setNumClasses = function(n) {
    return new LogisticRegressionWithLBFGS(
        this.getJavaObject().setNumClasses(n));
};

LogisticRegressionWithLBFGS.prototype.run = function(input, initialWeights) {
    if(initialWeights == undefined) {
        return new LogisticRegressionModel(
            this.getJavaObject().run(input.getJavaObject().rdd()));
    } else {
        return new LogisticRegressionModel(
            this.getJavaObject().run(input.getJavaObject().rdd(),
                                     initialWeights.getJavaObject()));
    }
};
