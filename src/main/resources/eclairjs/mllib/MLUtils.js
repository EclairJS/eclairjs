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
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    /**
     * @class
     * @memberof module:eclairjs/mllib
     */
    var MLUtils = {};

    MLUtils.loadLibSVMFile = function (sc,
                                       path,
                                       numFeatures,
                                       minPartitions,
                                       multiclass) {
        if (arguments.length == 2) {
            return new RDD(org.apache.spark.mllib.util.MLUtils.loadLibSVMFile(
                sc.getJavaObject().sc(),
                path).toJavaRDD()
            );
        }
    }

    /**
     * Returns a new vector with 1.0 (bias) appended to the input vector.
     * @param {Vector} vector
     */
    MLUtils.appendBias = function (vector) {
        return new Utils.javaToJs(org.apache.spark.mllib.util.MLUtils.appendBias(Utils.unwrapObject(vector)));
    }

    module.exports = MLUtils;

})();