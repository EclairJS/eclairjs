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
    var Vector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vector');

    /**
     * A clustering model for K-means. Each point belongs to the cluster with the closest center.
     * @classdesc
     */

    /**
     * A Java-friendly constructor that takes an Iterable of Vectors.
     * @param {@module:eclairjs/mllib/linalg.Vector[]} clusterCenters
     * @returns {??}
     * @memberof module:eclairjs/mllib/clustering
     * @class
     */
    var KMeansModel = function (clusterCenters) {
        var jvmObject;
        if (clusterCenters instanceof org.apache.spark.mllib.clustering.KMeansModel) {
            jvmObject = clusterCenters;
        } else {
            jvmObject = new org.apache.spark.mllib.clustering.KMeansModel(clusterCenters);
        }

        this.logger = Logger.getLogger("KMeansModel_js");
        JavaWrapper.call(this, jvmObject);

    };

    KMeansModel.prototype = Object.create(JavaWrapper.prototype);

    KMeansModel.prototype.constructor = KMeansModel;


    /**
     * Total number of clusters.
     * @returns {number}
     */
    KMeansModel.prototype.k = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().k();
    };


    /**
     * Returns the cluster index that a given point belongs to.
     * @param {module:eclairjs/mllib/linalg.Vector} point
     * @returns {number}
     */
    KMeansModel.prototype.predict0 = function (point) {
        throw "not implemented by ElairJS";
        //   var point_uw = Utils.unwrapObject(point);
        //   return  this.getJavaObject().predict(point_uw);
    };


    /**
     * Maps given points to their cluster indices.
     * @param {module:eclairjs.RDD} points
     * @returns {module:eclairjs.RDD}
     */
    KMeansModel.prototype.predict1 = function (points) {
        throw "not implemented by ElairJS";
        //   var points_uw = Utils.unwrapObject(points);
        //   var javaObject =  this.getJavaObject().predict(points_uw);
        //   return new RDD(javaObject);
    };


    /**
     * Maps given points to their cluster indices.
     * @param {module:eclairjs.RDD} points
     * @returns {module:eclairjs.RDD}
     */
    KMeansModel.prototype.predict2 = function (points) {
        throw "not implemented by ElairJS";
        //   var points_uw = Utils.unwrapObject(points);
        //   var javaObject =  this.getJavaObject().predict(points_uw);
        //   return new JavaRDD(javaObject);
    };


    /**
     * Return the K-means cost (sum of squared distances of points to their nearest center) for this
     * model on the given data.
     * @param {module:eclairjs.RDD} data
     * @returns {number}
     */
    KMeansModel.prototype.computeCost = function (data) {
        var data_uw = Utils.unwrapObject(data);
        return this.getJavaObject().computeCost(data_uw.rdd());
    };


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     */
    KMeansModel.prototype.save = function (sc, path) {
        throw "not implemented by ElairJS";
        //   var sc_uw = Utils.unwrapObject(sc);
        //    this.getJavaObject().save(sc_uw,path);
    };

    /**
     * @returns {@module:eclairjs/mllib/linalg.Vector[]}
     */
    KMeansModel.prototype.clusterCenters = function () {
        var centers = this.getJavaObject().clusterCenters();
        var ret = [];
        for (var i = 0; i < centers.length; i++) {
            ret.push(new Vector(centers[i]));
        }
        return ret;
    };

    /**
     * Export the model to a local file in PMML format
     * @param {string} [path]
     * @param {module:eclairjs.SparkContext} [sc] Export the model to a directory on a distributed file system in PMML format
     * @returns {string} Export the model as a String in PMML format
     */
    KMeansModel.prototype.toPMML = function (path, sc) {
        var centers = this.getJavaObject().toPMML();
        if (arguments.length == 1) {
            this.getJavaObject().toPMML(arguments[0]); // path
        } else if (arguments.length == 2) {
            this.getJavaObject().toPMML(Utils.unwrapObject(arguments[1]).sc(), arguments[0]);
        }
        return this.getJavaObject().toPMML();

    };

    //
    // static methods
    //


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {KMeansModel}
     */
    KMeansModel.load = function (sc, path) {
        throw "not implemented by ElairJS";
        //   var sc_uw = Utils.unwrapObject(sc);
        //   var javaObject =  org.apache.spark.mllib.clustering.KMeansModel.load(sc_uw,path);
        //   return new KMeansModel(javaObject);
    };

    module.exports = KMeansModel;

})();
