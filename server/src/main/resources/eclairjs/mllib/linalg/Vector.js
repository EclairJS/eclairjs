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
    //var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    /**
     * Represents a numeric vector, whose index type is Int and value type is Double.
     *
     * Note: Users should not implement this interface.
     * @classdesc
     * @constructor Vector
     * @abstract
     * @memberof module:eclairjs/mllib/linalg
     */

    var Vector = Java.type('org.eclairjs.nashorn.wrap.mllib.linalg.DenseVector');
    //var Vector = function (jvmObject) {
    //
    //    this.logger = Logger.getLogger("Vector_js");
    //    JavaWrapper.call(this, jvmObject);
    //
    //};
    //
    //Vector.prototype = Object.create(JavaWrapper.prototype);
    //
    //Vector.prototype.constructor = Vector;



    /**
     * Size of the vector.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#size
     * @returns {integer}
     */
    //Vector.prototype.size = function () {
    //    return this.getJavaObject().size();
    //};


    /**
     * Converts the instance to a double array.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#toArray
     * @returns {float[]}
     */
    //Vector.prototype.toArray = function () {
    //    var a = this.getJavaObject().toArray();
    //    var ret = Java.from(a); // convert java array to JavaScript array.
    //    return ret;
    //};

    /**
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#equals
     * @param {object} other
     * @returns {boolean}
     */
    //Vector.prototype.equals = function (other) {
    //    var other_uw = Utils.unwrapObject(other);
    //    return this.getJavaObject().equals(other_uw);
    //};


    /**
     *
     * Returns a hash code value for the vector. The hash code is based on its size and its first 128
     * nonzero entries, using a hash algorithm similar to {@link hashCode}.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#hashCode
     * @returns {number}
     */
    //Vector.prototype.hashCode = function () {
    //    return  this.getJavaObject().hashCode();
    //};


    /**
     * Gets the value of the ith element.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#apply
     * @param {number} i  index
     * @returns {number}
     */
    //Vector.prototype.apply = function (i) {
    //    return  this.getJavaObject().apply(i);
    //};


    /**
     * Makes a deep copy of this vector.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#copy
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    //Vector.prototype.copy = function () {
    //    var javaObject =  this.getJavaObject().copy();
    //    return Utils.javaToJs(javaObject);
    //};

    /**
     * Number of active entries.  An "active entry" is an element which is explicitly stored,
     * regardless of its value.  Note that inactive entries have value 0.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#numActives
     * @returns {integer}
     */
    //Vector.prototype.numActives = function () {
    //       return  this.getJavaObject().numActives();
    //};


    /**
     * Number of nonzero elements. This scans all active values and count nonzeros.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#numNonzeros
     * @returns {integer}
     */
    //Vector.prototype.numNonzeros = function () {
    //       return  this.getJavaObject().numNonzeros();
    //};


    /**
     * Converts this vector to a sparse vector with all explicit zeros removed.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#toSparse
     * @returns {module:eclairjs/mllib/linalg.SparseVector}
     */
    //Vector.prototype.toSparse = function () {
    //    var javaObject =  this.getJavaObject().toSparse();
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Converts this vector to a dense vector.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#toDense
     * @returns {module:eclairjs/mllib/linalg.DenseVector}
     */
    //Vector.prototype.toDense = function () {
    //    var javaObject =  this.getJavaObject().toDense();
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Returns a vector in either dense or sparse format, whichever uses less storage.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#compressed
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    //Vector.prototype.compressed = function () {
    //    var javaObject =  this.getJavaObject().compressed();
    //    return Utils.javaToJs(javaObject);
    //};


    /**
     * Find the index of a maximal element.  Returns the first maximal element in case of a tie.
     * Returns -1 if vector has length 0.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#argmax
     * @returns {integer}
     */
    //Vector.prototype.argmax = function () {
    //    return  this.getJavaObject().argmax();
    //};


    /**
     * Converts the vector to a JSON string.
     * @function
     * @name module:eclairjs/mllib/linalg.Vector#toJSON
     * @returns {Object}
     * @ignore
     */
    //Vector.prototype.toJSON = function () {
    //    return  this.toArray();
    //};


    module.exports = Vector;

})();
