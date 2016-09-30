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
     * @class
     * @memberof module:eclairjs/mllib/linalg
     * @type {{}}
     */
    var Matrices = function(){};
    /**
     * Creates a column-major dense matrix.
     *
     * @param {number} numRows  number of rows
     * @param {number} numCols  number of columns
     * @param {number[]} values  matrix entries in column major
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    Matrices.dense = function (numRows, numCols, values) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.dense(numRows,numCols,values);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Creates a column-major sparse matrix in Compressed Sparse Column (CSC) format.
     *
     * @param {number} numRows  number of rows
     * @param {number} numCols  number of columns
     * @param {number[]} colPtrs  the index corresponding to the start of a new column
     * @param {number[]} rowIndices  the row index of the entry
     * @param {number[]} values  non-zero matrix entries in column major
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    Matrices.sparse = function (numRows, numCols, colPtrs, rowIndices, values) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.sparse(numRows,numCols,colPtrs,rowIndices,values);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a `Matrix` consisting of zeros.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `numRows` x `numCols` and values of zeros
     */
    Matrices.zeros = function (numRows, numCols) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.zeros(numRows,numCols);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a `DenseMatrix` consisting of ones.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `numRows` x `numCols` and values of ones
     */
    Matrices.ones = function (numRows, numCols) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.ones(numRows,numCols);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a dense Identity Matrix in `Matrix` format.
     * @param {number} n  number of rows and columns of the matrix
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `n` x `n` and values of ones on the diagonal
     */
    Matrices.eye = function (n) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.eye(n);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a sparse Identity Matrix in `Matrix` format.
     * @param {number} n  number of rows and columns of the matrix
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `n` x `n` and values of ones on the diagonal
     */
    Matrices.speye = function (n) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.speye(n);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a `DenseMatrix` consisting of `i.i.d.` uniform random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {Random} rng  a random number generator
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `numRows` x `numCols` and values in U(0, 1)
     */
    Matrices.rand = function (numRows, numCols, rng) {
        throw "not implemented by ElairJS";
    //   var rng_uw = Utils.unwrapObject(rng);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.rand(numRows,numCols,rng_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a `SparseMatrix` consisting of `i.i.d.` gaussian random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {number} density  the desired density for the matrix
     * @param {Random} rng  a random number generator
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `numRows` x `numCols` and values in U(0, 1)
     */
    Matrices.sprand = function (numRows, numCols, density, rng) {
        throw "not implemented by ElairJS";
    //   var rng_uw = Utils.unwrapObject(rng);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.sprand(numRows,numCols,density,rng_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a `DenseMatrix` consisting of `i.i.d.` gaussian random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {Random} rng  a random number generator
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `numRows` x `numCols` and values in N(0, 1)
     */
    Matrices.randn = function (numRows, numCols, rng) {
        throw "not implemented by ElairJS";
    //   var rng_uw = Utils.unwrapObject(rng);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.randn(numRows,numCols,rng_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a `SparseMatrix` consisting of `i.i.d.` gaussian random numbers.
     * @param {number} numRows  number of rows of the matrix
     * @param {number} numCols  number of columns of the matrix
     * @param {number} density  the desired density for the matrix
     * @param {Random} rng  a random number generator
     * @returns {module:eclairjs/mllib/linalg.Matrix}  `Matrix` with size `numRows` x `numCols` and values in N(0, 1)
     */
    Matrices.sprandn = function (numRows, numCols, density, rng) {
        throw "not implemented by ElairJS";
    //   var rng_uw = Utils.unwrapObject(rng);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.sprandn(numRows,numCols,density,rng_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a diagonal matrix in `Matrix` format from the supplied values.
     * @param {module:eclairjs/mllib/linalg.Vector} vector  a `Vector` that will form the values on the diagonal of the matrix
     *         on the diagonal
     * @returns {module:eclairjs/mllib/linalg.Matrix}  Square `Matrix` with size `values.length` x `values.length` and `values`
     */
    Matrices.diag = function (vector) {
        throw "not implemented by ElairJS";
    //   var vector_uw = Utils.unwrapObject(vector);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.diag(vector_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Horizontally concatenate a sequence of matrices. The returned matrix will be in the format
     * the matrices are supplied in. Supplying a mix of dense and sparse matrices will result in
     * a sparse matrix. If the Array is empty, an empty `DenseMatrix` will be returned.
     * @param {module:eclairjs/mllib/linalg.Matrix[]} matrices  array of matrices
     * @returns {module:eclairjs/mllib/linalg.Matrix}  a single `Matrix` composed of the matrices that were horizontally concatenated
     */
    Matrices.horzcat = function (matrices) {
        throw "not implemented by ElairJS";
    //   var matrices_uw = Utils.unwrapObject(matrices);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.horzcat(matrices_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Vertically concatenate a sequence of matrices. The returned matrix will be in the format
     * the matrices are supplied in. Supplying a mix of dense and sparse matrices will result in
     * a sparse matrix. If the Array is empty, an empty `DenseMatrix` will be returned.
     * @param {module:eclairjs/mllib/linalg.Matrix[]} matrices  array of matrices
     * @returns {module:eclairjs/mllib/linalg.Matrix}  a single `Matrix` composed of the matrices that were vertically concatenated
     */
    Matrices.vertcat = function (matrices) {
        throw "not implemented by ElairJS";
    //   var matrices_uw = Utils.unwrapObject(matrices);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.vertcat(matrices_uw);
    //   return Utils.javaToJs(javaObject);
    };

    module.exports = Matrix;

})();
