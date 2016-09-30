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
    
    //var GaussianMixture = Java.type('org.apache.spark.ml.clustering.GaussianMixture');
    
    /**
     * @classdesc
     * :: Experimental ::
     * Gaussian Mixture clustering.
     *
     * This class performs expectation maximization for multivariate Gaussian
     * Mixture Models (GMMs).  A GMM represents a composite distribution of
     * independent Gaussian distributions with associated "mixing" weights
     * specifying each's contribution to the composite.
     *
     * Given a set of sample points, this class will maximize the log-likelihood
     * for a mixture of k Gaussians, iterating until the log-likelihood changes by
     * less than convergenceTol, or until it has reached the max number of iterations.
     * While this process is generally guaranteed to converge, it is not guaranteed
     * to find a global optimum.
     *
     * Note: For high-dimensional data (with many features), this algorithm may perform poorly.
     *       This is due to high-dimensional data (a) making it difficult to cluster at all (based
     *       on statistical/theoretical arguments) and (b) numerical issues with Gaussian distributions.
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Estimator
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#<init>
     */
    var GaussianMixture = function(uid) {
        var jvmObject;
        this.logger = Logger.getLogger("ml_clusstering_GaussianMixture_js");
        if (uid) {
            if (uid instanceof org.apache.spark.ml.clustering.GaussianMixture) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.clustering.GaussianMixture(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.clustering.GaussianMixture();
        }
        Estimator.call(this, jvmObject);

    };
    
    GaussianMixture.prototype = Object.create(Estimator.prototype);

    GaussianMixture.prototype.constructor = GaussianMixture;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    GaussianMixture.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#copy
     */
    GaussianMixture.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setFeaturesCol
     */
    GaussianMixture.prototype.setFeaturesCol = function(value) {
      var javaObject =  this.getJavaObject().setFeaturesCol(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setPredictionCol
     */
    GaussianMixture.prototype.setPredictionCol = function(value) {
      var javaObject =  this.getJavaObject().setPredictionCol(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setProbabilityCol
     */
    GaussianMixture.prototype.setProbabilityCol = function(value) {
      var javaObject =  this.getJavaObject().setProbabilityCol(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setK
     */
    GaussianMixture.prototype.setK = function(value) {
      var javaObject =  this.getJavaObject().setK(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setMaxIter
     */
    GaussianMixture.prototype.setMaxIter = function(value) {
      var javaObject =  this.getJavaObject().setMaxIter(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setTol
     */
    GaussianMixture.prototype.setTol = function(value) {
      var javaObject =  this.getJavaObject().setTol(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#setSeed
     */
    GaussianMixture.prototype.setSeed = function(value) {
      var javaObject =  this.getJavaObject().setSeed(value);
      return new GaussianMixture(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/clustering.GaussianMixtureModel} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#fit
     */
    GaussianMixture.prototype.fit = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().fit(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#transformSchema
     */
    GaussianMixture.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };


    //
    // static methods
    //
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.GaussianMixture} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixture#load
     * @static
     */
    GaussianMixture.load = function(path) {
      var javaObject =  org.apache.spark.ml.clustering.GaussianMixture.load(path);
      return new GaussianMixture(javaObject);
    };
    module.exports = GaussianMixture;
})();
