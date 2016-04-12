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
     * Class used to compute the gradient for a loss function, given a single data point.
     * @class
     * @memberof module:eclairjs/mllib/optimization
     * @constructor
     */
    var Gradient = function () {
        this.logger = Logger.getLogger("Gradient_js");
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.optimization.Gradient) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.optimization.Gradient();
        }

        JavaWrapper.call(this, jvmObject);

    };

    Gradient.prototype = Object.create(JavaWrapper.prototype);

    Gradient.prototype.constructor = Gradient;

    /**
     * Compute the gradient and loss given the features of a single data point.
     * @param {Vector} data
     * @param {float} label
     * @param {Vector} weights
     * @returns {Tuple}
     */
    Gradient.prototype.compute = function (data,label,weights) {
        var data_uw = Utils.unwrapObject(data);
        var weights_uw = Utils.unwrapObject(weights);
        var javaObject = this.getJavaObject().compute(data_uw,label,weights_uw);

        return new Tuple(javaObject);
    };
    
    module.exports = Gradient;

})();
