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

    var BinaryLogisticRegressionSummary = require(EclairJS_Globals.NAMESPACE + '/ml/classification/BinaryLogisticRegressionSummary');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Logistic regression training results.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.BinaryLogisticRegressionSummary
     */
    
    
    var BinaryLogisticRegressionTrainingSummary = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_classification_BinaryLogisticRegressionTrainingSummary_js");
    	 BinaryLogisticRegressionSummary.call(this, jvmObject);
    
    };
    
    BinaryLogisticRegressionTrainingSummary.prototype = Object.create(BinaryLogisticRegressionSummary.prototype);
    
    BinaryLogisticRegressionTrainingSummary.prototype.constructor = BinaryLogisticRegressionTrainingSummary;
    
    module.exports = BinaryLogisticRegressionTrainingSummary;
})();