
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
/** 
 * @constructor
 * @classdesc GeneralizedLinearModel (GLM) represents a model trained using GeneralizedLinearAlgorithm.
 * GLMs consist of a weight vector and an intercept.
 * @param {Vector} weights
 * @param {float} intercept
 */
var GeneralizedLinearModel = function(jvmObj) {
	this.logger = Logger.getLogger("mllib.regression.GeneralizedLinearModel_js");

	JavaWrapper.call(this, jvmObj);
};

GeneralizedLinearModel.prototype = Object.create(JavaWrapper.prototype);

GeneralizedLinearModel.prototype.constructor = GeneralizedLinearModel;
/**
 * Predict values for a single data point using the model trained.
 * @param {Vector} testData
 * @returns {float}
 */
GeneralizedLinearModel.prototype.predict = function(testData) {

	return this.getJavaObject().predict(Utils.unwrapObject(testData));
};




