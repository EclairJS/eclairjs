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
     * @classdesc A Resilient Distributed Dataset (RDD), the basic abstraction in Spark. Represents an immutable,
     * partitioned collection of elements that can be operated on in parallel.

     */
    var RDD = function (jrdd) { // jrdd - JavaRDD object. don't expose this in the JSDocs for the public API
        var jvmObj = jrdd;
        this.logger = Logger.getLogger("RDD_js");
        JavaWrapper.call(this, jvmObj);
    };

    RDD.prototype = Object.create(JavaWrapper.prototype);

    RDD.prototype.constructor = RDD;

    /**
     * Aggregate the elements of each partition, and then the results for all the partitions, using
     * given combine functions and a neutral "zero value". This function can return a different result
     * type, U, than the type of this RDD, T. Thus, we need one operation for merging a T into an U
     * and one operation for merging two U's, as in scala.TraversableOnce. Both of these functions are
     * allowed to modify and return their first argument instead of creating a new U to avoid memory
     * allocation.
     * @param {module:eclairjs.RDD} zeroValue - (undocumented)
     * @param {function} func1 seqOp - (undocumented) Function with two parameters
     * @param {function} func2 combOp - (undocumented) Function with two parameters
     * @param {Object[]} [bindArgs1] - array whose values will be added to func1's argument list.
     * @param {Object[]} [bindArgs2] - array whose values will be added to func2's argument list.
     * @returns {object}
     */
    RDD.prototype.aggregate = function (zeroValue, func1, func2, bindArgs1, bindArgs2) {
        var zeroValue_uw = Utils.unwrapObject(zeroValue);
        var fn1 = Utils.createLambdaFunction(func1, org.eclairjs.nashorn.JSFunction2, bindArgs1);
        var fn2 = Utils.createLambdaFunction(func2, org.eclairjs.nashorn.JSFunction2, bindArgs2);
        var val = this.getJavaObject().aggregate(zeroValue_uw, fn1, fn2);
        return Utils.javaToJs(val);
    };

    /**
     * Persist this RDD with the default storage level (`MEMORY_ONLY`).
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.cache = function () {
        return Utils.javaToJs(this.getJavaObject().cache());
    };

    /**
     * Return the Cartesian product of this RDD and another one, that is, the RDD of all pairs of
     * elements (a, b) where a is in `this` and b is in `other`.
     * @param {module:eclairjs.RDD} other - (undocumented)
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.cartesian = function (other) {
        var other_uw = Utils.unwrapObject(other);
        return Utils.javaToJs(this.getJavaObject().cartesian(other_uw));
    };

    /**
     * Mark this RDD for checkpointing. It will be saved to a file inside the checkpoint
     * directory set with `SparkContext#setCheckpointDir` and all references to its parent
     * RDDs will be removed. This function must be called before any job has been
     * executed on this RDD. It is strongly recommended that this RDD is persisted in
     * memory, otherwise saving it on a file will require recomputation.
     * @returns void
     */
    RDD.prototype.checkpoint = function () {
        this.getJavaObject().checkpoint();
    };

    /**
     * Return a new RDD that is reduced into `numPartitions` partitions.
     *
     * This results in a narrow dependency, e.g. if you go from 1000 partitions
     * to 100 partitions, there will not be a shuffle, instead each of the 100
     * new partitions will claim 10 of the current partitions.
     *
     * However, if you're doing a drastic coalesce, e.g. to numPartitions = 1,
     * this may result in your computation taking place on fewer nodes than
     * you like (e.g. one node in the case of numPartitions = 1). To avoid this,
     * you can pass shuffle = true. This will add a shuffle step, but means the
     * current upstream partitions will be executed in parallel (per whatever
     * the current partitioning is).
     *
     * Note: With shuffle = true, you can actually coalesce to a larger number
     * of partitions. This is useful if you have a small number of partitions,
     * say 100, potentially with a few partitions being abnormally large. Calling
     * coalesce(1000, shuffle = true) will result in 1000 partitions with the
     * data distributed using a hash partitioner.
     * @param {int} numPartitions
     * @param {boolean} shuffle
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.coalesce = function (numPartitions, shuffle) {
        return Utils.javaToJs(this.getJavaObject().coalesce(numPartitions, shuffle));
    };

    /**
     * Return an array that contains all of the elements in this RDD.
     * @returns {Array}
     */
    RDD.prototype.collect = function () {
        return Utils.javaToJs(this.getJavaObject().collect());
    };

    /**
     * Return the SparkContext that this RDD was created on.
     * @returns {module:eclairjs.SparkContext}
     */
    RDD.prototype.context = function () {
        var javaObject = this.getJavaObject().context();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return the number of elements in the RDD.
     * @returns {integer}
     */
    RDD.prototype.count = function () {
        var c = this.getJavaObject().count();
        return c;
    };

    /**
     * :: Experimental ::
     * Approximate version of count() that returns a potentially incomplete result
     * within a timeout, even if not all tasks have finished.
     * @param timeout {number} - (undocumented)
     * @param confidence {number} - (undocumented)
     * @returns {module:eclairjs/partial.PartialResult}
     */
    RDD.prototype.countApprox = function (timeout, confidence) {
        var javaObject = this.getJavaObject().countApprox(timeout, confidence);
        return new PartialResult(javaObject);
    };

    /**
     * Return approximate number of distinct elements in the RDD.
     *
     * The algorithm used is based on streamlib's implementation of "HyperLogLog in Practice:
     * Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm", available
     * <a href="http://dx.doi.org/10.1145/2452376.2452456">here</a>.
     *
     * @param {number} relativeSD  Relative accuracy. Smaller values create counters that require more space.
     *                   It must be greater than 0.000017.
     * @returns {number}
     */
    RDD.prototype.countApproxDistinct = function (relativeSD) {
        return this.getJavaObject().countApproxDistinct(relativeSD);
    };

    /**
     * :: Experimental ::
     * Return approximate number of distinct elements in the RDD.
     *
     * The algorithm used is based on streamlib's implementation of "HyperLogLog in Practice:
     * Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm", available
     * <a href="http://dx.doi.org/10.1145/2452376.2452456">here</a>.
     *
     * The relative accuracy is approximately `1.054 / sqrt(2^p)`. Setting a nonzero `sp &gt; p`
     * would trigger sparse representation of registers, which may reduce the memory consumption
     * and increase accuracy when the cardinality is small.
     *
     * @param {number} p  The precision value for the normal set.
     *          `p` must be a value between 4 and `sp` if `sp` is not zero (32 max).
     * @param {number} sp  The precision value for the sparse set, between 0 and 32.
     *           If `sp` equals 0, the sparse representation is skipped.
     * @returns {number}
     */
    RDD.prototype.countApproxDistinctwithSp = function (p, sp) {
        return this.getJavaObject().countApproxDistinct(p, sp);
    };

    /**
     * Return the count of each unique value in this RDD as a local map of (value, count) pairs.
     *
     * Note that this method should only be used if the resulting map is expected to be small, as
     * the whole thing is loaded into the driver's memory.
     * To handle very large results, consider using rdd.map(x =&gt; (x, 1L)).reduceByKey(_ + _), which
     * returns an RDD[T, Long] instead of a map.
     * @returns {Map} - need to figureout return structure probably just JSON construct
     * @private
     */
    RDD.prototype.countByValue = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().countByValue();
//   return new Map(javaObject);
    };

    /**
     * :: Experimental ::
     * Approximate version of countByValue().
     * @param timeout {number} - (undocumented)
     * @param confidence {number} - (undocumented)
     * @returns {module:eclairjs/partial.PartialResult}
     */
    RDD.prototype.countByValueApprox = function (timeout, confidence) {
        var javaObject = this.getJavaObject().countByValueApprox(timeout, confidence);
        return new PartialResult(javaObject);
    };

    /**
     * Get the list of dependencies of this RDD, taking into account whether the
     * RDD is checkpointed or not.
     * @returns {Seq} - need to figure out return structure probably just array
     * @private
     */
    RDD.prototype.dependencies = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().dependencies();
