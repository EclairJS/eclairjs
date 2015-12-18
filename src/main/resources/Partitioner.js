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
 * @classdesc An object that defines how the elements in a key-value pair RDD are partitioned by key.
 * Maps each key to a partition ID, from 0 to `numPartitions - 1`.
 */
var Partitioner = function(jvmObject) {
    this.logger = Logger.getLogger("Partitioner_js");
    JavaWrapper.call(this, jvmObject);
};

Partitioner.prototype = Object.create(JavaWrapper.prototype);

Partitioner.prototype.constructor = Partitioner;




Partitioner.prototype.numPartitions = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().numPartitions();
}



Partitioner.prototype.getPartition = function(key) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().getPartition(key);
}


/**
 * A {@link Partitioner} that implements hash-based partitioning using
 * Java's `Object.hashCode`.
 *
 * Java arrays have hashCodes that are based on the arrays' identities rather than their contents,
 * so attempting to partition an RDD[Array[_]] or RDD[(Array[_], _)] using a HashPartitioner will
 * produce an unexpected or incorrect result.
 * @classdesc
 */

var HashPartitioner = function(partitions) {
var jvmObject = new org.apache.spark.HashPartitioner(partitions);
this.logger = Logger.getLogger("HashPartitioner_js");
JavaWrapper.call(this, jvmObject);

};

HashPartitioner.prototype = Object.create(JavaWrapper.prototype);

HashPartitioner.prototype.constructor = HashPartitioner;




HashPartitioner.prototype.numPartitions = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().numPartitions();
}



HashPartitioner.prototype.getPartition = function(key) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().getPartition(key);
}



HashPartitioner.prototype.equals = function(other) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().equals(other);
}



HashPartitioner.prototype.hashCode = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().hashCode();
}


/**
 * A {@link Partitioner} that partitions sortable records by range into roughly
 * equal ranges. The ranges are determined by sampling the content of the RDD passed in.
 *
 * Note that the actual number of partitions created by the RangePartitioner might not be the same
 * as the `partitions` parameter, in the case where the number of sampled records is less than
 * the value of `partitions`.
 * @classdesc
 */

var RangePartitioner = function(partitions,rdd,ascending) {
var jvmObject = new org.apache.spark.RangePartitioner(partitions,rdd,ascending);
this.logger = Logger.getLogger("RangePartitioner_js");
JavaWrapper.call(this, jvmObject);

};

RangePartitioner.prototype = Object.create(JavaWrapper.prototype);

RangePartitioner.prototype.constructor = RangePartitioner;




RangePartitioner.prototype.numPartitions = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().numPartitions();
}



RangePartitioner.prototype.getPartition = function(key) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().getPartition(key);
}



RangePartitioner.prototype.equals = function(other) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().equals(other);
}



RangePartitioner.prototype.hashCode = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().hashCode();
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
 * @returns {Partitioner} 
 */
Partitioner.defaultPartitioner = function(rdd,others) {
throw "not implemented by ElairJS";
//   var rdd_uw = Utils.unwrapObject(rdd);
//   var others_uw = Utils.unwrapObject(others);
//   var javaObject =  this.getJavaObject().defaultPartitioner(rdd_uw,others_uw);
//   return new Partitioner(javaObject);
}
