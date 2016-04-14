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
     * @classdesc A {@link Partitioner} that partitions sortable records by range into roughly
     * equal ranges. The ranges are determined by sampling the content of the RDD passed in.
     *
     * Note that the actual number of partitions created by the RangePartitioner might not be the same
     * as the `partitions` parameter, in the case where the number of sampled records is less than
     * the value of `partitions`.
     *
     */

    var RangePartitioner = function (partitions, rdd, ascending) {
        var jvmObject = new org.apache.spark.RangePartitioner(partitions, rdd, ascending);
        this.logger = Logger.getLogger("RangePartitioner_js");
        JavaWrapper.call(this, jvmObject);

    };

    RangePartitioner.prototype = Object.create(JavaWrapper.prototype);

    RangePartitioner.prototype.constructor = RangePartitioner;


    RangePartitioner.prototype.numPartitions = function () {
        return this.getJavaObject().numPartitions();
    }


    RangePartitioner.prototype.getPartition = function (key) {
        return this.getJavaObject().getPartition(key);
    }


    RangePartitioner.prototype.equals = function (other) {
        var other_uw = Utils.unwrapObject(other);
        return this.getJavaObject().equals(other_uw);
    }


    RangePartitioner.prototype.hashCode = function () {
        return this.getJavaObject().hashCode();
    }

    module.exports = RangePartitioner;

})();
