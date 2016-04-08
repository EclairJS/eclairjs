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
{
    var DistributedMatrix = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/distributed/DistributedMatrix');
    var SingularValueDecomposition = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/SingularValueDecomposition').SingularValueDecomposition;

    /**
     * Represents a row-oriented distributed Matrix with no meaningful row indices.
     * @memberof module:mllib/linalg/distributed
     * @classdesc
     * @param {RDD} rows stored as an RDD[Vector]
     * @param {number} [nRows] number of rows. A non-positive value means unknown, and then the number of rows will
     *              be determined by the number of records in the RDD `rows`.
     * @param {number} [nCols] number of columns. A non-positive value means unknown, and then the number of
     *              columns will be determined by the size of the first row.
     * @class
     * @extends {DistributedMatrix}
     * @example
     * var RowMatrix = require('eclairjs/mllib/linalg/distributed/RowMatrix');
     * var Vectors = require("'eclairjs/mllib/linalg/Vectors").Vectors;
     * var rowsList = [Vectors.dense([1.12, 2.05, 3.12]), Vectors.dense([5.56, 6.28, 8.94]), Vectors.dense([10.2, 8.0, 20.5])];
     * var rows = sc.parallelize(rowsList);
     * var mat = new RowMatrix(rows);
     */
    var RowMatrix = function(rows,nRows,nCols) {
        this.logger = Logger.getLogger("RowMatrix_js");
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.linalg.distributed.RowMatrix) {
            jvmObject = arguments[0];
        } else if (arguments.length === 3) {
            jvmObject = new org.apache.spark.mllib.linalg.distributed.RowMatrix(Utils.unwrapObject(rows).rdd(),nRows,nCols);
        } else {
            jvmObject = new org.apache.spark.mllib.linalg.distributed.RowMatrix(Utils.unwrapObject(rows).rdd());
        }


         DistributedMatrix.call(this, jvmObject);

    };

    RowMatrix.prototype = Object.create(DistributedMatrix.prototype);

    RowMatrix.prototype.constructor = RowMatrix;


    /**
     * Computes the Gramian matrix `A^T A`. Note that this cannot be computed on matrices with
     * more than 65535 columns.
     * @returns {Matrix} 
     */
    RowMatrix.prototype.computeGramianMatrix = function() {
       var javaObject =  this.getJavaObject().computeGramianMatrix();
       return Utils.javaToJs(javaObject);
    };


    /**
     * Computes singular value decomposition of this matrix. Denote this matrix by A (m x n). This
     * will compute matrices U, S, V such that A ~= U * S * V', where S contains the leading k
     * singular values, U and V contain the corresponding singular vectors.
     *
     * At most k largest non-zero singular values and associated vectors are returned. If there are k
     * such values, then the dimensions of the return will be:
     *  - U is a RowMatrix of size m x k that satisfies U' * U = eye(k),
     *  - s is a Vector of size k, holding the singular values in descending order,
     *  - V is a Matrix of size n x k that satisfies V' * V = eye(k).
     *
     * We assume n is smaller than m, though this is not strictly required.
     * The singular values and the right singular vectors are derived
     * from the eigenvalues and the eigenvectors of the Gramian matrix A' * A. U, the matrix
     * storing the right singular vectors, is computed via matrix multiplication as
     * U = A * (V * S^-1^), if requested by user. The actual method to use is determined
     * automatically based on the cost:
     *  - If n is small (n &lt; 100) or k is large compared with n (k &gt; n / 2), we compute
     *    the Gramian matrix first and then compute its top eigenvalues and eigenvectors locally
     *    on the driver. This requires a single pass with O(n^2^) storage on each executor and
     *    on the driver, and O(n^2^ k) time on the driver.
     *  - Otherwise, we compute (A' * A) * v in a distributive way and send it to ARPACK's DSAUPD to
     *    compute (A' * A)'s top eigenvalues and eigenvectors on the driver node. This requires O(k)
     *    passes, O(n) storage on each executor, and O(n k) storage on the driver.
     *
     * Several internal parameters are set to default values. The reciprocal condition number rCond
     * is set to 1e-9. All singular values smaller than rCond * sigma(0) are treated as zeros, where
     * sigma(0) is the largest singular value. The maximum number of Arnoldi update iterations for
     * ARPACK is set to 300 or k * 3, whichever is larger. The numerical tolerance for ARPACK's
     * eigen-decomposition is set to 1e-10.
     *
     * @note The conditions that decide which method to use internally and the default parameters are
     *       subject to change.
     *
     * @param {integer} k  number of leading singular values to keep (0 &lt; k &lt;= n).
     *          It might return less than k if
     *          there are numerically zero singular values or there are not enough Ritz values
     *          converged before the maximum number of Arnoldi update iterations is reached (in case
     *          that matrix A is ill-conditioned).
     * @param {boolean} computeU  whether to compute U
     * @param {float} rCond  the reciprocal condition number. All singular values smaller than rCond * sigma(0)
     *              are treated as zero, where sigma(0) is the largest singular value.
     * @returns {SingularValueDecomposition}  SingularValueDecomposition(U, s, V). U = null if computeU = false.
     */
    RowMatrix.prototype.computeSVD = function(k,computeU,rCond) {
       var javaObject =  this.getJavaObject().computeSVD(k,computeU,rCond);
       return new SingularValueDecomposition(javaObject);
    };


    /**
     * Computes the covariance matrix, treating each row as an observation. Note that this cannot
     * be computed on matrices with more than 65535 columns.
     * @returns {Matrix}  a local dense matrix of size n x n
     */
    RowMatrix.prototype.computeCovariance = function() {
       var javaObject =  this.getJavaObject().computeCovariance();
       return Utils.javaToJs(javaObject);
    };


    /**
     * Computes the top k principal components.
     * Rows correspond to observations and columns correspond to variables.
     * The principal components are stored a local matrix of size n-by-k.
     * Each column corresponds for one principal component,
     * and the columns are in descending order of component variance.
     * The row data do not need to be "centered" first; it is not necessary for
     * the mean of each column to be 0.
     *
     * Note that this cannot be computed on matrices with more than 65535 columns.
     *
     * @param {integer} k  number of top principal components.
     * @returns {Matrix}  a matrix of size n-by-k, whose columns are principal components
     */
    RowMatrix.prototype.computePrincipalComponents = function(k) {
       var javaObject =  this.getJavaObject().computePrincipalComponents(k);
       return Utils.javaToJs(javaObject);
    };


    /**
     * Computes column-wise summary statistics.
     * @returns {MultivariateStatisticalSummary} 
     */
    RowMatrix.prototype.computeColumnSummaryStatistics = function() {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().computeColumnSummaryStatistics();
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Multiply this matrix by a local matrix on the right.
     *
     * @param {Matrix} B  a local matrix whose number of rows must match the number of columns of this matrix
     *         which preserves partitioning
     * @returns {RowMatrix}  a [[org.apache.spark.mllib.linalg.distributed.RowMatrix]] representing the product,
     */
    RowMatrix.prototype.multiply = function(B) {
       var B_uw = Utils.unwrapObject(B);
       var javaObject =  this.getJavaObject().multiply(B_uw);
       return new RowMatrix(javaObject);
    };


    /**
     * Compute similarities between columns of this matrix using a sampling approach.
     *
     * The threshold parameter is a trade-off knob between estimate quality and computational cost.
     *
     * Setting a threshold of 0 guarantees deterministic correct results, but comes at exactly
     * the same cost as the brute-force approach. Setting the threshold to positive values
     * incurs strictly less computational cost than the brute-force approach, however the
     * similarities computed will be estimates.
     *
     * The sampling guarantees relative-error correctness for those pairs of columns that have
     * similarity greater than the given similarity threshold.
     *
     * To describe the guarantee, we set some notation:
     * Let A be the smallest in magnitude non-zero element of this matrix.
     * Let B be the largest  in magnitude non-zero element of this matrix.
     * Let L be the maximum number of non-zeros per row.
     *
     * For example, for {0,1} matrices: A=B=1.
     * Another example, for the Netflix matrix: A=1, B=5
     *
     * For those column pairs that are above the threshold,
     * the computed similarity is correct to within 20% relative error with probability
     * at least 1 - (0.981)^10/B^
     *
     * The shuffle size is bounded by the *smaller* of the following two expressions:
     *
     * O(n log(n) L / (threshold * A))
     * O(m L^2^)
     *
     * The latter is the cost of the brute-force approach, so for non-zero thresholds,
     * the cost is always cheaper than the brute-force approach.
     *
     * @param {number} [threshold]  Set to 0 for deterministic guaranteed correctness.
     *                  Similarities above this threshold are estimated
     *                  with the cost vs estimate quality trade-off described above.
     *         between columns of this matrix.
     * @returns {CoordinateMatrix}  An n x n sparse upper-triangular matrix of cosine similarities
     */
    RowMatrix.prototype.columnSimilarities = function(threshold) {
    throw "not implemented by ElairJS";
    // 
    //   if (arguments[0]) {
    //   var javaObject =  this.getJavaObject().columnSimilarities(threshold);
    //   return new CoordinateMatrix(javaObject);
    //   } else {
    //   var javaObject =  this.getJavaObject().columnSimilarities();
    //   return new CoordinateMatrix(javaObject);
    //   }
    };


    /**
     * Compute QR decomposition for {@link RowMatrix}. The implementation is designed to optimize the QR
     * decomposition (factorization) for the {@link RowMatrix} of a tall and skinny shape.
     * Reference:
     *  Paul G. Constantine, David F. Gleich. "Tall and skinny QR factorizations in MapReduce
     *  architectures"  ([[http://dx.doi.org/10.1145/1996092.1996103]])
     *
     * @param {boolean} computeQ  whether to computeQ
     * @returns {QRDecomposition}  QRDecomposition(Q, R), Q = null if computeQ = false.
     */
    RowMatrix.prototype.tallSkinnyQR = function(computeQ) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().tallSkinnyQR(computeQ);
    //   return new QRDecomposition(javaObject);
    };

    /**
     * Gets RDD of Vectors
     * @returns {RDD} RDD of Vectors
     */
    RowMatrix.prototype.rows = function() {
       var javaObject =  this.getJavaObject().rows();
       return Utils.javaToJs(javaObject);
    };

    RowMatrix.prototype.toJSON = function() {
      return this.rows().collect();
    };

    module.exports = RowMatrix;
}
