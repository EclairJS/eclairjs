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
    /**
     * @memberof module:eclairjs/storage
     * @constructor
     * @classdesc Flags for controlling the storage of an RDD. Each StorageLevel records whether to use memory,
     * or ExternalBlockStore, whether to drop the RDD to disk if it falls out of memory or ExternalBlockStore,
     * whether to keep the data in memory in a serialized format, and whether to replicate the RDD partitions on multiple nodes.
     */
    var StorageLevel = function(jvmObj) {
        this.logger = Logger.getLogger("sql.DataFrame_js");
        if(!jvmObj) {
            jvmObj = new org.apache.spark.storage.StorageLevel();
        }
        JavaWrapper.call(this, jvmObj);

    };

    StorageLevel.prototype = Object.create(JavaWrapper.prototype);
    StorageLevel.prototype.constructor = StorageLevel;

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.NONE = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.NONE());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_ONLY());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY_2 = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_ONLY_2());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY_SER = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_ONLY_SER());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY_SER_2 = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_ONLY_SER_2());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.DISK_ONLY = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.DISK_ONLY());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.DISK_ONLY_2 = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.DISK_ONLY_2());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_AND_DISK());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK_2 = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_AND_DISK_2());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK_SER = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_AND_DISK_SER());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK_SER_2 = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_AND_DISK_SER_2());
    };
    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.OFF_HEAP = function() {
        return new StorageLevel(org.apache.spark.storage.StorageLevel.OFF_HEAP());
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.useDisk = function() {
        return this.getJavaObject().useDisk();
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.useMemory = function() {
        return this.getJavaObject().useMemory();
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.useOffHeap = function() {
        return this.getJavaObject().useOffHeap();
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.deserialized = function() {
        return this.getJavaObject().deserialized();
    };

    /**
     * @returns {integer}
     */
    StorageLevel.prototype.replication = function() {
        return this.getJavaObject().replication();
    };

    /**
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.prototype.clone = function() {
        return Utils.javaToJs(this.getJavaObject().clone());
    };

    /**
     * @param {module:eclairjs/storage.StorageLevel} other
     * @returns {boolean}
     */
    StorageLevel.prototype.equals = function(other) {
        return this.getJavaObject().equals(Utils.unwrapObject(other));
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.isValid = function() {
        return this.getJavaObject().isValid();
    };

    /**
     * @returns {integer}
     */
    StorageLevel.prototype.toInt = function() {
        return this.getJavaObject().toInt();
    };

    /**
     * @returns {string}
     */
    StorageLevel.prototype.toString = function() {
        return this.getJavaObject().toString();
    };

    /**
     * @returns {integer}
     */
    StorageLevel.prototype.hashCode = function() {
        return this.getJavaObject().hashCode();
    };

    /**
     * @returns {string}
     */
    StorageLevel.prototype.description = function() {
        return this.getJavaObject().description();
    };

    module.exports = StorageLevel;

})();