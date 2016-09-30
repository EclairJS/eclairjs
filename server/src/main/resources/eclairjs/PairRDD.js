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

    //var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    //var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    //var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    //var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    /**
     * @param {module:eclairjs.RDD} rdd of [Tuple(value, value)]{@link module:eclairjs.Tuple}.
     *  @class PairRDD
     *  @memberof module:eclairjs
     *  @extends module:eclairjs.RDD
     */
    var PairRDD = Java.type('org.eclairjs.nashorn.wrap.PairRDD');
    //var PairRDD = function (rdd, kClassTag, vClassTag) {
    //
    //    RDD.call(this, Utils.unwrapObject(rdd));
    //    this.className = "PairRDD_js";
    //    this.logger = Logger.getLogger("PairRDD_js");
    //    this.logger.debug("constructor")
    //
    //};


    //PairRDD.prototype = Object.create(RDD.prototype);
    //
    //PairRDD.prototype.constructor = PairRDD;

    /**
     * @function
     * @name module:eclairjs.PairRDD#wrapRDD
     * @param {module:eclairjs.RDD} rdd
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.wrapRDD = function (rdd) {
    //    var rdd_uw = Utils.unwrapObject(rdd);
    //    var javaObject = this.getJavaObject().wrapRDD(rdd_uw);
    //    return new PairRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#persist
     * Set this RDD's storage level to persist its values across operations after the first time
     * it is computed. Can only be called once on each RDD.
     * @param {module:eclairjs/storage.StorageLevel} newLevel
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.persist = function (newLevel) {
    //    var newLevel_uw = Utils.unwrapObject(newLevel);
    //    var javaObject = this.getJavaObject().persist(newLevel_uw);
    //    return new PairRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#unpersist
     * Mark the RDD as non-persistent, and remove all blocks for it from memory and disk.
     *
     * @param {boolean} [blocking]  Whether to block until all blocks are deleted.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.unpersist = function (blocking) {
    //
    //    if (arguments[0]) {
    //        var javaObject = this.getJavaObject().unpersist(blocking);
    //        return new PairRDD(javaObject);
    //    } else {
    //        var javaObject = this.getJavaObject().unpersist();
    //        return new PairRDD(javaObject);
    //    }
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#distinct
     * Return a new RDD containing the distinct elements in this RDD.
     * @param {number} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.distinct = function (numPartitions) {
    //    var javaObject
    //    if (arguments[0]) {
    //        javaObject = this.getJavaObject().distinct(numPartitions);
    //
    //    } else {
    //        javaObject = this.getJavaObject().distinct();
    //
    //    }
    //    return new PairRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#filter
     * Return a new PairRDD containing only the elements that satisfy a predicate.
     * @param {function} func
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.filter = function (func, bindArgs) {
    //    var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
    //    var javaObject = this.getJavaObject().filter(fn);
    //    return new PairRDD(javaObject);
    //};

    /**
     * @function
     * @name module:eclairjs.PairRDD#cache
     * Persist this RDD with the default storage level (`MEMORY_ONLY`).
     * @returns {module:eclairjs.RDD}
     */
    //PairRDD.prototype.cache = function () {
    //    return new PairRDD(this.getJavaObject().cache());
    //};

    /**
     * @function
     * @name module:eclairjs.PairRDD#coalesce
     * Return a new RDD that is reduced into `numPartitions` partitions.
     * @param {number} numPartitions
     * @param {boolean} [shuffle]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.coalesce = function (numPartitions, shuffle) {
    //
    //    if (arguments[1]) {
    //        var javaObject = this.getJavaObject().coalesce(numPartitions, shuffle);
    //        return new PairRDD(javaObject);
    //    } else {
    //        var javaObject = this.getJavaObject().coalesce(numPartitions);
    //        return new PairRDD(javaObject);
    //    }
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#repartition
     * Return a new RDD that has exactly numPartitions partitions.
     *
     * Can increase or decrease the level of parallelism in this RDD. Internally, this uses
     * a shuffle to redistribute data.
     *
     * If you are decreasing the number of partitions in this RDD, consider using `coalesce`,
     * which can avoid performing a shuffle.
     * @param {number} numPartitions
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.repartition = function (numPartitions) {
    //    var javaObject = this.getJavaObject().repartition(numPartitions);
    //    return new PairRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#sample
     * Return a sampled subset of this RDD.
     * @param {boolean} withReplacement
     * @param {number} fraction
     * @param {number} [seed]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.sample = function (withReplacement, fraction, seed) {
    //
    //    if (arguments[2]) {
    //        var javaObject = this.getJavaObject().sample(withReplacement, fraction, seed);
    //        return new PairRDD(javaObject);
    //    } else {
    //        var javaObject = this.getJavaObject().sample(withReplacement, fraction);
    //        return new PairRDD(javaObject);
    //    }
    //};


    /**
     * Return a subset of this RDD sampled by key (via stratified sampling).
     *
     * Create a sample of this RDD using variable sampling rates for different keys as specified by
     * `fractions`, a key to sampling rate map, via simple random sampling with one pass over the
     * RDD, to produce a sample of size that's approximately equal to the sum of
     * math.ceil(numItems * samplingRate) over all key values.
     * @function
     * @name module:eclairjs.PairRDD#sampleByKey
     * @param {boolean} withReplacement
     * @param {object} fractions key, value pair object Hash Map
     * @param {number} [seed]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.sampleByKey = function (withReplacement, fractions, seed) {
    //    var fractions_uw = Utils.createJavaHashMap(fractions);
    //
    //    if (arguments[2]) {
    //        var javaObject = this.getJavaObject().sampleByKey(withReplacement, fractions_uw, seed);
    //        return new PairRDD(javaObject);
    //    } else {
    //        var javaObject = this.getJavaObject().sampleByKey(withReplacement, fractions_uw);
    //        return new PairRDD(javaObject);
    //    }
    //};


    /**
     * Return a subset of this RDD sampled by key (via stratified sampling) containing exactly
     * math.ceil(numItems * samplingRate) for each stratum (group of pairs with the same key).
     *
     * This method differs from {@link sampleByKey} in that we make additional passes over the RDD to
     * create a sample size that's exactly equal to the sum of math.ceil(numItems * samplingRate)
     * over all key values with a 99.99% confidence. When sampling without replacement, we need one
     * additional pass over the RDD to guarantee sample size; when sampling with replacement, we need
     * two additional passes.
     * @function
     * @name module:eclairjs.PairRDD#sampleByKeyExact
     * @param {boolean} withReplacement
     * @param {object} fractions key, value pair object Hash Map
     * @param {number} [seed]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.sampleByKeyExact = function (withReplacement, fractions, seed) {
    //    var fractions_uw = Utils.createJavaHashMap(fractions);
    //
    //    if (arguments[2]) {
    //        var javaObject = this.getJavaObject().sampleByKeyExact(withReplacement, fractions_uw, seed);
    //        return new PairRDD(javaObject);
    //    } else {
    //        var javaObject = this.getJavaObject().sampleByKeyExact(withReplacement, fractions_uw);
    //        return new PairRDD(javaObject);
    //    }
    //};
    //

    /**
     * Return the union of this RDD and another one. Any identical elements will appear multiple
     * times (use `.distinct()` to eliminate them).
     * @function
     * @name module:eclairjs.PairRDD#union
     * @param {module:eclairjs.PairRDD} other
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.union = function (other) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject = this.getJavaObject().union(other_uw);
    //    return new PairRDD(javaObject);
    //};

    /**
     * Return the intersection of this RDD and another one. The output will not contain any duplicate
     * elements, even if the input RDDs did.
     * @function
     * @name module:eclairjs.PairRDD#intersection
     * Note that this method performs a shuffle internally.
     * @param {module:eclairjs.PairRDD} other
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.intersection = function (other) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject = this.getJavaObject().intersection(other_uw);
    //    return new PairRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#first
     * @returns {module:eclairjs.module:eclairjs.Tuple2}
     */
    //PairRDD.prototype.first = function () {
    //    var javaObject = this.getJavaObject().first();
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Simplified version of combineByKey that hash-partitions the output RDD and uses map-side
     * aggregation.
     * @function
     * @name module:eclairjs.PairRDD#combineByKey
     * @param {func} createCombiner
     * @param {func} mergeValue
     * @param {func} mergeCombiners
     * @param {number} numPartitions
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.combineByKey = function (createCombiner, mergeValue, mergeCombiners, numPartitions, bindArgs) {
    //    var fn = Utils.createLambdaFunction(createCombiner, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
    //    var fn2 = Utils.createLambdaFunction(mergeValue, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //    var fn3 = Utils.createLambdaFunction(mergeCombiners, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //
    //    var javaObject = this.getJavaObject().combineByKey(fn, fn2, fn3);
    //    return new PairRDD(javaObject);
    //};


    /**
     * Merge the values for each key using an associative reduce function. This will also perform
     * the merging locally on each mapper before sending results to a reducer, similarly to a
     * "combiner" in MapReduce.
     * @function
     * @name module:eclairjs.PairRDD#reduceByKey
     * @param {func} func
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.reduceByKey = function (func, bindArgs) {
    //    var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //    var result = this.getJavaObject().reduceByKey(fn);
    //    return new PairRDD(result);
    //};


    /**
     * Merge the values for each key using an associative reduce function, but return the results
     * immediately to the master as a Map. This will also perform the merging locally on each mapper
     * before sending results to a reducer, similarly to a "combiner" in MapReduce.
     * @function
     * @name module:eclairjs.PairRDD#reduceByKeyLocally
     * @param {func} func
     * @returns {Object} Key value pair hashmap
     */
    //PairRDD.prototype.reduceByKeyLocally = function (func, bindArgs) {
    //    var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //    var javaObject = this.getJavaObject().reduceByKeyLocally(fn);
    //    return new Utils.javaToJs(javaObject);
    //};

    /**
     * @function
     * @name module:eclairjs.PairRDD#countByKey
     * @returns {object} key, value hash map
     */
    //PairRDD.prototype.countByKey = function () {
    //    var javaObject = this.getJavaObject().countByKey();
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Approximate version of countByKey that can return a partial result if it does
     * not finish within a timeout.
     * @function
     * @name module:eclairjs.PairRDD#countByKeyApprox
     * @param {number} timeout
     * @param {number} [confidence]
     * @returns {module:eclairjs/partial.PartialResult}
     */
    //PairRDD.prototype.countByKeyApprox = function (timeout, confidence) {
    //    var javaObject;
    //    if (arguments[1]) {
    //        javaObject = this.getJavaObject().countByKeyApprox(timeout, confidence);
    //    } else {
    //        javaObject = this.getJavaObject().countByKeyApprox(timeout);
    //    }
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Aggregate the values of each key, using given combine functions and a neutral "zero value".
     * This function can return a different result type, U, than the type of the values in this RDD,
     * V. Thus, we need one operation for merging a V into a U and one operation for merging two U's,
     * as in scala.TraversableOnce. The former operation is used for merging values within a
     * partition, and the latter is used for merging values between partitions. To avoid memory
     * allocation, both of these functions are allowed to modify and return their first argument
     * instead of creating a new U.
     * @example
     * var Serializable = require(EclairJS_Globals.NAMESPACE + '/Serializable');
     * var s = new Serializable();
     *  var result = pairRdd.aggregateByKey(s,
     *   function(hashSetA, b) {
     *      hashSetA[b] = hashSetA[b] ? hashSetA[b] + 1 : 1;
     *      return hashSetA;
     *  },
     *  function(setA, setB){
     *     for (var k in setA) {
     *        if (setB.hasOwnProperty(k)) {
     *             setA[k] += setB[k];
     *           }
     *      }
     *      return setA;
     *  });
     * @function
     * @name module:eclairjs.PairRDD#aggregateByKey
     * @param {module:eclairjs.Serializable} zeroValue
     * @param {func} seqFunc
     * @param {func} combFunc
     * @param {number} [numPartitions]
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.aggregateByKey = function (zeroValue, seqFunc, combFunc, numPartitions, bindArgs) {
    //    var zeroValue_uw = Utils.unwrapObject(zeroValue);
    //    var fn = Utils.createLambdaFunction(seqFunc, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //    var fn2 = Utils.createLambdaFunction(combFunc, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //    var javaObject;
    //    if (numPartitions) {
    //        javaObject = this.getJavaObject().aggregateByKey(zeroValue_uw, numPartitions, fn, fn2);
    //    } else {
    //        javaObject = this.getJavaObject().aggregateByKey(zeroValue_uw, fn, fn2);
    //    }
    //    return new PairRDD(javaObject);
    //};

    /**
     * Merge the values for each key using an associative function and a neutral "zero value" which
     * may be added to the result an arbitrary number of times, and must not change the result
     * (e.g ., Nil for list concatenation, 0 for addition, or 1 for multiplication.).
     * @function
     * @name module:eclairjs.PairRDD#foldByKey
     * @param {module:eclairjs.Serializable | number} zeroValue
     * @param {func} func
     * @param {integer} [numPartitions]
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.foldByKey = function (zeroValue, func, numPartitions, bindArgs) {
    //    var zeroValue_uw = Utils.unwrapObject(zeroValue);
    //    var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
    //    var javaObject;
    //    if (numPartitions) {
    //        javaObject = this.getJavaObject().foldByKey(zeroValue_uw, numPartitions, fn);
    //    } else {
    //        javaObject = this.getJavaObject().foldByKey(zeroValue_uw, fn);
    //    }
    //
    //    return new PairRDD(javaObject);
    //};

    /**
     * Group the values for each key in the RDD into a single sequence. Allows controlling the
     * partitioning of the resulting key-value pair RDD by passing a Partitioner.
     *
     * Note: If you are grouping in order to perform an aggregation (such as a sum or average) over
     * each key, using [[PairRDD.reduceByKey]] or {@link combineByKey}
     * will provide much better performance.
     * @function
     * @name module:eclairjs.PairRDD#groupByKey
     * @param {integer} [number] or number of partitions
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.groupByKey = function (number) {
    //    var javaObject;
    //    if (number) {
    //        javaObject = this.getJavaObject().groupByKey(number);
    //    } else {
    //        javaObject = this.getJavaObject().groupByKey();
    //    }
    //
    //    return new PairRDD(javaObject);
    //};

    /**
     * Return an RDD with the elements from `this` that are not in `other`.
     * @function
     * @name module:eclairjs.PairRDD#subtract
     * @param {module:eclairjs.PairRDD} other
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.subtract = function (other, numPartitions) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject;
    //    if (numPartitions) {
    //        javaObject = this.getJavaObject().subtract(other_uw, numPartitions);
    //    } else {
    //        javaObject = this.getJavaObject().subtract(other_uw);
    //    }
    //    return new PairRDD(javaObject);
    //};

    /**
     * @function
     * @name module:eclairjs.PairRDD#subtractByKey
     * @param {module:eclairjs.PairRDD} other
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.subtractByKey = function (other, numPartitions) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject;
    //    if (numPartitions) {
    //        javaObject = this.getJavaObject().subtractByKey(other_uw, numPartitions);
    //    } else {
    //        javaObject = this.getJavaObject().subtractByKey(other_uw);
    //    }
    //    return new PairRDD(javaObject);
    //};

    /**
     * Merge the values for each key using an associative reduce function. This will also perform
     * the merging locally on each mapper before sending results to a reducer, similarly to a
     * "combiner" in MapReduce.
     * @function
     * @name module:eclairjs.PairRDD#join
     * @param {module:eclairjs.PairRDD} other
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.join = function (other, numPartitions) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject = numPartitions ? this.getJavaObject().join(other_uw, numPartitions) :
    //        this.getJavaObject().join(other_uw);
    //    return new PairRDD(javaObject);
    //};


    /**
     * Perform a left outer join of `this` and `other`. For each element (k, v) in `this`, the
     * resulting RDD will either contain all pairs (k, (v, Some(w))) for w in `other`, or the
     * pair (k, (v, None)) if no elements in `other` have key k.
     * @function
     * @name module:eclairjs.PairRDD#leftOuterJoin
     * @param {module:eclairjs.PairRDD} other
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.leftOuterJoin = function (other, numPartitions) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject = numPartitions ? this.getJavaObject().leftOuterJoin(other_uw, numPartitions) :
    //        this.getJavaObject().leftOuterJoin(other_uw);
    //    return new PairRDD(javaObject);
    //};


    /**
     * Perform a right outer join of `this` and `other`. For each element (k, w) in `other`, the
     * resulting RDD will either contain all pairs (k, (Some(v), w)) for v in `this`, or the
     * pair (k, (None, w)) if no elements in `this` have key k.
     * @function
     * @name module:eclairjs.PairRDD#rightOuterJoin
     * @param {module:eclairjs.PairRDD} other
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.rightOuterJoin = function (other, numPartitions) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject = numPartitions ? this.getJavaObject().rightOuterJoin(other_uw, numPartitions) :
    //        this.getJavaObject().rightOuterJoin(other_uw);
    //    return new PairRDD(javaObject);
    //};


    /**
     * Perform a full outer join of `this` and `other`. For each element (k, v) in `this`, the
     * resulting RDD will either contain all pairs (k, (Some(v), Some(w))) for w in `other`, or
     * the pair (k, (Some(v), None)) if no elements in `other` have key k. Similarly, for each
     * element (k, w) in `other`, the resulting RDD will either contain all pairs
     * (k, (Some(v), Some(w))) for v in `this`, or the pair (k, (None, Some(w))) if no elements
     * in `this` have key k.
     * @function
     * @name module:eclairjs.PairRDD#fullOuterJoin
     * @param {module:eclairjs.PairRDD} other
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.fullOuterJoin = function (other, numPartitions) {
    //    var other_uw = Utils.unwrapObject(other);
    //    var javaObject = numPartitions ? this.getJavaObject().fullOuterJoin(other_uw, numPartitions) :
    //        this.getJavaObject().fullOuterJoin(other_uw);
    //    return new PairRDD(javaObject);
    //};

    /**
     * Return the key-value pairs in this RDD to the master as a Map.
     * @function
     * @name module:eclairjs.PairRDD#collectAsMap
     * @returns {object} key, value hash map
     */
    //PairRDD.prototype.collectAsMap = function () {
    //    var javaObject = this.getJavaObject().collectAsMap();
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Pass each value in the key-value pair RDD through a map function without changing the keys;
     * this also retains the original RDD's partitioning.
     * @function
     * @name module:eclairjs.PairRDD#mapValues
     * @param {func} f
     * @param {object[]} [bindArgs]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.mapValues = function (f, bindArgs) {
    //    var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
    //    var javaObject = this.getJavaObject().mapValues(fn);
    //    return new PairRDD(javaObject);
    //};


    /**
     * Pass each value in the key-value pair RDD through a flatMap function without changing the
     * keys; this also retains the original RDD's partitioning.
     * @function
     * @name module:eclairjs.PairRDD#flatMapValues
     * @param {func} f
     * @param {object[]} [bindArgs]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.flatMapValues = function (f, bindArgs) {
    //    var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
    //    var javaObject = this.getJavaObject().flatMapValues(fn);
    //    return new PairRDD(javaObject);
    //};


    /**
     * For each key k in `this` or `other`, return a resulting RDD that contains a tuple with the
     * list of values for that key in `this` as well as `other`.
     * @function
     * @name module:eclairjs.PairRDD#cogroup
     * @param {module:eclairjs.PairRDD} other1
     * @param {module:eclairjs.PairRDD} [other2]
     * @param {module:eclairjs.PairRDD} [other3]
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.cogroup = function (other1, other2, other3, numPartitions) {
    //    var other1_uw = Utils.unwrapObject(other1);
    //    var other2_uw = Utils.unwrapObject(other2);
    //    var other3_uw = Utils.unwrapObject(other3);
    //    var javaObject;
    //    if (numPartitions) {
    //        if (other3_uw) {
    //            javaObject = this.getJavaObject().cogroup(other1_uw, other2_uw, other3_uw, numPartitions);
    //        } else if (other2_uw) {
    //            javaObject = this.getJavaObject().cogroup(other1_uw, other2_uw, numPartitions);
    //        } else {
    //            javaObject = this.getJavaObject().cogroup(other1_uw, numPartitions);
    //        }
    //    } else {
    //        if (other3_uw) {
    //            javaObject = this.getJavaObject().cogroup(other1_uw, other2_uw, other3_uw);
    //        } else if (other2_uw) {
    //            javaObject = this.getJavaObject().cogroup(other1_uw, other2_uw);
    //        } else {
    //            javaObject = this.getJavaObject().cogroup(other1_uw);
    //        }
    //    }
    //    return new PairRDD(javaObject);
    //};

    /**
     * @function
     * @name module:eclairjs.PairRDD#groupWith
     * @param {module:eclairjs.PairRDD} other1
     * @param {module:eclairjs.PairRDD} [other2]
     * @param {module:eclairjs.PairRDD} [other3]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.groupWith = function (other1, other2, other3) {
    //    var other1_uw = Utils.unwrapObject(other1);
    //    var other2_uw = Utils.unwrapObject(other2);
    //    var other3_uw = Utils.unwrapObject(other3);
    //    var javaObject;
    //    if (other3_uw) {
    //        javaObject = this.getJavaObject().groupWith(other1_uw, other2_uw, other3_uw);
    //    } else if (other2_uw) {
    //        javaObject = this.getJavaObject().groupWith(other1_uw, other2_uw);
    //    } else {
    //        javaObject = this.getJavaObject().groupWith(other1_uw);
    //    }
    //    return new PairRDD(javaObject);
    //};


    /**
     * Return the list of values in the RDD for key `key`. This operation is done efficiently if the
     * RDD has a known partitioner by only searching the partition that the key maps to.
     * @function
     * @name module:eclairjs.PairRDD#lookup
     * @param {object} key
     * @returns {object[]}
     */
    //PairRDD.prototype.lookup = function (key) {
    //    var key_uw = Utils.unwrapObject(key);
    //    return Utils.javaToJs(this.getJavaObject().lookup(key_uw));
    //};


    /**
     * Sort the RDD by key, so that each partition contains a sorted range of the elements. Calling
     * `collect` or `save` on the resulting RDD will return or output an ordered list of records
     * (in the `save` case, they will be written to multiple `part-X` files in the filesystem, in
     * order of the keys).
     * @function
     * @name module:eclairjs.PairRDD#sortByKey
     * @param {boolean} [ascending] defaults to false
     * @param {number} [numPartitions]
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.sortByKey = function (ascending, numPartitions) {
    //    var javaObject;
    //    if (numPartitions) {
    //        javaObject = this.getJavaObject().sortByKey(ascending, numPartitions);
    //    } else {
    //        javaObject = this.getJavaObject().sortByKey(ascending);
    //    }
    //    return new PairRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#keys
     * Return an RDD with the keys of each tuple.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.keys = function () {
    //    var javaObject = this.getJavaObject().keys();
    //    return new JavaRDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.PairRDD#values
     * Return an RDD with the values of each tuple.
     * @returns {module:eclairjs.RDD}
     */
    //PairRDD.prototype.values = function () {
    //    var javaObject = this.getJavaObject().values();
    //    return new RDD(javaObject);
    //};
    
    /**
     * Return approximate number of distinct values for each key in this RDD.
     *
     * The algorithm used is based on streamlib's implementation of "HyperLogLog in Practice:
     * Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm", available
     * <a href="http://dx.doi.org/10.1145/2452376.2452456">here</a>.
     * @function
     * @name module:eclairjs.countApproxDistinctByKey#values
     * @param {float} relativeSD  Relative accuracy. Smaller values create counters that require more space.
     *                   It must be greater than 0.000017.
     * @param {integer} [numPartitions]  number of partitions of the resulting RDD.
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.countApproxDistinctByKey = function (relativeSD, numPartitions) {
    //    var javaObject = numPartitions ? this.getJavaObject().countApproxDistinctByKey(relativeSD, numPartitions) :
    //        this.getJavaObject().countApproxDistinctByKey(relativeSD);
    //    return new PairRDD(javaObject);
    //};

    /**
     * @function
     * @name module:eclairjs.countApproxDistinctByKey#setName
     * @param {string} name
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.prototype.setName = function (name) {
    //    var javaObject = this.getJavaObject().setName(name);
    //    return new PairRDD(javaObject);
    //};

    /**
     * @function
     * @name module:eclairjs.countApproxDistinctByKey#setName
     * @returns {module:eclairjs.RDD}
     */
    //PairRDD.prototype.rdd = function () {
    //    var javaObject = this.getJavaObject().rdd();
    //    return new RDD(javaObject);
    //};

//
// static methods
//

    /**
     * @function
     * @name module:eclairjs.countApproxDistinctByKey#toRDD
     * @param {module:eclairjs.PairRDD} rdd
     * @returns {module:eclairjs.RDD}
     */
    //PairRDD.toRDD = function (rdd) {
    //    var rdd_uw = Utils.unwrapObject(rdd);
    //    var javaObject = org.apache.spark.api.java.JavaPairRDD.toRDD(rdd_uw);
    //    return new RDD(javaObject);
    //};


    /**
     * @function
     * @name module:eclairjs.countApproxDistinctByKey#fromRDD
     * @param {module:eclairjs.RDD} rdd
     * @returns {module:eclairjs.PairRDD}
     */
    //PairRDD.fromRDD = function (rdd) {
    //    var rdd_uw = Utils.unwrapObject(rdd);
    //    var javaObject = org.apache.spark.api.java.JavaPairRDD.fromJavaRDD(rdd_uw);
    //    return new PairRDD(javaObject);
    //};

    module.exports = PairRDD;

})();