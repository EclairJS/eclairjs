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
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * Alternating Least Squares matrix factorization.
     *
     * ALS attempts to estimate the ratings matrix `R` as the product of two lower-rank matrices,
     * `X` and `Y`, i.e. `X * Yt = R`. Typically these approximations are called 'factor' matrices.
     * The general approach is iterative. During each iteration, one of the factor matrices is held
     * constant, while the other is solved for using least squares. The newly-solved factor matrix is
     * then held constant while solving for the other factor matrix.
     *
     * This is a blocked implementation of the ALS factorization algorithm that groups the two sets
     * of factors (referred to as "users" and "products") into blocks and reduces communication by only
     * sending one copy of each user vector to each product block on each iteration, and only for the
     * product blocks that need that user's feature vector. This is achieved by precomputing some
     * information about the ratings matrix to determine the "out-links" of each user (which blocks of
     * products it will contribute to) and "in-link" information for each product (which of the feature
     * vectors it receives from each user block it will depend on). This allows us to send only an
     * array of feature vectors between each user block and product block, and have the product block
     * find the users' ratings and update the products based on these messages.
     *
     * For implicit preference data, the algorithm used is based on
     * "Collaborative Filtering for Implicit Feedback Datasets", available at
     * [[http://dx.doi.org/10.1109/ICDM.2008.22]], adapted for the blocked approach used here.
     *
     * Essentially instead of finding the low-rank approximations to the rating matrix `R`,
     * this finds the approximations for a preference matrix `P` where the elements of `P` are 1 if
     * r > 0 and 0 if r <= 0. The ratings then act as 'confidence' values related to strength of
     * indicated user
     * preferences rather than explicit ratings given to items.
     * @classdesc
     */

    /**
     * Constructs an ALS instance with default parameters: {numBlocks: -1, rank: 10, iterations: 10,
 * lambda: 0.01, implicitPrefs: false, alpha: 1.0}.
     * @returns {??}
     *  @class
     *  @memberof module:eclairjs/mllib/recommendation
     */
    var ALS = function (jvmObject) {

        this.logger = Logger.getLogger("mllib_recommendation_ALS_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.mllib.recommendation.ALS();
        }
        JavaWrapper.call(this, jvmObject);

    };

    ALS.prototype = Object.create(JavaWrapper.prototype);

    ALS.prototype.constructor = ALS;


    /**
     * Set the number of blocks for both user blocks and product blocks to parallelize the computation
     * into; pass -1 for an auto-configured number of blocks. Default: -1.
     * @param {number} numBlocks
     * @returns {}
     */
    ALS.prototype.setBlocks = function (numBlocks) {
        var javaObject = this.getJavaObject().setBlocks(numBlocks);
        return new ALS(javaObject);
    };


    /**
     * Set the number of user blocks to parallelize the computation.
     * @param {number} numUserBlocks
     * @returns {}
     */
    ALS.prototype.setUserBlocks = function (numUserBlocks) {
        var javaObject = this.getJavaObject().setUserBlocks(numUserBlocks);
        return new ALS(javaObject);
    };


    /**
     * Set the number of product blocks to parallelize the computation.
     * @param {number} numProductBlocks
     * @returns {}
     */
    ALS.prototype.setProductBlocks = function (numProductBlocks) {
        var javaObject = this.getJavaObject().setProductBlocks(numProductBlocks);
        return new ALS(javaObject);
    };


    /**
     * @param {number} rank
     * @returns {}
     */
    ALS.prototype.setRank = function (rank) {
        var javaObject = this.getJavaObject().setRank(rank);
        return new ALS(javaObject);
    };


    /**
     * @param {number} iterations
     * @returns {}
     */
    ALS.prototype.setIterations = function (iterations) {
        var javaObject = this.getJavaObject().setIterations(iterations);
        return new ALS(javaObject);
    };


    /**
     * @param {number} lambda
     * @returns {}
     */
    ALS.prototype.setLambda = function (lambda) {
        var javaObject = this.getJavaObject().setLambda(lambda);
        return new ALS(javaObject);
    };


    /**
     * @param {boolean} implicitPrefs
     * @returns {}
     */
    ALS.prototype.setImplicitPrefs = function (implicitPrefs) {
        var javaObject = this.getJavaObject().setImplicitPrefs(implicitPrefs);
        return new ALS(javaObject);
    };


    /**
     * Sets the constant used in computing confidence in implicit ALS. Default: 1.0.
     * @param {number} alpha
     * @returns {}
     */
    ALS.prototype.setAlpha = function (alpha) {
        var javaObject = this.getJavaObject().setAlpha(alpha);
        return new ALS(javaObject);
    };


    /**
     * @param {number} seed
     * @returns {}
     */
    ALS.prototype.setSeed = function (seed) {
        var javaObject = this.getJavaObject().setSeed(seed);
        return new ALS(javaObject);
    };


    /**
     * Set whether the least-squares problems solved at each iteration should have
     * nonnegativity constraints.
     * @param {boolean} b
     * @returns {}
     */
    ALS.prototype.setNonnegative = function (b) {
        var javaObject = this.getJavaObject().setNonnegative(b);
        return new ALS(javaObject);
    };


    /**
     * Run ALS with the configured parameters on an input RDD of (user, product, rating) triples.
     * Returns a MatrixFactorizationModel with feature vectors for each user and product.
     * @param {module:eclairjs.RDD} ratings
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.prototype.run = function (ratings) {
        var ratings_uw = Utils.unwrapObject(ratings);
        var javaObject = this.getJavaObject().run(ratings_uw);
        return Utils.javaToJs(javaObject);
    };

//
// static methods
//


    /**
     * Train a matrix factorization model given an RDD of ratings given by users to some products,
     * in the form of (userID, productID, rating) pairs. We approximate the ratings matrix as the
     * product of two lower-rank matrices of a given rank (number of features). To solve for these
     * features, we run a given number of iterations of ALS. This is done using a level of
     * parallelism given by `blocks`.
     *
     * @param {module:eclairjs.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} [lambda]  regularization factor (recommended: 0.01)
     * @param {number} [blocks]  level of parallelism to split computation into
     * @param {number} [seed]  random seed
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.train = function (ratings, rank, iterations, lambda, blocks, seed) {
        /*
         var ratings_uw = Utils.unwrapObject(ratings);
         if (ratings_uw instanceof org.apache.spark.api.java.JavaRDD) {
         ratings_uw = ratings_uw.rdd();
         }
         */
        var ratings_uw = org.apache.spark.api.java.JavaRDD.toRDD(ratings.getJavaObject());
        var javaObject;

        if (seed) {
            javaObject = org.apache.spark.mllib.recommendation.ALS.train(ratings_uw, rank, iterations, lambda, blocks, seed);
        } else if (blocks) {
            javaObject = org.apache.spark.mllib.recommendation.ALS.train(ratings_uw, rank, iterations, lambda, blocks);
        } else if (lambda) {
            javaObject = org.apache.spark.mllib.recommendation.ALS.train(ratings_uw, rank, iterations, lambda);
        } else {
            javaObject = org.apache.spark.mllib.recommendation.ALS.train(ratings_uw, rank, iterations);
        }

        return Utils.javaToJs(javaObject);
    };

    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' given by users
     * to some products, in the form of (userID, productID, preference) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. This is done using
     * a level of parallelism given by `blocks`.
     *
     * @param {module:eclairjs.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} lambda      regularization factor (recommended: 0.01)
     * @param {number} blocks      level of parallelism to split computation into
     * @param {number} alpha       confidence parameter
     * @param {number} seed        random seed
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit0 = function (ratings, rank, iterations, lambda, blocks, alpha, seed) {
        throw "not implemented by ElairJS";
//   var ratings_uw = Utils.unwrapObject(ratings);
//   var javaObject =  org.apache.spark.mllib.recommendation.ALS.trainImplicit(ratings_uw,rank,iterations,lambda,blocks,alpha,seed);
//   return new MatrixFactorizationModel(javaObject);
    };


    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' given by users
     * to some products, in the form of (userID, productID, preference) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. This is done using
     * a level of parallelism given by `blocks`.
     *
     * @param {module:eclairjs.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} lambda      regularization factor (recommended: 0.01)
     * @param {number} blocks      level of parallelism to split computation into
     * @param {number} alpha       confidence parameter
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit1 = function (ratings, rank, iterations, lambda, blocks, alpha) {
        throw "not implemented by ElairJS";
//   var ratings_uw = Utils.unwrapObject(ratings);
//   var javaObject =  org.apache.spark.mllib.recommendation.ALS.trainImplicit(ratings_uw,rank,iterations,lambda,blocks,alpha);
//   return new MatrixFactorizationModel(javaObject);
    };


    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' given by users to
     * some products, in the form of (userID, productID, preference) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. The level of
     * parallelism is determined automatically based on the number of partitions in `ratings`.
     *
     * @param {module:eclairjs.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} lambda      regularization factor (recommended: 0.01)
     * @param {number} alpha       confidence parameter
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit2 = function (ratings, rank, iterations, lambda, alpha) {
        throw "not implemented by ElairJS";
//   var ratings_uw = Utils.unwrapObject(ratings);
//   var javaObject =  org.apache.spark.mllib.recommendation.ALS.trainImplicit(ratings_uw,rank,iterations,lambda,alpha);
//   return new MatrixFactorizationModel(javaObject);
    };


    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' ratings given by
     * users to some products, in the form of (userID, productID, rating) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. The level of
     * parallelism is determined automatically based on the number of partitions in `ratings`.
     * Model parameters `alpha` and `lambda` are set to reasonable default values
     *
     * @param {module:eclairjs.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit3 = function (ratings, rank, iterations) {
        throw "not implemented by ElairJS";
//   var ratings_uw = Utils.unwrapObject(ratings);
//   var javaObject =  org.apache.spark.mllib.recommendation.ALS.trainImplicit(ratings_uw,rank,iterations);
//   return new MatrixFactorizationModel(javaObject);
    };

    module.exports = ALS;

})();