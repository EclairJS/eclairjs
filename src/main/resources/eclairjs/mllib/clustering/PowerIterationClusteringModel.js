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
     * @class
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

    module.exports = PowerIterationClusteringModel;

})();
