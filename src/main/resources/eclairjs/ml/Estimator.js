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

    var PipelineStage = require(EclairJS_Globals.NAMESPACE + '/ml/PipelineStage');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Abstract class for estimators that fit models to data.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.PipelineStage
     */
    var Estimator = function(jvmObject) {
    	 this.logger = Logger.getLogger("ml.Estimator_js");
     	 PipelineStage.call(this, jvmObject);
    
    };
    
    Estimator.prototype = Object.create(PipelineStage.prototype);
    
    Estimator.prototype.constructor = Estimator;


    /**
     * Fits a model to the input data.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @param {module:eclairjs/ml/param.ParamMap} [paramMap]  Parameter map.
     *                 These values override any specified in this Estimator's embedded ParamMap.
     * @returns {module:eclairjs/ml.Estimator | module:eclairjs/ml/feature.Bucketizer} fitted model
     */
    Estimator.prototype.fit = function(dataset, paramMap) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject;
        if (paramMap) {
            var paramMap_uw = Utils.unwrapObject(paramMap);
            javaObject =  this.getJavaObject().fit(dataset_uw, paramMap_uw);
        } else {
            javaObject =  this.getJavaObject().fit(dataset_uw);
        }

        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Estimator}
     * @abstract
     */
    Estimator.prototype.copy = function(extra) {
        throw "Abstract class must be implemented in extending class";
    //   var extra_uw = Utils.unwrapObject(extra);
    //   var javaObject =  this.getJavaObject().copy(extra_uw);
    //   return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    Estimator.prototype.extractParamMap = function() {
        var javaObject = this.getJavaObject().extractParamMap();
        return Utils.javaToJs(javaObject);
    };
    
    module.exports = Estimator;
})();