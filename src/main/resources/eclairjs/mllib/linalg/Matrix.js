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
     * Trait for a local matrix.
     * @classdesc
     * @abstract
     * @class
     * @memberof module:eclairjs/mllib/linalg
     */


    var Matrix = function (jvmObject) {
        this.logger = Logger.getLogger("Matrix_js");
        JavaWrapper.call(this, jvmObject);

    };

    Matrix.prototype = Object.create(JavaWrapper.prototype);

    Matrix.prototype.constructor = Matrix;


    /**
     * @returns {??}
     */
    Matrix.prototype.$init$ = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().$init$();
        //   return new ??(javaObject);
    };


    /**
     * @returns {number}
     */
    Matrix.prototype.numRows = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numRows();
    };


    /**
     * @returns {number}
     */
    Matrix.prototype.numCols = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numCols();
    };


    /**
     * @returns {number[]}
     */
    Matrix.prototype.toArray = function () {
        var res = this.getJavaObject().toArray();
        var results = [];
        for (var i = 0; i < res.length; i++) {
            var value = res[i];
            var o = Utils.javaToJs(value);
            results.push(o);
        }
        return results;
    };


    /**
     * @param {number} i
     * @param {number} j
     * @returns {number}
     */
    Matrix.prototype.apply = function (i, j) {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().apply(i,j);
    };


    /**
     * @returns {Matrix}
     */
    Matrix.prototype.copy = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().copy();
        //   return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {Matrix}
     */
    Matrix.prototype.transpose = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().transpose();
        //   return Utils.javaToJs(javaObject);
    };


    /**
     * @param {DenseMatrix} y
     * @returns {DenseMatrix}
     */
    Matrix.prototype.multiply0 = function (y) {
        throw "not implemented by ElairJS";
        //   var y_uw = Utils.unwrapObject(y);
        //   var javaObject =  this.getJavaObject().multiply(y_uw);
        //   return new DenseMatrix(javaObject);
    };


    /**
     * @param {DenseVector} y
     * @returns {DenseVector}
     */
    Matrix.prototype.multiply1 = function (y) {
        throw "not implemented by ElairJS";
        //   var y_uw = Utils.unwrapObject(y);
        //   var javaObject =  this.getJavaObject().multiply(y_uw);
        //   return new DenseVector(javaObject);
    };


    /**
     * @param {Vector} y
     * @returns {DenseVector}
     */
    Matrix.prototype.multiply2 = function (y) {
        throw "not implemented by ElairJS";
        //   var y_uw = Utils.unwrapObject(y);
        //   var javaObject =  this.getJavaObject().multiply(y_uw);
        //   return new DenseVector(javaObject);
    };


    /**
     * @param {integer} [maxLines]
     * @param {integer} [maxLineWidth]
     * @returns {string}
     */
    Matrix.prototype.toString = function (maxLines, maxLineWidth) {

        if (maxLines && maxLineWidth) {
            return this.getJavaObject().toString(maxLines, maxLineWidth);
        } else {
            return this.getJavaObject().toString();
        }
    };

    Matrix.prototype.toJSON = function () {
        return this.toArray();
    };

    /**
     * Find the number of non-zero active values.
     * @returns {number}
     */
    Matrix.prototype.numNonzeros = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numNonzeros();
    };


    /**
     * Find the number of values stored explicitly. These values can be zero as well.
     * @returns {number}
     */
    Matrix.prototype.numActives = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numActives();
    };

    module.exports =  Matrix;

})();
