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

    
    
    /**
     * @classdesc
     * Validation for hyper-parameter tuning.
     * Randomly splits the input dataset into train and validation sets,
     * and uses evaluation metric on the validation set to select the best model.
     * Similar to {@link CrossValidator}, but only splits the set once.
     * @class
     * @memberof module:eclairjs/ml/tuning
     * @extends module:eclairjs/ml.Estimator
     * @param {string} [uid]
     */
    var TrainValidationSplit = function(uid) {
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.tuning.TrainValidationSplit) {
                jvmObject = uid;
            } else {
                jvmObject =  new org.apache.spark.ml.tuning.TrainValidationSplit(uid);
            }
        } else {
            jvmObject =  new org.apache.spark.ml.tuning.TrainValidationSplit();
        }
    	 this.logger = Logger.getLogger("ml_tuning_TrainValidationSplit_js");
    	 Estimator.call(this, jvmObject);

    };
    
    TrainValidationSplit.prototype = Object.create(Estimator.prototype);
    
    TrainValidationSplit.prototype.constructor = TrainValidationSplit;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    TrainValidationSplit.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {module:eclairjs/ml.Estimator} value
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit} 
     */
    TrainValidationSplit.prototype.setEstimator = function(value) {
       var value_uw = Utils.unwrapObject(value);
       var javaObject =  this.getJavaObject().setEstimator(value_uw);
       return new TrainValidationSplit(javaObject);
    };
    
    
    /**
     * @param {ParamMap[]} value
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit} 
     */
    TrainValidationSplit.prototype.setEstimatorParamMaps = function(value) {
       var value_uw = Utils.unwrapObject(value);
       var javaObject =  this.getJavaObject().setEstimatorParamMaps(value_uw);
       return new TrainValidationSplit(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/evaluation.Evaluator} value
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit} 
     */
    TrainValidationSplit.prototype.setEvaluator = function(value) {
       var value_uw = Utils.unwrapObject(value);
       var javaObject =  this.getJavaObject().setEvaluator(value_uw);
       return new TrainValidationSplit(javaObject);
    };
    
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit} 
     */
    TrainValidationSplit.prototype.setTrainRatio = function(value) {
       var javaObject =  this.getJavaObject().setTrainRatio(value);
       return new TrainValidationSplit(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit} 
     */
    TrainValidationSplit.prototype.setSeed = function(value) {
       var javaObject =  this.getJavaObject().setSeed(value);
       return new TrainValidationSplit(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplitModel} 
     */
    TrainValidationSplit.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    TrainValidationSplit.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit} 
     */
    TrainValidationSplit.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new TrainValidationSplit(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     * @function
     * @name module:eclairjs/ml/tuning.TrainValidationSplit#write
     */
     TrainValidationSplit.prototype.write = function() {
        var javaObject =  this.getJavaObject().write();
        return Utils.javaToJs(javaObject);
     };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     * @function
     * @name module:eclairjs/ml/tuning.TrainValidationSplit#read
     * @static
     */
     TrainValidationSplit.read = function() {
        var javaObject =  org.apache.spark.ml.tuning.TrainValidationSplit.read();
        return Utils.javaToJs(javaObject);
     };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplit}
     * @function
     * @name module:eclairjs/ml/tuning.TrainValidationSplit#load
     * @static
     */
     TrainValidationSplit.load = function(path) {
        var javaObject =  org.apache.spark.ml.tuning.TrainValidationSplit.load(path);
        return new TrainValidationSplit(javaObject);
     };

    module.exports = TrainValidationSplit;
})();