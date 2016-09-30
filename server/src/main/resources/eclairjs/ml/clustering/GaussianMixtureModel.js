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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var GaussianMixtureModel = Java.type('org.apache.spark.ml.clustering.GaussianMixtureModel');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     *
     * Multivariate Gaussian Mixture Model (GMM) consisting of k Gaussians, where points
     * are drawn from each Gaussian i with probability weights(i).
     *
     * @param weights Weight for each Gaussian distribution in the mixture.
     *                This is a multinomial probability distribution over the k Gaussians,
     *                where weights(i) is the weight for Gaussian i, and weights sum to 1.
     * @param gaussians Array of {@link MultivariateGaussian} where gaussians(i) represents
     *                  the Multivariate Gaussian (Normal) Distribution for Gaussian i
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Model
     */
    var GaussianMixtureModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_clusstering_GaussianMixtureModel_js");
    	 Model.call(this, jvmObject);
    
    };

    GaussianMixtureModel.prototype = Object.create(Model.prototype);

    GaussianMixtureModel.prototype.constructor = GaussianMixtureModel;
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.GaussianMixtureModel} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#copy
     */
    GaussianMixtureModel.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new GaussianMixtureModel(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#transform
     */
    GaussianMixtureModel.prototype.transform = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().transform(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#transformSchema
     */
    GaussianMixtureModel.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * Retrieve Gaussian distributions as a DataFrame.
     * Each row represents a Gaussian Distribution.
     * Two columns are defined: mean and cov.
     * Schema:
     * @example 
     *  root
     *   |-- mean: vector (nullable = true)
     *   |-- cov: matrix (nullable = true)
     *  
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#gaussiansDF
     */
    GaussianMixtureModel.prototype.gaussiansDF = function() {
      var javaObject =  this.getJavaObject().gaussiansDF();
      return Utils.javaToJs(javaObject);
    };

    /**
     * @returns double[]
     */
    GaussianMixtureModel.prototype.weights = function () {
        var javaObject = this.getJavaObject().weights();
        return Utils.javaToJs(javaObject);
    };
    
    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[GaussianMixtureModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#write
     */
    GaussianMixtureModel.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * Return true if there exists summary of model.
     * @returns {boolean} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#hasSummary
     */
    GaussianMixtureModel.prototype.hasSummary = function() {
      return  this.getJavaObject().hasSummary();
    };
    
    /**
     * Gets summary of model on training set. An exception is
     * thrown if `trainingSummary == None`.
     * @returns {module:eclairjs/ml/clustering.GaussianMixtureSummary} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#summary
     */
    GaussianMixtureModel.prototype.summary = function() {
      var javaObject =  this.getJavaObject().summary();
      return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#read
     * @static
     */
    GaussianMixtureModel.read = function() {
      var javaObject =  org.apache.spark.ml.clustering.GaussianMixtureModel.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.GaussianMixtureModel} 
     * @function
     * @name module:eclairjs/ml/clustering.GaussianMixtureModel#load
     * @static
     */
    GaussianMixtureModel.load = function(path) {
      var javaObject =  org.apache.spark.ml.clustering.GaussianMixtureModel.load(path);
      return new GaussianMixtureModel(javaObject);
    };

    module.exports = GaussianMixtureModel;
})();
