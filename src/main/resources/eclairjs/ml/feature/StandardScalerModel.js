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
    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Model fitted by {@link StandardScaler}.
     *
     * @param std Standard deviation of the StandardScalerModel
     * @param mean Mean of the StandardScalerModel
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Model
     */
    
    
    var StandardScalerModel = function(jvmObject) {

    	 if (!jvmObject)
    	   jvmObject=new org.apache.spark.ml.feature.StandardScalerModel();
    	 this.logger = Logger.getLogger("StandardScalerModel_js");
    	 Model.call(this, jvmObject);
    
    };
    
    StandardScalerModel.prototype = Object.create(Model.prototype);
    
    StandardScalerModel.prototype.constructor = StandardScalerModel;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.StandardScalerModel} 
     */
    StandardScalerModel.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new StandardScalerModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.StandardScalerModel} 
     */
    StandardScalerModel.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new StandardScalerModel(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    StandardScalerModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    StandardScalerModel.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.StandardScalerModel} 
     */
    StandardScalerModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new StandardScalerModel(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    StandardScalerModel.prototype.write = function() {
       var javaObject =  this.getJavaObject().write();
       return Utils.javaToJs(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    StandardScalerModel.read = function() {
       var javaObject =  org.apache.spark.ml.feature.StandardScalerModel.read();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.StandardScalerModel} 
     */
    StandardScalerModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.StandardScalerModel.load(path);
       return new StandardScalerModel(javaObject);
    };
    
    module.exports = StandardScalerModel;
})();