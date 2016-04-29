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
     * :: Experimental ::
     * Builder for a param grid used in grid search-based model selection.
     * @class
     * @memberof module:eclairjs/ml/tuning
     */
    
    /**
     * @constructor
     */
    var ParamGridBuilder = function() {
    	 var jvmObject= new org.apache.spark.ml.tuning.ParamGridBuilder();
    	 this.logger = Logger.getLogger("ParamGridBuilder_js");
    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    ParamGridBuilder.prototype = Object.create(JavaWrapper.prototype);
    
    ParamGridBuilder.prototype.constructor = ParamGridBuilder;
    
    
    
    /**
     * Sets the given parameters in this grid to fixed values.
     * @param {module:eclairjs/ml/param.ParamMap} paramMap
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.baseOnwithParamMap = function(paramMap) {
       var paramMap_uw = Utils.unwrapObject(paramMap);
       var javaObject =  this.getJavaObject().baseOn(paramMap_uw);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Sets the given parameters in this grid to fixed values.
     * @param {...module:eclairjs/ml/param.ParamPair} paramPairs
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.baseOnwithParamPair = function(paramPairs) {
    // // TODO: handle repeated parm 'paramPairs'
       var paramPairs_uw = Utils.unwrapObject(paramPairs);
       var javaObject =  this.getJavaObject().baseOn(paramPairs_uw);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Adds a param with multiple values (overwrites if the input param exists).
     * @param {module:eclairjs/ml/param.Param} param
     * @param {Iterable} values
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.addGrid0 = function(param,values) {
       var param_uw = Utils.unwrapObject(param);
       var values_uw = Utils.unwrapObject(values);
       var javaObject =  this.getJavaObject().addGrid(param_uw,values_uw);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Adds a double param with multiple values.
     * @param {module:eclairjs/ml/param.DoubleParam} param
     * @param {number[]} values
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.addGridDouble = function(param,values) {
       var param_uw = Utils.unwrapObject(param);
       var javaObject =  this.getJavaObject().addGrid(param_uw,values);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Adds a int param with multiple values.
     * @param {module:eclairjs/ml/param.IntParam} param
     * @param {number[]} values
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.addGridInt = function(param,values) {
       var param_uw = Utils.unwrapObject(param);
       var javaObject =  this.getJavaObject().addGrid(param_uw,values);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Adds a float param with multiple values.
     * @param {module:eclairjs/ml/param.FloatParam} param
     * @param {number[]} values
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.addGridFloat = function(param,values) {
       var param_uw = Utils.unwrapObject(param);
       var javaObject =  this.getJavaObject().addGrid(param_uw,values);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Adds a long param with multiple values.
     * @param {module:eclairjs/ml/param.LongParam} param
     * @param {number[]} values
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.addGridLong = function(param,values) {
       var param_uw = Utils.unwrapObject(param);
       var javaObject =  this.getJavaObject().addGrid(param_uw,values);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Adds a boolean param with true and false.
     * @param {module:eclairjs/ml/param.BooleanParam} param
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder} 
     */
    ParamGridBuilder.prototype.addGridBoolean = function(param) {
       var param_uw = Utils.unwrapObject(param);
       var javaObject =  this.getJavaObject().addGrid(param_uw);
       return new ParamGridBuilder(javaObject);
    };
    
    
    /**
     * Builds and returns all combinations of parameters specified by the param grid.
     * @returns {ParamMap[]} 
     */
    ParamGridBuilder.prototype.build = function() {
       var javaObject =  this.getJavaObject().build();
       return Utils.javaToJs(javaObject);
    };
    
    module.exports = ParamGridBuilder;
})();