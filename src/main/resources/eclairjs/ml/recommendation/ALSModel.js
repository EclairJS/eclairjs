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
     * Model fitted by ALS.
     * @class
     * @memberof module:eclairjs/ml/recommendation
     */
    
    
    var ALSModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ALSModel_js");
    	// MLWritable.call(this, jvmObject);
        JavaWrapper.call(this, jvmObject);
    
    };
    
    ALSModel.prototype = Object.create(JavaWrapper.prototype);
    
    ALSModel.prototype.constructor = ALSModel;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALSModel}
     */
    ALSModel.prototype.setUserCol = function(value) {
       var javaObject =  this.getJavaObject().setUserCol(value);
       return new ALSModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALSModel}
     */
    ALSModel.prototype.setItemCol = function(value) {
       var javaObject =  this.getJavaObject().setItemCol(value);
       return new ALSModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALSModel}
     */
    ALSModel.prototype.setPredictionCol = function(value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
       return new ALSModel(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    ALSModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    ALSModel.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/recommendation.ALSModel}
     */
    ALSModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new ALSModel(javaObject);
    };
    
    
    /**
     * @returns {MLWriter} 
     */
    ALSModel.prototype.write = function() {
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
     * @returns {MLReader} 
     */
    ALSModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject =  org.apache.spark.ml.recommendation.ALSModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/recommendation.ALSModel}
     */
    ALSModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.recommendation.ALSModel.load(path);
       return new ALSModel(javaObject);
    };
    
    module.exports = ALSModel;
})();