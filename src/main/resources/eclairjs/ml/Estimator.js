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
     * Fits a single model to the input data with optional parameters.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @param {module:eclairjs/ml/param.ParamPair} firstParamPair  the first param pair, overrides embedded params
     * @param {...module:eclairjs/ml/param.ParamPair} otherParamPairs  other param pairs.  These values override any specified in this
     *                        Estimator's embedded ParamMap.
     * @returns {object}  fitted model
     * @ignore
     */
    Estimator.prototype.fit0 = function(dataset,firstParamPair,otherParamPairs) {
    throw "not implemented by ElairJS";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var firstParamPair_uw = Utils.unwrapObject(firstParamPair);
    // // TODO: handle repeated parm 'otherParamPairs'
    //   var otherParamPairs_uw = Utils.unwrapObject(otherParamPairs);
    //   var javaObject =  this.getJavaObject().fit(dataset_uw,firstParamPair_uw,otherParamPairs_uw);
    //   return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * Fits a single model to the input data with provided parameter map.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @param {module:eclairjs/ml/param.ParamMap} paramMap  Parameter map.
     *                 These values override any specified in this Estimator's embedded ParamMap.
     * @returns {object}  fitted model
     * @ignore
     */
    Estimator.prototype.fit1 = function(dataset,paramMap) {
    throw "not implemented by ElairJS";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var paramMap_uw = Utils.unwrapObject(paramMap);
    //   var javaObject =  this.getJavaObject().fit(dataset_uw,paramMap_uw);
    //   return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * Fits a model to the input data.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {object}
     * @abstract
     */
    Estimator.prototype.fit = function(dataset) {
        throw "Abstract class must be implemented in extending class";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var javaObject =  this.getJavaObject().fit(dataset_uw);
    //   return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * Fits multiple models to the input data with multiple sets of parameters.
     * The default implementation uses a for loop on each parameter map.
     * Subclasses could override this to optimize multi-model training.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @param {ParamMap[]} paramMaps  An array of parameter maps.
     *                  These values override any specified in this Estimator's embedded ParamMap.
     * @returns {object[]}  fitted models, matching the input parameter maps
     * @ignore
     */
    Estimator.prototype.fit3 = function(dataset,paramMaps) {
    throw "not implemented by ElairJS";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var paramMaps_uw = Utils.unwrapObject(paramMaps);
    //   var javaObject =  this.getJavaObject().fit(dataset_uw,paramMaps_uw);
    //   return Utils.javaToJs(javaObject);
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
    
    module.exports = Estimator;
})();