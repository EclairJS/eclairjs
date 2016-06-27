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
    //var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    //var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    //var Vector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vector');
    /**
     * A dense vector represented by a value array.
     * @classdesc
     */

    /**
     * @param {number[]} values
     * @class DenseVector
     * @memberof module:eclairjs/mllib/linalg
     * @extends module:eclairjs/mllib/linalg.Vector
     */
    var DenseVector = Java.type('org.eclairjs.nashorn.wrap.mllib.linalg.DenseVector');
    //var DenseVector = function (arg) {
    //    this.logger = Logger.getLogger("DenseVector_js");
    //    var jvmObj;
    //    if (Array.isArray(arg)) {
    //        jvmObj = new org.apache.spark.mllib.linalg.DenseVector(arg);
    //    } else {
    //        jvmObj = arg;
    //    }
    //    Vector.call(this, jvmObj);
    //
    //};
    //
    //DenseVector.prototype = Object.create(Vector.prototype);
    //
    //DenseVector.prototype.constructor = DenseVector;

    /**
     * @function
     * @name module:eclairjs/mllib/linalg.DenseVector#values
     * @returns {number[]}
     */
    //DenseVector.unapply = function (dv) {
    //       var dv_uw = Utils.unwrapObject(dv);
    //       return  org.apache.spark.mllib.linalg.DenseVector.unapply(dv_uw);
    //};

    module.exports = DenseVector;

})();
