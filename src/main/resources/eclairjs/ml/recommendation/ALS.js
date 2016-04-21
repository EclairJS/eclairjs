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
     * @classdesc
     * :: Experimental ::
     * Alternating Least Squares (ALS) matrix factorization.
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
     * product blocks that need that user's feature vector. This is achieved by pre-computing some
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
     *
     */

    /**
     * @param {string} uid
     * @class
     * @memberof module:eclairjs/ml/recommendation
     */
    var ALS = function (uid) {
        var jvmObject;
        this.logger = Logger.getLogger("ALS_js");
        if (uid instanceof org.apache.spark.ml.recommendation.ALS) {
            jvmObject = uid;
        } else {
            jvmObject = new org.apache.spark.ml.recommendation.ALS(uid);
        }

        JavaWrapper.call(this, jvmObject);

    };

    ALS.prototype = Object.create(JavaWrapper.prototype);

    ALS.prototype.constructor = ALS;


    /**
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setRank = function (value) {
           var javaObject =  this.getJavaObject().setRank(value);
           return new ALS(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setNumUserBlocks = function (value) {
           var javaObject =  this.getJavaObject().setNumUserBlocks(value);
           return new ALS(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setNumItemBlocks = function (value) {
           var javaObject =  this.getJavaObject().setNumItemBlocks(value);
           return new ALS(javaObject);
    };


    /**
     * @param {boolean} value
     * @returns {ALS}
     */
    ALS.prototype.setImplicitPrefs = function (value) {
           var javaObject =  this.getJavaObject().setImplicitPrefs(value);
           return new ALS(javaObject);
    };


    /**
     * @param {float} value
     * @returns {ALS}
     */
    ALS.prototype.setAlpha = function (value) {
           var javaObject =  this.getJavaObject().setAlpha(value);
           return new ALS(javaObject);
    };


    /**
     * @param {string} value
     * @returns {ALS}
     */
    ALS.prototype.setUserCol = function (value) {
           var javaObject =  this.getJavaObject().setUserCol(value);
           return new ALS(javaObject);
    };


    /**
     * @param {string} value
     * @returns {ALS}
     */
    ALS.prototype.setItemCol = function (value) {
           var javaObject =  this.getJavaObject().setItemCol(value);
           return new ALS(javaObject);
    };


    /**
     * @param {string} value
     * @returns {ALS}
     */
    ALS.prototype.setRatingCol = function (value) {
           var javaObject =  this.getJavaObject().setRatingCol(value);
           return new ALS(javaObject);
    };


    /**
     * @param {string} value
     * @returns {ALS}
     */
    ALS.prototype.setPredictionCol = function (value) {
           var javaObject =  this.getJavaObject().setPredictionCol(value);
           return new ALS(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setMaxIter = function (value) {
           var javaObject =  this.getJavaObject().setMaxIter(value);
           return new ALS(javaObject);
    };


    /**
     * @param {float} value
     * @returns {ALS}
     */
    ALS.prototype.setRegParam = function (value) {
           var javaObject =  this.getJavaObject().setRegParam(value);
           return new ALS(javaObject);
    };


    /**
     * @param {boolean} value
     * @returns {ALS}
     */
    ALS.prototype.setNonnegative = function (value) {
           var javaObject =  this.getJavaObject().setNonnegative(value);
           return new ALS(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setCheckpointInterval = function (value) {
           var javaObject =  this.getJavaObject().setCheckpointInterval(value);
           return new ALS(javaObject);
    };


    /**
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setSeed = function (value) {
           var javaObject =  this.getJavaObject().setSeed(value);
           return new ALS(javaObject);
    };


    /**
     * Sets both numUserBlocks and numItemBlocks to the specific value.
     * @param {integer} value
     * @returns {ALS}
     */
    ALS.prototype.setNumBlocks = function (value) {
           var javaObject =  this.getJavaObject().setNumBlocks(value);
           return new ALS(javaObject);
    };


    /**
     * @param {DataFrame} dataset
     * @returns {ALSModel}
     */
    ALS.prototype.fit = function (dataset) {
           var dataset_uw = Utils.unwrapObject(dataset);
           var javaObject =  this.getJavaObject().fit(dataset_uw);
           return Utils.javaToJs(javaObject);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    ALS.prototype.transformSchema = function (schema) {
           var schema_uw = Utils.unwrapObject(schema);
           var javaObject =  this.getJavaObject().transformSchema(schema_uw);
           return Utils.javaToJs(javaObject);
    };


    /**
     * @param {ParamMap} extra
     * @returns {ALS}
     */
    ALS.prototype.copy = function (extra) {
           var extra_uw = Utils.unwrapObject(extra);
           var javaObject =  this.getJavaObject().copy(extra_uw);
           return new ALS(javaObject);
    };

    module.exports = ALS;
})();