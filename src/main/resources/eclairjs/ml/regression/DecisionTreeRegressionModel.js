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

    var PredictionModel = require(EclairJS_Globals.NAMESPACE + '/ml/PredictionModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * [Decision tree]{@link http://en.wikipedia.org/wiki/Decision_tree_learning} model for regression.
     * It supports both continuous and categorical features.
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml.PredictionModel
     */
    
    
    var DecisionTreeRegressionModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml.regression.DecisionTreeRegressionModel_js");
        PredictionModel.call(this, jvmObject);
    
    };
    
    DecisionTreeRegressionModel.prototype = Object.create(PredictionModel.prototype);
    
    DecisionTreeRegressionModel.prototype.constructor = DecisionTreeRegressionModel;
    
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressionModel} 
     */
    DecisionTreeRegressionModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new DecisionTreeRegressionModel(javaObject);
    };
    
    
    /**
     * @returns {string} 
     */
    DecisionTreeRegressionModel.prototype.toString = function() {
       return  this.getJavaObject().toString();
    };

    /**
     * @returns {string}
     */
    DecisionTreeRegressionModel.prototype.toDebugString = function() {
        return  this.getJavaObject().toDebugString();
    };

    module.exports = DecisionTreeRegressionModel;
})();