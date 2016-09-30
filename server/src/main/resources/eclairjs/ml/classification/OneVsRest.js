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

    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var OneVsRest = Java.type('org.apache.spark.ml.classification.OneVsRest');
    
    /**
     * @classdesc
     * Reduction of Multiclass Classification to Binary Classification.
     * Performs reduction using one against all strategy.
     * For a multiclass classification with k classes, train k models (one per class).
     * Each example is scored against all k models and the model with highest score
     * is picked to label the example.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml.Estimator
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#<init>
     */
    var OneVsRest = function(uid) {
    	this.logger = Logger.getLogger("ml_classification_OneVsRest_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.classification.OneVsRest) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.classification.OneVsRest(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.classification.OneVsRest();
        }
        Estimator.call(this, jvmObject);
    };

    OneVsRest.prototype = Object.create(Estimator.prototype);

    OneVsRest.prototype.constructor = OneVsRest;
    
    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    OneVsRest.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {module:eclairjs/ml/classification.Classifier} value
     * @returns {module:eclairjs/ml/classification.OneVsRest} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#setClassifier
     */
    OneVsRest.prototype.setClassifier = function(value) {
      var value_uw = Utils.unwrapObject(value);
      var javaObject =  this.getJavaObject().setClassifier(value_uw);
      return new OneVsRest(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.OneVsRest} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#setLabelCol
     */
    OneVsRest.prototype.setLabelCol = function(value) {
      var javaObject =  this.getJavaObject().setLabelCol(value);
      return new OneVsRest(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.OneVsRest} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#setFeaturesCol
     */
    OneVsRest.prototype.setFeaturesCol = function(value) {
      var javaObject =  this.getJavaObject().setFeaturesCol(value);
      return new OneVsRest(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.OneVsRest} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#setPredictionCol
     */
    OneVsRest.prototype.setPredictionCol = function(value) {
      var javaObject =  this.getJavaObject().setPredictionCol(value);
      return new OneVsRest(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#transformSchema
     */
    OneVsRest.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/classification.OneVsRestModel} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#fit
     */
    OneVsRest.prototype.fit = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().fit(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.OneVsRest} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#copy
     */
    OneVsRest.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new OneVsRest(javaObject);
    };
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#write
     */
    OneVsRest.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#read
     * @static
     */
    OneVsRest.read = function() {
      var javaObject =  org.apache.spark.ml.classification.OneVsRest.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/classification.OneVsRest} 
     * @function
     * @name module:eclairjs/ml/classification.OneVsRest#load
     * @static
     */
    OneVsRest.load = function(path) {
      var javaObject =  org.apache.spark.ml.classification.OneVsRest.load(path);
      return new OneVsRest(javaObject);
    };

    module.exports = OneVsRest;
})();
