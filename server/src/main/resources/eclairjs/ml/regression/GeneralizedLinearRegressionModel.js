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

    var RegressionModel = require(EclairJS_Globals.NAMESPACE + '/ml/regression/RegressionModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var GeneralizedLinearRegressionModel = Java.type('org.apache.spark.ml.regression.GeneralizedLinearRegressionModel');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Model produced by {@link GeneralizedLinearRegression}.
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/regression.RegressionModel
     */
    var GeneralizedLinearRegressionModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_regression_GeneralizedLinearRegressionModel_js");
    	 RegressionModel.call(this, jvmObject);
    
    };

    GeneralizedLinearRegressionModel.prototype = Object.create(RegressionModel.prototype);

    GeneralizedLinearRegressionModel.prototype.constructor = GeneralizedLinearRegressionModel;
    
    /**
     * @returns {module:eclairjs/ml/linalg.Vector}
     */
    GeneralizedLinearRegressionModel.prototype.coefficients = function () {
        var javaObject = this.getJavaObject().coefficients();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {double}
     */
    GeneralizedLinearRegressionModel.prototype.intercept = function () {
        return Utils.javaToJs(this.getJavaObject().intercept());
    };

    /**
     * Sets the link prediction (linear predictor) column name.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionModel} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#setLinkPredictionCol
     */
    GeneralizedLinearRegressionModel.prototype.setLinkPredictionCol = function(value) {
      var javaObject =  this.getJavaObject().setLinkPredictionCol(value);
      return new GeneralizedLinearRegressionModel(javaObject);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#transform
     */
    GeneralizedLinearRegressionModel.prototype.transform = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().transform(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * Gets R-like summary of model on training set. An exception is
     * thrown if there is no summary available.
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionTrainingSummary} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#summary
     */
    GeneralizedLinearRegressionModel.prototype.summary = function() {
      var javaObject =  this.getJavaObject().summary();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * Indicates if {@link summary} is available.
     * @returns {boolean} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#hasSummary
     */
    GeneralizedLinearRegressionModel.prototype.hasSummary = function() {
      return  this.getJavaObject().hasSummary();
    };
    
    /**
     * Evaluate the model on the given dataset, returning a summary of the results.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionSummary} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#evaluate
     */
    GeneralizedLinearRegressionModel.prototype.evaluate = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().evaluate(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionModel} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#copy
     */
    GeneralizedLinearRegressionModel.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new GeneralizedLinearRegressionModel(javaObject);
    };
    
    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For {@link GeneralizedLinearRegressionModel}, this does NOT currently save the
     * training [[summary]]. An option to save {@link summary} may be added in the future.
     *
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#write
     */
    GeneralizedLinearRegressionModel.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //    

    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#read
     * @static
     */
    GeneralizedLinearRegressionModel.read = function() {
      var javaObject =  org.apache.spark.ml.regression.GeneralizedLinearRegressionModel.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionModel} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegressionModel#load
     * @static
     */
    GeneralizedLinearRegressionModel.load = function(path) {
      var javaObject =  org.apache.spark.ml.regression.GeneralizedLinearRegressionModel.load(path);
      return new GeneralizedLinearRegressionModel(javaObject);
    };

    module.exports = GeneralizedLinearRegressionModel;
})();
