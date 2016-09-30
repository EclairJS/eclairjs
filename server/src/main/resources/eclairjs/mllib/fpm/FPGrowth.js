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

    var FPGrowthModel = require(EclairJS_Globals.NAMESPACE + '/mllib/fpm/FPGrowthModel');

    /**
     * A parallel FP-growth algorithm to mine frequent itemsets. The algorithm is described in
     * [[http://dx.doi.org/10.1145/1454008.1454027 Li et al., PFP: Parallel FP-Growth for Query
     *  Recommendation]]. PFP distributes computation in such a way that each worker executes an
     * independent group of mining tasks. The FP-Growth algorithm is described in
     * [[http://dx.doi.org/10.1145/335191.335372 Han et al., Mining frequent patterns without candidate
     *  generation]].
     *
     * @param minSupport the minimal support level of the frequent pattern, any pattern appears
     *                   more than (minSupport * size-of-the-dataset) times will be output
     * @param numPartitions number of partitions used by parallel FP-growth
     *
     * @see [[http://en.wikipedia.org/wiki/Association_rule_learning Association rule learning
     *       (Wikipedia)]]
     *
     * @classdesc
     */

    /**
     * Constructs a default instance with default parameters {minSupport: `0.3`, numPartitions: same
     * as the input data}.
     *
     * @class
     * @memberof module:eclairjs/mllib/fpm
     */
    var FPGrowth = function(obj) {
         
         this.logger = Logger.getLogger("FPGrowth_js");
        var jvmObject;
        if (obj instanceof org.apache.spark.mllib.fpm.FPGrowth) {
            jvmObject = obj;
        } else {
            jvmObject = new org.apache.spark.mllib.fpm.FPGrowth();
        }
         JavaWrapper.call(this, jvmObject);

    };

    FPGrowth.prototype = Object.create(JavaWrapper.prototype);

    FPGrowth.prototype.constructor = FPGrowth;



    /**
     * Sets the minimal support level (default: `0.3`).
     *
     * @param {float} minSupport
     * @returns {module:eclairjs/mllib/fpm.FPGrowth}
     */
    FPGrowth.prototype.setMinSupport = function(minSupport) {
       var javaObject =  this.getJavaObject().setMinSupport(minSupport);
       return new FPGrowth(javaObject);
    };


    /**
     * Sets the number of partitions used by parallel FP-growth (default: same as input data).
     *
     * @param {integer} numPartitions
     * @returns {module:eclairjs/mllib/fpm.FPGrowth}
     */
    FPGrowth.prototype.setNumPartitions = function(numPartitions) {
       var javaObject =  this.getJavaObject().setNumPartitions(numPartitions);
       return new FPGrowth(javaObject);
    };


    /**
     * Computes an FP-Growth model that contains frequent itemsets.
     * @param {module:eclairjs.RDD} data  input data set, each element contains a transaction
     *
     * @returns {module:eclairjs/mllib/fpm.FPGrowthModel}  an [[module:eclairjs/mllib/fpm.FPGrowthModel]]
     */
    FPGrowth.prototype.run = function(data) {
       var data_uw = Utils.unwrapObject(data);
       var javaObject =  this.getJavaObject().run(data_uw);
       return new FPGrowthModel(javaObject);
    };

    module.exports = FPGrowth;

})();
