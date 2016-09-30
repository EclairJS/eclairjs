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

    var JavaTime = Java.type("org.apache.spark.streaming.Time");
    var logger = Logger.getLogger("streaming.Time_js");

    /**
     * @constructor
     * @memberof module:eclairjs/streaming
     * @classdesc Time of time to wait.
     * @param {long} millis
     */
    var Time = function (millis) {
        var jvmObj = new JavaTime(millis);
        JavaWrapper.call(this, jvmObj);
    };

    Time.prototype = Object.create(JavaWrapper.prototype);

    Time.prototype.constructor = Time;
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @param {module:eclairjs/streaming.Duration} [zeroTime]
     * @returns {module:eclairjs/streaming.Time}
     */
    Time.prototype.floor = function (that, zeroTime) {
        if (arguments.length == 2) {
            return this.getJavaObject().floor(Utils.unwrapObject(that),
                Utils.unwrapObject(zeroTime));
        } else {
            return this.getJavaObject().floor(Utils.unwrapObject(that));
        }
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @returns {boolean}
     */
    Time.prototype.greater = function (that) {
        return this.getJavaObject().greater(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @returns {boolean}
     */
    Time.prototype.greaterEq = function (that) {
        return this.getJavaObject().greaterEq(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {boolean}
     */
    Time.prototype.isMultipleOf = function (that) {
        return this.getJavaObject().isMultipleOf(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @returns {boolean}
     */
    Time.prototype.less = function (that) {
        return this.getJavaObject().less(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @returns {boolean}
     */
    Time.prototype.lessEq = function (that) {
        return this.getJavaObject().lessEq(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @returns {module:eclairjs/streaming.Time}
     */
    Time.prototype.max = function (that) {
        var d = this.getJavaObject().max(Utils.unwrapObject(that));
        return new Time(d);
    };
    /**
     *
     * @returns {long}
     */
    Time.prototype.milliseconds = function () {
        return this.getJavaObject().milliseconds();
    };
    /**
     * @param {module:eclairjs/streaming.Time} that
     * @returns {module:eclairjs/streaming.Time}
     */
    Time.prototype.min = function (that) {
        var d = this.getJavaObject().min(Utils.unwrapObject(that));
        return new Time(d);
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration | Time} that
     * @returns {module:eclairjs/streaming.Time}
     */
    Time.prototype.minus = function (that) {
        if (that instanceof Time) {
            var d = this.getJavaObject().minus(Utils.unwrapObject(that));
            return new Time(d);
        } else {
            var d = this.getJavaObject().minus(Utils.unwrapObject(that));
            return new Time(d);
        }
    }
    /**
     * @returns {scala.math.Ordering<Time>}
     */
    Time.prototype.ordering = function () {
        return this.getJavaObject().ordering();
    }
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {module:eclairjs/streaming.Time}
     */
    Time.prototype.plus = function (that) {
        var d = this.getJavaObject().plus(Utils.unwrapObject(that));
        return new Time(d);
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @param {module:eclairjs/streaming.Duration} interval
     * @returns {scala.collection.seq<Time>}
     */
    Time.prototype.to = function (that, interval) {
        return this.getJavaObject().to(that.getJavaObject(),
            interval.getJavaObject());
    }
    /**
     *
     * @returns {String}
     */
    Time.prototype.toString = function () {
        return this.getJavaObject().toString();
    };
    /**
     *
     * @param {module:eclairjs/streaming.Time} that
     * @param {module:eclairjs/streaming.Duration} interval
     * @returns {scala.collection.Seq<Time>}
     */
    Time.prototype.until = function (that, interval) {
        return this.getJavaObject().until(that.getJavaObject(),
            interval.getJavaObject());
    }
    module.exports = Time;

})();