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

    var ProbabilisticClassifier = require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassifier');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Logistic regression.
     * Currently, this class only supports binary classification.  It will support multiclass
     * in the future.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassifier
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    var LogisticRegression = function(uid) {
    	 this.logger = Logger.getLogger("ml_classification_LogisticRegression_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.classification.LogisticRegression) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.classification.LogisticRegression(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.classification.LogisticRegression();
        }
        ProbabilisticClassifier.call(this, jvmObject);
    
    };
    
    LogisticRegression.prototype = Object.create(ProbabilisticClassifier.prototype);
    
    LogisticRegression.prototype.constructor = LogisticRegression;


    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    LogisticRegression.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * Set the regularization parameter.
     * Default is 0.0.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setRegParam = function(value) {
       var javaObject =  this.getJavaObject().setRegParam(value);
       return new LogisticRegression(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    LogisticRegression.prototype.regParam = function() {
        return Utils.javaToJs(this.getJavaObject().regParam());
    };

    /**
     * Set the ElasticNet mixing parameter.
     * For alpha = 0, the penalty is an L2 penalty. For alpha = 1, it is an L1 penalty.
     * For 0 < alpha < 1, the penalty is a combination of L1 and L2.
     * Default is 0.0 which is an L2 penalty.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setElasticNetParam = function(value) {
       var javaObject =  this.getJavaObject().setElasticNetParam(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setMaxIter = function(value) {
       var javaObject =  this.getJavaObject().setMaxIter(value);
       return new LogisticRegression(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    LogisticRegression.prototype.maxIter = function() {
        return Utils.javaToJs(this.getJavaObject().maxIter());
    };
    
    
    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setTol = function(value) {
       var javaObject =  this.getJavaObject().setTol(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * Whether to fit an intercept term.
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setFitIntercept = function(value) {
       var javaObject =  this.getJavaObject().setFitIntercept(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * Whether to standardize the training features before fitting the model.
     * The coefficients of models will be always returned on the original scale,
     * so it will be transparent for users. Note that with/without standardization,
     * the models should be always converged to the same solution when no regularization
     * is applied. In R's GLMNET package, the default behavior is true as well.
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setStandardization = function(value) {
       var javaObject =  this.getJavaObject().setStandardization(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setThreshold = function(value) {
       var javaObject =  this.getJavaObject().setThreshold(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * @returns {float}
     */
    LogisticRegression.prototype.getThreshold = function() {
       return  this.getJavaObject().getThreshold();
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    LogisticRegression.prototype.threshold = function() {
        return Utils.javaToJs(this.getJavaObject().threshold());
    };
    
    /**
     * Whether to over-/under-sample training instances according to the given weights in weightCol.
     * If empty, all instances are treated equally (weight 1.0).
     * Default is empty, so all instances have weight one.
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setWeightCol = function(value) {
       var javaObject =  this.getJavaObject().setWeightCol(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * @param {float[]} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.setThresholds = function(value) {
       var javaObject =  this.getJavaObject().setThresholds(value);
       return new LogisticRegression(javaObject);
    };
    
    
    /**
     * @returns {float[]}
     */
    LogisticRegression.prototype.getThresholds = function() {
       return  this.getJavaObject().getThresholds();
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new LogisticRegression(javaObject);
    };

    /**
     * FIXME from Param
     * @returns {string}
     */
    LogisticRegression.prototype.explainParams = function() {
       return this.getJavaObject().explainParams();
    };

    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/classification.LogisticRegression} 
     */
    LogisticRegression.load = function(path) {
       var javaObject =  org.apache.spark.ml.classification.LogisticRegression.load(path);
       return new LogisticRegression(javaObject);
    };
    
    module.exports = LogisticRegression;
})();
