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
     * @constructor
     * @memberof module:eclairjs
     * @classdesc A {@link Partitioner} that implements hash-based partitioning using
     * Java's `Object.hashCode`.
     *
     * Java arrays have hashCodes that are based on the arrays' identities rather than their contents,
     * so attempting to partition an RDD[Array[_]] or RDD[(Array[_], _)] using a HashPartitioner will
     * produce an unexpected or incorrect result.
     *
     */

    var HashPartitioner = function (partitions) {
        var jvmObject = new org.apache.spark.HashPartitioner(partitions);
        this.logger = Logger.getLogger("HashPartitioner_js");
        JavaWrapper.call(this, jvmObject);

    };

    HashPartitioner.prototype = Object.create(JavaWrapper.prototype);

    HashPartitioner.prototype.constructor = HashPartitioner;


    HashPartitioner.prototype.numPartitions = function () {
        return this.getJavaObject().numPartitions();
    }


    HashPartitioner.prototype.getPartition = function (key) {
        return this.getJavaObject().getPartition(key);
    }


    HashPartitioner.prototype.equals = function (other) {
        var other_uw = Utils.unwrapObject(other);
        return this.getJavaObject().equals(other_uw);
    }


    HashPartitioner.prototype.hashCode = function () {
        return this.getJavaObject().hashCode();
    }
    module.exports = HashPartitioner;

})();