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

    //var MaxAbsScalerModel = Java.type('org.apache.spark.ml.feature.MaxAbsScalerModel');
    
    /**
     * @classdesc
     * :: Experimental ::
     * Model fitted by {@link MaxAbsScaler}.
     *
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Model
     */
    var MaxAbsScalerModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_feature_MaxAbsScalerModel_js");
    	 Model.call(this, jvmObject);
    
    };

    MaxAbsScalerModel.prototype = Object.create(Model.prototype);

    MaxAbsScalerModel.prototype.constructor = MaxAbsScalerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MaxAbsScalerModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MaxAbsScalerModel} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#setInputCol
     */
    MaxAbsScalerModel.prototype.setInputCol = function(value) {
      var javaObject =  this.getJavaObject().setInputCol(value);
      return new MaxAbsScalerModel(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MaxAbsScalerModel} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#setOutputCol
     */
    MaxAbsScalerModel.prototype.setOutputCol = function(value) {
      var javaObject =  this.getJavaObject().setOutputCol(value);
      return new MaxAbsScalerModel(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#transform
     */
    MaxAbsScalerModel.prototype.transform = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().transform(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#transformSchema
     */
    MaxAbsScalerModel.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.MaxAbsScalerModel} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#copy
     */
    MaxAbsScalerModel.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new MaxAbsScalerModel(javaObject);
    };
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#write
     */
    MaxAbsScalerModel.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };


    //
    // static methods
    //
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#read
     * @static
     */
    MaxAbsScalerModel.read = function() {
      var javaObject =  org.apache.spark.ml.feature.MaxAbsScalerModel.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.MaxAbsScalerModel} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScalerModel#load
     * @static
     */
    MaxAbsScalerModel.load = function(path) {
      var javaObject =  org.apache.spark.ml.feature.MaxAbsScalerModel.load(path);
      return new MaxAbsScalerModel(javaObject);
    };

    module.exports = MaxAbsScalerModel;
})();
