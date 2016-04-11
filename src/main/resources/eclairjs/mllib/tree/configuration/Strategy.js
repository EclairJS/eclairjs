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
     * Stores all the configuration options for tree construction
     * @param algo  Learning goal.  Supported:
     *              {@link Classification},
     *              {@link Regression}
     * @param impurity Criterion used for information gain calculation.
     *                 Supported for Classification: {@link Gini},
     *                  {@link Entropy}.
     *                 Supported for Regression: {@link Variance}.
     * @param maxDepth Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     * @param numClasses Number of classes for classification.
     *                                    (Ignored for regression.)
     *                                    Default value is 2 (binary classification).
     * @param maxBins Maximum number of bins used for discretizing continuous features and
     *                for choosing how to split on features at each node.
     *                More bins give higher granularity.
     * @param quantileCalculationStrategy Algorithm for calculating quantiles.  Supported:
     *                             {@link Sort}
     * @param categoricalFeaturesInfo A map storing information about the categorical variables and the
     *                                number of discrete values they take. For example, an entry (n ->
     *                                k) implies the feature n is categorical with k categories 0,
     *                                1, 2, ... , k-1. It's important to note that features are
     *                                zero-indexed.
     * @param minInstancesPerNode Minimum number of instances each child must have after split.
     *                            Default value is 1. If a split cause left or right child
     *                            to have less than minInstancesPerNode,
     *                            this split will not be considered as a valid split.
     * @param minInfoGain Minimum information gain a split must get. Default value is 0.0.
     *                    If a split has less information gain than minInfoGain,
     *                    this split will not be considered as a valid split.
     * @param maxMemoryInMB Maximum memory in MB allocated to histogram aggregation. Default value is
     *                      256 MB.
     * @param subsamplingRate Fraction of the training data used for learning decision tree.
     * @param useNodeIdCache If this is true, instead of passing trees to executors, the algorithm will
     *                      maintain a separate RDD of node Id cache for each row.
     * @param checkpointInterval How often to checkpoint when the node Id cache gets updated.
     *                           E.g. 10 means that the cache will get checkpointed every 10 updates. If
     *                           the checkpoint directory is not set in
     *                           {@link SparkContext}, this setting is ignored.
     * @classdesc
     */

    /**
     * @param {Algo} algo
     * @param {Impurity} impurity
     * @param {number} maxDepth
     * @param {number} numClasses
     * @param {number} maxBins
     * @param {QuantileStrategy} quantileCalculationStrategy
     * @param {Map} categoricalFeaturesInfo
     * @param {number} minInstancesPerNode
     * @param {number} minInfoGain
     * @param {number} maxMemoryInMB
     * @param {number} subsamplingRate
     * @param {boolean} useNodeIdCache
     * @param {number} checkpointInterval
     * @returns {??}
     *  @class
     */
    var Strategy = function (jvmObject) {

        //var Strategy = function(algo,impurity,maxDepth,numClasses,maxBins,quantileCalculationStrategy,categoricalFeaturesInfo,minInstancesPerNode,minInfoGain,maxMemoryInMB,subsamplingRate,useNodeIdCache,checkpointInterval) {
        // var jvmObject = new org.apache.spark.mllib.tree.configuration.Strategy(algo,impurity,maxDepth,numClasses,maxBins,quantileCalculationStrategy,categoricalFeaturesInfo,minInstancesPerNode,minInfoGain,maxMemoryInMB,subsamplingRate,useNodeIdCache,checkpointInterval);
        this.logger = Logger.getLogger("Strategy_js");
        JavaWrapper.call(this, jvmObject);

    };

    Strategy.prototype = Object.create(JavaWrapper.prototype);

    Strategy.prototype.constructor = Strategy;

    /**
     *
     * @param {integer} num
     */
    Strategy.prototype.setNumClasses = function (num) {
        this.getJavaObject().setNumClasses(num);
    };

    /**
     *
     * @param {integer} num
     */
    Strategy.prototype.setMaxDepth = function (num) {
        this.getJavaObject().setMaxDepth(num);
    };
    /**
     * @returns {boolean}
     */
    Strategy.prototype.isMulticlassClassification = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().isMulticlassClassification();
    };


    /**
     * @returns {boolean}
     */
    Strategy.prototype.isMulticlassWithCategoricalFeatures = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().isMulticlassWithCategoricalFeatures();
    };


    /**
     * Sets Algorithm using a String.
     * @param {string} algo
     */
    Strategy.prototype.setAlgo = function (algo) {
        throw "not implemented by ElairJS";
//    this.getJavaObject().setAlgo(algo);
    };


    /**
     * Sets categoricalFeaturesInfo using a JavaScript object with simple key/value map.
     * @param {object} categoricalFeaturesInfo simple key/value map
     */
    Strategy.prototype.setCategoricalFeaturesInfo = function (categoricalFeaturesInfo) {
        var categoricalFeaturesInfo_uw = Utils.createJavaHashMap(categoricalFeaturesInfo);
        this.getJavaObject().setCategoricalFeaturesInfo(categoricalFeaturesInfo_uw);
    };


    /**
     * Returns a shallow copy of this instance.
     * @returns {Strategy}
     */
    Strategy.prototype.copy = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().copy();
//   return new Strategy(javaObject);
    };
//
// static methods
//


    /**
     * Construct a default set of parameters for {@link DecisionTree}
     * @param {string} algo   "Classification" or "Regression"
     * @returns {Strategy}
     */
    Strategy.defaultStrategywithstring = function (algo) {
        throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.mllib.tree.configuration.Strategy.defaultStrategy(algo);
//   return new Strategy(javaObject);
    };


    /**
     * Construct a default set of parameters for {@link DecisionTree}
     * @param {Algo} algo  Algo.Classification or Algo.Regression
     * @returns {Strategy}
     */
    Strategy.defaultStrategywithAlgo = function (algo) {
        throw "not implemented by ElairJS";
//   var algo_uw = Utils.unwrapObject(algo);
//   var javaObject =  org.apache.spark.mllib.tree.configuration.Strategy.defaultStrategy(algo_uw);
//   return new Strategy(javaObject);
    };


    /**
     * @param {Algo} algo
     * @returns {Strategy}
     */
    Strategy.defaultStategy = function (algo) {
        throw "not implemented by ElairJS";
//   var algo_uw = Utils.unwrapObject(algo);
//   var javaObject =  org.apache.spark.mllib.tree.configuration.Strategy.defaultStategy(algo_uw);
//   return new Strategy(javaObject);
    };

    module.exports = Strategy;

})();