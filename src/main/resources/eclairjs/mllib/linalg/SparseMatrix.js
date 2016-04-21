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
    var Matrix = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Matrix');


    /**
     * Column-major sparse matrix.
     * The entry values are stored in Compressed Sparse Column (CSC) format.
     * For example, the following matrix
     * @example
     *   1.0 0.0 4.0
     *   0.0 3.0 5.0
     *   2.0 0.0 6.0
     *
     * is stored as `values: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]`,
     * `rowIndices=[0, 2, 1, 0, 1, 2]`, `colPointers=[0, 2, 3, 6]`.
     *
     * @param numRows number of rows
     * @param numCols number of columns
     * @param colPtrs the index corresponding to the start of a new column (if not transposed)
     * @param rowIndices the row index of the entry (if not transposed). They must be in strictly
     *                   increasing order for each column
     * @param values nonzero matrix entries in column major (if not transposed)
     * @param isTransposed whether the matrix is transposed. If true, the matrix can be considered
     *                     Compressed Sparse Row (CSR) format, where `colPtrs` behaves as rowPtrs,
     *                     and `rowIndices` behave as colIndices, and `values` are stored in row major.
     * @classdesc
     */

    /**
     * @param {number} numRows
     * @param {number} numCols
     * @param {number[]} colPtrs
     * @param {number[]} rowIndices
     * @param {number[]} values
     * @param {boolean} isTransposed
     * @class
     * @extends Matrix
     * @memberof module:eclairjs/mllib/linalg
     */
    var SparseMatrix = function (numRows, numCols, colPtrs, rowIndices, values, isTransposed) {

        var jvmObject;
        this.logger = Logger.getLogger("SparseMatrix_js");
        if (arguments[0] instanceof org.apache.spark.mllib.linalg.SparseMatrix) {
            jvmObject = arguments[0];
        } else if (arguments.length === 3) {
            jvmObject = new org.apache.spark.mllib.linalg.SparseMatrix(numRows, numCols, values);
        } else if (arguments.length === 3) {
            jvmObject = new org.apache.spark.mllib.linalg.SparseMatrix(numRows, numCols, values, isTransposed);
        } else {
            throw "SparseMatrix constructor invalid arguments"
        }
        Matrix.call(this, jvmObject);

    };

    SparseMatrix.prototype = Object.create(Matrix.prototype);

    SparseMatrix.prototype.constructor = SparseMatrix;


    /**
     * @param {object} o
     * @returns {boolean}
     */
    SparseMatrix.prototype.equals = function (o) {
        throw "not implemented by ElairJS";
        //   var o_uw = Utils.unwrapObject(o);
        //   return  this.getJavaObject().equals(o_uw);
    };


    /**
     * @param {number} i
     * @param {number} j
     * @returns {number}
     */
    SparseMatrix.prototype.apply = function (i, j) {
        return this.getJavaObject().apply(i, j);
    };


    /**
     * @returns {SparseMatrix}
     */
    SparseMatrix.prototype.copy = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().copy();
        //   return new SparseMatrix(javaObject);
    };


    /**
     * @returns {SparseMatrix}
     */
    SparseMatrix.prototype.transpose = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().transpose();
        //   return new SparseMatrix(javaObject);
    };


    /**
     * Generate a `DenseMatrix` from the given `SparseMatrix`. The new matrix will have isTransposed
     * set to false.
     * @returns {DenseMatrix}
     */
    SparseMatrix.prototype.toDense = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().toDense();
        //   return new DenseMatrix(javaObject);
    };


    /**
     * @returns {number}
     */
    SparseMatrix.prototype.numNonzeros = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numNonzeros();
    };


    /**
     * @returns {number}
     */
    SparseMatrix.prototype.numActives = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().numActives();
    };



    /**
     * Generate a `SparseMatrix` from Coordinate List (COO) format. Input must be an array of
     * (i, j, value) tuples. Entries that have duplicate values of i and j are
     * added together. Tuples where value is equal to zero will be omitted.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {Iterable} entries  Array of (i, j, value) tuples
     * @returns {SparseMatrix}  The corresponding `SparseMatrix`
     */
    SparseMatrix.fromCOO = function (numRows, numCols, entries) {
        throw "not implemented by ElairJS";
        // // TODO: handle Tuple conversion for 'entries'
        //   var entries_uw = Utils.unwrapObject(entries);
        //   var javaObject =  org.apache.spark.mllib.linalg.SparseMatrix.fromCOO(numRows,numCols,entries_uw);
        //   return new SparseMatrix(javaObject);
    };


    /**
     * Generate an Identity Matrix in `SparseMatrix` format.
     * @param {number} n  number of rows and columns of the matrix
     * @returns {SparseMatrix}  `SparseMatrix` with size `n` x `n` and values of ones on the diagonal
     */
    SparseMatrix.speye = function (n) {
        throw "not implemented by ElairJS";
        //   var javaObject =  org.apache.spark.mllib.linalg.SparseMatrix.speye(n);
        //   return new SparseMatrix(javaObject);
    };


    /**
     * Generate a `SparseMatrix` consisting of `i.i.d`. uniform random numbers. The number of non-zero
     * elements equal the ceiling of `numRows` x `numCols` x `density`
     *
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {number} density  the desired density for the matrix
     * @param {Random} rng  a random number generator
     * @returns {SparseMatrix}  `SparseMatrix` with size `numRows` x `numCols` and values in U(0, 1)
     */
    SparseMatrix.sprand = function (numRows, numCols, density, rng) {
        throw "not implemented by ElairJS";
        //   var rng_uw = Utils.unwrapObject(rng);
        //   var javaObject =  org.apache.spark.mllib.linalg.SparseMatrix.sprand(numRows,numCols,density,rng_uw);
        //   return new SparseMatrix(javaObject);
    };


    /**
     * Generate a `SparseMatrix` consisting of `i.i.d`. gaussian random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {number} density  the desired density for the matrix
     * @param {Random} rng  a random number generator
     * @returns {SparseMatrix}  `SparseMatrix` with size `numRows` x `numCols` and values in N(0, 1)
     */
    SparseMatrix.sprandn = function (numRows, numCols, density, rng) {
        throw "not implemented by ElairJS";
        //   var rng_uw = Utils.unwrapObject(rng);
        //   var javaObject =  org.apache.spark.mllib.linalg.SparseMatrix.sprandn(numRows,numCols,density,rng_uw);
        //   return new SparseMatrix(javaObject);
    };


    /**
     * Generate a diagonal matrix in `SparseMatrix` format from the supplied values.
     * @param {module:eclairjs/mllib/linalg.Vector} vector  a `Vector` that will form the values on the diagonal of the matrix
     *         `values` on the diagonal
     * @returns {SparseMatrix}  Square `SparseMatrix` with size `values.length` x `values.length` and non-zero
     */
    SparseMatrix.spdiag = function (vector) {
        throw "not implemented by ElairJS";
        //   var vector_uw = Utils.unwrapObject(vector);
        //   var javaObject =  org.apache.spark.mllib.linalg.SparseMatrix.spdiag(vector_uw);
        //   return new SparseMatrix(javaObject);
    };

    module.exports =  SparseMatrix;

})();
