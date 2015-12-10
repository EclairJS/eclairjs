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
/**
 * @constructor
 * @classdesc Flags for controlling the storage of an RDD. Each StorageLevel records whether to use memory, 
 * or ExternalBlockStore, whether to drop the RDD to disk if it falls out of memory or ExternalBlockStore,
 * whether to keep the data in memory in a serialized format, and whether to replicate the RDD partitions on multiple nodes.
 */
var StorageLevel = function(jvmObj) {
	JavaWrapper.call(this, jvmObj);

	  // Initialize our Row-specific properties
	this.logger = Logger.getLogger("sql.DataFrame_js");
};

StorageLevel.prototype = Object.create(JavaWrapper.prototype); 
StorageLevel.prototype.constructor = StorageLevel;

/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.NONE = function() {
	return new StorageLevel(org.apache.spark.storage.StorageLevel.NONE());
};
/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.MEMORY_ONLY = function() {
	return new StorageLevel(org.apache.spark.storage.StorageLevel.MEMORY_ONLY());
};
