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

    //var GeneralizedLinearRegressionSummary = Java.type('org.apache.spark.ml.regression.GeneralizedLinearRegressionSummary');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Summary of {@link GeneralizedLinearRegression} model and predictions.
     *
     * @param dataset Dataset to be summarized.
     * @param origModel Model to be summarized.  This is copied to create an internal
     *                  model which cannot be modified from outside.
     * @class
     * @memberof module:eclairjs/ml/regression
     */
    var GeneralizedLinearRegressionSummary = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_regression_GeneralizedLinearRegressionSummary_js");
    	 JavaWrapper.call(this, jvmObject);
    
    };

    GeneralizedLinearRegressionSummary.prototype = Object.create(JavaWrapper.prototype);

    GeneralizedLinearRegressionSummary.prototype.constructor = GeneralizedLinearRegressionSummary;
    

    /**
     *
     * Akaike Information Criterion (AIC) for the fitted model.
     *
     * @returns {double}
     */
    GeneralizedLinearRegressionSummary.prototype.aic = function () {
        return Utils.javaToJs(this.getJavaObject().aic());
    };

    /**
     *
     * The deviance for the fitted model.
     *
     * @returns {double}
     */
    GeneralizedLinearRegressionSummary.prototype.deviance = function () {
        return Utils.javaToJs(this.getJavaObject().deviance());
    };

    /**
     *
     * Degrees of freedom.
     *
     * @returns {double}
     */
    GeneralizedLinearRegressionSummary.prototype.degreesOfFreedom = function () {
        return Utils.javaToJs(this.getJavaObject().degreesOfFreedom());
    };

    /**
     *
     * The dispersion of the fitted model.
     *
     * @returns {double}
     */
    GeneralizedLinearRegressionSummary.prototype.dispersion = function () {
        return Utils.javaToJs(this.getJavaObject().dispersion());
    };

    /**
     *
     * The deviance for the null model.
     *
     * @returns {double}
     */
    GeneralizedLinearRegressionSummary.prototype.nullDeviance = function () {
        return Utils.javaToJs(this.getJavaObject().nullDeviance());
    };

    /**
     *
     * The residual degrees of freedom.
     *
     * @returns {int}
     */
    GeneralizedLinearRegressionSummary.prototype.residualDegreeOfFreedom = function () {
        return Utils.javaToJs(this.getJavaObject().residualDegreeOfFreedom());
    };

    /**
     *
     * The residual degrees of freedom for the null model.
     *
     * @returns {int}
     */
    GeneralizedLinearRegressionSummary.prototype.residualDegreeOfFreedomNull = function () {
        return Utils.javaToJs(this.getJavaObject().residualDegreeOfFreedomNull());
    };

    /**
     *
     * Predictions output by the model's `transform` method.
     *
     * @returns {module:eclairjs/sql.Dataset}
     */
    GeneralizedLinearRegressionSummary.prototype.predictions = function () {
        return Utils.javaToJs(this.getJavaObject().predictions());
    };

    
    /**
     * Get the residuals of the fitted model by type.
     *
     * @param {string} [residualsType]  The type of residuals which should be returned.
     *                      Supported options: deviance, pearson, working and response.
     * @returns {module:eclairjs/sql.Dataset} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionSummary#residuals
     */
    GeneralizedLinearRegressionSummary.prototype.residuals = function(residualsType) {
    
      if (arguments[0]) {
        return Utils.javaToJs(this.getJavaObject().residuals(residualsType));
      } else {
        return Utils.javaToJs(this.getJavaObject().residuals());
      }
    };

    module.exports = GeneralizedLinearRegressionSummary;
})();
