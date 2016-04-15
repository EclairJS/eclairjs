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
    var AccumulableParam = require(EclairJS_Globals.NAMESPACE + '/AccumulableParam');

    /**
     * @constructor
     * @memberof module:eclairjs
     * @augments AccumulableParam
     */
    var IntAccumulatorParam = function () {
        this.logger = Logger.getLogger("IntAccumulatorParam_js");
        this.logger.debug("constructor");
        var jvmObject;
        if (arguments.length == 1) {
            jvmObject = arguments[0]
        } else {
            jvmObject = new org.apache.spark.AccumulatorParam.IntAccumulatorParam$();
        }

        AccumulableParam.call(this, jvmObject);

    }

    IntAccumulatorParam.prototype = Object.create(AccumulableParam.prototype);

    IntAccumulatorParam.prototype.constructor = IntAccumulatorParam;

    module.exports = IntAccumulatorParam;

})();
