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

    var Params = require(EclairJS_Globals.NAMESPACE + '/ml/param/Params');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Abstract class for evaluators that compute metrics from predictions.
     * @class
     * @memberof module:eclairjs/ml/evaluation
     * @extends module:eclairjs/ml/param.Params
     */

    var Evaluator = function(jvmObject) {
    	 throw "Can't instantiate abstract class - Evaluator";
     	 this.logger = Logger.getLogger("ml_evaluation_Evaluator_js");
     	 Params.call(this, jvmObject);
    
    };
    
    Evaluator.prototype = Object.create(Params.prototype);
    
    Evaluator.prototype.constructor = Evaluator;
    
    
    
    /**
     * Evaluates model output and returns a scalar metric (larger is better).
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  a dataset that contains labels/observations and predictions.
     * @param {module:eclairjs/ml/param.ParamMap} [paramMap]  parameter map that specifies the input columns and output metrics
     * @returns {float}  metric
     */
    Evaluator.prototype.evaluate = function(dataset,paramMap) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var paramMap_uw = Utils.unwrapObject(paramMap);

       if (arguments[1]) {
       return  this.getJavaObject().evaluate(dataset_uw,paramMap_uw);
       } else {
       return  this.getJavaObject().evaluate(dataset_uw);
       }
    };
    
    
    /**
     * Indicates whether the metric returned by [[evaluate()]] should be maximized (true, default)
     * or minimized (false).
     * A given evaluator may support multiple metrics which may be maximized or minimized.
     * @returns {boolean} 
     */
    Evaluator.prototype.isLargerBetter = function() {
       return  this.getJavaObject().isLargerBetter();
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/evaluation.Evaluator} 
     */
    Evaluator.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return Utils.javaToJs(javaObject);
    };
    
    module.exports = Evaluator;
})();