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

    //var CrossValidatorModel = Java.type('org.apache.spark.ml.tuning.CrossValidatorModel');
    
    /**
     * @classdesc
     * Model from k-fold cross validation.
     *
     * @param bestModel The best model selected from k-fold cross validation.
     * @param avgMetrics Average cross-validation metrics for each paramMap in
     *                   {@link estimatorParamMaps}, in the corresponding order.
     * @class
     * @memberof module:eclairjs/ml/tuning
     * @extends module:eclairjs/ml.Model
     */
    var CrossValidatorModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_tuning_CrossValidatorModel_js");
    	 Model.call(this, jvmObject);
    
    };
    
    CrossValidatorModel.prototype = Object.create(Model.prototype);

    CrossValidatorModel.prototype.constructor = CrossValidatorModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    CrossValidatorModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidatorModel#transform
     */
    CrossValidatorModel.prototype.transform = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().transform(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidatorModel#transformSchema
     */
    CrossValidatorModel.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/tuning.CrossValidatorModel} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidatorModel#copy
     */
    CrossValidatorModel.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new CrossValidatorModel(javaObject);
    };
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidatorModel#write
     */
    CrossValidatorModel.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //

    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidatorModel#read
     * @static
     */
    CrossValidatorModel.read = function() {
      var javaObject =  org.apache.spark.ml.tuning.CrossValidatorModel.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/tuning.CrossValidatorModel} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidatorModel#load
     * @static
     */
    CrossValidatorModel.load = function(path) {
      var javaObject =  org.apache.spark.ml.tuning.CrossValidatorModel.load(path);
      return new CrossValidatorModel(javaObject);
    };

    module.exports = CrossValidatorModel;
})();
