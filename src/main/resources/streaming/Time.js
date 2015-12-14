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

var JavaTime = Java.type("org.apache.spark.streaming.Time");
/**
 * @constructor
 * @classdesc Time of time to wait.
 * @param {long} millis
 */
var Time = function(millis) {
	var jvmObj = new JavaTime(millis);
	this.logger = Logger.getLogger("streaming.Time_js");
	JavaWrapper.call(this, jvmObj);
};

Time.prototype = Object.create(JavaWrapper.prototype);

Time.prototype.constructor = Time;
/**
 *
 * @param {Duration} that
 * @param {Duration} zeroTime (optional)
 * @returns {Time}
 */
Time.prototype.floor = function(that, zeroTime) {
    if(arguments.length == 2) {
        return this.getJavaObject().floor(Utils.unwrapObject(that),
                                          Utils.unwrapObject(zeroTime));
    } else {
        return this.getJavaObject().floor(Utils.unwrapObject(that));
    }
};
/**
 *
 * @param {Time} that
 * @returns {boolean}
 */
Time.prototype.greater = function(that) {
    return this.getJavaObject().greater(Utils.unwrapObject(that));
};
/**
 *
 * @param {Time} that
 * @returns {boolean}
 */
Time.prototype.greaterEq = function(that) {
    return this.getJavaObject().greaterEq(Utils.unwrapObject(that));
};
/**
 *
 * @param {Duration} that
 * @returns {boolean}
 */
Time.prototype.isMultipleOf = function(that) {
    return this.getJavaObject().isMultipleOf(Utils.unwrapObject(that));
};
/**
 *
 * @param {Time} that
 * @returns {boolean}
 */
Time.prototype.less = function(that) {
    return this.getJavaObject().less(Utils.unwrapObject(that));
};
/**
 *
 * @param {Time} that
 * @returns {boolean}
 */
Time.prototype.lessEq = function(that) {
    return this.getJavaObject().lessEq(Utils.unwrapObject(that));
};
/**
 *
 * @param {Time} that
 * @returns {Time}
 */
Time.prototype.max = function(that) {
    var d = this.getJavaObject().max(Utils.unwrapObject(that));
    return new Time(d);
};
/**
 *
 * @returns {long}
 */
Time.prototype.milliseconds = function() {
    return this.getJavaObject().milliseconds();
};
/**
 * @param {Time} that
 * @returns {Time}
 */
Time.prototype.min = function(that) {
    var d = this.getJavaObject().min(Utils.unwrapObject(that));
    return new Time(d);
};
/**
 *
 * @param {Duration | Time} that
 * @returns {Time}
 */
Time.prototype.minus = function(that) {
    if(that instanceof Time) {
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
Time.prototype.ordering = function() {
    return this.getJavaObject().ordering();
}
/**
 *
 * @param {Duration} that
 * @returns {Time}
 */
Time.prototype.plus = function(that) {
    var d = this.getJavaObject().plus(Utils.unwrapObject(that));
    return new Time(d);
};
/**
 *
 * @param {Time} that
 * @param {Duration} interval
 * @returns {scala.collection.seq<Time>}
 */
Time.prototype.to = function(that, interval) {
    return this.getJavaObject().to(that.getJavaObject(),
                                   interval.getJavaObject());
}
/**
 *
 * @returns {String}
 */
Time.prototype.toString = function() {
    return this.getJavaObject().toString();
};
/**
 *
 * @param {Time} that
 * @param {Duration} interval
 * @returns {scala.collection.Seq<Time>}
 */
Time.prototype.until = function(that, interval) {
    return this.getJavaObject().until(that.getJavaObject(),
                                      interval.getJavaObject());
}