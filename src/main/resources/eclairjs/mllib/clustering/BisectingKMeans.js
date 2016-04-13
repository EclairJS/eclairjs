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

    var BisectingKMeansModel = require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/BisectingKMeansModel');

    /**
     * A bisecting k-means algorithm based on the paper "A comparison of document clustering techniques"
     * by Steinbach, Karypis, and Kumar, with modification to fit Spark.
     * The algorithm starts from a single cluster that contains all points.
     * Iteratively it finds divisible clusters on the bottom level and bisects each of them using
     * k-means, until there are `k` leaf clusters in total or no leaf clusters are divisible.
     * The bisecting steps of clusters on the same level are grouped together to increase parallelism.
     * If bisecting all divisible clusters on the bottom level would result more than `k` leaf clusters,
     * larger clusters get higher priority.
     *
     * @param k the desired number of leaf clusters (default: 4). The actual number could be smaller if
     *          there are no divisible leaf clusters.
     * @param maxIterations the max number of k-means iterations to split clusters (default: 20)
     * @param minDivisibleClusterSize the minimum number of points (if >= 1.0) or the minimum proportion
     *                                of points (if < 1.0) of a divisible cluster (default: 1)
     * @param seed a random seed (default: hash value of the class name)
     *
     * @see [[http://glaros.dtc.umn.edu/gkhome/fetch/papers/docclusterKDDTMW00.pdf
     *     Steinbach, Karypis, and Kumar, A comparison of document clustering techniques,
     *     KDD Workshop on Text Mining, 2000.]]
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     */

    /**
     * Constructs with the default configuration
     *  @class
     */
    var BisectingKMeans = function(jvmObject) {
         
         this.logger = Logger.getLogger("BisectingKMeans_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.mllib.clustering.BisectingKMeans();
        }
         JavaWrapper.call(this, jvmObject);

    };

    BisectingKMeans.prototype = Object.create(JavaWrapper.prototype);

    BisectingKMeans.prototype.constructor = BisectingKMeans;



    /**
     * Sets the desired number of leaf clusters (default: 4).
     * The actual number could be smaller if there are no divisible leaf clusters.
     * @param {integer} k
     * @returns {BisectingKMeans}
     */
    BisectingKMeans.prototype.setK = function(k) {
       var javaObject =  this.getJavaObject().setK(k);
       return new BisectingKMeans(javaObject);
    };


    /**
     * Gets the desired number of leaf clusters.
     * @returns {integer}
     */
    BisectingKMeans.prototype.getK = function() {
       return  this.getJavaObject().getK();
    };


    /**
     * Sets the max number of k-means iterations to split clusters (default: 20).
     * @param {number} maxIterations
     * @returns {BisectingKMeans}
     */
    BisectingKMeans.prototype.setMaxIterations = function(maxIterations) {
        var inter = maxIterations ? maxIterations : null;
       var javaObject =  this.getJavaObject().setMaxIterations(inter);
       return new BisectingKMeans(javaObject);
    };


    /**
     * Gets the max number of k-means iterations to split clusters.
     * @returns {int}
     */
    BisectingKMeans.prototype.getMaxIterations = function() {
        return  this.getJavaObject().getMaxIterations();
    };


    /**
     * Sets the minimum number of points (if >= `1.0`) or the minimum proportion of points
     * (if < `1.0`) of a divisible cluster (default: 1).
     * @param {float} minDivisibleClusterSize
     * @returns {BisectingKMeans}
     */
    BisectingKMeans.prototype.setMinDivisibleClusterSize = function(minDivisibleClusterSize) {
       var javaObject =  this.getJavaObject().setMinDivisibleClusterSize(minDivisibleClusterSize);
       return new BisectingKMeans(javaObject);
    };


    /**
     * Gets the minimum number of points (if >= `1.0`) or the minimum proportion of points
     * (if < `1.0`) of a divisible cluster.
     * @returns {float}
     */
    BisectingKMeans.prototype.getMinDivisibleClusterSize = function() {
        return  this.getJavaObject().getMinDivisibleClusterSize();
    };


    /**
     * Sets the random seed (default: hash value of the class name).
     * @param {integer} seed
     * @returns {BisectingKMeans}
     */
    BisectingKMeans.prototype.setSeed = function(seed) {
       var javaObject =  this.getJavaObject().setSeed(seed);
       return new BisectingKMeans(javaObject);
    };


    /**
     * Gets the random seed.
     * @returns {integer}
     */
    BisectingKMeans.prototype.getSeed = function() {
        return  this.getJavaObject().getSeed();
    };


    /**
     * Runs the bisecting k-means algorithm.
     * @param {RDD} input  RDD of vectors
     * @returns {BisectingKMeansModel}  model for the bisecting kmeans
     */
    BisectingKMeans.prototype.run = function(input) {
       var input_uw = Utils.unwrapObject(input);
       var javaObject =  this.getJavaObject().run(input_uw);
       return new BisectingKMeansModel(javaObject);
    };

    module.exports = BisectingKMeans;

})();
