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

var LogisticRegressionModel = function(jvmObj) {
    JavaWrapper.call(this, jvmObj);
};

LogisticRegressionModel.prototype = Object.create(JavaWrapper.prototype); 
LogisticRegressionModel.prototype.constructor = LogisticRegressionModel;

LogisticRegressionModel.prototype.clearThreshold = function() {
    this.getJavaObject().clearThreshold();
};

LogisticRegressionModel.prototype.predict = function(testData) {
	var p = this.getJavaObject().predict(Utils.unwrapObject(testData));
    return p;
}


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
