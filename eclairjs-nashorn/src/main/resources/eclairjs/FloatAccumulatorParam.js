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
    var logger = Logger.getLogger("FloatAccumulatorParam_js");

    /**
     * @constructor
     * @memberof module:eclairjs
     * @extends module:eclairjs.AccumulableParam
     */
    var FloatAccumulatorParam = function () {
        logger.debug("constructor");
        var jvmObject;
        if (arguments.length == 1) {
            jvmObject = arguments[0]
        } else {
            /*
             * Note nashorn converts a JavaScript Float to a Java Double.
             */
            jvmObject = new org.apache.spark.AccumulatorParam.DoubleAccumulatorParam$();
        }

        AccumulableParam.call(this, jvmObject);

    }

    FloatAccumulatorParam.prototype = Object.create(AccumulableParam.prototype);

    FloatAccumulatorParam.prototype.constructor = FloatAccumulatorParam;

    FloatAccumulatorParam.prototype.convert = function (t1) {
        print("convert " + t1)
        return parseFloat(t1);
    }

    module.exports = FloatAccumulatorParam;

})();
