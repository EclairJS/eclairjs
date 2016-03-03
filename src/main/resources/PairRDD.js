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


/**
 * @param {RDD} rdd of [Tuple(value, value)]{@link Tuple}.
 * @returns {??}
 *  @class
 */
var PairRDD = function (rdd, kClassTag, vClassTag) {
    //var jvmObject = new org.apache.spark.api.java.JavaPairRDD(rdd,kClassTag,vClassTag);

    //JavaWrapper.call(this, rdd);
    RDD.call(this, Utils.unwrapObject(rdd));
    this.className = "PairRDD_js";
    this.logger = Logger.getLogger("PairRDD_js");
    this.logger.debug("constructor")

};


PairRDD.prototype = Object.create(RDD.prototype);

PairRDD.prototype.constructor = PairRDD;

PairRDD.prototype.testme = function () {
    print("testme")
};

/**
 * @param {RDD} rdd
 * @returns {PairRDD}
 */
PairRDD.prototype.wrapRDD = function (rdd) {
    throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'rdd'
//   var rdd_uw = Utils.unwrapObject(rdd);
//   var javaObject =  this.getJavaObject().wrapRDD(rdd_uw);
//   return new PairRDD(javaObject);
};


/**
 * Set this RDD's storage level to persist its values across operations after the first time
 * it is computed. Can only be called once on each RDD.
 * @param {StorageLevel} newLevel
 * @returns {PairRDD}
 */
PairRDD.prototype.persist = function (newLevel) {
    throw "not implemented by ElairJS";
//   var newLevel_uw = Utils.unwrapObject(newLevel);
//   var javaObject =  this.getJavaObject().persist(newLevel_uw);
//   return new PairRDD(javaObject);
};


/**
 * Mark the RDD as non-persistent, and remove all blocks for it from memory and disk.
 *
 * @param {boolean} [blocking]  Whether to block until all blocks are deleted.
 * @returns {PairRDD}
 */
PairRDD.prototype.unpersist = function (blocking) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[0]) {
//   var javaObject =  this.getJavaObject().unpersist(blocking);
//   return new PairRDD(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().unpersist();
//   return new PairRDD(javaObject);
//   }
};


/**
 * Return a new RDD containing the distinct elements in this RDD.
 * @param {number} [numPartitions]
 * @returns {PairRDD}
 */
PairRDD.prototype.distinct = function (numPartitions) {
    var javaObject
    if (arguments[0]) {
        javaObject = this.getJavaObject().distinct(numPartitions);

    } else {
        javaObject = this.getJavaObject().distinct();

    }
    return new PairRDD(javaObject);
};


/**
 * Return a new PairRDD containing only the elements that satisfy a predicate.
 * @param {function} f
 * @returns {PairRDD}
 */
PairRDD.prototype.filter = function (f) {
    var sv = Utils.createJavaParams(f);
    var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
    var javaObject = this.getJavaObject().filter(fn);
    return new PairRDD(javaObject);
};

/**
 * Persist this RDD with the default storage level (`MEMORY_ONLY`).
 * @returns {RDD}
 */
PairRDD.prototype.cache = function () {
    return new PairRDD(this.getJavaObject().cache());
};

/**
 * Return a new RDD that is reduced into `numPartitions` partitions.
 * @param {number} numPartitions
 * @param {boolean} [shuffle]
 * @returns {PairRDD}
 */
PairRDD.prototype.coalesce = function (numPartitions, shuffle) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[1]) {
//   var javaObject =  this.getJavaObject().coalesce(numPartitions,shuffle);
//   return new PairRDD(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().coalesce(numPartitions);
//   return new PairRDD(javaObject);
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
 * @returns {PairRDD}
 */
PairRDD.prototype.repartition = function (numPartitions) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().repartition(numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Return a sampled subset of this RDD.
 * @param {boolean} withReplacement
 * @param {number} fraction
 * @param {number} [seed]
 * @returns {PairRDD}
 */
PairRDD.prototype.sample = function (withReplacement, fraction, seed) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[2]) {
//   var javaObject =  this.getJavaObject().sample(withReplacement,fraction,seed);
//   return new PairRDD(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().sample(withReplacement,fraction);
//   return new PairRDD(javaObject);
//   }
};


/**
 * Return a subset of this RDD sampled by key (via stratified sampling).
 *
 * Create a sample of this RDD using variable sampling rates for different keys as specified by
 * `fractions`, a key to sampling rate map, via simple random sampling with one pass over the
 * RDD, to produce a sample of size that's approximately equal to the sum of
 * math.ceil(numItems * samplingRate) over all key values.
 * @param {boolean} withReplacement
 * @param {JMap} fractions
 * @param {number} [seed]
 * @returns {PairRDD}
 */
PairRDD.prototype.sampleByKey = function (withReplacement, fractions, seed) {
    throw "not implemented by ElairJS";
//   var fractions_uw = Utils.unwrapObject(fractions);
// 
//   if (arguments[2]) {
//   var javaObject =  this.getJavaObject().sampleByKey(withReplacement,fractions_uw,seed);
//   return new PairRDD(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().sampleByKey(withReplacement,fractions_uw);
//   return new PairRDD(javaObject);
//   }
};


/**
 * Return a subset of this RDD sampled by key (via stratified sampling) containing exactly
 * math.ceil(numItems * samplingRate) for each stratum (group of pairs with the same key).
 *
 * This method differs from {@link sampleByKey} in that we make additional passes over the RDD to
 * create a sample size that's exactly equal to the sum of math.ceil(numItems * samplingRate)
 * over all key values with a 99.99% confidence. When sampling without replacement, we need one
 * additional pass over the RDD to guarantee sample size; when sampling with replacement, we need
 * two additional passes.
 * @param {boolean} withReplacement
 * @param {JMap} fractions
 * @param {number} [seed]
 * @returns {PairRDD}
 */
PairRDD.prototype.sampleByKeyExact = function (withReplacement, fractions, seed) {
    throw "not implemented by ElairJS";
//   var fractions_uw = Utils.unwrapObject(fractions);
// 
//   if (arguments[2]) {
//   var javaObject =  this.getJavaObject().sampleByKeyExact(withReplacement,fractions_uw,seed);
//   return new PairRDD(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().sampleByKeyExact(withReplacement,fractions_uw);
//   return new PairRDD(javaObject);
//   }
};


/**
 * Return the union of this RDD and another one. Any identical elements will appear multiple
 * times (use `.distinct()` to eliminate them).
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.union = function (other) {
    var other_uw = Utils.unwrapObject(other);
    var javaObject = this.getJavaObject().union(other_uw);
    return new PairRDD(javaObject);
};

/**
 * Return the intersection of this RDD and another one. The output will not contain any duplicate
 * elements, even if the input RDDs did.
 *
 * Note that this method performs a shuffle internally.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.intersection = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().intersection(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * @returns {Tuple2}
 */
PairRDD.prototype.first = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().first();
//   return new Tuple2(javaObject);
};


