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
     * Evaluator for multiclass classification, which expects two input columns: score and label.
     * @class
     * @memberof module:eclairjs/ml/evaluation
     * @param {string} [uid]
     */
    var MulticlassClassificationEvaluator = function(uid) {
    	 this.logger = Logger.getLogger("ml.evaluation.MulticlassClassificationEvaluator_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator();
        }
    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    MulticlassClassificationEvaluator.prototype = Object.create(JavaWrapper.prototype);
    
    MulticlassClassificationEvaluator.prototype.constructor = MulticlassClassificationEvaluator;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MulticlassClassificationEvaluator.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * param for metric name in evaluation (supports "f1" (default), "precision", "recall", "weightedPrecision", "weightedRecall")
     * @returns {module:eclairjs/ml/param.Param}
     */
    MulticlassClassificationEvaluator.prototype.metricName = function() {
        return Utils.javaToJs(this.getJavaObject().getMetricName());
    };

    /**
     * @returns {string} 
     */
    MulticlassClassificationEvaluator.prototype.getMetricName = function() {
       return  this.getJavaObject().getMetricName();
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator} 
     */
    MulticlassClassificationEvaluator.prototype.setMetricName = function(value) {
       var javaObject =  this.getJavaObject().setMetricName(value);
       return new MulticlassClassificationEvaluator(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator} 
     */
    MulticlassClassificationEvaluator.prototype.setPredictionCol = function(value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
       return new MulticlassClassificationEvaluator(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator} 
     */
    MulticlassClassificationEvaluator.prototype.setLabelCol = function(value) {
       var javaObject =  this.getJavaObject().setLabelCol(value);
       return new MulticlassClassificationEvaluator(javaObject);
    };
    
    
    /**
     * Evaluates the output.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {number} 
     */
    MulticlassClassificationEvaluator.prototype.evaluate = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       return  this.getJavaObject().evaluate(dataset_uw);
    };
    
    
    /**
     * Indicates whether the metric returned by evaluate() should be maximized (true, default)
     * or minimized (false). A given evaluator may support multiple metrics which may be maximized or minimized.
     * @returns {boolean} 
     */
    MulticlassClassificationEvaluator.prototype.isLargerBetter = function() {
       return  this.getJavaObject().isLargerBetter();
    };
    
    
    /**
     * Creates a copy of this instance with the same UID and some extra params. Subclasses should implement this method and set the return type properly.
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator} 
     */
    MulticlassClassificationEvaluator.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new MulticlassClassificationEvaluator(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator} 
     */
    MulticlassClassificationEvaluator.load = function(path) {
       var javaObject =  org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator.load(path);
       return new MulticlassClassificationEvaluator(javaObject);
    };
    
    module.exports = MulticlassClassificationEvaluator;
})();