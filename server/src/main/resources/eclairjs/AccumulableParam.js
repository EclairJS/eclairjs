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
     * Helper object defining how to accumulate values of a particular type. An implicit
     * AccumulableParam needs to be available when you create {@link Accumulable}s of a specific type.
     *
     * @classdesc
     * @constructor
     * @memberof module:eclairjs
     */


    var AccumulableParam = function (jvmObject) {
        JavaWrapper.call(this, jvmObject);
    }

    AccumulableParam.prototype = Object.create(JavaWrapper.prototype);

    AccumulableParam.prototype.constructor = AccumulableParam;


    /**
     * Add additional data to the accumulator value. Is allowed to modify and return `r`
     * for efficiency (to avoid allocating objects).
     *
     * @param {object} r  the current value of the accumulator
     * @param {object} t  the data to be added to the accumulator
     * @returns {object}  the new value of the accumulator
     */
    AccumulableParam.prototype.addAccumulator = function (r, t) {
        var r_uw = Utils.unwrapObject(r);
        var t_uw = Utils.unwrapObject(t);
        var javaObject = this.getJavaObject().addAccumulator(r_uw, t_uw);
        return Utils.javaToJs(javaObject);
    }


    /**
     * Merge two accumulated values together. Is allowed to modify and return the first value
     * for efficiency (to avoid allocating objects).
     *
     * @param {object} r1  one set of accumulated data
     * @param {object} r2  another set of accumulated data
     * @returns {object}  both data sets merged together
     */
    AccumulableParam.prototype.addInPlace = function (r1, r2) {
        var r1_uw = Utils.unwrapObject(r1);
        var r2_uw = Utils.unwrapObject(r2);
        var javaObject = this.getJavaObject().addInPlace(r1_uw, r2_uw);
        return Utils.javaToJs(javaObject);
    }


    /**
     * Return the "zero" (identity) value for an accumulator type, given its initial value. For
     * example, if R was a vector of N dimensions, this would return a vector of N zeroes.
     * @param {object}
     * @returns {object}
     */
    AccumulableParam.prototype.zero = function (initialValue) {
        var initialValue_uw = Utils.unwrapObject(initialValue);
        var javaObject = this.getJavaObject().zero(initialValue_uw);
        return Utils.javaToJs(javaObject);
    }


    module.exports = AccumulableParam;

})();