/**
 * Generic function to combine the elements for each key using a custom set of aggregation
 * functions. Turns a PairRDD[(K, V)] into a result of type PairRDD[(K, C)], for a
 * "combined type" C. Note that V and C can be different -- for example, one might group an
 * RDD of type (Int, Int) into an RDD of type (Int, List[Int]). Users provide three
 * functions:
 *
 *  - `createCombiner`, which turns a V into a C (e.g., creates a one-element list)
 *  - `mergeValue`, to merge a V into a C (e.g., adds it to the end of a list)
 *  - `mergeCombiners`, to combine two C's into a single one.
 *
 * In addition, users can control the partitioning of the output RDD, the serializer that is use
 * for the shuffle, and whether to perform map-side aggregation (if a mapper can produce multiple
 * items with the same key).
 * @param {func} createCombiner
 * @param {func} mergeValue
 * @param {func} mergeCombiners
 * @param {Partitioner} partitioner
 * @param {boolean} mapSideCombine
 * @param {Serializer} serializer
 * @returns {PairRDD}
 */
PairRDD.prototype.combineByKey0 = function (createCombiner, mergeValue, mergeCombiners, partitioner, mapSideCombine, serializer) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(createCombiner);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(mergeValue);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var sv3 = Utils.createJavaParams(mergeCombiners);
//   var fn3 = new org.eclairjs.nashorn.JSFunction2(sv3.funcStr, sv3.scopeVars);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var serializer_uw = Utils.unwrapObject(serializer);
//   var javaObject =  this.getJavaObject().combineByKey(fn,fn2,fn3,partitioner_uw,mapSideCombine,serializer_uw);
//   return new PairRDD(javaObject);
};


/**
 * Generic function to combine the elements for each key using a custom set of aggregation
 * functions. Turns a PairRDD[(K, V)] into a result of type PairRDD[(K, C)], for a
 * "combined type" C. Note that V and C can be different -- for example, one might group an
 * RDD of type (Int, Int) into an RDD of type (Int, List[Int]). Users provide three
 * functions:
 *
 *  - `createCombiner`, which turns a V into a C (e.g., creates a one-element list)
 *  - `mergeValue`, to merge a V into a C (e.g., adds it to the end of a list)
 *  - `mergeCombiners`, to combine two C's into a single one.
 *
 * In addition, users can control the partitioning of the output RDD. This method automatically
 * uses map-side aggregation in shuffling the RDD.
 * @param {func} createCombiner
 * @param {func} mergeValue
 * @param {func} mergeCombiners
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.combineByKey1 = function (createCombiner, mergeValue, mergeCombiners, partitioner) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(createCombiner);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(mergeValue);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var sv3 = Utils.createJavaParams(mergeCombiners);
//   var fn3 = new org.eclairjs.nashorn.JSFunction2(sv3.funcStr, sv3.scopeVars);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().combineByKey(fn,fn2,fn3,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * Simplified version of combineByKey that hash-partitions the output RDD and uses map-side
 * aggregation.
 * @param {func} createCombiner
 * @param {func} mergeValue
 * @param {func} mergeCombiners
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.combineByKey2 = function (createCombiner, mergeValue, mergeCombiners, numPartitions) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(createCombiner);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(mergeValue);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var sv3 = Utils.createJavaParams(mergeCombiners);
//   var fn3 = new org.eclairjs.nashorn.JSFunction2(sv3.funcStr, sv3.scopeVars);
//   var javaObject =  this.getJavaObject().combineByKey(fn,fn2,fn3,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative reduce function. This will also perform
 * the merging locally on each mapper before sending results to a reducer, similarly to a
 * "combiner" in MapReduce.
 * @param {Partitioner} partitioner
 * @param {func} func
 * @returns {PairRDD}
 */
PairRDD.prototype.reduceByKey0 = function (partitioner, func) {
    throw "not implemented by ElairJS";
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().reduceByKey(partitioner_uw,fn);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative reduce function, but return the results
 * immediately to the master as a Map. This will also perform the merging locally on each mapper
 * before sending results to a reducer, similarly to a "combiner" in MapReduce.
 * @param {func} func
 * @returns {Map}
 */
PairRDD.prototype.reduceByKeyLocally = function (func) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().reduceByKeyLocally(fn);
//   return new Map(javaObject);
};


