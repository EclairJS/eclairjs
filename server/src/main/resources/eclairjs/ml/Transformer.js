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
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @param {module:eclairjs/ml/param.ParamMap | module:eclairjs/ml/param.ParamPair} [params] additional parameters, overwrite embedded params, overwrite embedded params
     * @param {...module:eclairjs/ml/param.ParamPair} [otherParamPairs]  other param pairs, Only used if argument two is {@link module:eclairjs/ml/param.ParamPair}. Overwrite embedded params
     * @returns {module:eclairjs/sql.Dataset}  transformed dataset
     */
    Transformer.prototype.transform = function() {
        var ParamMap = require(EclairJS_Globals.NAMESPACE + '/ml/param/ParamMap');
       var dataset_uw = Utils.unwrapObject(arguments[0]);
        var javaObject;
        if (arguments.length == 1) {
            javaObject =  this.getJavaObject().transform(dataset_uw);
        } else if (arguments[1] instanceof ParamMap) {
            var paramMap_uw = Utils.unwrapObject(arguments[1]);
            javaObject =  this.getJavaObject().transform(dataset_uw,paramMap_uw);
        } else {
            var firstParamPair_uw = Utils.unwrapObject(arguments[1]);
            var otherParamPairs_uw = [];
            for (var i = 2; i < arguments.length; i++) {
                otherParamPairs_uw.push(Utils.unwrapObject(arguments[i])) ;
            }
            javaObject =  this.getJavaObject().transform(dataset_uw,firstParamPair_uw,otherParamPairs_uw);
        }
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Transformer} 
     */
    Transformer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return Utils.javaToJs(javaObject);
    };
    
    module.exports = Transformer;
})();