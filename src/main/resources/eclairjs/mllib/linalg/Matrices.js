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
     * @param {Vector} vector  a `Vector` that will form the values on the diagonal of the matrix
     *         `values` on the diagonal
     * @returns {SparseMatrix}  Square `SparseMatrix` with size `values.length` x `values.length` and non-zero
     */
    SparseMatrix.spdiag = function (vector) {
        throw "not implemented by ElairJS";
    //   var vector_uw = Utils.unwrapObject(vector);
    //   var javaObject =  org.apache.spark.mllib.linalg.SparseMatrix.spdiag(vector_uw);
    //   return new SparseMatrix(javaObject);
    };

    var Matrices = {};
    /**
     * Creates a column-major dense matrix.
     *
     * @param {number} numRows  number of rows
     * @param {number} numCols  number of columns
     * @param {number[]} values  matrix entries in column major
     * @returns {Matrix}
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
     * @returns {Matrix}
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
     * @returns {Matrix}  `Matrix` with size `numRows` x `numCols` and values of zeros
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
     * @returns {Matrix}  `Matrix` with size `numRows` x `numCols` and values of ones
     */
    Matrices.ones = function (numRows, numCols) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.ones(numRows,numCols);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a dense Identity Matrix in `Matrix` format.
     * @param {number} n  number of rows and columns of the matrix
     * @returns {Matrix}  `Matrix` with size `n` x `n` and values of ones on the diagonal
     */
    Matrices.eye = function (n) {
        throw "not implemented by ElairJS";
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.eye(n);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a sparse Identity Matrix in `Matrix` format.
     * @param {number} n  number of rows and columns of the matrix
     * @returns {Matrix}  `Matrix` with size `n` x `n` and values of ones on the diagonal
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
     * @returns {Matrix}  `Matrix` with size `numRows` x `numCols` and values in U(0, 1)
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
     * @returns {Matrix}  `Matrix` with size `numRows` x `numCols` and values in U(0, 1)
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
     * @returns {Matrix}  `Matrix` with size `numRows` x `numCols` and values in N(0, 1)
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
     * @returns {Matrix}  `Matrix` with size `numRows` x `numCols` and values in N(0, 1)
     */
    Matrices.sprandn = function (numRows, numCols, density, rng) {
        throw "not implemented by ElairJS";
    //   var rng_uw = Utils.unwrapObject(rng);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.sprandn(numRows,numCols,density,rng_uw);
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Generate a diagonal matrix in `Matrix` format from the supplied values.
     * @param {Vector} vector  a `Vector` that will form the values on the diagonal of the matrix
     *         on the diagonal
     * @returns {Matrix}  Square `Matrix` with size `values.length` x `values.length` and `values`
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
     * @param {Matrix[]} matrices  array of matrices
     * @returns {Matrix}  a single `Matrix` composed of the matrices that were horizontally concatenated
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
     * @param {Matrix[]} matrices  array of matrices
     * @returns {Matrix}  a single `Matrix` composed of the matrices that were vertically concatenated
     */
    Matrices.vertcat = function (matrices) {
        throw "not implemented by ElairJS";
    //   var matrices_uw = Utils.unwrapObject(matrices);
    //   var javaObject =  org.apache.spark.mllib.linalg.Matrices.vertcat(matrices_uw);
    //   return Utils.javaToJs(javaObject);
    };

    module.exports = {
        Matrix: Matrix,
        DenseMatrix: DenseMatrix,
        SparseMatrix: SparseMatrix,
        Matrices: Matrices
    };

})();