/**
 * @returns {Map}
 */
PairRDD.prototype.countByKey = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().countByKey();
//   return new Map(javaObject);
};


/**
 * Approximate version of countByKey that can return a partial result if it does
 * not finish within a timeout.
 * @param {number} timeout
 * @param {number} [confidence]
 * @returns {PartialResult}
 */
PairRDD.prototype.countByKeyApprox = function (timeout, confidence) {
    throw "not implemented by ElairJS";
// 
//   if (arguments[1]) {
//   var javaObject =  this.getJavaObject().countByKeyApprox(timeout,confidence);
//   return new PartialResult(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().countByKeyApprox(timeout);
//   return new PartialResult(javaObject);
//   }
};


/**
 * Aggregate the values of each key, using given combine functions and a neutral "zero value".
 * This function can return a different result type, U, than the type of the values in this RDD,
 * V. Thus, we need one operation for merging a V into a U and one operation for merging two U's,
 * as in scala.TraversableOnce. The former operation is used for merging values within a
 * partition, and the latter is used for merging values between partitions. To avoid memory
 * allocation, both of these functions are allowed to modify and return their first argument
 * instead of creating a new U.
 * @param {object} zeroValue
 * @param {Partitioner} partitioner
 * @param {func} seqFunc
 * @param {func} combFunc
 * @returns {PairRDD}
 */
PairRDD.prototype.aggregateByKey0 = function (zeroValue, partitioner, seqFunc, combFunc) {
    throw "not implemented by ElairJS";
//   var zeroValue_uw = Utils.unwrapObject(zeroValue);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var sv = Utils.createJavaParams(seqFunc);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(combFunc);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var javaObject =  this.getJavaObject().aggregateByKey(zeroValue_uw,partitioner_uw,fn,fn2);
//   return new PairRDD(javaObject);
};


/**
 * Aggregate the values of each key, using given combine functions and a neutral "zero value".
 * This function can return a different result type, U, than the type of the values in this RDD,
 * V. Thus, we need one operation for merging a V into a U and one operation for merging two U's,
 * as in scala.TraversableOnce. The former operation is used for merging values within a
 * partition, and the latter is used for merging values between partitions. To avoid memory
 * allocation, both of these functions are allowed to modify and return their first argument
 * instead of creating a new U.
 * @param {object} zeroValue
 * @param {number} numPartitions
 * @param {func} seqFunc
 * @param {func} combFunc
 * @returns {PairRDD}
 */
PairRDD.prototype.aggregateByKey1 = function (zeroValue, numPartitions, seqFunc, combFunc) {
    throw "not implemented by ElairJS";
//   var zeroValue_uw = Utils.unwrapObject(zeroValue);
//   var sv = Utils.createJavaParams(seqFunc);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(combFunc);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var javaObject =  this.getJavaObject().aggregateByKey(zeroValue_uw,numPartitions,fn,fn2);
//   return new PairRDD(javaObject);
};


/**
 * Aggregate the values of each key, using given combine functions and a neutral "zero value".
 * This function can return a different result type, U, than the type of the values in this RDD,
 * V. Thus, we need one operation for merging a V into a U and one operation for merging two U's.
 * The former operation is used for merging values within a partition, and the latter is used for
 * merging values between partitions. To avoid memory allocation, both of these functions are
 * allowed to modify and return their first argument instead of creating a new U.
 * @param {object} zeroValue
 * @param {func} seqFunc
 * @param {func} combFunc
 * @returns {PairRDD}
 */
