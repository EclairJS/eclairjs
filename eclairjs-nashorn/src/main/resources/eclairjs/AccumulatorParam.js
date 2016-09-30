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
     * A simpler version of {@link AccumulableParam} where the only data type you can add
     * in is the same type as the accumulated value. An implicit AccumulatorParam object needs to be
     * available when you create Accumulators of a specific type.
     *
     * @classdesc
     * @constructor
     * @memberof module:eclairjs
     * @private
     */


    var AccumulatorParam = function (jvmObject) {
        JavaWrapper.call(this, jvmObject);
    }

    AccumulatorParam.prototype = Object.create(JavaWrapper.prototype);

    AccumulatorParam.prototype.constructor = AccumulatorParam;


    /**
     * @private
     */
    AccumulatorParam.prototype.init = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().$init$();
//   return new ??(javaObject);
    }


    /**
     * @param {object}
     * @param {object}
     * @returns {object}
     */
    AccumulatorParam.prototype.addAccumulator = function (t1, t2) {
        var t1_uw = Utils.unwrapObject(t1);
        var t2_uw = Utils.unwrapObject(t2);
        var javaObject = this.getJavaObject().addAccumulator(t1_uw, t2_uw);
        return Utils.javaToJs(javaObject);
    }

    module.exports = AccumulatorParam;

})();
