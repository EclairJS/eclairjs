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

var JavaDuration = Java.type("org.apache.spark.streaming.Duration");

var Duration = function(millis) { 
	var jvmObj = new JavaDuration(millis);
	this.logger = Logger.getLogger("streaming.Duration_js");
	JavaWrapper.call(this, jvmObj);
};

Duration.prototype = Object.create(JavaWrapper.prototype); 

Duration.prototype.constructor = Duration;

Duration.prototype.getJavaObject = function() {
    return this.jDuration;
};

Duration.prototype.div = function(that) {
    return this.jDuration.div(that.getJavaObject());
};

Duration.prototype.greater = function(that) {
    return JDuration.greater(that.getJavaObject());
};

Duration.prototype.greaterEq = function(that) {
    return JDuration.greaterEq(that.getJavaObject());
};

Duration.prototype.isMultipleOf = function(that) {
    return JDuration.isMultipleOf(that.getJavaObject());
};

Duration.prototype.isZero = function() {
    return this.jDuration.isZero();
};

Duration.prototype.less = function(that) {
    return this.jDuration.less(that.getJavaObject());
};

Duration.prototype.lessEq = function(that) {
    return this.jDuration.lessEq(that.getJavaObject());
};

Duration.prototype.max = function(that) {
    var d = this.jDuration.max(that.getJavaObject());
    return new Duration(d);
};

Duration.prototype.milliseconds = function() {
    return this.jDuration.milliseconds();
};

Duration.prototype.min = function() {
    var d = this.jDuration.min();
    return new Duration(d);
};

Duration.prototype.minus = function() {
    var d = this.jDuration.minus();
    return new Duration(d);
};

Duration.prototype.plus = function() {
    var d = this.jDuration.plus();
    return new Duration(d);
};

Duration.prototype.times = function() {
    var d = this.jDuration.times();
    return new Duration(d);
};