PairRDD.prototype.aggregateByKey2 = function (zeroValue, seqFunc, combFunc) {
    throw "not implemented by ElairJS";
//   var zeroValue_uw = Utils.unwrapObject(zeroValue);
//   var sv = Utils.createJavaParams(seqFunc);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(combFunc);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var javaObject =  this.getJavaObject().aggregateByKey(zeroValue_uw,fn,fn2);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative function and a neutral "zero value" which
 * may be added to the result an arbitrary number of times, and must not change the result
 * (e.g ., Nil for list concatenation, 0 for addition, or 1 for multiplication.).
 * @param {object} zeroValue
 * @param {Partitioner} partitioner
 * @param {func} func
 * @returns {PairRDD}
 */
PairRDD.prototype.foldByKey0 = function (zeroValue, partitioner, func) {
    throw "not implemented by ElairJS";
//   var zeroValue_uw = Utils.unwrapObject(zeroValue);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().foldByKey(zeroValue_uw,partitioner_uw,fn);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative function and a neutral "zero value" which
 * may be added to the result an arbitrary number of times, and must not change the result
 * (e.g ., Nil for list concatenation, 0 for addition, or 1 for multiplication.).
 * @param {object} zeroValue
 * @param {number} numPartitions
 * @param {func} func
 * @returns {PairRDD}
 */
PairRDD.prototype.foldByKey1 = function (zeroValue, numPartitions, func) {
    throw "not implemented by ElairJS";
//   var zeroValue_uw = Utils.unwrapObject(zeroValue);
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().foldByKey(zeroValue_uw,numPartitions,fn);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative function and a neutral "zero value"
 * which may be added to the result an arbitrary number of times, and must not change the result
 * (e.g., Nil for list concatenation, 0 for addition, or 1 for multiplication.).
 * @param {object} zeroValue
 * @param {func} func
 * @returns {PairRDD}
 */
PairRDD.prototype.foldByKey2 = function (zeroValue, func) {
    throw "not implemented by ElairJS";
//   var zeroValue_uw = Utils.unwrapObject(zeroValue);
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().foldByKey(zeroValue_uw,fn);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative reduce function. This will also perform
 * the merging locally on each mapper before sending results to a reducer, similarly to a
 * "combiner" in MapReduce. Output will be hash-partitioned with numPartitions partitions.
 * @param {func} func
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.reduceByKey1 = function (func, numPartitions) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().reduceByKey(fn,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Group the values for each key in the RDD into a single sequence. Allows controlling the
 * partitioning of the resulting key-value pair RDD by passing a Partitioner.
 *
 * Note: If you are grouping in order to perform an aggregation (such as a sum or average) over
 * each key, using [[PairRDD.reduceByKey]] or {@link combineByKey}
 * will provide much better performance.
 * @param {Partitioner | number} partitioner or number of partitions
 * @returns {PairRDD}
 */
PairRDD.prototype.groupByKey = function (partitioner) {
    var javaObject;
    if (partitioner) {
        var partitioner_uw = Utils.unwrapObject(partitioner);
        javaObject = this.getJavaObject().groupByKey(partitioner_uw);
    } else {
        javaObject = this.getJavaObject().groupByKey();
    }

    return new PairRDD(javaObject);
};


/**
 * Return an RDD with the elements from `this` that are not in `other`.
 *
 * Uses `this` partitioner/partition size, because even if `other` is huge, the resulting
 * RDD will be &lt;= us.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.subtract0 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().subtract(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * Return an RDD with the elements from `this` that are not in `other`.
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.subtract1 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().subtract(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Return an RDD with the elements from `this` that are not in `other`.
 * @param {PairRDD} other
 * @param {Partitioner} p
 * @returns {PairRDD}
 */
PairRDD.prototype.subtract2 = function (other, p) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var p_uw = Utils.unwrapObject(p);
//   var javaObject =  this.getJavaObject().subtract(other_uw,p_uw);
//   return new PairRDD(javaObject);
};


/**
 * Return an RDD with the pairs from `this` whose keys are not in `other`.
 *
 * Uses `this` partitioner/partition size, because even if `other` is huge, the resulting
 * RDD will be &lt;= us.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.subtractByKey0 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().subtractByKey(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.subtractByKey1 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().subtractByKey(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * @param {PairRDD} other
 * @param {Partitioner} p
 * @returns {PairRDD}
 */
PairRDD.prototype.subtractByKey2 = function (other, p) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var p_uw = Utils.unwrapObject(p);
//   var javaObject =  this.getJavaObject().subtractByKey(other_uw,p_uw);
//   return new PairRDD(javaObject);
};


/**
 * Return a copy of the RDD partitioned using the specified partitioner.
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.partitionBy = function (partitioner) {
    throw "not implemented by ElairJS";
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().partitionBy(partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative reduce function. This will also perform
 * the merging locally on each mapper before sending results to a reducer, similarly to a
 * "combiner" in MapReduce.
 * @param {PairRDD} other
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.join = function (other, numPartitions) {
    var other_uw = Utils.unwrapObject(other);
    var javaObject = numPartitions ? this.getJavaObject(other_uw, numPartitions).join() :
        this.getJavaObject().join(other_uw);
    return new PairRDD(javaObject);
};


/**
 * Perform a left outer join of `this` and `other`. For each element (k, v) in `this`, the
 * resulting RDD will either contain all pairs (k, (v, Some(w))) for w in `other`, or the
 * pair (k, (v, None)) if no elements in `other` have key k. Uses the given Partitioner to
 * partition the output RDD.
 * @param {PairRDD} other
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.leftOuterJoin0 = function (other, partitioner) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().leftOuterJoin(other_uw,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * Perform a right outer join of `this` and `other`. For each element (k, w) in `other`, the
 * resulting RDD will either contain all pairs (k, (Some(v), w)) for v in `this`, or the
 * pair (k, (None, w)) if no elements in `this` have key k. Uses the given Partitioner to
 * partition the output RDD.
 * @param {PairRDD} other
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.rightOuterJoin0 = function (other, partitioner) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().rightOuterJoin(other_uw,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * Perform a full outer join of `this` and `other`. For each element (k, v) in `this`, the
 * resulting RDD will either contain all pairs (k, (Some(v), Some(w))) for w in `other`, or
 * the pair (k, (Some(v), None)) if no elements in `other` have key k. Similarly, for each
 * element (k, w) in `other`, the resulting RDD will either contain all pairs
 * (k, (Some(v), Some(w))) for v in `this`, or the pair (k, (None, Some(w))) if no elements
 * in `this` have key k. Uses the given Partitioner to partition the output RDD.
 * @param {PairRDD} other
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.fullOuterJoin0 = function (other, partitioner) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().fullOuterJoin(other_uw,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * Simplified version of combineByKey that hash-partitions the resulting RDD using the existing
 * partitioner/parallelism level and using map-side aggregation.
 * @param {func} createCombiner
 * @param {func} mergeValue
 * @param {func} mergeCombiners
 * @returns {PairRDD}
 */
PairRDD.prototype.combineByKey3 = function (createCombiner, mergeValue, mergeCombiners) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(createCombiner);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var sv2 = Utils.createJavaParams(mergeValue);
//   var fn2 = new org.eclairjs.nashorn.JSFunction2(sv2.funcStr, sv2.scopeVars);
//   var sv3 = Utils.createJavaParams(mergeCombiners);
//   var fn3 = new org.eclairjs.nashorn.JSFunction2(sv3.funcStr, sv3.scopeVars);
//   var javaObject =  this.getJavaObject().combineByKey(fn,fn2,fn3);
//   return new PairRDD(javaObject);
};


/**
 * Merge the values for each key using an associative reduce function. This will also perform
 * the merging locally on each mapper before sending results to a reducer, similarly to a
 * "combiner" in MapReduce. Output will be hash-partitioned with the existing partitioner/
 * parallelism level.
 * @param {func} func
 * @returns {PairRDD}
 */
PairRDD.prototype.reduceByKey2 = function (func) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(func);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().reduceByKey(fn);
//   return new PairRDD(javaObject);
};


/**
 * Group the values for each key in the RDD into a single sequence. Hash-partitions the
 * resulting RDD with the existing partitioner/parallelism level.
 *
 * Note: If you are grouping in order to perform an aggregation (such as a sum or average) over
 * each key, using [[PairRDD.reduceByKey]] or {@link combineByKey}
 * will provide much better performance.
 * @returns {PairRDD}
 */
PairRDD.prototype.groupByKey2 = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().groupByKey();
//   return new PairRDD(javaObject);
};


