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

    var DefaultParamsWritable = require(EclairJS_Globals.NAMESPACE + '/ml/util/DefaultParamsWritable');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var GeneralizedLinearRegression = Java.type('org.apache.spark.ml.regression.GeneralizedLinearRegression');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     *
     * Fit a Generalized Linear Model ([[https://en.wikipedia.org/wiki/Generalized_linear_model]])
     * specified by giving a symbolic description of the linear predictor (link function) and
     * a description of the error distribution (family).
     * It supports "gaussian", "binomial", "poisson" and "gamma" as family.
     * Valid link functions for each family is listed below. The first link function of each family
     * is the default one.
     *  - "gaussian" -> "identity", "log", "inverse"
     *  - "binomial" -> "logit", "probit", "cloglog"
     *  - "poisson"  -> "log", "identity", "sqrt"
     *  - "gamma"    -> "inverse", "identity", "log"
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/util.DefaultParamsWritable
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#<init>
     */
    var GeneralizedLinearRegression = function(uid) {

        this.logger = Logger.getLogger("ml_regression_GeneralizedLinearRegression_js");
        var jvmObject;
        if (arguments.length > 0) {
            if (arguments[0] instanceof org.apache.spark.ml.regression.GeneralizedLinearRegression) {
                jvmObject = arguments[0];
            } else {
                jvmObject = new org.apache.spark.ml.regression.GeneralizedLinearRegression(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.regression.GeneralizedLinearRegression();
        }

        DefaultParamsWritable.call(this, jvmObject);

    };

    GeneralizedLinearRegression.prototype = Object.create(DefaultParamsWritable.prototype);

    GeneralizedLinearRegression.prototype.constructor = GeneralizedLinearRegression;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    GeneralizedLinearRegression.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * Sets the value of param {@link family}.
     * Default is "gaussian".
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setFamily
     */
    GeneralizedLinearRegression.prototype.setFamily = function(value) {
      var javaObject =  this.getJavaObject().setFamily(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the value of param {@link link}.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setLink
     */
    GeneralizedLinearRegression.prototype.setLink = function(value) {
      var javaObject =  this.getJavaObject().setLink(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets if we should fit the intercept.
     * Default is true.
     *
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setFitIntercept
     */
    GeneralizedLinearRegression.prototype.setFitIntercept = function(value) {
      var javaObject =  this.getJavaObject().setFitIntercept(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the maximum number of iterations (applicable for solver "irls").
     * Default is 25.
     *
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setMaxIter
     */
    GeneralizedLinearRegression.prototype.setMaxIter = function(value) {
      var javaObject =  this.getJavaObject().setMaxIter(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     *
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setTol
     */
    GeneralizedLinearRegression.prototype.setTol = function(value) {
      var javaObject =  this.getJavaObject().setTol(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the regularization parameter for L2 regularization.
     * The regularization term is
     * @example 
     *   0.5 * regParam * L2norm(coefficients)^2
     *  
     * Default is 0.0.
     *
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setRegParam
     */
    GeneralizedLinearRegression.prototype.setRegParam = function(value) {
      var javaObject =  this.getJavaObject().setRegParam(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the value of param {@link weightCol}.
     * If this is not set or empty, we treat all instance weights as 1.0.
     * Default is not set, so all instances have weight one.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setWeightCol
     */
    GeneralizedLinearRegression.prototype.setWeightCol = function(value) {
      var javaObject =  this.getJavaObject().setWeightCol(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the solver algorithm used for optimization.
     * Currently only supports "irls" which is also the default solver.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setSolver
     */
    GeneralizedLinearRegression.prototype.setSolver = function(value) {
      var javaObject =  this.getJavaObject().setSolver(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * Sets the link prediction (linear predictor) column name.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#setLinkPredictionCol
     */
    GeneralizedLinearRegression.prototype.setLinkPredictionCol = function(value) {
      var javaObject =  this.getJavaObject().setLinkPredictionCol(value);
      return new GeneralizedLinearRegression(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#copy
     */
    GeneralizedLinearRegression.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new GeneralizedLinearRegression(javaObject);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionModel}
     */
    GeneralizedLinearRegression.prototype.fit = function (dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
       return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression} 
     * @function
     * @name module:eclairjs/ml/regression.GeneralizedLinearRegression#load
     * @static
     */
    GeneralizedLinearRegression.load = function(path) {
      var javaObject =  org.apache.spark.ml.regression.GeneralizedLinearRegression.load(path);
      return new GeneralizedLinearRegression(javaObject);
    };

    module.exports = GeneralizedLinearRegression;
})();
