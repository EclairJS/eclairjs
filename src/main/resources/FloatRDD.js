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


/*
 This is the wrapper class for org.apache.spark.api.java.JavaDoubleRDD
 a Java type Double = JavaScript type float thus the name change from
 DoubleRDD to FloatRDD
 */


/**
 * * @classdesc
 * @param {RDD} srdd
 * @class
 */
var FloatRDD = function (srdd) {
    this.logger = Logger.getLogger("FloatRDD_js");
    var jvmObject
    var srdd_uw = Utils.unwrapObject(srdd);
    if (srdd_uw instanceof org.apache.spark.api.java.JavaDoubleRDD) {
        jvmObject = srdd_uw;
    } else {
        if (srdd_uw instanceof org.apache.spark.api.java.JavaRDD) {
            srdd_uw = srdd_uw.rdd();
        }
        jvmObject = new org.apache.spark.api.java.JavaDoubleRDD(srdd_uw);
    }
    this.logger.debug("constructor");
    RDD.call(this, jvmObject);

};

FloatRDD.prototype = Object.create(RDD.prototype);

FloatRDD.prototype.constructor = FloatRDD;


/**
 * @param {RDD} rdd
 * @returns {FloatRDD}
 */
FloatRDD.prototype.wrapRDD = function (rdd) {
    var rdd_uw = Utils.unwrapObject(rdd);
    return new FloatRDD(this.getJavaObject().wrapRDD(rdd_uw));
};


/**
 * @returns {FloatRDD}
 */
FloatRDD.prototype.cache = function () {
    return new FloatRDD(this.getJavaObject().cache());
};


/**
 * Set this RDD's storage level to persist its values across operations after the first time
 * it is computed. Can only be called once on each RDD.
 * @param {StorageLevel} newLevel
 * @returns {FloatRDD}
 */
FloatRDD.prototype.persist = function (newLevel) {
    var newLevel_uw = Utils.unwrapObject(newLevel);
    return new FloatRDD(this.getJavaObject().persist(newLevel_uw));
};


/**
 * Mark the RDD as non-persistent, and remove all blocks for it from memory and disk.
 *
 * @param {boolean} [blocking]  Whether to block until all blocks are deleted.
 * @returns {FloatRDD}
 */
FloatRDD.prototype.unpersist = function (blocking) {
    var obj;
    if (blocking) {
        obj = this.getJavaObject().unpersist(blocking);
    } else {
        obj = this.getJavaObject().unpersist();
    }
    return new FloatRDD(obj);
};


/**
 * @returns {float}
 */
FloatRDD.prototype.first = function () {
    return this.getJavaObject().first();
};


/**
 * Return a new RDD containing the distinct elements in this RDD.
 * @param {number} [numPartitions]
 * @returns {FloatRDD}
 */
FloatRDD.prototype.distinct = function (numPartitions) {
    var obj;
    if (numPartitions) {
        obj = this.getJavaObject().distinct(numPartitions);
    } else {
        obj = this.getJavaObject().distinct();
    }
    return new FloatRDD(obj);
};


/**
 * Return a new RDD containing only the elements that satisfy a predicate.
 * @param {function} func
 * @returns {FloatRDD}
 */
FloatRDD.prototype.filter = function (func, bindArgs) {
    var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, bindArgs);
    var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
    var obj = this.getJavaObject().filter(fn);
    return new FloatRDD(obj);
};


/**
 * Return a new RDD that is reduced into `numPartitions` partitions.
 * @param {number} numPartitions
 * @param {boolean} [shuffle]
 * @returns {FloatRDD}
 */
FloatRDD.prototype.coalesce = function (numPartitions, shuffle) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[1]) {
//   return  this.getJavaObject().coalesce(numPartitions,shuffle);
//   } else {
//   return  this.getJavaObject().coalesce(numPartitions);
//   }
};


/**
 * Return a new RDD that has exactly numPartitions partitions.
 *
 * Can increase or decrease the level of parallelism in this RDD. Internally, this uses
 * a shuffle to redistribute data.
 *
 * If you are decreasing the number of partitions in this RDD, consider using `coalesce`,
 * which can avoid performing a shuffle.
 * @param {number} numPartitions
 * @returns {FloatRDD}
 */
FloatRDD.prototype.repartition = function (numPartitions) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().repartition(numPartitions);
};


/**
 * Return an RDD with the elements from `this` that are not in `other`.
 *
 * Uses `this` partitioner/partition size, because even if `other` is huge, the resulting
 * RDD will be &lt;= us.
 * @param {FloatRDD} other
 * @returns {FloatRDD}
 */
FloatRDD.prototype.subtract0 = function (other) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().subtract(other);
};


/**
 * Return an RDD with the elements from `this` that are not in `other`.
 * @param {FloatRDD} other
 * @param {number} numPartitions
 * @returns {FloatRDD}
 */
FloatRDD.prototype.subtract1 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().subtract(other,numPartitions);
};


/**
 * Return an RDD with the elements from `this` that are not in `other`.
 * @param {FloatRDD} other
 * @param {Partitioner} p
 * @returns {FloatRDD}
 */
FloatRDD.prototype.subtract2 = function (other, p) {
    throw "not implemented by ElairJS";
//   var p_uw = Utils.unwrapObject(p);
//   return  this.getJavaObject().subtract(other,p_uw);
};


/**
 * Return a sampled subset of this RDD.
 * @param {boolean} withReplacement
 * @param {float} fraction
 * @param {number} [seed]
 * @returns {FloatRDD}
 */
FloatRDD.prototype.sample = function (withReplacement, fraction, seed) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[2]) {
//   return  this.getJavaObject().sample(withReplacement,fraction,seed);
//   } else {
//   return  this.getJavaObject().sample(withReplacement,fraction);
//   }
};