/**
 * Return an RDD containing all pairs of elements with matching keys in `this` and `other`. Each
 * pair of elements will be returned as a (k, (v1, v2)) tuple, where (k, v1) is in `this` and
 * (k, v2) is in `other`. Performs a hash join across the cluster.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.join1 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().join(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * Return an RDD containing all pairs of elements with matching keys in `this` and `other`. Each
 * pair of elements will be returned as a (k, (v1, v2)) tuple, where (k, v1) is in `this` and
 * (k, v2) is in `other`. Performs a hash join across the cluster.
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.join2 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().join(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Perform a left outer join of `this` and `other`. For each element (k, v) in `this`, the
 * resulting RDD will either contain all pairs (k, (v, Some(w))) for w in `other`, or the
 * pair (k, (v, None)) if no elements in `other` have key k. Hash-partitions the output
 * using the existing partitioner/parallelism level.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.leftOuterJoin1 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().leftOuterJoin(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * Perform a left outer join of `this` and `other`. For each element (k, v) in `this`, the
 * resulting RDD will either contain all pairs (k, (v, Some(w))) for w in `other`, or the
 * pair (k, (v, None)) if no elements in `other` have key k. Hash-partitions the output
 * into `numPartitions` partitions.
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.leftOuterJoin2 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().leftOuterJoin(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Perform a right outer join of `this` and `other`. For each element (k, w) in `other`, the
 * resulting RDD will either contain all pairs (k, (Some(v), w)) for v in `this`, or the
 * pair (k, (None, w)) if no elements in `this` have key k. Hash-partitions the resulting
 * RDD using the existing partitioner/parallelism level.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.rightOuterJoin1 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().rightOuterJoin(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * Perform a right outer join of `this` and `other`. For each element (k, w) in `other`, the
 * resulting RDD will either contain all pairs (k, (Some(v), w)) for v in `this`, or the
 * pair (k, (None, w)) if no elements in `this` have key k. Hash-partitions the resulting
 * RDD into the given number of partitions.
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.rightOuterJoin2 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().rightOuterJoin(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Perform a full outer join of `this` and `other`. For each element (k, v) in `this`, the
 * resulting RDD will either contain all pairs (k, (Some(v), Some(w))) for w in `other`, or
 * the pair (k, (Some(v), None)) if no elements in `other` have key k. Similarly, for each
 * element (k, w) in `other`, the resulting RDD will either contain all pairs
 * (k, (Some(v), Some(w))) for v in `this`, or the pair (k, (None, Some(w))) if no elements
 * in `this` have key k. Hash-partitions the resulting RDD using the existing partitioner/
 * parallelism level.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.fullOuterJoin1 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().fullOuterJoin(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * Perform a full outer join of `this` and `other`. For each element (k, v) in `this`, the
 * resulting RDD will either contain all pairs (k, (Some(v), Some(w))) for w in `other`, or
 * the pair (k, (Some(v), None)) if no elements in `other` have key k. Similarly, for each
 * element (k, w) in `other`, the resulting RDD will either contain all pairs
 * (k, (Some(v), Some(w))) for v in `this`, or the pair (k, (None, Some(w))) if no elements
 * in `this` have key k. Hash-partitions the resulting RDD into the given number of partitions.
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.fullOuterJoin2 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().fullOuterJoin(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Return the key-value pairs in this RDD to the master as a Map.
 * @returns {Map}
 */
PairRDD.prototype.collectAsMap = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().collectAsMap();
//   return new Map(javaObject);
};


/**
 * Pass each value in the key-value pair RDD through a map function without changing the keys;
 * this also retains the original RDD's partitioning.
 * @param {func} f
 * @returns {PairRDD}
 */
PairRDD.prototype.mapValues = function (f, bindArgs) {
    var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction, bindArgs);
    var javaObject = this.getJavaObject().mapValues(fn);
    return new PairRDD(javaObject);
};


/**
 * Pass each value in the key-value pair RDD through a flatMap function without changing the
 * keys; this also retains the original RDD's partitioning.
 * @param {func} f
 * @returns {PairRDD}
 */
