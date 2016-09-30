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

    var GeneralizedLinearRegressionSummary = require(EclairJS_Globals.NAMESPACE + '/ml/regression/GeneralizedLinearRegressionSummary');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var GeneralizedLinearRegressionTrainingSummary = Java.type('org.apache.spark.ml.regression.GeneralizedLinearRegressionTrainingSummary');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Summary of {@link GeneralizedLinearRegression} fitting and model.
     *
     * @param dataset Dataset to be summarized.
     * @param origModel Model to be summarized.  This is copied to create an internal
     *                  model which cannot be modified from outside.
     * @param diagInvAtWA diagonal of matrix (A^T * W * A)^-1 in the last iteration
     * @param numIterations number of iterations
     * @param solver the solver algorithm used for model training
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/regression.GeneralizedLinearRegressionSummary
     */
    var GeneralizedLinearRegressionTrainingSummary = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_regression_GeneralizedLinearRegressionTrainingSummary_js");
    	 GeneralizedLinearRegressionSummary.call(this, jvmObject);
    
    };

    GeneralizedLinearRegressionTrainingSummary.prototype = Object.create(GeneralizedLinearRegressionSummary.prototype);

    GeneralizedLinearRegressionTrainingSummary.prototype.constructor = GeneralizedLinearRegressionTrainingSummary;

    /**
     * Standard error of estimated coefficients and intercept.
     * @returns {float[]}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.coefficientStandardErrors = function () {
        return Utils.javaToJs(this.getJavaObject().coefficientStandardErrors());
    };

    /**
     * T-statistic of estimated coefficients and intercept.
     * @returns {double[]}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.tValues = function () {
        return Utils.javaToJs(this.getJavaObject().tValues());
    };

    /**
     * Two-sided p-value of estimated coefficients and intercept.
     * @returns {double[]}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.pValues = function () {
        return Utils.javaToJs(this.getJavaObject().pValues());
    };
    
    module.exports = GeneralizedLinearRegressionTrainingSummary;
})();
