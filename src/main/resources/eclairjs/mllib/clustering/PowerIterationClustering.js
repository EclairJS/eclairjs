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
     * Model produced by {@link PowerIterationClustering}.
     *
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * @param {number} k number of clusters
     * @param {RDD} assignments  an RDD of clustering [[PowerIterationClustering#Assignment]]s
     *  @class
     */
    var PowerIterationClusteringModel = function(k,assignments) {
        this.logger = Logger.getLogger("PowerIterationClusteringModel_js");
        var jvmObject;
        if (k instanceof org.apache.spark.mllib.clustering.PowerIterationClusteringModel) {
            jvmObject = k;
        } else {
            jvmObject = new org.apache.spark.mllib.clustering.PowerIterationClusteringModel(k,assignments);
        }

         JavaWrapper.call(this, jvmObject);

    };

    PowerIterationClusteringModel.prototype = Object.create(JavaWrapper.prototype);

    PowerIterationClusteringModel.prototype.constructor = PowerIterationClusteringModel;



    /**
     * @param {SparkContext} sc
     * @param {string} path
     */
    PowerIterationClusteringModel.prototype.save = function(sc,path) {
       var sc_uw = Utils.unwrapObject(sc).sc();
        this.getJavaObject().save(sc_uw,path);
    };

    /**
     * @returns {RDD}
     */
    PowerIterationClusteringModel.prototype.assignments = function() {
        return Utils.javaToJs(this.getJavaObject().assignments().toJavaRDD());
    };

    /**
     * @returns {integer}
     */
    PowerIterationClusteringModel.prototype.k = function() {
        return this.getJavaObject().k();
    };

    /**
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * Constructs a PIC instance with default parameters: {k: 2, maxIterations: 100,
     * initMode: "random"}.
     * @class
     */
    var PowerIterationClustering = function() {
         
         this.logger = Logger.getLogger("PowerIterationClustering_js");
        var jvmObject;
        if (arguments[0]) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.clustering.PowerIterationClustering();
        }
         JavaWrapper.call(this, jvmObject);

    };

    PowerIterationClustering.prototype = Object.create(JavaWrapper.prototype);

    PowerIterationClustering.prototype.constructor = PowerIterationClustering;



    /**
     * Set the number of clusters.
     * @param {integer} k
     * @returns {PowerIterationClustering}
     */
    PowerIterationClustering.prototype.setK = function(k) {
       var javaObject =  this.getJavaObject().setK(k);
       return new PowerIterationClustering(javaObject);
    };


    /**
     * Set maximum number of iterations of the power iteration loop
     * @param {integer} maxIterations
     * @returns {PowerIterationClustering}
     */
    PowerIterationClustering.prototype.setMaxIterations = function(maxIterations) {
       var javaObject =  this.getJavaObject().setMaxIterations(maxIterations);
       return new PowerIterationClustering(javaObject);
    };


    /**
     * Set the initialization mode. This can be either "random" to use a random vector
     * as vertex properties, or "degree" to use normalized sum similarities. Default: random.
     * @param {string} mode
     * @returns {PowerIterationClustering}
     */
    PowerIterationClustering.prototype.setInitializationMode = function(mode) {
       var javaObject =  this.getJavaObject().setInitializationMode(mode);
       return new PowerIterationClustering(javaObject);
    };


    /**
     * Run the PIC algorithm on Graph.
     *
     * @param {RDD | Graph} similaritiesOrGraph  an RDD of (i, j, s,,ij,,) tuples representing the affinity matrix, which is
     *                     the matrix A in the PIC paper. The similarity s,,ij,, must be nonnegative.
     *                     This is a symmetric matrix and hence s,,ij,, = s,,ji,,. For any (i, j) with
     *                     nonzero similarity, there should be either (i, j, s,,ij,,) or
     *                     (j, i, s,,ji,,) in the input. Tuples with i = j are ignored, because we
     *                     assume s,,ij,, = 0.0. Or a graph an affinity matrix represented as graph, which is the matrix A in the PIC paper.
     *              The similarity s,,ij,, represented as the edge between vertices (i, j) must
     *              be nonnegative. This is a symmetric matrix and hence s,,ij,, = s,,ji,,. For
     *              any (i, j) with nonzero similarity, there should be either (i, j, s,,ij,,)
     *              or (j, i, s,,ji,,) in the input. Tuples with i = j are ignored, because we
     *              assume s,,ij,, = 0.0.
     *
     * @returns {PowerIterationClusteringModel}  a [[PowerIterationClusteringModel]] that contains the clustering result
     */
    PowerIterationClustering.prototype.run = function(similaritiesOrGraph) {
       var graph_uw = Utils.unwrapObject(similaritiesOrGraph);
        /*
            The RDD<Tuple> we get from Nashorn is a Tuple(Double, Double, Double)
            what we need for PowerIterationClustering,run is a RDD<Tuple3<Long, Long, Double>>
            the only way to accomplish this is to RDD.map() the RDD from what we are given to what is required.
            then give the resulting RDD to the run().
         */
        var rdd = graph_uw.map(
           new org.eclairjs.nashorn.mllib.clustering.PowerIterationClusteringRunFunction()
        );

       var javaObject =  this.getJavaObject().run(rdd);
       return new PowerIterationClusteringModel(javaObject);
    };


    /**
     * Cluster assignment. param: id node id param: cluster assigned cluster id
     * @class
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * @parma {integer} id
     * @parma {integer} cluster
     */

    var PowerIterationClusteringAssignment = function(id, cluster) {

        this.logger = Logger.getLogger("PowerIterationClusteringAssignment_js");
        var jvmObject;
        if (arguments[0]) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.clustering.PowerIterationClustering.Assignment(id, cluster);
        }
        JavaWrapper.call(this, jvmObject);

    };


    PowerIterationClusteringAssignment.prototype = Object.create(JavaWrapper.prototype);

    PowerIterationClusteringAssignment.prototype.constructor = PowerIterationClusteringAssignment;



    /**
     * @returns {integer}
     */
    PowerIterationClusteringAssignment.prototype.id = function() {
        return this.getJavaObject().id();
    };

    /**
     * @returns {integer}
     */
    PowerIterationClusteringAssignment.prototype.cluster = function() {
        return this.getJavaObject().cluster();
    };

    PowerIterationClusteringAssignment.prototype.toJSON = function() {
        var obj = {};
        obj.id = this.id();
        obj.cluster = this.cluster();
        return obj;
    };

    //
    // static methods
    //


    /**
     * @param {SparkContext} sc
     * @param {string} path
     * @returns {PowerIterationClusteringModel}
     */
    PowerIterationClusteringModel.load = function(sc,path) {
       var sc_uw = Utils.unwrapObject(sc).sc();
       var javaObject =  org.apache.spark.mllib.clustering.PowerIterationClusteringModel.load(sc_uw,path);
       return new PowerIterationClusteringModel(javaObject);
    };

    module.exports = {
        PowerIterationClustering: PowerIterationClustering,
        PowerIterationClusteringAssignment: PowerIterationClusteringAssignment,
        PowerIterationClusteringModel: PowerIterationClusteringModel
    };

})();
