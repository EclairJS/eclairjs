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
     * Abstract class for transformers that transform one dataset into another.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.PipelineStage
     */
    var Transformer = function(jvmObject) {
        this.logger = Logger.getLogger("Transformer_js");
        PipelineStage.call(this, jvmObject);
    
    };
    
    Transformer.prototype = Object.create(PipelineStage.prototype);
    
    Transformer.prototype.constructor = Transformer;
    
    
    
    /**
     * Transforms the dataset with optional parameters
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @param {module:eclairjs/ml/param.ParamPair} firstParamPair  the first param pair, overwrite embedded params
     * @param {...module:eclairjs/ml/param.ParamPair} otherParamPairs  other param pairs, overwrite embedded params
     * @returns {module:eclairjs/sql.DataFrame}  transformed dataset
     * @ignore
     */
    Transformer.prototype.transform0 = function(dataset,firstParamPair,otherParamPairs) {
    throw "not implemented by ElairJS";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var firstParamPair_uw = Utils.unwrapObject(firstParamPair);
    // // TODO: handle repeated parm 'otherParamPairs'
    //   var otherParamPairs_uw = Utils.unwrapObject(otherParamPairs);
    //   var javaObject =  this.getJavaObject().transform(dataset_uw,firstParamPair_uw,otherParamPairs_uw);
    //   return new DataFrame(javaObject);
    };
    
    
    /**
     * Transforms the dataset with provided parameter map as additional parameters.
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @param {module:eclairjs/ml/param.ParamMap} paramMap  additional parameters, overwrite embedded params
     * @returns {module:eclairjs/sql.DataFrame}  transformed dataset
     * @ignore
     */
    Transformer.prototype.transform1 = function(dataset,paramMap) {
    throw "not implemented by ElairJS";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var paramMap_uw = Utils.unwrapObject(paramMap);
    //   var javaObject =  this.getJavaObject().transform(dataset_uw,paramMap_uw);
    //   return new DataFrame(javaObject);
    };
    
    
    /**
     * Transforms the input dataset.
     * @abstract
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    Transformer.prototype.transform = function(dataset) {
        throw "Abstract class must be implemented in extending class";
    //   var dataset_uw = Utils.unwrapObject(dataset);
    //   var javaObject =  this.getJavaObject().transform(dataset_uw);
    //   return new DataFrame(javaObject);
    };
    
    
    /**
     * @abstract
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Transformer} 
     */
    Transformer.prototype.copy = function(extra) {
    throw "Abstract class must be implemented in extending class";
    //   var extra_uw = Utils.unwrapObject(extra);
    //   var javaObject =  this.getJavaObject().copy(extra_uw);
    //   return Utils.javaToJs(javaObject);
    };
    
    module.exports = Transformer;
})();