PairRDD.prototype.flatMapValues = function (f) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().flatMapValues(fn);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other`, return a resulting RDD that contains a tuple with the
 * list of values for that key in `this` as well as `other`.
 * @param {PairRDD} other
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup0 = function (other, partitioner) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().cogroup(other_uw,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other1` or `other2`, return a resulting RDD that contains a
 * tuple with the list of values for that key in `this`, `other1` and `other2`.
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup1 = function (other1, other2, partitioner) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().cogroup(other1_uw,other2_uw,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other1` or `other2` or `other3`,
 * return a resulting RDD that contains a tuple with the list of values
 * for that key in `this`, `other1`, `other2` and `other3`.
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @param {PairRDD} other3
 * @param {Partitioner} partitioner
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup2 = function (other1, other2, other3, partitioner) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var other3_uw = Utils.unwrapObject(other3);
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().cogroup(other1_uw,other2_uw,other3_uw,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other`, return a resulting RDD that contains a tuple with the
 * list of values for that key in `this` as well as `other`.
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup3 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().cogroup(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other1` or `other2`, return a resulting RDD that contains a
 * tuple with the list of values for that key in `this`, `other1` and `other2`.
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup4 = function (other1, other2) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var javaObject =  this.getJavaObject().cogroup(other1_uw,other2_uw);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other1` or `other2` or `other3`,
 * return a resulting RDD that contains a tuple with the list of values
 * for that key in `this`, `other1`, `other2` and `other3`.
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @param {PairRDD} other3
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup5 = function (other1, other2, other3) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var other3_uw = Utils.unwrapObject(other3);
//   var javaObject =  this.getJavaObject().cogroup(other1_uw,other2_uw,other3_uw);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other`, return a resulting RDD that contains a tuple with the
 * list of values for that key in `this` as well as `other`.
 * @param {PairRDD} other
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup6 = function (other, numPartitions) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().cogroup(other_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other1` or `other2`, return a resulting RDD that contains a
 * tuple with the list of values for that key in `this`, `other1` and `other2`.
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup7 = function (other1, other2, numPartitions) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var javaObject =  this.getJavaObject().cogroup(other1_uw,other2_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * For each key k in `this` or `other1` or `other2` or `other3`,
 * return a resulting RDD that contains a tuple with the list of values
 * for that key in `this`, `other1`, `other2` and `other3`.
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @param {PairRDD} other3
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.cogroup8 = function (other1, other2, other3, numPartitions) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var other3_uw = Utils.unwrapObject(other3);
//   var javaObject =  this.getJavaObject().cogroup(other1_uw,other2_uw,other3_uw,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * @param {PairRDD} other
 * @returns {PairRDD}
 */
PairRDD.prototype.groupWith0 = function (other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().groupWith(other_uw);
//   return new PairRDD(javaObject);
};


/**
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @returns {PairRDD}
 */
PairRDD.prototype.groupWith1 = function (other1, other2) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var javaObject =  this.getJavaObject().groupWith(other1_uw,other2_uw);
//   return new PairRDD(javaObject);
};


/**
 * @param {PairRDD} other1
 * @param {PairRDD} other2
 * @param {PairRDD} other3
 * @returns {PairRDD}
 */
PairRDD.prototype.groupWith2 = function (other1, other2, other3) {
    throw "not implemented by ElairJS";
//   var other1_uw = Utils.unwrapObject(other1);
//   var other2_uw = Utils.unwrapObject(other2);
//   var other3_uw = Utils.unwrapObject(other3);
//   var javaObject =  this.getJavaObject().groupWith(other1_uw,other2_uw,other3_uw);
//   return new PairRDD(javaObject);
};


/**
 * Return the list of values in the RDD for key `key`. This operation is done efficiently if the
 * RDD has a known partitioner by only searching the partition that the key maps to.
 * @param {object} key
 * @returns {JList}
 */
PairRDD.prototype.lookup = function (key) {
    throw "not implemented by ElairJS";
//   var key_uw = Utils.unwrapObject(key);
//   return  this.getJavaObject().lookup(key_uw);
};


/**
 * @param {string} path
 * @param {Class} keyClass
 * @param {Class} valueClass
 * @param {Class} outputFormatClass
 * @param {JobConf} conf
 */
PairRDD.prototype.saveAsHadoopFile0 = function (path, keyClass, valueClass, outputFormatClass, conf) {
    throw "not implemented by ElairJS";
//   var keyClass_uw = Utils.unwrapObject(keyClass);
//   var valueClass_uw = Utils.unwrapObject(valueClass);
//   var outputFormatClass_uw = Utils.unwrapObject(outputFormatClass);
//   var conf_uw = Utils.unwrapObject(conf);
//    this.getJavaObject().saveAsHadoopFile(path,keyClass_uw,valueClass_uw,outputFormatClass_uw,conf_uw);
};


/**
 * @param {string} path
 * @param {Class} keyClass
 * @param {Class} valueClass
 * @param {Class} outputFormatClass
 */
PairRDD.prototype.saveAsHadoopFile1 = function (path, keyClass, valueClass, outputFormatClass) {
    throw "not implemented by ElairJS";
//   var keyClass_uw = Utils.unwrapObject(keyClass);
//   var valueClass_uw = Utils.unwrapObject(valueClass);
//   var outputFormatClass_uw = Utils.unwrapObject(outputFormatClass);
//    this.getJavaObject().saveAsHadoopFile(path,keyClass_uw,valueClass_uw,outputFormatClass_uw);
};


/**
 * @param {string} path
 * @param {Class} keyClass
 * @param {Class} valueClass
 * @param {Class} outputFormatClass
 * @param {Class} codec
 */
PairRDD.prototype.saveAsHadoopFile2 = function (path, keyClass, valueClass, outputFormatClass, codec) {
    throw "not implemented by ElairJS";
//   var keyClass_uw = Utils.unwrapObject(keyClass);
//   var valueClass_uw = Utils.unwrapObject(valueClass);
//   var outputFormatClass_uw = Utils.unwrapObject(outputFormatClass);
//   var codec_uw = Utils.unwrapObject(codec);
//    this.getJavaObject().saveAsHadoopFile(path,keyClass_uw,valueClass_uw,outputFormatClass_uw,codec_uw);
};


/**
 * @param {string} path
 * @param {Class} keyClass
 * @param {Class} valueClass
 * @param {Class} outputFormatClass
 * @param {Configuration} conf
 */
PairRDD.prototype.saveAsNewAPIHadoopFilewithConf = function (path, keyClass, valueClass, outputFormatClass, conf) {
    throw "not implemented by ElairJS";
//   var keyClass_uw = Utils.unwrapObject(keyClass);
//   var valueClass_uw = Utils.unwrapObject(valueClass);
//   var outputFormatClass_uw = Utils.unwrapObject(outputFormatClass);
//   var conf_uw = Utils.unwrapObject(conf);
//    this.getJavaObject().saveAsNewAPIHadoopFile(path,keyClass_uw,valueClass_uw,outputFormatClass_uw,conf_uw);
};


/**
 * Output the RDD to any Hadoop-supported storage system, using
 * a Configuration object for that storage system.
 * @param {Configuration} conf
 */
PairRDD.prototype.saveAsNewAPIHadoopDataset = function (conf) {
    throw "not implemented by ElairJS";
//   var conf_uw = Utils.unwrapObject(conf);
//    this.getJavaObject().saveAsNewAPIHadoopDataset(conf_uw);
};


/**
 * @param {string} path
 * @param {Class} keyClass
 * @param {Class} valueClass
 * @param {Class} outputFormatClass
 */
PairRDD.prototype.saveAsNewAPIHadoopFile = function (path, keyClass, valueClass, outputFormatClass) {
    throw "not implemented by ElairJS";
//   var keyClass_uw = Utils.unwrapObject(keyClass);
//   var valueClass_uw = Utils.unwrapObject(valueClass);
//   var outputFormatClass_uw = Utils.unwrapObject(outputFormatClass);
//    this.getJavaObject().saveAsNewAPIHadoopFile(path,keyClass_uw,valueClass_uw,outputFormatClass_uw);
};


/**
 * Output the RDD to any Hadoop-supported storage system, using a Hadoop JobConf object for
 * that storage system. The JobConf should set an OutputFormat and any output paths required
 * (e.g. a table name to write to) in the same way as it would be configured for a Hadoop
 * MapReduce job.
 * @param {JobConf} conf
 */
PairRDD.prototype.saveAsHadoopDataset = function (conf) {
    throw "not implemented by ElairJS";
//   var conf_uw = Utils.unwrapObject(conf);
//    this.getJavaObject().saveAsHadoopDataset(conf_uw);
};


/**
 * Repartition the RDD according to the given partitioner and, within each resulting partition,
 * sort records by their keys.
 *
 * This is more efficient than calling `repartition` and then sorting within each partition
 * because it can push the sorting down into the shuffle machinery.
 * @param {Partitioner} partitioner
 * @param {Comparator} [comp]
 * @returns {PairRDD}
 */
PairRDD.prototype.repartitionAndSortWithinPartitions = function (partitioner, comp) {
    throw "not implemented by ElairJS";
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var comp_uw = Utils.unwrapObject(comp);
// 
//   if (arguments[1]) {
//   var javaObject =  this.getJavaObject().repartitionAndSortWithinPartitions(partitioner_uw,comp_uw);
//   return new PairRDD(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().repartitionAndSortWithinPartitions(partitioner_uw);
//   return new PairRDD(javaObject);
//   }
};


/**
 * Sort the RDD by key, so that each partition contains a sorted range of the elements in
 * ascending order. Calling `collect` or `save` on the resulting RDD will return or output an
 * ordered list of records (in the `save` case, they will be written to multiple `part-X` files
 * in the filesystem, in order of the keys).
 * @returns {PairRDD}
 */
PairRDD.prototype.sortByKey0 = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().sortByKey();
//   return new PairRDD(javaObject);
};


/**
 * Sort the RDD by key, so that each partition contains a sorted range of the elements. Calling
 * `collect` or `save` on the resulting RDD will return or output an ordered list of records
 * (in the `save` case, they will be written to multiple `part-X` files in the filesystem, in
 * order of the keys).
 * @param {boolean} ascending
 * @returns {PairRDD}
 */
PairRDD.prototype.sortByKey1 = function (ascending) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().sortByKey(ascending);
//   return new PairRDD(javaObject);
};


/**
 * Sort the RDD by key, so that each partition contains a sorted range of the elements. Calling
 * `collect` or `save` on the resulting RDD will return or output an ordered list of records
 * (in the `save` case, they will be written to multiple `part-X` files in the filesystem, in
 * order of the keys).
 * @param {boolean} ascending
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.sortByKey2 = function (ascending, numPartitions) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().sortByKey(ascending,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Sort the RDD by key, so that each partition contains a sorted range of the elements. Calling
 * `collect` or `save` on the resulting RDD will return or output an ordered list of records
 * (in the `save` case, they will be written to multiple `part-X` files in the filesystem, in
 * order of the keys).
 * @param {Comparator} comp
 * @returns {PairRDD}
 */
PairRDD.prototype.sortByKey3 = function (comp) {
    throw "not implemented by ElairJS";
//   var comp_uw = Utils.unwrapObject(comp);
//   var javaObject =  this.getJavaObject().sortByKey(comp_uw);
//   return new PairRDD(javaObject);
};


/**
 * Sort the RDD by key, so that each partition contains a sorted range of the elements. Calling
 * `collect` or `save` on the resulting RDD will return or output an ordered list of records
 * (in the `save` case, they will be written to multiple `part-X` files in the filesystem, in
 * order of the keys).
 * @param {Comparator} comp
 * @param {boolean} ascending
 * @returns {PairRDD}
 */
PairRDD.prototype.sortByKey4 = function (comp, ascending) {
    throw "not implemented by ElairJS";
//   var comp_uw = Utils.unwrapObject(comp);
//   var javaObject =  this.getJavaObject().sortByKey(comp_uw,ascending);
//   return new PairRDD(javaObject);
};


/**
 * Sort the RDD by key, so that each partition contains a sorted range of the elements. Calling
 * `collect` or `save` on the resulting RDD will return or output an ordered list of records
 * (in the `save` case, they will be written to multiple `part-X` files in the filesystem, in
 * order of the keys).
 * @param {Comparator} comp
 * @param {boolean} ascending
 * @param {number} numPartitions
 * @returns {PairRDD}
 */
PairRDD.prototype.sortByKey5 = function (comp, ascending, numPartitions) {
    throw "not implemented by ElairJS";
//   var comp_uw = Utils.unwrapObject(comp);
//   var javaObject =  this.getJavaObject().sortByKey(comp_uw,ascending,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Return an RDD with the keys of each tuple.
 * @returns {PairRDD}
 */
PairRDD.prototype.keys = function () {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().keys();
//   return new JavaRDD(javaObject);
};


/**
 * Return an RDD with the values of each tuple.
 * @returns {PairRDD}
 */
PairRDD.prototype.values = function () {
    var javaObject =  this.getJavaObject().values();
    return new PairRDD(javaObject);
};


/**
 * Return approximate number of distinct values for each key in this RDD.
 *
 * The algorithm used is based on streamlib's implementation of "HyperLogLog in Practice:
 * Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm", available
 * <a href="http://dx.doi.org/10.1145/2452376.2452456">here</a>.
 *
 * @param {number} relativeSD  Relative accuracy. Smaller values create counters that require more space.
 *                   It must be greater than 0.000017.
 * @param {Partitioner} partitioner  partitioner of the resulting RDD.
 * @returns {PairRDD}
 */
PairRDD.prototype.countApproxDistinctByKey0 = function (relativeSD, partitioner) {
    throw "not implemented by ElairJS";
//   var partitioner_uw = Utils.unwrapObject(partitioner);
//   var javaObject =  this.getJavaObject().countApproxDistinctByKey(relativeSD,partitioner_uw);
//   return new PairRDD(javaObject);
};


/**
 * Return approximate number of distinct values for each key in this RDD.
 *
 * The algorithm used is based on streamlib's implementation of "HyperLogLog in Practice:
 * Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm", available
 * <a href="http://dx.doi.org/10.1145/2452376.2452456">here</a>.
 *
 * @param {number} relativeSD  Relative accuracy. Smaller values create counters that require more space.
 *                   It must be greater than 0.000017.
 * @param {number} numPartitions  number of partitions of the resulting RDD.
 * @returns {PairRDD}
 */
PairRDD.prototype.countApproxDistinctByKey1 = function (relativeSD, numPartitions) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().countApproxDistinctByKey(relativeSD,numPartitions);
//   return new PairRDD(javaObject);
};


/**
 * Return approximate number of distinct values for each key in this RDD.
 *
 * The algorithm used is based on streamlib's implementation of "HyperLogLog in Practice:
 * Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm", available
 * <a href="http://dx.doi.org/10.1145/2452376.2452456">here</a>.
 *
 * @param {number} relativeSD  Relative accuracy. Smaller values create counters that require more space.
 *                   It must be greater than 0.000017.
 * @returns {PairRDD}
 */
PairRDD.prototype.countApproxDistinctByKey2 = function (relativeSD) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().countApproxDistinctByKey(relativeSD);
//   return new PairRDD(javaObject);
};


/**
 * @param {string} name
 * @returns {PairRDD}
 */
PairRDD.prototype.setName = function (name) {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().setName(name);
//   return new PairRDD(javaObject);
};

/**
 * @returns {RDD}
 */
PairRDD.prototype.rdd = function () {
    var javaObject = this.getJavaObject().rdd();
    return new RDD(javaObject);
};

//
// static methods
//


/**
 * @param {RDD} rdd
 * @returns {PairRDD}
 */
PairRDD.fromRDD = function (rdd) {
    throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'rdd'
//   var rdd_uw = Utils.unwrapObject(rdd);
//   var javaObject =  org.apache.spark.api.java.PairRDD.fromRDD(rdd_uw);
//   return new PairRDD(javaObject);
};


/**
 * @param {PairRDD} rdd
 * @returns {RDD}
 */
PairRDD.toRDD = function (rdd) {
    var rdd_uw = Utils.unwrapObject(rdd);
    var javaObject = org.apache.spark.api.java.PairRDD.toRDD(rdd_uw);
    return new RDD(javaObject);
};


/**
 * @param {JavaRDD} rdd
 * @returns {PairRDD}
 */
PairRDD.fromRDD = function (rdd) {
// // TODO: handle Tuple conversion for 'rdd'
    var rdd_uw = Utils.unwrapObject(rdd);
    var javaObject = org.apache.spark.api.java.JavaPairRDD.fromJavaRDD(rdd_uw);
    return new PairRDD(javaObject);
};

