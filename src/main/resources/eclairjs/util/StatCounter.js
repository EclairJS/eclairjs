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


    /**
     * @classdesc
     * A class for tracking the statistics of a set of numbers (count, mean and variance) in a
     * numerically robust way. Includes support for merging two StatCounters. Based on Welford
     * and Chan's [[http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance algorithms]]
     * for running variance.
     *
     * @class
     * @memberof module:eclairjs/util
     */
    var StatCounter = function (javaObj) {
        var jvmObject;
        if (javaObj instanceof org.apache.spark.util.StatCounter) {
            jvmObject = javaObj;
        } else {
            jvmObject = new org.apache.spark.util.StatCounter();
        }
        this.logger = Logger.getLogger("util_StatCounter_js");
        JavaWrapper.call(this, jvmObject);

    };

    StatCounter.prototype = Object.create(JavaWrapper.prototype);

    StatCounter.prototype.constructor = StatCounter;


    /**
     *  Add a value into this StatCounter, updating the internal statistics.
     * @param {float | module:eclairjs/util.StatCounter} value
     * @returns {module:eclairjs/util.StatCounter}
     */
    StatCounter.prototype.merge = function (value) {
        var javaObject = this.getJavaObject().merge(Utils.unwrapObject(value));
        return new StatCounter(javaObject);
    };

    /**
     *  Clone this StatCounter
     * @returns {module:eclairjs/util.StatCounter}
     */
    StatCounter.prototype.copy = function () {
        var javaObject = this.getJavaObject().copy();
        return new StatCounter(javaObject);
    };


    /**
     * @returns {integer}
     */
    StatCounter.prototype.count = function () {
        return this.getJavaObject().count();
    };


    /**
     * @returns {number}
     */
    StatCounter.prototype.mean = function () {
        return this.getJavaObject().mean();
    };


    /**
     * @returns {number}
     */
    StatCounter.prototype.sum = function () {
        return this.getJavaObject().sum();
    };


    /**
     * @returns {number}
     */
    StatCounter.prototype.max = function () {
        return this.getJavaObject().max();
    };


    /**
     * @returns {number}
     */
    StatCounter.prototype.min = function () {
        return this.getJavaObject().min();
    };


    /**
     *  Return the variance of the values.
     * @returns {number}
     */
    StatCounter.prototype.variance = function () {
        return this.getJavaObject().variance();
    };


    /**
     * Return the sample variance, which corrects for bias in estimating the variance by dividing
     * by N-1 instead of N.
     * @returns {number}
     */
    StatCounter.prototype.sampleVariance = function () {
        return this.getJavaObject().sampleVariance();
    };


    /**
     *  Return the standard deviation of the values.
     * @returns {number}
     */
    StatCounter.prototype.stdev = function () {
        return this.getJavaObject().stdev();
    };


    /**
     * Return the sample standard deviation of the values, which corrects for bias in estimating the
     * variance by dividing by N-1 instead of N.
     * @returns {number}
     */
    StatCounter.prototype.sampleStdev = function () {
        return this.getJavaObject().sampleStdev();
    };


    /**
     * @returns {string}
     */
    StatCounter.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    //
    // static methods
    //


    /**
     *  Build a StatCounter from a list of values passed as variable-length arguments.
     * @param {...number} values
     * @returns {module:eclairjs/util.StatCounter}
     */
    StatCounter.apply = function (values) {
        var javaObject = org.apache.spark.util.StatCounter.apply(values);
        return new StatCounter(javaObject);
    };

    module.exports = StatCounter;
})();