/**
 * Return the union of this RDD and another one. Any identical elements will appear multiple
 * times (use `.distinct()` to eliminate them).
 * @param {FloatRDD} other
 * @returns {FloatRDD}
 */
FloatRDD.prototype.union = function (other) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().union(other);
};


/**
 * Return the intersection of this RDD and another one. The output will not contain any duplicate
 * elements, even if the input RDDs did.
 *
 * Note that this method performs a shuffle internally.
 * @param {FloatRDD} other
 * @returns {FloatRDD}
 */
FloatRDD.prototype.intersection = function (other) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().intersection(other);
};


/**
 * @returns {float}
 */
FloatRDD.prototype.sum = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().sum();
};


/**
 * Returns the minimum element from this RDD as defined by
 * the default comparator natural order.
 * @returns {float}  the minimum of the RDD
 */
FloatRDD.prototype.min = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().min();
};


/**
 * Returns the maximum element from this RDD as defined by
 * the default comparator natural order.
 * @returns {float}  the maximum of the RDD
 */
FloatRDD.prototype.max = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().max();
};


/**
 * Return a {@link StatCounter} object that captures the mean, variance and
 * count of the RDD's elements in one operation.
 * @returns {StatCounter}
 */
FloatRDD.prototype.stats = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().stats();
//   return new StatCounter(javaObject);
};


/**
 * @returns {float}
 */
FloatRDD.prototype.mean = function () {
    return this.getJavaObject().mean();
};


/**
 * @returns {float}
 */
FloatRDD.prototype.variance = function () {
    return this.getJavaObject().variance();
};


/**
 * @returns {float}
 */
FloatRDD.prototype.stdev = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().stdev();
};


/**
 * Compute the sample standard deviation of this RDD's elements (which corrects for bias in
 * estimating the standard deviation by dividing by N-1 instead of N).
 * @returns {float}
 */
FloatRDD.prototype.sampleStdev = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().sampleStdev();
};


/**
 * Compute the sample variance of this RDD's elements (which corrects for bias in
 * estimating the standard variance by dividing by N-1 instead of N).
 * @returns {float}
 */
FloatRDD.prototype.sampleVariance = function () {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().sampleVariance();
};


/**
 * @param {number} timeout
 * @param {float} [confidence]
 * @returns {PartialResult}
 */
FloatRDD.prototype.meanApprox = function (timeout, confidence) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[1]) {
//   var javaObject =  this.getJavaObject().meanApprox(timeout,confidence);
//   return new PartialResult(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().meanApprox(timeout);
//   return new PartialResult(javaObject);
//   }
};


/**
 * Approximate operation to return the sum within a timeout.
 * @param {number} timeout
 * @param {float} [confidence]
 * @returns {PartialResult}
 */
FloatRDD.prototype.sumApprox = function (timeout, confidence) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[1]) {
//   var javaObject =  this.getJavaObject().sumApprox(timeout,confidence);
//   return new PartialResult(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().sumApprox(timeout);
//   return new PartialResult(javaObject);
//   }
};


/**
 * Compute a histogram of the data using bucketCount number of buckets evenly
 *  spaced between the minimum and maximum of the RDD. For example if the min
 *  value is 0 and the max is 100 and there are two buckets the resulting
 *  buckets will be [0,50) [50,100]. bucketCount must be at least 1
 * If the RDD contains infinity, NaN throws an exception
 * If the elements in RDD do not vary (max == min) always returns a single bucket.
 * @param {number} bucketCount
 * @returns {Pair}
 */
FloatRDD.prototype.histogram0 = function (bucketCount) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().histogram(bucketCount);
//   return new Pair(javaObject);
};


/**
 * Compute a histogram using the provided buckets. The buckets are all open
 * to the left except for the last which is closed
 *  e.g. for the array
 *  [1,10,20,50] the buckets are [1,10) [10,20) [20,50]
 *  e.g 1&lt;=x&lt;10 , 10&lt;=x&lt;20, 20&lt;=x&lt;50
 *  And on the input of 1 and 50 we would have a histogram of 1,0,0
 *
 * Note: if your histogram is evenly spaced (e.g. [0, 10, 20, 30]) this can be switched
 * from an O(log n) insertion to O(1) per element. (where n = # buckets) if you set evenBuckets
 * to true.
 * buckets must be sorted and not contain any duplicates.
 * buckets array must be at least two elements
 * All NaN entries are treated the same. If you have a NaN bucket it must be
 * the maximum value of the last position and all NaN entries will be counted
 * in that bucket.
 * @param {number[]} buckets
 * @returns {number[]}
 */
FloatRDD.prototype.histogram1 = function (buckets) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().histogram(buckets);
};


/**
 * @param {float[]} buckets
 * @param {boolean} evenBuckets
 * @returns {number[]}
 */
FloatRDD.prototype.histogram2 = function (buckets, evenBuckets) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().histogram(buckets,evenBuckets);
};


/**
 * @param {string} name
 * @returns {FloatRDD}
 */
FloatRDD.prototype.setName = function (name) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().setName(name);
};
//
// static methods
//


/**
 * @param {RDD} rdd
 * @returns {FloatRDD}
 */
FloatRDD.fromRDD = function (rdd) {
    throw "not implemented by ElairJS";
//   var rdd_uw = Utils.unwrapObject(rdd);
//   return  org.apache.spark.api.java.JavaDoubleRDD.fromRDD(rdd_uw);
};


/**
 * @param {FloatRDD} rdd
 * @returns {RDD}
 */
FloatRDD.toRDD = function (rdd) {
    throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.api.java.JavaDoubleRDD.toRDD(rdd);
//   return new RDD(javaObject);
};
