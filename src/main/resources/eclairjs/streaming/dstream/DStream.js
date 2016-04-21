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
     * @memberof module:eclairjs/streaming/dstream
     * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming,
     * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
     * @param {object} jDStream
     */
    var DStream = function (jDStream) {
        var jvmObj = jDStream;
        this.logger = Logger.getLogger("streaming.dtream.DStream_js");
        JavaWrapper.call(this, jvmObj);
    };

    DStream.prototype = Object.create(JavaWrapper.prototype);

    DStream.prototype.constructor = DStream;

    DStream.HashMap = Java.type("java.util.HashMap");
    DStream.UUID = Java.type("java.util.UUID");
    DStream.foreachMap = new DStream.HashMap();
    DStream.unrefRDD = function (refId) {
        var javaObj = DStream.foreachMap.get(refId);
        return Utils.javaToJs(javaObj);
    };

    /**
     * Persist RDDs of this DStream with the default storage level (MEMORY_ONLY_SER)
     * @returns {DStream}
     */
    DStream.prototype.cache = function () {
        return Utils.javaToJs(this.getJavaObject().cache());
    };
    /**
     * Generate an RDD for the given duration
     * @param {Time} validTime
     * @returns {module:eclairjs.RDD}
     */
    DStream.prototype.compute = function (validTime) {
        return Utils.javaToJs(this.getJavaObject().compute(validTime.getJavaObject()));
    };
    /**
     * Return a new DStream containing only the elements that satisfy a predicate.
     * @param {function} func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {DStream}
     */
    DStream.prototype.filter = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        return Utils.javaToJs(this.getJavaObject().filter(fn));
    };
    /**
     * Persist RDDs of this DStream with the storage level
     * @param {module:eclairjs/storage.StorageLevel} [level] (MEMORY_ONLY_SER) by default
     * @return {DStream}
     */
    DStream.prototype.persist = function () {
        if (arguments.length == 1) {
            return Utils.javaToJs(
                this.getJavaObject().persist(arguments[0].getJavaObject()));
        } else {
            return Utils.javaToJs(this.getJavaObject().perist());
        }
    };
    /**
     * Return a new DStream with an increased or decreased level of parallelism.
     * @param {int} numPartitions
     * @returns {DStream}
     */
    DStream.prototype.repartition = function (numPartitions) {
        return Utils.javaToJs(this.getJavaObject().repartition(numPartitions));
    };
    /**
     * Return a new DStream by unifying data of another DStream with this DStream.
     * @param {DStream} that
     * @returns {DStream}
     */
    DStream.prototype.union = function (that) {
        return Utils.javaToJs(this.getJavaObject().union(Utils.unwrapObject(that)));
    }
    /**
     * Return a new DStream in which each RDD contains all the elements in seen in a sliding window of time over this DStream.
     * The new DStream generates RDDs with the same interval as this DStream.
     * @param duration - width of the window; must be a multiple of this DStream's interval.
     * @param [slideInterval]
     * @returns {DStream}
     */
    DStream.prototype.window = function (duration) {
        if (arguments.length == 1) {
            return Utils.javaToJs(this.getJavaObject().window(
                Utils.unwrapObject(arguments[0])));
        } else {
            return Utils.javaToJs(this.getJavaObject().window(
                Utils.unwrapObject(arguments[0]),
                Utils.unwrapObject(arguments[1])));
        }
    };
    /**
     * Enable periodic checkpointing of RDDs of this DStream.
     * @param {Duration} interval
     * @return {DStream}
     */
    DStream.prototype.checkpoint = function (interval) {
        return Utils.javaToJs(this.getJavaObject().checkpoint(interval.getJavaObject()));
    };
    /**
     * Return the StreamingContext associated with this DStream
     * @returns {StreamingContext}
     */
    DStream.prototype.context = function () {
        return Utils.javaToJs(this.getJavaObject().context());
    };
    /**
     * Return a new DStream in which each RDD has a single element generated by
     * counting each RDD of this DStream.
     * @returns {DStream}
     */
    DStream.prototype.count = function () {
        return Utils.javaToJs(this.getJavaObject().count());
    };
    /**
     * Return a new DStream in which each RDD contains the counts of each distinct
     * value in each RDD of this DStream. Hash partitioning is used to generate the
     * RDDs with Spark's default number of partitions if numPartions is not
     * specified.
     * @param {int} numPartitions
     * @returns {DStream}
     */
    DStream.prototype.countByValue = function () {
        if (arguments.length > 0) {
            return Utils.javaToJs(this.getJavaObject().countByValue(arguments[0]));
        } else {
            return Utils.javaToJs(this.getJavaObject().countByValue());
        }
    };
    /**
     * Return a new DStream in which each RDD contains the count of distinct
     * elements in RDDs in a sliding window over this DStream. Hash partitioning is
     * used to generate the RDDs with Spark's default number of partitions if
     * numPartitions is not specified.
     * @param {Duration} windowDuration
     * @param {Duration} slideDuration
     * @param {int} numPartitions
     * @returns {DStream}
     */
    DStream.prototype.countByValueAndWindow = function () {
        if (arguments.length == 2) {
            return Utils.javaToJs(
                this.getJavaObject().countByValueAndWindow(
                    arguments[0].getJavaObject(),
                    arguments[1].getJavaObject()
                ))
        } else {
            return Utils.javaToJs(
                this.getJavaObject().countByValueAndWindow(
                    arguments[0].getJavaObject(),
                    arguments[1].getJavaObject(),
                    arguments[2]
                ))
        }
    };
    /**
     * Return a new DStream in which each RDD has a single element generated by
     * counting the number of elements in a window over this DStream. windowDuration
     * and slideDuration are as defined in the window() operation. This is
     * equivalent to window(windowDuration, slideDuration).count()
     * @param {Duration} windowDuration
     * @param {Duration} slideDuration
     * @returns {DStream}
     */
    DStream.prototype.countByWindow = function (windowDuration, slideDuration) {
        return Utils.javaToJs(
            this.getJavaObject().countByWindow(
                windowDuration.getJavaObject(),
                slideDuration.getJavaObject()
            ))
    };

    /**
     * Return a new DStream in which each RDD contains the count of distinct elements in
     * RDDs in a sliding window over this DStream. Hash partitioning is used to generate the RDDs
     * with `numPartitions` partitions.
     * @param {Duration} windowDuration  width of the window; must be a multiple of this DStream's
     *                       batching interval
     * @param {Duration} slideDuration   sliding interval of the window (i.e., the interval after which
     *                       the new DStream will generate RDDs); must be a multiple of this
     *                       DStream's batching interval
     * @param {number} [numPartitions]   number of partitions of each RDD in the new DStream.
     * @returns {PairDStream}
     */
    DStream.prototype.countByValueAndWindow = function (windowDuration, slideDuration, numPartitions) {
        var windowDuration_uw = Utils.unwrapObject(windowDuration);
        var slideDuration_uw = Utils.unwrapObject(slideDuration);

        if (arguments[2]) {
            var javaObject = this.getJavaObject().countByValueAndWindow(windowDuration_uw, slideDuration_uw, numPartitions);
            return Utils.javaToJs(javaObject);
        } else {
            var javaObject = this.getJavaObject().countByValueAndWindow(windowDuration_uw, slideDuration_uw);
            return Utils.javaToJs(javaObject);
        }
    };

    /**
     * Return a new DStream by first applying a function to all elements of this
     * DStream, and then flattening the results.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {DStream}
     */
    DStream.prototype.flatMap = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFlatMapFunction, this.context().sparkContext(), bindArgs);
        return Utils.javaToJs(this.getJavaObject().flatMap(fn));
    };
    /**
     * Return a new DStream by applying a function to all elements of this DStream,
     * and then flattening the results
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {PairDStream}
     */
    DStream.prototype.flatMapToPair = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSPairFlatMapFunction, this.context().sparkContext(), bindArgs);
        return Utils.javaToJs(this.getJavaObject().flatMapToPair(fn));
    };
    /**
     * Return a new DStream in which each RDD is generated by applying glom() to
     * each RDD of this DStream. Applying glom() to an RDD coalesces all elements
     * within each partition into an array.
     */
    DStream.prototype.glom = function () {
        return Utils.javaToJs(this.getJavaObject().glom());
    }

    /**
     * Return a new DStream by applying a function to all elements of this DStream.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {DStream}
     */
    DStream.prototype.map = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        return Utils.javaToJs(this.getJavaObject().map(fn));
    };

    /**
     * Return a new DStream by applying a function to all elements of this DStream.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {PairDStream}
     */
    DStream.prototype.mapToPair = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSPairFunction, this.context().sparkContext(), bindArgs);
        return Utils.javaToJs(this.getJavaObject().mapToPair(fn));
    };

    /**
     * Return a new DStream in which each RDD is generated by applying
     * mapPartitions() to each RDDs of this DStream. Applying mapPartitions() to an
     * RDD applies a function to each partition of the RDD.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {DStream}
     */
    DStream.prototype.mapPartitions = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFlatMapFunction, this.context().sparkContext(), bindArgs);
        return Utils.javaToJs(this.getJavaObject().mapPartitions(fn));
    };

    /**
     * Return a new DStream in which each RDD has a single element generated by reducing each RDD
     * of this DStream.
     * @param {func} f
     * @returns {DStream}
     */
    DStream.prototype.reduce = function (f, bindArgs) {
        var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().reduce(fn);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream in which each RDD has a single element generated by reducing all
     * elements in a sliding window over this DStream.
     * @param {func} reduceFunc  associative reduce function
     * @param {Duration} windowDuration  width of the window; must be a multiple of this DStream's
     *                       batching interval
     * @param {Duration} slideDuration   sliding interval of the window (i.e., the interval after which
     *                       the new DStream will generate RDDs); must be a multiple of this
     *                       DStream's batching interval
     * @returns {DStream}
     */
    DStream.prototype.reduceByWindow = function (reduceFunc, windowDuration, slideDuration, bindArgs) {
        var fn = Utils.createLambdaFunction(reduceFunc, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var windowDuration_uw = Utils.unwrapObject(windowDuration);
        var slideDuration_uw = Utils.unwrapObject(slideDuration);
        var javaObject = this.getJavaObject().reduceByWindow(fn, windowDuration_uw, slideDuration_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream in which each RDD has a single element generated by reducing all
     * elements in a sliding window over this DStream. However, the reduction is done incrementally
     * using the old window's reduced value :
     *  1. reduce the new values that entered the window (e.g., adding new counts)
     *  2. "inverse reduce" the old values that left the window (e.g., subtracting old counts)
     *  This is more efficient than reduceByWindow without "inverse reduce" function.
     *  However, it is applicable to only "invertible reduce functions".
     * @param {func} reduceFunc  associative reduce function
     * @param {func} invReduceFunc  inverse reduce function
     * @param {Duration} windowDuration  width of the window; must be a multiple of this DStream's
     *                       batching interval
     * @param {Duration} slideDuration   sliding interval of the window (i.e., the interval after which
     *                       the new DStream will generate RDDs); must be a multiple of this
     *                       DStream's batching interval
     * @returns {DStream}
     */
    DStream.prototype.reduceByWindowwithSlideDuration = function (reduceFunc, invReduceFunc, windowDuration, slideDuration, bindArgs) {
        var fn = Utils.createLambdaFunction(reduceFunc, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var fn2 = Utils.createLambdaFunction(invReduceFunc, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var windowDuration_uw = Utils.unwrapObject(windowDuration);
        var slideDuration_uw = Utils.unwrapObject(slideDuration);
        var javaObject = this.getJavaObject().reduceByWindow(fn, fn2, windowDuration_uw, slideDuration_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream in which each RDD is generated by applying a function
     * on each RDD of 'this' DStream.
     * @param {func} transformFunc
     * @returns {DStream}
     */
    DStream.prototype.transform = function (transformFunc, bindArgs) {
        var fn = Utils.createLambdaFunction(transformFunc, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().transform(fn);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream in which each RDD is generated by applying a function
     * on each RDD of 'this' DStream.
     * @param {func} transformFunc
     * @returns {PairDStream}
     */
    DStream.prototype.transformToPair = function (transformFunc, bindArgs) {
        var fn = Utils.createLambdaFunction(transformFunc, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().transformToPair(fn);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Apply a function to each RDD in this DStream. This is an output operator, so 'this' DStream will be registered as an output
     * stream and therefore materialized.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {void}
     */
    DStream.prototype.foreachRDD = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        this.getJavaObject().foreachRDD(fn);
    };

    /**
     * Apply a function to each RDD in this DStream. This is an output operator, so 'this' DStream will be registered as an output
     * stream and therefore materialized.
     *  The time is passed into to the function.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {void}
     */
    DStream.prototype.foreachRDDWithTime = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        this.getJavaObject().foreachRDD(fn);
    };

    /**
     * Print the first ten elements of each RDD generated in this DStream. This is an output operator, so this DStream will be
     * registered as an output stream and there materialized.
     * @returns {void}
     */
    DStream.prototype.print = function () {
        this.getJavaObject().print();
    };

    module.exports = DStream;

})();