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
(function() {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     *
     * @constructor
     * @memberof module:eclairjs/mllib/linalg
     */
    var Vectors = function () {
        //var jvmObject = new org.apache.spark.mllib.linalg.SparseVector(size,indices,values);
        this.logger = Logger.getLogger("Vectors_js");
        //Vector.call(this, jvmObject);

    };

    //
    // static methods
    //

    /**
     * Creates a dense vector from its values.
     * @param {number} firstValue
     * @param {...number} otherValues
     * @returns {Vector}
     */
    Vectors.densewithOtherValues = function (firstValue, otherValues) {
        throw "not implemented by ElairJS";
    // // TODO: handle repeated parm 'otherValues'
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.dense(firstValue,otherValues);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Creates a dense vector from a double array.
     * @param {float[]} values
     * @returns {Vector}
     */
    Vectors.dense = function (values) {
        var javaObject = org.apache.spark.mllib.linalg.Vectors.dense(values);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Creates a sparse vector providing its index array and value array.
     *
     * @param {number} size  vector size.
     * @param {number[]} indices  index array, must be strictly increasing.
     * @param {number[]} values  value array, must have the same length as indices.
     * @returns {Vector}
     */
    Vectors.sparse0 = function (size, indices, values) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,indices,values);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Creates a sparse vector using unordered (index, value) pairs.
     *
     * @param {number} size  vector size.
     * @param {Tuple2[]} elements  vector elements in (index, value) pairs.
     * @returns {Vector}
     */
    Vectors.sparse1 = function (size, elements) {
        throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'elements'
    //   var elements_uw = Utils.unwrapObject(elements);
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,elements_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Creates a sparse vector using unordered (index, value) pairs in a Java friendly way.
     *
     * @param {number} size  vector size.
     * @param {JavaIterable} elements  vector elements in (index, value) pairs.
     * @returns {Vector}
     */
    Vectors.sparse2 = function (size, elements) {
        throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'elements'
    //   var elements_uw = Utils.unwrapObject(elements);
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,elements_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Creates a vector of all zeros.
     *
     * @param {number} size  vector size
     * @returns {Vector}  a zero vector
     */
    Vectors.zeros = function (size) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.zeros(size);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Parses a string resulted from [[Vector.toString]] into a {@link Vector}.
     * @param {string} s
     * @returns {Vector}
     */
    Vectors.parse = function (s) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.parse(s);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Parses the JSON representation of a vector into a {@link Vector}.
     * @param {string} json
     * @returns {Vector}
     */
    Vectors.fromJson = function (json) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.fromJson(json);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Returns the p-norm of this vector.
     * @param {Vector} vector  input vector.
     * @param {number} p  norm.
     * @returns {number}  norm in L^p^ space.
     */
    Vectors.norm = function (vector, p) {
        throw "not implemented by ElairJS";
    //   var vector_uw = Utils.unwrapObject(vector);
    //   return  org.apache.spark.mllib.linalg.Vectors.norm(vector_uw,p);
    };


    /**
     * Returns the squared distance between two Vectors.
     * @param {Vector} v1  first Vector.
     * @param {Vector} v2  second Vector.
     * @returns {number}  squared distance between two Vectors.
     */
    Vectors.sqdist = function (v1, v2) {
        throw "not implemented by ElairJS";
    //   var v1_uw = Utils.unwrapObject(v1);
    //   var v2_uw = Utils.unwrapObject(v2);
    //   return  org.apache.spark.mllib.linalg.Vectors.sqdist(v1_uw,v2_uw);
    };


    module.exports = Vectors;


})();
