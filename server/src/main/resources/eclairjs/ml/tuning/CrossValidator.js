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

    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');

    //var CrossValidator = Java.type('org.apache.spark.ml.tuning.CrossValidator');
    
    /**
     * @classdesc
     * K-fold cross validation.
     * @class
     * @memberof module:eclairjs/ml/tuning
     * @extends module:eclairjs/ml.Estimator
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#<init>
     */
    var CrossValidator = function(uid) {
        this.logger = Logger.getLogger("ml_tuning_CrossValidator_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.tuning.CrossValidator) {
                jvmObject = uid;
            } else {
                jvmObject =  new org.apache.spark.ml.tuning.CrossValidator(uid);
            }
        } else {
            jvmObject =  new org.apache.spark.ml.tuning.CrossValidator();
        }
        Estimator.call(this, jvmObject);
    };

    CrossValidator.prototype = Object.create(Estimator.prototype);

    CrossValidator.prototype.constructor = CrossValidator;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    CrossValidator.prototype.uid = function () {
        return this.getJavaObject().uid();
    };    
    
    /**
     * @param {module:eclairjs/ml.Estimator} value
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#setEstimator
     */
    CrossValidator.prototype.setEstimator = function(value) {
      var value_uw = Utils.unwrapObject(value);
      var javaObject =  this.getJavaObject().setEstimator(value_uw);
      return new CrossValidator(javaObject);
    };
    
    /**
     * @param {ParamMap[]} value
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#setEstimatorParamMaps
     */
    CrossValidator.prototype.setEstimatorParamMaps = function(value) {
      var value_uw = Utils.unwrapObject(value);
      var javaObject =  this.getJavaObject().setEstimatorParamMaps(value_uw);
      return new CrossValidator(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/evaluation.Evaluator} value
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#setEvaluator
     */
    CrossValidator.prototype.setEvaluator = function(value) {
      var value_uw = Utils.unwrapObject(value);
      var javaObject =  this.getJavaObject().setEvaluator(value_uw);
      return new CrossValidator(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#setNumFolds
     */
    CrossValidator.prototype.setNumFolds = function(value) {
      var javaObject =  this.getJavaObject().setNumFolds(value);
      return new CrossValidator(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#setSeed
     */
    CrossValidator.prototype.setSeed = function(value) {
      var javaObject =  this.getJavaObject().setSeed(value);
      return new CrossValidator(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/tuning.CrossValidatorModel} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#fit
     */
    CrossValidator.prototype.fit = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().fit(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#transformSchema
     */
    CrossValidator.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#copy
     */
    CrossValidator.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new CrossValidator(javaObject);
    };
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#write
     */
    CrossValidator.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };


    //
    //static methods
    //    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#read
     * @static
     */
    CrossValidator.read = function() {
      var javaObject =  org.apache.spark.ml.tuning.CrossValidator.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/tuning.CrossValidator} 
     * @function
     * @name module:eclairjs/ml/tuning.CrossValidator#load
     * @static
     */
    CrossValidator.load = function(path) {
      var javaObject =  org.apache.spark.ml.tuning.CrossValidator.load(path);
      return new CrossValidator(javaObject);
    };

    module.exports = CrossValidator;
})();
