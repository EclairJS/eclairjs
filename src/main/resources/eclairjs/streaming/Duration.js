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

    var JavaDuration = Java.type("org.apache.spark.streaming.Duration");

    /**
     * @constructor
     * @memberof module:eclairjs/streaming
     * @classdesc Duration of time to wait.
     * @param {long} millis
     */
    var Duration = function (millis) {
        var jvmObj = new JavaDuration(millis);
        this.logger = Logger.getLogger("streaming.Duration_js");
        JavaWrapper.call(this, jvmObj);
    };

    Duration.prototype = Object.create(JavaWrapper.prototype);

    Duration.prototype.constructor = Duration;
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {double}
     */
    Duration.prototype.div = function (that) {
        return this.getJavaObject().div(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {boolean}
     */
    Duration.prototype.greater = function (that) {
        return this.getJavaObject().greater(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {boolean}
     */
    Duration.prototype.greaterEq = function (that) {
        return this.getJavaObject().greaterEq(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {boolean}
     */
    Duration.prototype.isMultipleOf = function (that) {
        return this.getJavaObject().isMultipleOf(Utils.unwrapObject(that));
    };
    /**
     * @returns {boolean}
     */
    Duration.prototype.isZero = function () {
        return this.getJavaObject().isZero();
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {boolean}
     */
    Duration.prototype.less = function (that) {
        return this.getJavaObject().less(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {boolean}
     */
    Duration.prototype.lessEq = function (that) {
        return this.getJavaObject().lessEq(Utils.unwrapObject(that));
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {module:eclairjs/streaming.Duration}
     */
    Duration.prototype.max = function (that) {
        var d = this.getJavaObject().max(Utils.unwrapObject(that));
        return new Duration(d);
    };
    /**
     *
     * @returns {long}
     */
    Duration.prototype.milliseconds = function () {
        return this.getJavaObject().milliseconds();
    };
    /**
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {module:eclairjs/streaming.Duration}
     */
    Duration.prototype.min = function (that) {
        var d = this.getJavaObject().min(Utils.unwrapObject(that));
        return new Duration(d);
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {module:eclairjs/streaming.Duration}
     */
    Duration.prototype.minus = function (that) {
        var d = this.getJavaObject().minus(Utils.unwrapObject(that));
        return new Duration(d);
    };
    /**
     *
     * @param {module:eclairjs/streaming.Duration} that
     * @returns {module:eclairjs/streaming.Duration}
     */
    Duration.prototype.plus = function (that) {
        var d = this.getJavaObject().plus(Utils.unwrapObject(that));
        return new Duration(d);
    };
    /**
     *
     * @param {integer} times
     * @returns {module:eclairjs/streaming.Duration}
     */
    Duration.prototype.times = function (times) {
        var d = this.getJavaObject().times();
        return new Duration(d);
    };

    module.exports = Duration;

})();