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
     * Builder for a param grid used in grid search-based model selection.
     * @class
     * @memberof module:eclairjs/ml/tuning
     */

    var ParamGridBuilder = function () {
        var jvmObject = new org.apache.spark.ml.tuning.ParamGridBuilder();
        this.logger = Logger.getLogger("ml_tuning_ParamGridBuilder_js");
        JavaWrapper.call(this, jvmObject);

    };

    ParamGridBuilder.prototype = Object.create(JavaWrapper.prototype);

    ParamGridBuilder.prototype.constructor = ParamGridBuilder;


    /**
     * Sets the given parameters in this grid to fixed values.
     * @param {...module:eclairjs/ml/param.ParamPair | module:eclairjs/ml/param.ParamMap} paramPairs or paramMap
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder}
     */
    ParamGridBuilder.prototype.baseOn = function () {
        var ParamMap = require(EclairJS_Globals.NAMESPACE + '/ml/param/ParamPair');
        var values;
        if (arguments[0] instanceof ParamMap) {
            // ParamMap
            values = Utils.unwrapObject(arguments[0]);
        } else {
            // .. ParamPair
            var args = Array.prototype.slice.call(arguments);
            values = Utils.unwrapObject(args);
        }
        var javaObject = this.getJavaObject().baseOn(values);
        return new ParamGridBuilder(javaObject);
    };


    /**
     * Adds a param with multiple values (overwrites if the input param exists).
     * @param {module:eclairjs/ml/param.Param} param
     * @param {number[]} [values] Optional only if argument one is {@link module:eclairjs/ml/param.BooleanParam}
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder}
     */
    ParamGridBuilder.prototype.addGrid = function (param, values) {
        var BooleanParam = require(EclairJS_Globals.NAMESPACE + '/ml/param/BooleanParam');
        var param_uw = Utils.unwrapObject(param);
        var javaObject;
        if (param instanceof BooleanParam) {
            javaObject = this.getJavaObject().addGrid(param_uw);
        } else {
            var values_uw = Utils.unwrapObject(values);
            javaObject = this.getJavaObject().addGrid(param_uw, values_uw);
        }

        return new ParamGridBuilder(javaObject);
    };


    /**
     * Builds and returns all combinations of parameters specified by the param grid.
     * @returns {module:eclairjs/ml/param.ParamMap[]}
     */
    ParamGridBuilder.prototype.build = function () {
        var javaObject = this.getJavaObject().build();
        return Utils.javaToJs(javaObject);
    };

    module.exports = ParamGridBuilder;
})();