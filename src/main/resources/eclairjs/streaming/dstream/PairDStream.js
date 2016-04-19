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
    var DStream = require(EclairJS_Globals.NAMESPACE + '/streaming/dstream/DStream');

    /**
     * @constructor
     * @memberof module:eclairjs/streaming/dstream
     * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming,
     * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
     * @param {object} jDStream
     */
    var PairDStream = function (jPairDStream) {
        var jvmObj = jPairDStream;
        this.logger = Logger.getLogger("streaming.dtream.PairDStream_js");
        JavaWrapper.call(this, jvmObj);
    };

    PairDStream.prototype = Object.create(DStream.prototype);

    PairDStream.prototype.constructor = PairDStream;

    PairDStream.HashMap = Java.type("java.util.HashMap");
    PairDStream.UUID = Java.type("java.util.UUID");
    PairDStream.foreachMap = new PairDStream.HashMap();
    PairDStream.unrefRDD = function (refId) {
        var javaObj = PairDStream.foreachMap.get(refId);
        return Utils.javaToJs(javaObj);
    };

    /**
     * @param {func} f
     * @returns {PairDStream}
     */
    PairDStream.prototype.filter = function (f, bindArgs) {
        var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().filter(fn);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {PairDStream}
     */
    PairDStream.prototype.cache = function () {
        var javaObject = this.getJavaObject().cache();
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {StorageLevel} [storageLevel]
     * @returns {PairDStream}
     */
    PairDStream.prototype.persist = function (storageLevel) {
        var storageLevel_uw = Utils.unwrapObject(storageLevel);

        if (arguments[0]) {
            var javaObject = this.getJavaObject().persist(storageLevel_uw);
            return Utils.javaToJs(javaObject);
        } else {
            var javaObject = this.getJavaObject().persist();
            return Utils.javaToJs(javaObject);
        }
    };


    /**
     * Return a new DStream with an increased or decreased level of parallelism. Each RDD in the
     * returned DStream has exactly numPartitions partitions.
     * @param {number} numPartitions
     * @returns {PairDStream}
     */
    PairDStream.prototype.repartition = function (numPartitions) {
        var javaObject = this.getJavaObject().repartition(numPartitions);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {Time} validTime
     * @returns {JavaPairRDD}
     */
    PairDStream.prototype.compute = function (validTime) {
        var validTime_uw = Utils.unwrapObject(validTime);
        var javaObject = this.getJavaObject().compute(validTime_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream which is computed based on windowed batches of this DStream.
     * @param {Duration} windowDuration  duration (i.e., width) of the window;
     *                   must be a multiple of this DStream's interval
     * @param {Duration} [slideDuration]   sliding interval of the window (i.e., the interval after which
     *                   the new DStream will generate RDDs); must be a multiple of this
     *                   DStream's interval
     * @returns {PairDStream}
     */
    PairDStream.prototype.window = function (windowDuration, slideDuration) {
        var windowDuration_uw = Utils.unwrapObject(windowDuration);
        var slideDuration_uw = Utils.unwrapObject(slideDuration);

        if (arguments[1]) {
            var javaObject = this.getJavaObject().window(windowDuration_uw, slideDuration_uw);
            return Utils.javaToJs(javaObject);
        } else {
            var javaObject = this.getJavaObject().window(windowDuration_uw);
            return Utils.javaToJs(javaObject);
        }
    };


    /**
     * Return a new DStream by unifying data of another DStream with this DStream.
     * @param {PairDStream} that  Another DStream having the same interval (i.e., slideDuration) as this DStream.
     * @returns {PairDStream}
     */
    PairDStream.prototype.union = function (that) {
        var that_uw = Utils.unwrapObject(that);
        var javaObject = this.getJavaObject().union(that_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream by applying `groupByKey` to each RDD. Hash partitioning is used to
     * generate the RDDs with Spark's default number of partitions.
     * @returns {PairDStream}
     */
    PairDStream.prototype.groupByKey = function () {
        var javaObject = this.getJavaObject().groupByKey();
        return Utils.javaToJs(javaObject);
    };


    /**
     * Combine elements of each key in DStream's RDDs using custom function. This is similar to the
     * combineByKey for RDDs. Please refer to combineByKey in
     * org.apache.spark.rdd.PairRDDFunctions for more information.
     * @param {func} createCombiner
     * @param {func} mergeValue
     * @param {func} mergeCombiners
     * @param {Partitioner} partitioner
     * @param {boolean} [mapSideCombine]
     * @returns {PairDStream}
     */
    PairDStream.prototype.combineByKey = function (createCombiner, mergeValue, mergeCombiners, partitioner, mapSideCombine, bindArgs) {
        var fn = Utils.createLambdaFunction(createCombiner, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        var fn2 = Utils.createLambdaFunction(mergeValue, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var fn3 = Utils.createLambdaFunction(mergeCombiners, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var partitioner_uw = Utils.unwrapObject(partitioner);

        if (arguments[4]) {
            var javaObject = this.getJavaObject().combineByKey(fn, fn2, fn3, partitioner_uw, mapSideCombine);
            return Utils.javaToJs(javaObject);
        } else {
            var javaObject = this.getJavaObject().combineByKey(fn, fn2, fn3, partitioner_uw);
            return Utils.javaToJs(javaObject);
        }
    };
    /**
     * Return a new DStream by applying `reduceByKey` to each RDD. The values for each key are
     * merged using the associative reduce function. Hash partitioning is used to generate the RDDs
     * with Spark's default number of partitions.
     * @param {func} func
     * @returns {PairDStream}
     */
    PairDStream.prototype.reduceByKey = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().reduceByKey(fn);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Create a new DStream by applying `reduceByKey` over a sliding window on `this` DStream.
     * Similar to `DStream.reduceByKey()`, but applies it over a sliding window. The new DStream
     * generates RDDs with the same interval as this DStream. Hash partitioning is used to generate
     * the RDDs with Spark's default number of partitions.
     * @param {func} reduceFunc  associative reduce function
     * @param {Duration} windowDuration  width of the window; must be a multiple of this DStream's
     *                       batching interval
     * @returns {PairDStream}
     */
    PairDStream.prototype.reduceByKeyAndWindow = function (reduceFunc, windowDuration, bindArgs) {
        var fn = Utils.createLambdaFunction(reduceFunc, org.eclairjs.nashorn.JSFunction2, this.context().sparkContext(), bindArgs);
        var windowDuration_uw = Utils.unwrapObject(windowDuration);
        var javaObject = this.getJavaObject().reduceByKeyAndWindow(fn, windowDuration_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Return a new DStream by applying a map function to the value of each key-value pairs in
     * 'this' DStream without changing the key.
     * @param {func} f
     * @returns {PairDStream}
     */
    PairDStream.prototype.mapValues = function (f, bindArgs) {
        var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().mapValues(fn);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return a new DStream by applying a flatmap function to the value of each key-value pairs in
     * 'this' DStream without changing the key.
     * @param {func} f
     * @returns {PairDStream}
     */
    PairDStream.prototype.flatMapValues = function (f, bindArgs) {
        var fn = Utils.createLambdaFunction(f, org.eclairjs.nashorn.JSFunction, this.context().sparkContext(), bindArgs);
        var javaObject = this.getJavaObject().flatMapValues(fn);
        return Utils.javaToJs(javaObject);
    };

    module.exports = PairDStream;

})();