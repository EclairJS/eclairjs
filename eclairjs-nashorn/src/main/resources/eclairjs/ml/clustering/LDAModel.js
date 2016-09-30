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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Model fitted by {@link module:eclairjs/ml/clustering.LDA}.
     *
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml/clustering
     */


    var LDAModel = function (jvmObject) {
        this.logger = Logger.getLogger("ml_clustering_LDAModel_js");
        Model.call(this, jvmObject);

    };

    LDAModel.prototype = Object.create(Model.prototype);

    LDAModel.prototype.constructor = LDAModel;


    /**
     * The features for LDA should be a {@link module:eclairjs/mllib/linalg.Vector} representing the word counts in a document.
     * The vector should be of length vocabSize, with counts for each term (word).
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDAModel}
     */
    LDAModel.prototype.setFeaturesCol = function (value) {
        var javaObject = this.getJavaObject().setFeaturesCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDAModel}
     */
    LDAModel.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms the input dataset.
     *
     * WARNING: If this model is an instance of {@link module:eclairjs/ml/clustering.DistributedLDAModel} (produced when {@link optimizer}
     *          is set to "em"), this involves collecting a large {@link topicsMatrix} to the driver.
     *          This implementation may be changed in the future.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    LDAModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    LDAModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Value for {@link docConcentration} estimated from data.
     * If Online LDA was used and {@link optimizeDocConcentration} was set to false,
     * then this returns the fixed (given) value for the {@link docConcentration} parameter.
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LDAModel.prototype.estimatedDocConcentration = function () {
        var javaObject = this.getJavaObject().estimatedDocConcentration();
        return Utils.javaToJs(javaObject);
    };


    /**
     * Inferred topics, where each topic is represented by a distribution over terms.
     * This is a matrix of size vocabSize x k, where each column is a topic.
     * No guarantees are given about the ordering of the topics.
     *
     * WARNING: If this model is actually a {@link module:eclairjs/ml/clustering.DistributedLDAModel} instance produced by
     *          the Expectation-Maximization ("em") {@link optimizer}, then this method could involve
     *          collecting a large amount of data to the driver (on the order of vocabSize x k).
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    LDAModel.prototype.topicsMatrix = function () {
        var javaObject = this.getJavaObject().topicsMatrix();
        return Utils.javaToJs(javaObject);
    };


    /**
     *  Indicates whether this instance is of type {@link module:eclairjs/ml/clustering.DistributedLDAModel}
     * @returns {boolean}
     */
    LDAModel.prototype.isDistributed = function () {
        return this.getJavaObject().isDistributed();
    };


    /**
     * Calculates a lower bound on the log likelihood of the entire corpus.
     *
     * See Equation (16) in the Online LDA paper (Hoffman et al., 2010).
     *
     * WARNING: If this model is an instance of {@link module:eclairjs/ml/clustering.DistributedLDAModel} (produced when {@link optimizer}
     *          is set to "em"), this involves collecting a large {@link topicsMatrix} to the driver.
     *          This implementation may be changed in the future.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset   test corpus to use for calculating log likelihood
     * @returns {number}  variational lower bound on the log likelihood of the entire corpus
     */
    LDAModel.prototype.logLikelihood = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return this.getJavaObject().logLikelihood(dataset_uw);
    };


    /**
     * Calculate an upper bound bound on perplexity.  (Lower is better.)
     * See Equation (16) in the Online LDA paper (Hoffman et al., 2010).
     *
     * WARNING: If this model is an instance of {@link module:eclairjs/ml/clustering.DistributedLDAModel} (produced when {@link optimizer}
     *          is set to "em"), this involves collecting a large {@link topicsMatrix} to the driver.
     *          This implementation may be changed in the future.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  test corpus to use for calculating perplexity
     * @returns {number}  Variational upper bound on log perplexity per token.
     */
    LDAModel.prototype.logPerplexity = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return this.getJavaObject().logPerplexity(dataset_uw);
    };


    /**
     * Return the topics described by their top-weighted terms.
     *
     * @param {number} [maxTermsPerTopic]   Maximum number of terms to collect for each topic.
     *                          Default value of 10.
     *           - "topic": IntegerType: topic index
     *           - "termIndices": ArrayType(IntegerType): term indices, sorted in order of decreasing
     *                            term importance
     *           - "termWeights": ArrayType(DoubleType): corresponding sorted term weights
     * @returns {module:eclairjs/sql.DataFrame}   Local DataFrame with one topic per Row, with columns:
     */
    LDAModel.prototype.describeTopics = function (maxTermsPerTopic) {
        var javaObject;
        if (arguments[0]) {
            javaObject = this.getJavaObject().describeTopics(maxTermsPerTopic);
        } else {
            javaObject = this.getJavaObject().describeTopics();
        }
        return Utils.javaToJs(javaObject);
    };

    module.exports = LDAModel;
})();