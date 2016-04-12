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
     * Column-major dense matrix.
     * The entry values are stored in a single array of doubles with columns listed in sequence.
     * For example, the following matrix
     * @example
     *   1.0 2.0
     *   3.0 4.0
     *   5.0 6.0
     *
     * is stored as `[1.0, 3.0, 5.0, 2.0, 4.0, 6.0]`.
     *
     * @param numRows number of rows
     * @param numCols number of columns
     * @param values matrix entries in column major if not transposed or in row major otherwise
     * @param isTransposed whether the matrix is transposed. If true, `values` stores the matrix in
     *                     row major.
     * @classdesc
     */

    /**
     * @param {number} numRows
     * @param {number} numCols
     * @param {number[]} values
     * @param {boolean} isTransposed
     * @class
     * @extends Matrix
     * @memberof module:eclairjs/mllib/linalg
     */
    var DenseMatrix = function (numRows, numCols, values, isTransposed) {
        var jvmObject;
        this.logger = Logger.getLogger("DenseMatrix_js");
        if (arguments[0] instanceof org.apache.spark.mllib.linalg.DenseMatrix) {
            jvmObject = arguments[0];
        } else if (arguments.length === 3) {
            jvmObject = new org.apache.spark.mllib.linalg.DenseMatrix(numRows, numCols, values);
        } else if (arguments.length === 3) {
            jvmObject = new org.apache.spark.mllib.linalg.DenseMatrix(numRows, numCols, values, isTransposed);
        } else {
            throw "DenseMatrix constructor invalid arguments"
        }

        Matrix.call(this, jvmObject);

    };

    DenseMatrix.prototype = Object.create(Matrix.prototype);

    DenseMatrix.prototype.constructor = DenseMatrix;


    /**
     * @param {object} o
     * @returns {boolean}
     */
    DenseMatrix.prototype.equals = function (o) {
        throw "not implemented by ElairJS";
        //   var o_uw = Utils.unwrapObject(o);
        //   return  this.getJavaObject().equals(o_uw);
    };


    /**
     * @returns {number}
     */
    DenseMatrix.prototype.hashCode = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().hashCode();
    };


    /**
     * @param {number} i
     * @param {number} j
     * @returns {number}
     */
    DenseMatrix.prototype.apply = function (i, j) {
        return this.getJavaObject().apply(i, j);
    };


    /**
     * @returns {DenseMatrix}
     */
    DenseMatrix.prototype.copy = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().copy();
        //   return new DenseMatrix(javaObject);
    };


    /**
     * @returns {DenseMatrix}
     */
    DenseMatrix.prototype.transpose = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().transpose();
        //   return new DenseMatrix(javaObject);
    };


    /**
     * @returns {number}
     */
    DenseMatrix.prototype.numNonzeros = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numNonzeros();
    };


    /**
     * @returns {number}
     */
    DenseMatrix.prototype.numActives = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numActives();
    };


    /**
     * Generate a `SparseMatrix` from the given `DenseMatrix`. The new matrix will have isTransposed
     * set to false.
     * @returns {SparseMatrix}
     */
    DenseMatrix.prototype.toSparse = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().toSparse();
        //   return new SparseMatrix(javaObject);
    };

    //
    // static methods
    //


    /**
     * Generate a `DenseMatrix` consisting of zeros.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @returns {DenseMatrix}  `DenseMatrix` with size `numRows` x `numCols` and values of zeros
     */
    DenseMatrix.zeros = function (numRows, numCols) {
        throw "not implemented by ElairJS";
        //   var javaObject =  org.apache.spark.mllib.linalg.DenseMatrix.zeros(numRows,numCols);
        //   return new DenseMatrix(javaObject);
    };


    /**
     * Generate a `DenseMatrix` consisting of ones.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @returns {DenseMatrix}  `DenseMatrix` with size `numRows` x `numCols` and values of ones
     */
    DenseMatrix.ones = function (numRows, numCols) {
        throw "not implemented by ElairJS";
        //   var javaObject =  org.apache.spark.mllib.linalg.DenseMatrix.ones(numRows,numCols);
        //   return new DenseMatrix(javaObject);
    };


    /**
     * Generate an Identity Matrix in `DenseMatrix` format.
     * @param {number} n  number of rows and columns of the matrix
     * @returns {DenseMatrix}  `DenseMatrix` with size `n` x `n` and values of ones on the diagonal
     */
    DenseMatrix.eye = function (n) {
        throw "not implemented by ElairJS";
        //   var javaObject =  org.apache.spark.mllib.linalg.DenseMatrix.eye(n);
        //   return new DenseMatrix(javaObject);
    };


    /**
     * Generate a `DenseMatrix` consisting of `i.i.d.` uniform random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {Random} rng  a random number generator
     * @returns {DenseMatrix}  `DenseMatrix` with size `numRows` x `numCols` and values in U(0, 1)
     */
    DenseMatrix.rand = function (numRows, numCols, rng) {
        throw "not implemented by ElairJS";
        //   var rng_uw = Utils.unwrapObject(rng);
        //   var javaObject =  org.apache.spark.mllib.linalg.DenseMatrix.rand(numRows,numCols,rng_uw);
        //   return new DenseMatrix(javaObject);
    };


    /**
     * Generate a `DenseMatrix` consisting of `i.i.d.` gaussian random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {Random} rng  a random number generator
     * @returns {DenseMatrix}  `DenseMatrix` with size `numRows` x `numCols` and values in N(0, 1)
     */
    DenseMatrix.randn = function (numRows, numCols, rng) {
        throw "not implemented by ElairJS";
        //   var rng_uw = Utils.unwrapObject(rng);
        //   var javaObject =  org.apache.spark.mllib.linalg.DenseMatrix.randn(numRows,numCols,rng_uw);
        //   return new DenseMatrix(javaObject);
    };


    /**
     * Generate a diagonal matrix in `DenseMatrix` format from the supplied values.
     * @param {Vector} vector  a `Vector` that will form the values on the diagonal of the matrix
     *         on the diagonal
     * @returns {DenseMatrix}  Square `DenseMatrix` with size `values.length` x `values.length` and `values`
     */
    DenseMatrix.diag = function (vector) {
        throw "not implemented by ElairJS";
        //   var vector_uw = Utils.unwrapObject(vector);
        //   var javaObject =  org.apache.spark.mllib.linalg.DenseMatrix.diag(vector_uw);
        //   return new DenseMatrix(javaObject);
    };

    module.exports =  DenseMatrix;

})();