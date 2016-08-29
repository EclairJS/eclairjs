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
    var BisectingKMeansModel = require(EclairJS_Globals.NAMESPACE + '/ml/clustering/BisectingKMeansModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var BisectingKMeans = Java.type('org.apache.spark.ml.clustering.BisectingKMeans');
    
    
    /**
     * @classdesc
     * :: Experimental ::
     *
     * A bisecting k-means algorithm based on the paper "A comparison of document clustering techniques"
     * by Steinbach, Karypis, and Kumar, with modification to fit Spark.
     * The algorithm starts from a single cluster that contains all points.
     * Iteratively it finds divisible clusters on the bottom level and bisects each of them using
     * k-means, until there are `k` leaf clusters in total or no leaf clusters are divisible.
     * The bisecting steps of clusters on the same level are grouped together to increase parallelism.
     * If bisecting all divisible clusters on the bottom level would result more than `k` leaf clusters,
     * larger clusters get higher priority.
     *
     * @see [[http://glaros.dtc.umn.edu/gkhome/fetch/papers/docclusterKDDTMW00.pdf
     *     Steinbach, Karypis, and Kumar, A comparison of document clustering techniques,
     *     KDD Workshop on Text Mining, 2000.]]
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Estimator
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#<init>
     */
    var BisectingKMeans = function(uid) {
        var jvmObject = new org.apache.spark.ml.clustering.BisectingKMeans(uid);
        this.logger = Logger.getLogger("BisectingKMeans_js");
        Estimator.call(this, jvmObject);

        var jvmObject;
        this.logger = Logger.getLogger("ml_clustering_BisectingKMean_js");
        if (uid) {
            if (uid instanceof org.apache.spark.ml.clustering.BisectingKMeans) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.clustering.BisectingKMeans(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.clustering.BisectingKMeans();
        }
        Estimator.call(this, jvmObject);

    };
    
    BisectingKMeans.prototype = Object.create(Estimator.prototype);

    BisectingKMeans.prototype.constructor = BisectingKMeans;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    BisectingKMeans.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#copy
     */
    BisectingKMeans.prototype.copy = function(extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject =  this.getJavaObject().copy(extra_uw);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#setFeaturesCol
     */
    BisectingKMeans.prototype.setFeaturesCol = function(value) {
        var javaObject =  this.getJavaObject().setFeaturesCol(value);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#setPredictionCol
     */
    BisectingKMeans.prototype.setPredictionCol = function(value) {
        var javaObject =  this.getJavaObject().setPredictionCol(value);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#setK
     */
    BisectingKMeans.prototype.setK = function(value) {
        var javaObject =  this.getJavaObject().setK(value);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#setMaxIter
     */
    BisectingKMeans.prototype.setMaxIter = function(value) {
        var javaObject =  this.getJavaObject().setMaxIter(value);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#setSeed
     */
    BisectingKMeans.prototype.setSeed = function(value) {
        var javaObject =  this.getJavaObject().setSeed(value);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#setMinDivisibleClusterSize
     */
    BisectingKMeans.prototype.setMinDivisibleClusterSize = function(value) {
        var javaObject =  this.getJavaObject().setMinDivisibleClusterSize(value);
        return new BisectingKMeans(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeansModel} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#fit
     */
    BisectingKMeans.prototype.fit = function(dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject =  this.getJavaObject().fit(dataset_uw);
        return new BisectingKMeansModel(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#transformSchema
     */
    BisectingKMeans.prototype.transformSchema = function(schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return new StructType(javaObject);
    };

    //
    // static methods
    //
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans} 
     * @function
     * @name module:eclairjs/ml/clustering.BisectingKMeans#load
     * @static
     */
    BisectingKMeans.load = function(path) {
        var javaObject =  org.apache.spark.ml.clustering.BisectingKMeans.load(path);
        return new BisectingKMeans(javaObject);
    };

    module.exports = BisectingKMeans;
})();
