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
     * Clustering model produced by {@link BisectingKMeans}.
     * The prediction is done level-by-level from the root node to a leaf node, and at each node among
     * its children the closest to the input point is selected.
     *
     * @param root the root node of the clustering tree
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * @constructor
     */


    var BisectingKMeansModel = function(jvmObject) {
         
         this.logger = Logger.getLogger("BisectingKMeansModel_js");
         JavaWrapper.call(this, jvmObject);

    };

    BisectingKMeansModel.prototype = Object.create(JavaWrapper.prototype);

    BisectingKMeansModel.prototype.constructor = BisectingKMeansModel;



    /**
     * Leaf cluster centers.
     * @returns {@module:eclairjs/mllib/linalg.Vector[]}
     */
    BisectingKMeansModel.prototype.clusterCenters = function() {
       var javaObject =  this.getJavaObject().clusterCenters();
       return Utils.javaToJs(javaObject);
    };


    /**
     * Predicts the index of the cluster that the input point belongs to.
     * @param {@module:eclairjs/mllib/linalg.Vector | module:eclairjs.RDD} point
     * @returns {float}
     */
    BisectingKMeansModel.prototype.predict = function(point) {
       var point_uw = Utils.unwrapObject(point);
       return  this.getJavaObject().predict(point_uw);
    };


    /**
     * Computes the sum of squared distances between the input points and their corresponding cluster centers.
     * @param {@module:eclairjs/mllib/linalg.Vector | module:eclairjs.RDD} data
     * @returns {float}
     */
    BisectingKMeansModel.prototype.computeCost = function(data) {
       var data_uw = Utils.unwrapObject(data);
       return  this.getJavaObject().computeCost(data_uw);
    };

    module.exports = BisectingKMeansModel;

})();
