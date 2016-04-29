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
     * Linear regression.
     *
     * The learning objective is to minimize the squared error, with regularization.
     * The specific squared error loss function used is:
     *   L = 1/2n ||A coefficients - y||^2^
     *
     * This support multiple types of regularization:
     *  - none (a.k.a. ordinary least squares)
     *  - L2 (ridge regression)
     *  - L1 (Lasso)
     *  - L2 + L1 (elastic net)
     * @class
     * @memberof module:eclairjs/ml/regression
     */
    
    /**
     * @param {string} [uid]
     * @constructor
     */
    var LinearRegression = function(uid) {
    	 this.logger = Logger.getLogger("LinearRegression_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.VectorIndexer) {
                jvmObject = uid;
            } else {
                jvmObject =  new org.apache.spark.ml.regression.LinearRegression(uid);
            }
        } else {
            jvmObject =  new org.apache.spark.ml.regression.LinearRegression();
        }

    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    LinearRegression.prototype = Object.create(JavaWrapper.prototype);
    
    LinearRegression.prototype.constructor = LinearRegression;
    
    
    
    /**
     * Set the regularization parameter.
     * Default is 0.0.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setRegParam = function(value) {
       var javaObject =  this.getJavaObject().setRegParam(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Set if we should fit the intercept
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setFitIntercept = function(value) {
       var javaObject =  this.getJavaObject().setFitIntercept(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Whether to standardize the training features before fitting the model.
     * The coefficients of models will be always returned on the original scale,
     * so it will be transparent for users. Note that with/without standardization,
     * the models should be always converged to the same solution when no regularization
     * is applied. In R's GLMNET package, the default behavior is true as well.
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setStandardization = function(value) {
       var javaObject =  this.getJavaObject().setStandardization(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Set the ElasticNet mixing parameter.
     * For alpha = 0, the penalty is an L2 penalty. For alpha = 1, it is an L1 penalty.
     * For 0 < alpha < 1, the penalty is a combination of L1 and L2.
     * Default is 0.0 which is an L2 penalty.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setElasticNetParam = function(value) {
       var javaObject =  this.getJavaObject().setElasticNetParam(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setMaxIter = function(value) {
       var javaObject =  this.getJavaObject().setMaxIter(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setTol = function(value) {
       var javaObject =  this.getJavaObject().setTol(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Whether to over-/under-sample training instances according to the given weights in weightCol.
     * If empty, all instances are treated equally (weight 1.0).
     * Default is empty, so all instances have weight one.
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setWeightCol = function(value) {
       var javaObject =  this.getJavaObject().setWeightCol(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * Set the solver algorithm used for optimization.
     * In case of linear regression, this can be "l-bfgs", "normal" and "auto".
     * "l-bfgs" denotes Limited-memory BFGS which is a limited-memory quasi-Newton
     * optimization method. "normal" denotes using Normal Equation as an analytical
     * solution to the linear regression problem.
     * The default value is "auto" which means that the solver algorithm is
     * selected automatically.
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.setSolver = function(value) {
       var javaObject =  this.getJavaObject().setSolver(value);
       return new LinearRegression(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new LinearRegression(javaObject);
    };

    /**
     * Param for regularization parameter (>= 0).
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    LinearRegression.prototype.regParam = function() {
       var javaObject =  this.getJavaObject().regParam();
       return Utils.javaToJs(javaObject);
    };

    /**
     * Param for whether to fit an intercept term.
     * @returns {module:eclairjs/ml/param.BooleanParam}
     */
    LinearRegression.prototype.fitIntercept = function() {
       var javaObject =  this.getJavaObject().fitIntercept();
       return Utils.javaToJs(javaObject);
    };


    /**
     * Param for the ElasticNet mixing parameter, in range [0, 1]. For alpha = 0, the penalty is an L2 penalty. For alpha = 1,
     * it is an L1 penalty.
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    LinearRegression.prototype.elasticNetParam = function() {
       var javaObject =  this.getJavaObject().elasticNetParam();
       return Utils.javaToJs(javaObject);
    };



    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.LinearRegression} 
     */
    LinearRegression.load = function(path) {
       var javaObject =  org.apache.spark.ml.regression.LinearRegression.load(path);
       return new LinearRegression(javaObject);
    };
    
    module.exports = LinearRegression;
})();