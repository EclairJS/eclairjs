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
    var Vector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vector');
    /**
     * A sparse vector represented by an index array and an value array.
     *
     * @param size size of the vector.
     * @param indices index array, assume to be strictly increasing.
     * @param values value array, must have the same length as the index array.
     * @classdesc
     */


    /**
     * @param {number} size
     * @param {number[]} indices
     * @param {number[]} values
     * @class
     * @memberof module:eclairjs/mllib/linalg
     * @extends Vector
     */
    var SparseVector = function () {

        this.logger = Logger.getLogger("SparseVector_js");
        var jvmObj;
        if (arguments[0] instanceof org.apache.spark.mllib.linalg.SparseVector) {
            jvmObj = arguments[0];
        } else {
            jvmObj = new org.apache.spark.mllib.linalg.SparseVector(arguments);

        }
        Vector.call(this, jvmObj);

    };

    SparseVector.prototype = Object.create(Vector.prototype);

    SparseVector.prototype.constructor = SparseVector;


    /**
     * @param {SparseVector} sv
     * @returns {Tuple3}
     */
    SparseVector.unapply = function (sv) {
        throw "not implemented by ElairJS";
        //   var sv_uw = Utils.unwrapObject(sv);
        //   var javaObject =  org.apache.spark.mllib.linalg.SparseVector.unapply(sv_uw);
        //   return new Tuple3(javaObject);
    };


    module.exports = SparseVector;

})();

