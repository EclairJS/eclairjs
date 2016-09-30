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

    //var OneVsRestModel = Java.type('org.apache.spark.ml.classification.OneVsRestModel');
    
    /**
     * @classdesc
     * Model produced by {@link OneVsRest}.
     * This stores the models resulting from training k binary classifiers: one for each class.
     * Each example is scored against all k models, and the model with the highest score
     * is picked to label the example.
     *
     * @param labelMetadata Metadata of label column if it exists, or Nominal attribute
     *                      representing the number of classes in training dataset otherwise.
     * @param models The binary classification models for the reduction.
     *               The i-th model is produced by testing the i-th class (taking label 1) vs the rest
     *               (taking label 0).
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml.Model
     */
    var OneVsRestModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("OneVsRestModel_js");
    	 Model.call(this, jvmObject);
    
    };
    
    OneVsRestModel.prototype = Object.create(Model.prototype);

    OneVsRestModel.prototype.constructor = OneVsRestModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    OneVsRestModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRestModel#transformSchema
     */
    OneVsRestModel.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRestModel#transform
     */
    OneVsRestModel.prototype.transform = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().transform(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.OneVsRestModel} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRestModel#copy
     */
    OneVsRestModel.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new OneVsRestModel(javaObject);
    };
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRestModel#write
     */
    OneVsRestModel.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };

    //
    //static methods
    //    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRestModel#read
     * @static
     */
    OneVsRestModel.read = function() {
      var javaObject =  org.apache.spark.ml.classification.OneVsRestModel.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/classification.OneVsRestModel} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRestModel#load
     * @static
     */
    OneVsRestModel.load = function(path) {
      var javaObject =  org.apache.spark.ml.classification.OneVsRestModel.load(path);
      return new OneVsRestModel(javaObject);
    };

    module.exports = OneVsRestModel;
})();
