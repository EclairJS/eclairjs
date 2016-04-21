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
     * Evaluator for regression, which expects two input columns: prediction and label.
     *
     */
    
    /**
     * @param {string} uid
     * @class
     * @constructor
     * @memberof module:eclairjs/ml/evaluation
     */
    var RegressionEvaluator = function(uid) {
        var jvmObject;
        this.logger = Logger.getLogger("RegressionEvaluator_js");
        if (uid) {
            if (uid instanceof org.apache.spark.ml.evaluation.RegressionEvaluator) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.evaluation.RegressionEvaluator(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.evaluation.RegressionEvaluator();
        }
        JavaWrapper.call(this, jvmObject);
    
    };
    
    RegressionEvaluator.prototype = Object.create(JavaWrapper.prototype);
    
    RegressionEvaluator.prototype.constructor = RegressionEvaluator;
    
    
    
    /**
     * @returns {string} 
     */
    RegressionEvaluator.prototype.getMetricName = function() {
       return  this.getJavaObject().getMetricName();
    };
    
    
    /**
     * @param {string} value
     * @returns {RegressionEvaluator}
     */
    RegressionEvaluator.prototype.setMetricName = function(value) {
       var javaObject =  this.getJavaObject().setMetricName(value);
       return new RegressionEvaluator(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {RegressionEvaluator}
     */
    RegressionEvaluator.prototype.setPredictionCol = function(value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
       return new RegressionEvaluator(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {RegressionEvaluator}
     */
    RegressionEvaluator.prototype.setLabelCol = function(value) {
       var javaObject =  this.getJavaObject().setLabelCol(value);
       return new RegressionEvaluator(javaObject);
    };
    
    
    /**
     * @param {DataFrame} dataset
     * @returns {number} 
     */
    RegressionEvaluator.prototype.evaluate = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       return  this.getJavaObject().evaluate(dataset_uw);
    };
    
    
    /**
     * @returns {boolean} 
     */
    RegressionEvaluator.prototype.isLargerBetter = function() {
       return  this.getJavaObject().isLargerBetter();
    };
    
    
    /**
     * @param {ParamMap} extra
     * @returns {RegressionEvaluator} 
     */
    RegressionEvaluator.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new RegressionEvaluator(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {RegressionEvaluator} 
     */
    RegressionEvaluator.load = function(path) {
       var javaObject =  org.apache.spark.ml.evaluation.RegressionEvaluator.load(path);
       return new RegressionEvaluator(javaObject);
    };
    
    module.exports = RegressionEvaluator;

})();