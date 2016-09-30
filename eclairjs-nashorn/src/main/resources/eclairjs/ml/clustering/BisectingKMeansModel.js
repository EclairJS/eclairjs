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

    //var BisectingKMeansModel = Java.type('org.apache.spark.ml.clustering.BisectingKMeansModel');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Model fitted by BisectingKMeans.
     *
     * @param parentModel a model trained by {@link BisectingKMeans}.
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Model
     */
    var BisectingKMeansModel = function(jvmObject) {
 
      this.logger = Logger.getLogger("ml_clustering_BisectingKMeansModel_js");
      Model.call(this, jvmObject);
 
    };
    

    BisectingKMeansModel.prototype = Object.create(Model.prototype);

    BisectingKMeansModel.prototype.constructor = BisectingKMeansModel;
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeansModel} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#copy
     */
    BisectingKMeansModel.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new BisectingKMeansModel(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {DataFrame} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#transform
     */
    BisectingKMeansModel.prototype.transform = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().transform(dataset_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#transformSchema
     */
    BisectingKMeansModel.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @returns {Vector[]} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#clusterCenters
     */
    BisectingKMeansModel.prototype.clusterCenters = function() {
      var javaObject =  this.getJavaObject().clusterCenters();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * Computes the sum of squared distances between the input points and their corresponding cluster
     * centers.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {number} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#computeCost
     */
    BisectingKMeansModel.prototype.computeCost = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      return  this.getJavaObject().computeCost(dataset_uw);
    };
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#write
     */
    BisectingKMeansModel.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#read
     * @static
     */
    BisectingKMeansModel.read = function() {
      var javaObject =  org.apache.spark.ml.clustering.BisectingKMeansModel.read();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeansModel} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeansModel#load
     * @static
     */
    BisectingKMeansModel.load = function(path) {
      var javaObject =  org.apache.spark.ml.clustering.BisectingKMeansModel.load(path);
      return new BisectingKMeansModel(javaObject);
    };

    module.exports = BisectingKMeansModel;
})();
