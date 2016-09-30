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
    //
    //var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    //var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    //var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     *
     * @constructor Vectors
     * @memberof module:eclairjs/mllib/linalg
     */
    var Vectors = Java.type('org.eclairjs.nashorn.wrap.mllib.linalg.Vectors');
    //var Vectors = function () {
    //    this.logger = Logger.getLogger("Vectors_js");
    //    /*
    //    var jvmObject;
    //    if (!jvmObj) {
    //        jvmObject = new org.apache.spark.mllib.linalg.Vectors();
    //    }
    //    JavaWrapper.call(this, jvmObject);
    //    */
    //
    //};

    //
    // static methods
    //

    /**
     * Creates a dense vector from a double array.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#dense
     * @param {...float} values Array of floats or float1, ....., floatN
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    //Vectors.dense = function () {
    //    var args = arguments[0];
    //    if (!(Array.isArray(args))) {
    //        args = Array.prototype.slice.call(arguments);
    //    }
    //    var javaObject = org.apache.spark.mllib.linalg.Vectors.dense(args);
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Creates a sparse vector providing its index array and value array.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#sparse
     * @param {integer} size  vector size.
     * @param {integer[]} indices  index array, must be strictly increasing.
     * @param {float[]} values  value array, must have the same length as indices.
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    //Vectors.sparse = function (size, indices, values) {
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,indices,values);
    //   return Utils.javaToJs(javaObject);
    //};

    /**
     * Creates a vector of all zeros.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#zeros
     * @param {integer} size  vector size
     * @returns {module:eclairjs/mllib/linalg.Vector}  a zero vector
     */
    //Vectors.zeros = function (size) {
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.zeros(size);
    //   return Utils.javaToJs(javaObject);
    //};


    /**
     *  Parses a string resulted from [[Vector.toString]] into a {@link module:eclairjs/mllib/linalg.Vector}.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#parse
     * @param {string} s
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    //Vectors.parse = function (s) {
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.parse(s);
    //   return Utils.javaToJs(javaObject);
    //};


    /**
     * Parses the JSON representation of a vector into a {@link module:eclairjs/mllib/linalg.Vector}.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#fromJson
     * @param {string} json
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    //Vectors.fromJson = function (json) {
    //   var javaObject =  org.apache.spark.mllib.linalg.Vectors.fromJson(json);
    //   return Utils.javaToJs(javaObject);
    //};


    /**
     * Returns the p-norm of this vector.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#norm
     * @param {module:eclairjs/mllib/linalg.Vector} vector  input vector.
     * @param {float} p  norm.
     * @returns {float}  norm in L^p^ space.
     */
    //Vectors.norm = function (vector, p) {
    //   var vector_uw = Utils.unwrapObject(vector);
    //   return  org.apache.spark.mllib.linalg.Vectors.norm(vector_uw,p);
    //};


    /**
     * Returns the squared distance between two Vectors.
     * @function
     * @name module:eclairjs/mllib/linalg.Vectors#sqdist
     * @param {module:eclairjs/mllib/linalg.Vector} v1  first Vector.
     * @param {module:eclairjs/mllib/linalg.Vector} v2  second Vector.
     * @returns {float}  squared distance between two Vectors.
     */
    //Vectors.sqdist = function (v1, v2) {
    //   var v1_uw = Utils.unwrapObject(v1);
    //   var v2_uw = Utils.unwrapObject(v2);
    //   return  org.apache.spark.mllib.linalg.Vectors.sqdist(v1_uw,v2_uw);
    //};


    module.exports = Vectors;


})();
