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

    //var Evaluator = require(EclairJS_Globals.NAMESPACE + '/ml/evaluation/Evaluator');
    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var BinaryClassificationEvaluator = Java.type('org.apache.spark.ml.evaluation.BinaryClassificationEvaluator');    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Evaluator for binary classification, which expects two input columns: rawPrediction and label.
     * The rawPrediction column can be of type double (binary 0/1 prediction, or probability of label 1)
     * or of type vector (length-2 vector of raw predictions, scores, or label probabilities).
     * @class
     * @memberof module:eclairjs/ml/evaluation
     * @extends module:eclairjs/ml/evaluation.Evaluator
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#<init>
     */
    var BinaryClassificationEvaluator = function(uid) {
        this.logger = Logger.getLogger("ml.evaluation.BinaryClassificationEvaluator_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.evaluation.BinaryClassificationEvaluator) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.evaluation.BinaryClassificationEvaluator(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.evaluation.BinaryClassificationEvaluator();
        }
        JavaWrapper.call(this, jvmObject);

    };
    
    BinaryClassificationEvaluator.prototype = Object.create(JavaWrapper.prototype);

    BinaryClassificationEvaluator.prototype.constructor = BinaryClassificationEvaluator;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    BinaryClassificationEvaluator.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @returns {string} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#getMetricName
     */
    BinaryClassificationEvaluator.prototype.getMetricName = function() {
      return  this.getJavaObject().getMetricName();
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.BinaryClassificationEvaluator} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#setMetricName
     */
    BinaryClassificationEvaluator.prototype.setMetricName = function(value) {
      var javaObject =  this.getJavaObject().setMetricName(value);
      return new BinaryClassificationEvaluator(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.BinaryClassificationEvaluator} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#setRawPredictionCol
     */
    BinaryClassificationEvaluator.prototype.setRawPredictionCol = function(value) {
      var javaObject =  this.getJavaObject().setRawPredictionCol(value);
      return new BinaryClassificationEvaluator(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.BinaryClassificationEvaluator} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#setLabelCol
     */
    BinaryClassificationEvaluator.prototype.setLabelCol = function(value) {
      var javaObject =  this.getJavaObject().setLabelCol(value);
      return new BinaryClassificationEvaluator(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {number} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#evaluate
     */
    BinaryClassificationEvaluator.prototype.evaluate = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      return  this.getJavaObject().evaluate(dataset_uw);
    };
    
    /**
     * @returns {boolean} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#isLargerBetter
     */
    BinaryClassificationEvaluator.prototype.isLargerBetter = function() {
      return  this.getJavaObject().isLargerBetter();
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/evaluation.BinaryClassificationEvaluator} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#copy
     */
    BinaryClassificationEvaluator.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new BinaryClassificationEvaluator(javaObject);
    };


    //
    //static methods
    //    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/evaluation.BinaryClassificationEvaluator} 
     * @function
     * @name module:eclairjs/ml/evaluation.BinaryClassificationEvaluator#load
     * @static
     */
    BinaryClassificationEvaluator.load = function(path) {
      var javaObject =  org.apache.spark.ml.evaluation.BinaryClassificationEvaluator.load(path);
      return new BinaryClassificationEvaluator(javaObject);
    };

    module.exports = BinaryClassificationEvaluator;
})();
