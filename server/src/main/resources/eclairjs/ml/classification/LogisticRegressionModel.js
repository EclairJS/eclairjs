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

    var ProbabilisticClassificationModel = require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassificationModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Model produced by {@link module:eclairjs/ml/classification.LogisticRegression}.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.ProbabilisticClassificationModel
     */
    
    
    var LogisticRegressionModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_classification_LogisticRegressionModel_js");
        ProbabilisticClassificationModel.call(this, jvmObject);
    
    };
    
    LogisticRegressionModel.prototype = Object.create(ProbabilisticClassificationModel.prototype);
    
    LogisticRegressionModel.prototype.constructor = LogisticRegressionModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    LogisticRegressionModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LogisticRegressionModel.prototype.coefficients = function() {
        var javaObject =  this.getJavaObject().coefficients();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {float}
     */
    LogisticRegressionModel.prototype.intercept = function() {
        return this.getJavaObject().intercept();
    };

    /**
      * Evaluates the model on a test dataset.
      * @param {module:eclairjs/sql.Dataset} dataset  Test dataset to evaluate model on.
      * @returns {module:eclairjs/ml/classification.LogisticRegressionSummary}
      */
     LogisticRegressionModel.prototype.evaluate = function(dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject =  this.getJavaObject().evaluate(dataset_uw);
        return Utils.javaToJs(javaObject);
     };


    
    /**
     * @param {float} value
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel} 
     */
    LogisticRegressionModel.prototype.setThreshold = function(value) {
       var javaObject =  this.getJavaObject().setThreshold(value);
       return new LogisticRegressionModel(javaObject);
    };
    
    
    /**
     * @returns {float}
     */
    LogisticRegressionModel.prototype.getThreshold = function() {
          return  this.getJavaObject().getThreshold();
    };
    
    
    /**
     * @param {float[]} value
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel} 
     */
    LogisticRegressionModel.prototype.setThresholds = function(value) {
       var javaObject =  this.getJavaObject().setThresholds(value);
       return new LogisticRegressionModel(javaObject);
    };
    
    
    /**
     * @returns {float[]}
     */
    LogisticRegressionModel.prototype.getThresholds = function() {
           return  this.getJavaObject().getThresholds();
    };
    
    
    /**
     * Gets summary of model on training set. An exception is
     * thrown if `trainingSummary == None`.
     * @returns {module:eclairjs/ml/classification.LogisticRegressionTrainingSummary} 
     */
    LogisticRegressionModel.prototype.summary = function() {
       var javaObject =  this.getJavaObject().summary();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     *  Indicates whether a training summary exists for this model instance. 
     * @returns {boolean} 
     */
    LogisticRegressionModel.prototype.hasSummary = function() {
       return  this.getJavaObject().hasSummary();
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel} 
     */
    LogisticRegressionModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new LogisticRegressionModel(javaObject);
    };
    
    
    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[LogisticRegressionModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * This also does not save the {@link parent} currently.
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    LogisticRegressionModel.prototype.write = function() {
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
    LogisticRegressionModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject =  org.apache.spark.ml.classification.LogisticRegressionModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel} 
     */
    LogisticRegressionModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.classification.LogisticRegressionModel.load(path);
       return new LogisticRegressionModel(javaObject);
    };
    
    module.exports = LogisticRegressionModel;
})();