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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Represents a fitted pipeline.
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml
     */
    
    
    var PipelineModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml.PipelineModel_js");
        Model.call(this, jvmObject);
    
    };
    
    PipelineModel.prototype = Object.create(Model.prototype);
    
    PipelineModel.prototype.constructor = PipelineModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    PipelineModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {module:eclairjs/ml.Transformer[]}
     */
    PipelineModel.prototype.stages = function () {
        return Utils.javaToJs(this.getJavaObject().stages());
    };

    /**
     * validateParams
     */
    PipelineModel.prototype.validateParams = function() {
    //    this.getJavaObject().validateParams();
    };
    
    
    /**
     * Transforms the input dataset.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    PipelineModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    PipelineModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.PipelineModel} 
     */
    PipelineModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new PipelineModel(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    PipelineModel.prototype.write = function() {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
            the object is an inner class so don't use Utils.javaToJs
            to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    PipelineModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.PipelineModel.read();
        /*
            The object is and inner class so don't user Utils.javaToJs
            to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml.PipelineModel} 
     */
    PipelineModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.PipelineModel.load(path);
       return new PipelineModel(javaObject);
    };
    
    module.exports = PipelineModel;
})();