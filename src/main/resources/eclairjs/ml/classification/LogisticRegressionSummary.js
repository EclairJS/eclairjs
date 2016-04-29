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

    
    
    /**
     * @classdesc
     * Abstraction for Logistic Regression Results for a given model.
     * @class
     * @memberof module:eclairjs/ml/classification
     */
    
    
    var LogisticRegressionSummary = function(jvmObject) {
     	 this.logger = Logger.getLogger("LogisticRegressionSummary_js");
     	 JavaWrapper.call(this, jvmObject);
    
    };
    
    LogisticRegressionSummary.prototype = Object.create(JavaWrapper.prototype);
    
    LogisticRegressionSummary.prototype.constructor = LogisticRegressionSummary;
    
    
    
    /**
     *  Dataframe outputted by the model's `transform` method. 
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    LogisticRegressionSummary.prototype.predictions = function() {
       var javaObject =  this.getJavaObject().predictions();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     *  Field in "predictions" which gives the calibrated probability of each instance as a vector. 
     * @returns {string} 
     */
    LogisticRegressionSummary.prototype.probabilityCol = function() {
       return  this.getJavaObject().probabilityCol();
    };
    
    
    /**
     *  Field in "predictions" which gives the true label of each instance. 
     * @returns {string} 
     */
    LogisticRegressionSummary.prototype.labelCol = function() {
       return  this.getJavaObject().labelCol();
    };
    
    
    /**
     *  Field in "predictions" which gives the features of each instance as a vector. 
     * @returns {string} 
     */
    LogisticRegressionSummary.prototype.featuresCol = function() {
       return  this.getJavaObject().featuresCol();
    };
    
    module.exports = LogisticRegressionSummary;
})();