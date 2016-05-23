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
    var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    /*
     This is the wrapper class for org.apache.spark.api.java.JavaDoubleRDD
     a Java type Double = JavaScript type float thus the name change from
     DoubleRDD to FloatRDD
     */


    /**
     * @classdesc
     * @param {module:eclairjs.RDD} srdd
     * @class
     * @memberof module:eclairjs
     * @extends module:eclairjs.RDD
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
     * @param {module:eclairjs.RDD} rdd
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.wrapRDD = function (rdd) {
        var rdd_uw = Utils.unwrapObject(rdd);
        return new FloatRDD(this.getJavaObject().wrapRDD(rdd_uw));
    };


    /**
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.cache = function () {
        return new FloatRDD(this.getJavaObject().cache());
    };


    /**
     * Set this RDD's storage level to persist its values across operations after the first time
     * it is computed. Can only be called once on each RDD.
     * @param {module:eclairjs/storage.StorageLevel} newLevel
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.persist = function (newLevel) {
        var newLevel_uw = Utils.unwrapObject(newLevel);
        return new FloatRDD(this.getJavaObject().persist(newLevel_uw));
    };


    /**
     * Mark the RDD as non-persistent, and remove all blocks for it from memory and disk.
     *
     * @param {boolean} [blocking]  Whether to block until all blocks are deleted.
     * @returns {module:eclairjs.FloatRDD}
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
     * @returns {module:eclairjs.FloatRDD}
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
     * @param {object[]} [bindArgs]
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.filter = function (func, bindArgs) {
        var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction, this.context, bindArgs);
        var obj = this.getJavaObject().filter(fn);
        return new FloatRDD(obj);
    };


    /**
     * Return a new RDD that is reduced into `numPartitions` partitions.
     * @param {integer} numPartitions
     * @param {boolean} [shuffle]
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.coalesce = function (numPartitions, shuffle) {

        if (arguments[1]) {
            return new FloatRDD(this.getJavaObject().coalesce(numPartitions, shuffle));
        } else {
            return new FloatRDD(this.getJavaObject().coalesce(numPartitions));
        }
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
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.repartition = function (numPartitions) {
        return new FloatRDD(this.getJavaObject().repartition(numPartitions));
    };

    /**
     * Return an RDD with the elements from `this` that are not in `other`.
     * @param {module:eclairjs.FloatRDD} other
     * @param {number} [numPartitions]
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.subtract = function (other, numPartitions) {
        var jvmObj = numPartitions ? this.getJavaObject().subtract(other, numPartitions) : this.getJavaObject().subtract(other);
        return new FloatRDD(jvmObj);
    };

    /**
     * Return a sampled subset of this RDD.
     * @param {boolean} withReplacement
     * @param {float} fraction
     * @param {number} [seed]
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.sample = function (withReplacement, fraction, seed) {
        var jvmObj;
        if (seed) {
            jvmObj = this.getJavaObject().sample(withReplacement, fraction, seed);
        } else {
            jvmObj = this.getJavaObject().sample(withReplacement, fraction);
        }
        return new FloatRDD(jvmObj);
    };


    /**
     * Return the union of this RDD and another one. Any identical elements will appear multiple
     * times (use `.distinct()` to eliminate them).
     * @param {module:eclairjs.FloatRDD} other
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.union = function (other) {
        return new FloatRDD(this.getJavaObject().union(other));
    };


    /**
     * Return the intersection of this RDD and another one. The output will not contain any duplicate
     * elements, even if the input RDDs did.
     *
     * Note that this method performs a shuffle internally.
     * @param {module:eclairjs.FloatRDD} other
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.intersection = function (other) {
        return new FloatRDD(this.getJavaObject().intersection(other));
    };


    /**
     * @returns {float}
     */
    FloatRDD.prototype.sum = function () {
        return this.getJavaObject().sum();
    };


    /**
     * Returns the minimum element from this RDD as defined by
     * the default comparator natural order.
     * @returns {float}  the minimum of the RDD
     */
    FloatRDD.prototype.min = function () {
        return this.getJavaObject().min();
    };


    /**
     * Returns the maximum element from this RDD as defined by
     * the default comparator natural order.
     * @returns {float}  the maximum of the RDD
     */
    FloatRDD.prototype.max = function () {
        return this.getJavaObject().max();
    };


    /**
     * Return a {@link module:eclairjs/util.StatCounter} object that captures the mean, variance and
     * count of the RDD's elements in one operation.
     * @returns {module:eclairjs/util.StatCounter}
     */
    FloatRDD.prototype.stats = function () {
        var javaObject = this.getJavaObject().stats();
        return Utils.javaToJs(javaObject);
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
        return this.getJavaObject().stdev();
    };


    /**
     * Compute the sample standard deviation of this RDD's elements (which corrects for bias in
     * estimating the standard deviation by dividing by N-1 instead of N).
     * @returns {float}
     */
    FloatRDD.prototype.sampleStdev = function () {
        return this.getJavaObject().sampleStdev();
    };


    /**
     * Compute the sample variance of this RDD's elements (which corrects for bias in
     * estimating the standard variance by dividing by N-1 instead of N).
     * @returns {float}
     */
    FloatRDD.prototype.sampleVariance = function () {
        return this.getJavaObject().sampleVariance();
    };


    /**
     * @param {number} timeout
     * @param {float} [confidence]
     * @returns {module:eclairjs/partial.PartialResult}
     */
    FloatRDD.prototype.meanApprox = function (timeout, confidence) {
        var javaObject;
        if (confidence) {
            javaObject = this.getJavaObject().meanApprox(timeout, confidence);
        } else {
            javaObject = this.getJavaObject().meanApprox(timeout);
        }
        return Utils.javaToJs(javaObject)
    };


    /**
     * Approximate operation to return the sum within a timeout.
     * @param {number} timeout
     * @param {float} [confidence]
     * @returns {module:eclairjs/partial.PartialResult}
     */
    FloatRDD.prototype.sumApprox = function (timeout, confidence) {
        var javaObject;
        if (confidence) {
            javaObject = this.getJavaObject().sumApprox(timeout, confidence);
        } else {
            javaObject = this.getJavaObject().sumApprox(timeout);
        }
        return Utils.javaToJs(javaObject)
    };

    /**
     *  Compute a histogram of the data using bucketCount number of buckets evenly
     *  spaced between the minimum and maximum of the RDD. For example if the min
     *  value is 0 and the max is 100 and there are two buckets the resulting
     * @param {float[] | integer} buckets
     * @param {boolean} [evenBuckets]
     * @returns {number[] | Tuple}
     */
    FloatRDD.prototype.histogram = function (buckets, evenBuckets) {
        var javaObj;
        if (Array.isArray(buckets)) {
            javaObj = evenBuckets ? this.getJavaObject().histogram(buckets, evenBuckets) : this.getJavaObject().histogram(buckets);
        } else {
            javaObj = this.getJavaObject().histogram(buckets);
        }
        return Utils.javaToJs(javaObj);
    };


    /**
     * @param {string} name
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.prototype.setName = function (name) {
        return this.getJavaObject().setName(name);
    };
//
// static methods
//


    /**
     * @param {module:eclairjs.RDD} rdd
     * @returns {module:eclairjs.FloatRDD}
     */
    FloatRDD.fromRDD = function (rdd) {
        var rdd_uw = Utils.unwrapObject(rdd);
        return Utils.javaToJs(org.apache.spark.api.java.JavaDoubleRDD.fromRDD(rdd_uw.rdd()));
    };


    /**
     * @param {module:eclairjs.FloatRDD} rdd
     * @returns {module:eclairjs.RDD}
     */
    FloatRDD.toRDD = function (rdd) {
        var javaObject = org.apache.spark.api.java.JavaDoubleRDD.toRDD(rdd);
        return Utils.javaToJs(javaObject);
    };

    module.exports = FloatRDD;

})();