//   return new Seq(javaObject);
    };

    /**
     * Return a new RDD containing the distinct elements in this RDD.
     * @param {int} [numPartitions]
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.distinct = function (numPartitions) {
        var javaObject = numPartitions ? this.getJavaObject(numPartitions).distinct() :
            this.getJavaObject().distinct();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD containing only the elements that satisfy a predicate.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.filter = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().filter(fn);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Filters this RDD with p, where p takes an additional parameter of type A.  This
     * additional parameter is produced by constructA, which is called in each
     * partition with the index of that partition.
     * Note: Doesn't make sense for JavaScript.
     * @param constructA
     * @param {Object[]} [bindArgs] - array whose values will be added to constructA's argument list.
     * @returns {module:eclairjs.RDD}
     * @private
     */
    RDD.prototype.filterWith = function (constructA, bindArgs) {
        throw "not implemented by ElairJS";
        //var fn = Utils.createLambdaFunction(constructA, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        //var javaObject =  this.getJavaObject().filterWith(fn);
        //return Utils.javaToJs(javaObject);
    };

    /**
     * Return the first element in this RDD.
     * @returns {object}
     */
    RDD.prototype.first = function () {
        var result = this.getJavaObject().first();
        var o = Utils.javaToJs(result);
        return (o);
    };

    /**
     * Return a new RDD by first applying a function to all elements of this RDD, and then flattening the results.
     * @param {function} func - (undocumented) - Function with one parameter
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.flatMap = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFlatMapFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().flatMap(fn);
        return Utils.javaToJs(javaObject);
    };

    /**
     * FlatMaps f over this RDD, where f takes an additional parameter of type A.  This
     * additional parameter is produced by constructA, which is called in each
     * partition with the index of that partition.
     * Note: Doesn't make sense for JavaScript.
     * @returns {module:eclairjs.RDD}
     * @private
     */
    RDD.prototype.flatMapWith = function (constructA, preservesPartitioning) {
        throw "not implemented by ElairJS";
        //var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFlatMapFunction, this.context(), bindArgs);
        //var preserves = preservesPartitioning || false;
        //var javaObject =  this.getJavaObject().flatMapWith(fn,preservesPartitioning);
        //return Utils.javaToJs(javaObject);
    };


    /**
     *  Return a new RDD by first applying a function to all elements of this
     *  RDD, and then flattening the results.
     * @param {function}
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.PairRDD}
     */
    RDD.prototype.flatMapToPair = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSPairFlatMapFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().flatMapToPair(fn);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Aggregate the elements of each partition, and then the results for all the partitions, using a
     * given associative and commutative function and a neutral "zero value". The function
     * op(t1, t2) is allowed to modify t1 and return it as its result value to avoid object
     * allocation; however, it should not modify t2.
     *
     * This behaves somewhat differently from fold operations implemented for non-distributed
     * collections in functional languages like Scala. This fold operation may be applied to
     * partitions individually, and then fold those results into the final result, rather than
     * apply the fold to each element sequentially in some defined ordering. For functions
     * that are not commutative, the result may differ from that of a fold applied to a
     * non-distributed collection.
     * @param {module:eclairjs.RDD} zeroValue - (undocumented)
     * @param {function} func - (undocumented) Function with two parameters
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {object}
     */
    RDD.prototype.fold = function (zeroValue, func, bindArgs) {
        var zeroValue_uw = Utils.unwrapObject(zeroValue);
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
        var result = this.getJavaObject().fold(zeroValue_uw, fn);
        var o = Utils.javaToJs(result);
        return (o);
    };

    /**
     * Applies a function to all elements of this RDD.
     * @example
     * rdd3.foreach(function(record) {
 *    var connection = createNewConnection()
 *    connection.send(record);
 *    connection.close()
 * });
     * @param {function} func - Function with one parameter that returns void
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {void}
     */
    RDD.prototype.foreach = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSVoidFunction, this.context(), bindArgs);
        this.getJavaObject().foreach(fn);
    };

    /**
     * Applies a function to each partition of this RDD.
     * @example
     * rdd3.foreachPartition(function(partitionOfRecords) {
 *    var connection = createNewConnection()
 *    partitionOfRecords.forEach(function(record){
 *       connection.send(record);
 *    });
 *    connection.close()
 * });
     * @param {function} func - Function with one Array parameter that returns void
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {void}
     */
    RDD.prototype.foreachPartition = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSVoidFunction, this.context(), bindArgs);
        this.getJavaObject().foreachPartition(fn);
    };

    /**
     * Applies f to each element of this RDD, where f takes an additional parameter of type A.
     * This additional parameter is produced by constructA, which is called in each
     * partition with the index of that partition.
     * Note: Doesn't make sense for JavaScript.
     * @param {constructA} - (undocumented)
     * @param {Object[]} [bindArgs] - array whose values will be added to constructA's argument list.
     * @returns {void}
     * @private
     */
    RDD.prototype.foreachWith = function (constructA, bindArgs) {
        throw "not implemented by ElairJS";
        //var fn = Utils.createLambdaFunction(constructA, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        //this.getJavaObject().foreachWith(fn);
    };

    /**
     * Gets the name of the directory to which this RDD was checkpointed.
     * This is not defined if the RDD is checkpointed locally.
     * @returns {string}
     */
    RDD.prototype.getCheckpointFile = function () {
        return this.getJavaObject().getCheckpointFile();
    };

    /**
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    RDD.prototype.getStorageLevel = function () {
        var javaObject = this.getJavaObject().getStorageLevel();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return an RDD created by coalescing all elements within each partition into an array.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.glom = function () {
        var javaObject = this.getJavaObject().glom();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return an RDD of grouped items. Each group consists of a key and a sequence of elements
     * mapping to that key. The ordering of elements within each group is not guaranteed, and
     * may even differ each time the resulting RDD is evaluated.
     *
     * Note: This operation may be very expensive. If you are grouping in order to perform an
     * aggregation (such as a sum or average) over each key, using {@link aggregateByKey}
     * or {@link reduceByKey} will provide much better performance.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {number} [numPartitions] -  How many partitions to use in the resulting RDD (if non-zero partitioner is ignored)
     * @param {module:eclairjs.Partitioner} [partitioner] -  Partitioner to use for the resulting RDD
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.groupBy = function (func, numPartitions, partitioner, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var partitioner_uw = Utils.unwrapObject(partitioner);
        var result = numPartitions ? this.getJavaObject().groupBy(fn, numPartitions) :
            partitioner_uw ? this.getJavaObject().groupBy(fn, partitioner_uw) : this.getJavaObject().groupBy(fn);
        return Utils.javaToJs(result);
    };

    /**
     * A unique ID for this RDD (within its SparkContext).
     * @returns {int}
     */
    RDD.prototype.id = function () {
        return this.getJavaObject().id();
    };

    /**
     * Return the intersection of this RDD and another one. The output will not contain any duplicate
     * elements, even if the input RDDs did.
     *
     * Note that this method performs a shuffle internally.
     * @param {module:eclairjs.RDD} other - the other RDD
     * @param {number} numPartitions  How many partitions to use in the resulting RDD (if non-zero partitioner is ignored)
     * @param {module:eclairjs.Partitioner} partitioner  Partitioner to use for the resulting RDD
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.intersection = function (other, numPartitions, partitioner) {
        var other_uw = Utils.unwrapObject(other);
        var partitioner_uw = Utils.unwrapObject(partitioner);
        var result = numPartitions ? this.getJavaObject().intersection(other_uw, numPartitions) :
            partitioner_uw ? this.getJavaObject().intersection(other_uw, partitioner_uw) :
                this.getJavaObject().intersection(other_uw);
        return Utils.javaToJs(result);
    };

    /**
     * Return whether this RDD is checkpointed and materialized, either reliably or locally.
     * @returns {boolean}
     */
    RDD.prototype.isCheckpointed = function () {
        return this.getJavaObject().isCheckpointed();
    };

    /**
     * @note due to complications in the internal implementation, this method will raise an
     * exception if called on an RDD of `Nothing` or `Null`. This may be come up in practice
     * because, for example, the type of `parallelize(Seq())` is `RDD[Nothing]`.
     * (`parallelize(Seq())` should be avoided anyway in favor of `parallelize(Seq[T]())`.)
     *         may be empty even when it has at least 1 partition.
     * @returns {boolean}  true if and only if the RDD contains no elements at all. Note that an RDD
     */
    RDD.prototype.isEmpty = function () {
        return this.getJavaObject().isEmpty();
    };

    /**
     * Creates tuples of the elements in this RDD by applying `f`.
     * @param {function} func - (undocumented)
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.keyBy = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().keyBy(fn);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Mark this RDD for local checkpointing using Spark's existing caching layer.
     *
     * This method is for users who wish to truncate RDD lineages while skipping the expensive
     * step of replicating the materialized data in a reliable distributed file system. This is
     * useful for RDDs with long lineages that need to be truncated periodically (e.g. GraphX).
     *
     * Local checkpointing sacrifices fault-tolerance for performance. In particular, checkpointed
     * data is written to ephemeral local storage in the executors instead of to a reliable,
     * fault-tolerant storage. The effect is that if an executor fails during the computation,
     * the checkpointed data may no longer be accessible, causing an irrecoverable job failure.
     *
     * This is NOT safe to use with dynamic allocation, which removes executors along
     * with their cached blocks. If you must use both features, you are advised to set
     * `spark.dynamicAllocation.cachedExecutorIdleTimeout` to a high value.
     *
     * The checkpoint directory set through `SparkContext#setCheckpointDir` is not used.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.localCheckpoint = function () {
        var javaObject = this.getJavaObject().localCheckpoint();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD by applying a function to all elements of this RDD.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.map = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().map(fn);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD by applying a function to each partition of this RDD.
     * Similar to map, but runs separately on each partition (block) of the RDD, so func must accept an Array.
     * func should return a array rather than a single item.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {boolean} [preservesPartitioning]
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.mapPartitions = function (func, preservesPartitioning, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFlatMapFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().mapPartitions(fn, preservesPartitioning);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD by applying a function to each partition of this RDD, while tracking the index
     * of the original partition.
     *
     * `preservesPartitioning` indicates whether the input function preserves the partitioner, which
     * should be `false` unless this is a pair RDD and the input function doesn't modify the keys.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {boolean} [preservesPartitioning]
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.mapPartitionsWithIndex = function (func, preservesPartitioning, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().mapPartitionsWithIndex(fn, preservesPartitioning);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD by applying a function to each partition of this RDD, while tracking the index
     * of the original partition.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {boolean} [preservesPartitioning]
     * @param {Object[]} [bindArgs]  array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.mapPartitionsWithSplit = function (func, preservesPartitioning, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().mapPartitionsWithSplit(fn, preservesPartitioning);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Maps f over this RDD, where f takes an additional parameter of type A.  This
     * additional parameter is produced by constructA, which is called in each
     * partition with the index of that partition.
     * Note: Doesn't make sense for JavaScript.
     * @param {function}
     * @param {boolean}
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     * @private
     */
    RDD.prototype.mapWith = function (constructA, preservesPartitioning, bindArgs) {
        throw "not implemented by ElairJS";
        //var fn = Utils.createLambdaFunction(constructA, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        //var javaObject =  this.getJavaObject().mapWith(fn,preservesPartitioning);
        //return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD by applying a function to all elements of this RDD.
     * @param (function) func - (undocumented) Function with one parameter that returns tuple
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs.PairRDD}
     */
    RDD.prototype.mapToPair = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSPairFunction, this.context(), bindArgs);
        var result = Utils.javaToJs(this.getJavaObject().mapToPair(fn));
        return result;
    };

    /**
     * Return a new RDD by applying a function to all elements of this RDD.
     * @param (function) func - (undocumented) Function with one parameter that returns tuple
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs.FloatRDD}
     */
    RDD.prototype.mapToFloat = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSDoubleFunction, this.context(), bindArgs);
        var result = Utils.javaToJs(this.getJavaObject().mapToDouble(fn));
        return result;
    };

    /**
     * Returns the max of this RDD as defined by the implicit Ordering[T].
     * @param (function) comparator - Compares its two arguments for order. Returns a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.
     * @param {Object[]} [bindArgs] - array whose values will be added to comparator's argument list.
     * @returns {object}  the maximum element of the RDD
     */
    RDD.prototype.max = function (comparator, bindArgs) {
        var fn = Utils.createLambdaFunction(comparator, org.eclairjs.nashorn.JSComparator, this.context(), bindArgs);
        return this.getJavaObject().max(fn);
    };

    /**
     * Returns the min of this RDD as defined by the implicit Ordering[T].
     * @param (function) comparator - Compares its two arguments for order. Returns a negative integer, zero, or a positive integer as the second argument is less than, equal to, or greater than the first.
     * @param {Object[]} [bindArgs] - array whose values will be added to compartor's argument list.
     * @returns {object}  the minimum element of the RDD
     */
    RDD.prototype.min = function (comparator, bindArgs) {
        var fn = Utils.createLambdaFunction(comparator, org.eclairjs.nashorn.JSComparator, this.context(), bindArgs);
        return this.getJavaObject().min(fn);
    };

    /**
     * A friendly name for this RDD
     * @returns {string}
     */
    RDD.prototype.name = function () {
        return this.getJavaObject().name();
    };

    /**
     * This does not make sense for JavaScript as everything in JS is handled as a double.
     * @returns {module:eclairjs.RDD}
     * @private
     */
    RDD.prototype.numericRDDToDoubleRDDFunctions = function (rdd) {
        throw "not implemented by ElairJS";
        //var rdd_uw = Utils.unwrapObject(rdd);
        //var javaObject = this.getJavaObject().numericRDDToDoubleRDDFunctions(rdd_uw);
        //return Utils.javaToJs(javaObject);
    };

    /**
     * @param {module:eclairjs/storage.StorageLevel} newLevel
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.persist = function (newLevel) {
        var newLevel_uw = newLevel ? Utils.unwrapObject(newLevel) : null;
        var javaObject = newLevel_uw ? this.getJavaObject().persist(newLevel_uw) : this.getJavaObject().persist();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return an RDD created by piping elements to a forked external process.
     * The print behavior can be customized by providing two functions.
     *
     * @param {Seq|string} command - command to run in forked process.
     * @param {Map} env -  environment variables to set.
     * @param {func} [printPipeContext] - Before piping elements, this function is called as an opportunity
     *                         to pipe context data. Print line function (like out.println) will be
     *                         passed as printPipeContext's parameter.
     * @param {func} [printRDDElement] - Use this function to customize how to pipe elements.
     *                        This function will be called with each RDD element as the 1st parameter,
     *                        and the print line function (like out.println()) as the 2nd parameter.
     *                        An example of pipe the RDD data of groupBy() in a streaming way,
     *                        instead of constructing a huge String to concat all the elements:
     *                        def printRDDElement(record:(String, Seq[String]), f:String=&gt;Unit) =
     *                          for (e &lt;- record._2){f(e)}
     * @param {boolean} [separateWorkingDir] - Use separate working directories for each task.
     * @param {Object[]} [bindArgs] - array whose values will be added to printPipeContext's argument list.
     * @param {Object[]} [bindArgs] - array whose values will be added to printRDDElement's argument list.
     * @returns {module:eclairjs.RDD}  the result RDD
     */
    RDD.prototype.pipe = function (command, env, printPipeContext, printRDDElement, separateWorkingDir, bindArgs1, bindArgs2) {
        var command_uw = typeof command === 'object' ? Utils.unwrapObject(command) : command;
        var env_uw = env ? Utils.unwrapObject(env) : null;
        var fn = printPipeContext ? Utils.createLambdaFunction(printPipeContext, org.eclairjs.nashorn.JSFunction, bindArgs1) : null;
        var fn2 = printPipeContext ? Utils.createLambdaFunction(printRDDElement, org.eclairjs.nashorn.JSFunction, bindArgs2) : null;
        var result = fn && fn2 ? this.getJavaObject().pipe(command_uw, env_uw, fn, fn2, separateWorkingDir) :
            env_ua ? this.getJavaObject().pipe(command_uw, env_uw) : this.getJavaObject().pipe(command_uw);

        return Utils.javaToJs(result);
    };

    /**
     * Get the preferred locations of a partition, taking into account whether the
     * RDD is checkpointed.
     * @returns {Seq}
     * @private
     */
    RDD.prototype.preferredLocations = function (split) {
        throw "not implemented by ElairJS";
//   var split_uw = Utils.unwrapObject(split);
//   var javaObject =  this.getJavaObject().preferredLocations(split_uw);
//   return new Seq(javaObject);
    };

    /**
     * Randomly splits this RDD with the provided weights.
     *
     * @param {number[]} weights - weights for splits, will be normalized if they don't sum to 1
     * @param {number} seed - random seed
     * @returns {module:eclairjs.RDD[]}  split RDDs in an array
     * @private
     */
    RDD.prototype.randomSplit = function (weights, seed) {
        var res = (seed != undefined)
            ? this.getJavaObject().randomSplit(weights, seed)
            : this.getJavaObject().randomSplit(weights);

        var results = [];
        for (var i = 0; i < res.length; i++) {
            var value = res[i];
            results.push(Utils.javaToJs(value));
        }
        return results;
    };

    /**
     * @private
     */
    RDD.prototype.rddToAsyncRDDActions = function (rdd) {
        throw "not implemented by ElairJS";
//   var rdd_uw = Utils.unwrapObject(rdd);
//   return  this.getJavaObject().rddToAsyncRDDActions(rdd_uw);
    };

    /**
     * @private
     */
    RDD.prototype.rddToOrderedRDDFunctions = function (rdd) {
        throw "not implemented by ElairJS";
//   var rdd_uw = Utils.unwrapObject(rdd);
//   return  this.getJavaObject().rddToOrderedRDDFunctions(rdd_uw);
    };

    /**
     * @private
     */
    RDD.prototype.rddToPairRDDFunctions = function (rdd) {
        throw "not implemented by ElairJS";
//   var rdd_uw = Utils.unwrapObject(rdd);
//   return  this.getJavaObject().rddToPairRDDFunctions(rdd_uw);
    };

    /**
     * @private
     */
    RDD.prototype.rddToSequenceFileRDDFunctions = function (rdd) {
        throw "not implemented by ElairJS";
//   var rdd_uw = Utils.unwrapObject(rdd);
//   return  this.getJavaObject().rddToSequenceFileRDDFunctions(rdd_uw);
    };

    /**
     * Reduces the elements of this RDD using the specified commutative and
     * associative binary operator.
     * {function} func - (undocumented) Function with two parameters
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {object}
     */
    RDD.prototype.reduce = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context(), bindArgs);
        var javaObject = this.getJavaObject().reduce(fn);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new RDD that has exactly numPartitions partitions.
     *
     * Can increase or decrease the level of parallelism in this RDD. Internally, this uses
     * a shuffle to redistribute data.
     *
     * If you are decreasing the number of partitions in this RDD, consider using `coalesce`,
     * which can avoid performing a shuffle.
     * @param {int} numPartitions - (undocumented)
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.repartition = function (numPartitions) {
        var javaObject = this.getJavaObject().repartition(numPartitions);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a sampled subset of this RDD.
     *
     * @param {boolean} withReplacement  can elements be sampled multiple times (replaced when sampled out)
     * @param {number} fraction  expected size of the sample as a fraction of this RDD's size
     *  without replacement: probability that each element is chosen; fraction must be [0, 1]
     *  with replacement: expected number of times each element is chosen; fraction must be >= 0
     * @param {number} seed  seed for the random number generator
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.sample = function (withReplacement, fraction, seed) {
        var javaObject = this.getJavaObject().sample(withReplacement, fraction, seed);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Save this RDD as a SequenceFile of serialized objects.
     * @param {string} path
     * @returns {void}
     */
    RDD.prototype.saveAsObjectFile = function (path) {
        this.getJavaObject().saveAsObjectFile(path);
    };

    /**
     * Save this RDD as a text file, using string representations of elements.
     * @param {string} path
     * @returns {void}
     */
    RDD.prototype.saveAsTextFile = function (path) {
        this.getJavaObject().saveAsTextFile(path);
    };

    /**
     * Save this RDD as a compressed text file, using string representations of elements.
     * @param path {string}
     * @param codec {org.apache.hadoop.io.compress.CompressionCodec}
     * @returns {void}
     * @private
     */
    RDD.prototype.saveAsTextFilewithCodec = function (path, codec) {
        throw "not implemented by ElairJS";
        //var codec_uw = Utils.unwrapObject(codec);
        //this.getJavaObject().saveAsTextFile(path,codec_uw);
    };

    /**
     * Assign a name to this RDD.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.setName = function (_name) {
        var javaObject = this.getJavaObject().setName(_name);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return this RDD sorted by the given key function.
     * @param {function} func - (undocumented) Function with one parameter
     * @param {boolean} ascending
     * @param {int} numPartitions
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.sortBy = function (func, ascending, numPartitions, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().sortBy(fn, ascending, numPartitions);
        return Utils.javaToJs(javaObject);
    };

    /**
     * The SparkContext that created this RDD.
     * @returns {module:eclairjs.SparkContext}
     */
    RDD.prototype.sparkContext = function () {
        var javaObject = this.getJavaObject().sparkContext();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return an RDD with the elements from `this` that are not in `other`.
     * @param other {module:eclairjs.RDD}
     * @param  {int} [numPartitions]
     * @param  {Partition} [p] - ignored if numPartitions is non-zero)
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.subtract = function (other, numPartitions, p) {
        var other_uw = Utils.unwrapObject(other);
        var p_uw = p ? Utils.unwrapObject(p) : null;
        var result = numPartitions ? this.getJavaObject().subtract(other_uw, numPartitions) :
            p_uw ? this.getJavaObject().subtract(other_uw, p_uw) : this.getJavaObject().subtract(other_uw);
        return Utils.javaToJs(result);
    };

    /**
     * Take the first num elements of the RDD.
     * @param {int} num
     * @returns {Array}
     */
    RDD.prototype.take = function (num) {
        var res = this.getJavaObject().take(num);
        //print("take: ");
        //print(res);
        /*
         this.logger.debug("take " + res.getClass().getName());
         var results = [];
         for (var i = 0; i < res.length; i++) {
         var value = res[i];
         this.logger.debug("take value: " + value.getClass().getName());
         var o = Utils.javaToJs(value);
         this.logger.debug("take o:" + o.toString());
         results.push(o);
         }
         this.logger.debug("results " + results);
         return results;
         */
        /*
         var results = [];
         for (var i = 0; i < res.size(); i++) {
         var value = res.get(i);
         var o = Serialize.javaToJs(value);
         results.push(o);
         }
         */
        // Just send the whole list in and do it all in there.
        // Each value will be serialized in javaToJs.
        var results = Serialize.javaToJs(res);

        return results;
    };

    /**
     * Returns the first k (smallest) elements from this RDD as defined by the specified
     * implicit Ordering[T] and maintains the ordering. This does the opposite of {@link top}.
     * @example
     *     var result = rdd.takeOrdered(25, function(a, b){
     *       return a > b ? -1 : a == b? 0 : 1;
     *     });
     *
     * @param {number} num - the number of elements to return
     * @param {function} [func] - compares to arguments
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {Array}  an array of top elements
     */
    RDD.prototype.takeOrdered = function (num, func, bindArgs) {
        var res;
        if (func) {
            var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSComparator, this.context(), bindArgs);
            res = this.getJavaObject().takeOrdered(num, fn);
        } else {
            res = this.getJavaObject().takeOrdered(num);
        }

        var results = [];
        for (var i = 0; i < res.size(); i++) {
            var value = res.get(i);
            var o = Utils.javaToJs(value);
            results.push(o);
        }
        return results;
    };

    /**
     * Return a fixed-size sampled subset of this RDD in an array
     *
     * @param {boolean} withReplacement  whether sampling is done with replacement
     * @param {number} num  size of the returned sample
     * @param {number} seed  seed for the random number generator
     * @returns {Array}  sample of specified size in an array
     */
    RDD.prototype.takeSample = function (withReplacement, num, seed) {
        var res = this.getJavaObject().takeSample(withReplacement, num, seed);
        var results = [];
        for (var i = 0; i < res.size(); i++) {
            var value = res.get(i);
            var o = Utils.javaToJs(value);
            results.push(o);
        }
        return results;
    };

    /**
     * Return an array that contains all of the elements in this RDD.
     * @returns {Array}
     */
    RDD.prototype.toArray = function () {
        var res = this.getJavaObject().toArray();
        var results = [];
        for (var i = 0; i < res.length; i++) {
            var value = res[i];
            var o = Utils.javaToJs(value);
            results.push(o);
        }
        return results;
    };

    /**
     * A description of this RDD and its recursive dependencies for debugging.
     * @returns {string}
     */
    RDD.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };

    /**
     * Returns the top k (largest) elements from this RDD as defined by the specified
     * implicit Ordering[T]. This does the opposite of {@link takeOrdered}. For example:
     * {{{
 *   sc.parallelize(Seq(10, 4, 2, 12, 3)).top(1)
 *   // returns Array(12)
 *
 *   sc.parallelize(Seq(2, 3, 4, 5, 6)).top(2)
 *   // returns Array(6, 5)
 * }}}
     *
     * @param {number} num  k, the number of top elements to return
     * @returns {Array}  an array of top elements
     */
    RDD.prototype.top = function (num) {
        var res = this.getJavaObject().top(num);
        var results = [];
        for (var i = 0; i < res.length; i++) {
            var value = res[i];
            var o = Utils.javaToJs(value);
            results.push(o);
        }
        return results;
    };

    /**
     * @returns {string}
     */
    RDD.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * Aggregates the elements of this RDD in a multi-level tree pattern.
     *
     * @param zeroValue - (undocumented)
     * @param {function} func1 - (undocumented) Function with two parameters
     * @param {function} func2 combOp - (undocumented) Function with two parameters
     * @param {Object[]} [bindArgs1] - array whose values will be added to func1's argument list.
     * @param {Object[]} [bindArgs2] - array whose values will be added to func2's argument list.
     * @see [[org.apache.spark.rdd.RDD#aggregate]]
     * @returns {object}
     */
    RDD.prototype.treeAggregate = function (zeroValue, func1, func2, bindArgs1, bindArgs2) {
        var fn1 = Utils.createLambdaFunction(func1, org.eclairjs.nashorn.JSFunction2, bindArgs1);
        var fn2 = Utils.createLambdaFunction(func2, org.eclairjs.nashorn.JSFunction2, bindArgs2);
        return Utils.javaToJs(this.getJavaObject().treeAggregate(zeroValue_uw, fn1, fn2));
    };

    /**
     * Reduces the elements of this RDD in a multi-level tree pattern.
     *
     * @param {function} func - (undocumented) Function with one parameter
     * @param {number} depth  suggested depth of the tree (default: 2)
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @see [[org.apache.spark.rdd.RDD#reduce]]
     * @returns {object}
     */
    RDD.prototype.treeReduce = function (func, depth, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context(), bindArgs);
        var javaObject = this.getJavaObject().treeReduce(fn, depth);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return the union of this RDD and another one. Any identical elements will appear multiple
     * times (use `.distinct()` to eliminate them).
     * @param {module:eclairjs.RDD} other - (undocumented)
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.union = function (other) {
        var other_uw = Utils.unwrapObject(other);
        var javaObject = this.getJavaObject().union(other_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Mark the RDD as non-persistent, and remove all blocks for it from memory and disk.
     *
     * @param {boolean} blocking -  Whether to block until all blocks are deleted.
     * @returns {module:eclairjs.RDD}  This RDD.
     */
    RDD.prototype.unpersist = function (blocking) {
        var javaObject = this.getJavaObject().unpersist(blocking);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Zips this RDD with another one, returning key-value pairs with the first element in each RDD,
     * second element in each RDD, etc. Assumes that the two RDDs have the *same number of
     * partitions* and the *same number of elements in each partition* (e.g. one was made through
     * a map on the other).
     * @param {module:eclairjs.RDD} other - (undocumented)
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.zip = function (other) {
        var other_uw = Utils.unwrapObject(other);
        var javaObject = this.getJavaObject().zip(other_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Zip this RDD's partitions with another RDD and return a new RDD by
     * applying a function to the zipped partitions. Assumes that both the RDDs have the
     * same number of partitions, but does not require them to have the same number
     * of elements in each partition.
     *
     * @param {module:eclairjs.RDD} rdd2
     * @param {function} func - Function with two parameters
     * @param {boolean} [preservesPartitioning]
     * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.zipPartitions = function (rdd2, func, preservesPartitioning, bindArgs) {
        var rdd2_uw = Utils.unwrapObject(rdd2);
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFlatMapFunction2, this.context(), bindArgs);
        var result = this.getJavaObject().zipPartitions(rdd2_uw, fn);
        return Utils.javaToJs(result);
    };

    /**
     * Zip this RDD's partitions with one (or more) RDD(s) and return a new RDD by
     * applying a function to the zipped partitions. Assumes that all the RDDs have the
     * same number of partitions, but does not require them to have the same number
     * of elements in each partition.
     *
     * Note: To support params rdd3, rdd4 we need to implement JSFunction3 and JSFunction4
     * Renaming this version and making this private for now.
     *
     * @param {module:eclairjs.RDD} rdd2
     * @param {module:eclairjs.RDD} [rdd3]
     * @param {module:eclairjs.RDD} [rdd4]
     * @param {boolean} [preservesPartitioning]
     * @returns {module:eclairjs.RDD}
     * @private
     */
    RDD.prototype.zipPartitionsMulti = function (rdd2, rdd3, rdd4, preservesPartitioning) {
        var rdd2_uw = rdd2 ? Utils.unwrapObject(rdd2) : null;
        var rdd3_uw = rdd3 ? Utils.unwrapObject(rdd3) : null;
        var rdd4_uw = rdd4 ? Utils.unwrapObject(rdd4) : null;
        var preserve = preservesPartitioning || false;
        var result = rdd4_uw ? this.getJavaObject().zipPartitions(rdd2_uw, rdd3_uw, rdd4_uw, preservesPartitioning) :
            rdd3_uw ? this.getJavaObject().zipPartitions(rdd2_uw, rdd3_uw, preservesPartitioning) :
                this.getJavaObject().zipPartitions(rdd2_uw, preservesPartitioning);
        return Utils.javaToJs(result);
    };

    /**
     * Zips this RDD with its element indices. The ordering is first based on the partition index
     * and then the ordering of items within each partition. So the first item in the first
     * partition gets index 0, and the last item in the last partition receives the largest index.
     *
     * This is similar to Scala's zipWithIndex but it uses Long instead of Int as the index type.
     * This method needs to trigger a spark job when this RDD contains more than one partitions.
     *
     * Note that some RDDs, such as those returned by groupBy(), do not guarantee order of
     * elements in a partition. The index assigned to each element is therefore not guaranteed,
     * and may even change if the RDD is reevaluated. If a fixed ordering is required to guarantee
     * the same index assignments, you should sort the RDD with sortByKey() or save it to a file.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.zipWithIndex = function () {
        var javaObject = this.getJavaObject().zipWithIndex();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Zips this RDD with generated unique Long ids. Items in the kth partition will get ids k, n+k,
     * 2*n+k, ..., where n is the number of partitions. So there may exist gaps, but this method
     * won't trigger a spark job, which is different from [[org.apache.spark.rdd.RDD#zipWithIndex]].
     *
     * Note that some RDDs, such as those returned by groupBy(), do not guarantee order of
     * elements in a partition. The unique ID assigned to each element is therefore not guaranteed,
     * and may even change if the RDD is reevaluated. If a fixed ordering is required to guarantee
     * the same index assignments, you should sort the RDD with sortByKey() or save it to a file.
     * @returns {module:eclairjs.RDD}
     */
    RDD.prototype.zipWithUniqueId = function () {
        return Utils.javaToJs(this.getJavaObject().zipWithUniqueId());
    };

    RDD.prototype.toJSON = function () {
        return Utils.javaToJs(this.getJavaObject().collect());
    };

///
///  from Pair functions
///


    /**
     * The asynchronous version of `collect`, which returns a future for
     * retrieving an array containing all of the elements in this RDD.
     * @returns {module:eclairjs.FutureAction}
     */
    RDD.prototype.collectAsync = function () {
        var javaObject = this.getJavaObject().collectAsync();
        return Utils.javaToJs(javaObject);
    }
    RDD.prototype.joinx = function (other, numPartitions) {
        //print("rdd join")
        var other_uw = Utils.unwrapObject(other);
        var javaObject = numPartitions ? this.getJavaObject(other_uw, numPartitions).join() :
            this.getJavaObject().join(other_uw);
        return Utils.javaToJs(javaObject);
    };

    module.exports = RDD;


})();
