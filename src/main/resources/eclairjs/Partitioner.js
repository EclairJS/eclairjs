/*
 * Copyright 2015 IBM Corp.
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
     * @constructor
     * @memberof module:eclairjs
     * @classdesc An object that defines how the elements in a key-value pair RDD are partitioned by key.
     * Maps each key to a partition ID, from 0 to `numPartitions - 1`.
     */
    var Partitioner = function (jvmObject) {
        throw "con't do 'new' on abstract class 'Partitioner'"
        // this.logger = Logger.getLogger("Partitioner_js");
        // JavaWrapper.call(this, jvmObject);
    };

    Partitioner.prototype = Object.create(JavaWrapper.prototype);

    Partitioner.prototype.constructor = Partitioner;


    Partitioner.prototype.numPartitions = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().numPartitions();
    }


    Partitioner.prototype.getPartition = function (key) {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().getPartition(key);
    }

//
// static methods
//


    /**
     * Choose a partitioner to use for a cogroup-like operation between a number of RDDs.
     *
     * If any of the RDDs already has a partitioner, choose that one.
     *
     * Otherwise, we use a default HashPartitioner. For the number of partitions, if
     * spark.default.parallelism is set, then we'll use the value from SparkContext
     * defaultParallelism, otherwise we'll use the max number of upstream partitions.
     *
     * Unless spark.default.parallelism is set, the number of partitions will be the
     * same as the number of partitions in the largest upstream RDD, as this should
     * be least likely to cause out-of-memory errors.
     *
     * We use two method parameters (rdd, others) to enforce callers passing at least 1 RDD.
     * @returns {module:eclairjs.Partitioner}
     */
    Partitioner.defaultPartitioner = function (rdd, others) {
        var rdd_uw = Utils.unwrapObject(rdd);
        var others_uw = Utils.unwrapObject(others);
        var javaObject = org.apache.spark.HashPartitioner.defaultPartitioner(rdd_uw, others_uw);
        return Utils.javaToJs(javaObject);
    }
    module.exports = Partitioner;

})();