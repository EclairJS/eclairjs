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

    module.exports = PowerIterationClusteringAssignment;

})();
