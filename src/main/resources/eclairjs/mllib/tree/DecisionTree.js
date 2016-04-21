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
     * A class which implements a decision tree learning algorithm for classification and regression.
     * It supports both continuous and categorical features.
     * @param strategy The configuration parameters for the tree algorithm which specify the type
     *                 of algorithm (classification, regression, etc.), feature type (continuous,
     *                 categorical), depth of the tree, quantile calculation strategy, etc.
     * @classdesc
     */

    /**
     * @param {Strategy} strategy
     * @class
     * @memberof module:eclairjs/mllib/tree
     */
    var DecisionTree = function (strategy) {
        this.logger = Logger.getLogger("DecisionTree_js");
        var jvmObject;
        if (strategy instanceof Strategy) {
            jvmObject = new org.apache.spark.mllib.tree.DecisionTree(Utils.unwrapObject(strategy));
        } else if (strategy instanceof rg.apache.spark.mllib.tree.DecisionTree) {
            jvmObject = strategy;
        } else {
            throw "DecisionTree invalid constructor parameter"
        }

        JavaWrapper.call(this, jvmObject);

    };

    DecisionTree.prototype = Object.create(JavaWrapper.prototype);

    DecisionTree.prototype.constructor = DecisionTree;


    /**
     * Method to train a decision tree model over an RDD
     * @param {module:eclairjs.RDD} input  Training data: RDD of {@link LabeledPoint}
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.prototype.run = function (input) {
        throw "not implemented by ElairJS";
//   var input_uw = Utils.unwrapObject(input);
//   var javaObject =  this.getJavaObject().run(input_uw);
//   return new DecisionTreeModel(javaObject);
    };
//
// static methods
//


    /**
     * Method to train a decision tree model.
     * The method supports binary and multiclass classification and regression.
     *
     * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
     *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
     *       is recommended to clearly separate classification and regression.
     *
     * @param {module:eclairjs.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              For classification, labels should take values {0, 1, ..., numClasses-1}.
     *              For regression, labels are real numbers.
     * @param {Strategy} strategy  The configuration parameters for the tree algorithm which specify the type
     *                 of algorithm (classification, regression, etc.), feature type (continuous,
     *                 categorical), depth of the tree, quantile calculation strategy, etc.
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.train0 = function (input, strategy) {
        throw "not implemented by ElairJS";
//   var input_uw = Utils.unwrapObject(input);
//   var strategy_uw = Utils.unwrapObject(strategy);
//   var javaObject =  org.apache.spark.mllib.tree.DecisionTree.train(input_uw,strategy_uw);
//   return new DecisionTreeModel(javaObject);
    };


    /**
     * Method to train a decision tree model.
     * The method supports binary and multiclass classification and regression.
     *
     * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
     *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
     *       is recommended to clearly separate classification and regression.
     *
     * @param {module:eclairjs.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              For classification, labels should take values {0, 1, ..., numClasses-1}.
     *              For regression, labels are real numbers.
     * @param {Algo} algo  algorithm, classification or regression
     * @param {Impurity} impurity  impurity criterion used for information gain calculation
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.train1 = function (input, algo, impurity, maxDepth) {
        throw "not implemented by ElairJS";
//   var input_uw = Utils.unwrapObject(input);
//   var algo_uw = Utils.unwrapObject(algo);
//   var impurity_uw = Utils.unwrapObject(impurity);
//   var javaObject =  org.apache.spark.mllib.tree.DecisionTree.train(input_uw,algo_uw,impurity_uw,maxDepth);
//   return new DecisionTreeModel(javaObject);
    };


    /**
     * Method to train a decision tree model.
     * The method supports binary and multiclass classification and regression.
     *
     * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
     *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
     *       is recommended to clearly separate classification and regression.
     *
     * @param {module:eclairjs.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              For classification, labels should take values {0, 1, ..., numClasses-1}.
     *              For regression, labels are real numbers.
     * @param {Algo} algo  algorithm, classification or regression
     * @param {Impurity} impurity  impurity criterion used for information gain calculation
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     * @param {number} numClasses  number of classes for classification. Default value of 2.
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.train2 = function (input, algo, impurity, maxDepth, numClasses) {
        throw "not implemented by ElairJS";
//   var input_uw = Utils.unwrapObject(input);
//   var algo_uw = Utils.unwrapObject(algo);
//   var impurity_uw = Utils.unwrapObject(impurity);
//   var javaObject =  org.apache.spark.mllib.tree.DecisionTree.train(input_uw,algo_uw,impurity_uw,maxDepth,numClasses);
//   return new DecisionTreeModel(javaObject);
    };


    /**
     * Method to train a decision tree model.
     * The method supports binary and multiclass classification and regression.
     *
     * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
     *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
     *       is recommended to clearly separate classification and regression.
     *
     * @param {module:eclairjs.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              For classification, labels should take values {0, 1, ..., numClasses-1}.
     *              For regression, labels are real numbers.
     * @param {Algo} algo  classification or regression
     * @param {Impurity} impurity  criterion used for information gain calculation
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     * @param {number} numClasses  number of classes for classification. Default value of 2.
     * @param {number} maxBins  maximum number of bins used for splitting features
     * @param {QuantileStrategy} quantileCalculationStrategy   algorithm for calculating quantiles
     * @param {Map} categoricalFeaturesInfo  Map storing arity of categorical features.
     *                                E.g., an entry (n -> k) indicates that feature n is categorical
     *                                with k categories indexed from 0: {0, 1, ..., k-1}.
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.train3 = function (input, algo, impurity, maxDepth, numClasses, maxBins, quantileCalculationStrategy, categoricalFeaturesInfo) {
        throw "not implemented by ElairJS";
//   var input_uw = Utils.unwrapObject(input);
//   var algo_uw = Utils.unwrapObject(algo);
//   var impurity_uw = Utils.unwrapObject(impurity);
//   var quantileCalculationStrategy_uw = Utils.unwrapObject(quantileCalculationStrategy);
//   var categoricalFeaturesInfo_uw = Utils.unwrapObject(categoricalFeaturesInfo);
//   var javaObject =  org.apache.spark.mllib.tree.DecisionTree.train(input_uw,algo_uw,impurity_uw,maxDepth,numClasses,maxBins,quantileCalculationStrategy_uw,categoricalFeaturesInfo_uw);
//   return new DecisionTreeModel(javaObject);
    };


    /**
     * Method to train a decision tree model for binary or multiclass classification.
     *
     * @param {module:eclairjs.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              Labels should take values {0, 1, ..., numClasses-1}.
     * @param {number} numClasses  number of classes for classification.
     * @param {object} categoricalFeaturesInfo  object name key pair map storing arity of categorical features.
     *                                E.g., an entry (n -> k) indicates that feature n is categorical
     *                                with k categories indexed from 0: {0, 1, ..., k-1}.
     * @param {string} impurity  Criterion used for information gain calculation.
     *                 Supported values: "gini" (recommended) or "entropy".
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     *                  (suggested value: 5)
     * @param {number} maxBins  maximum number of bins used for splitting features
     *                 (suggested value: 32)
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.trainClassifier = function (input, numClasses, categoricalFeaturesInfo, impurity, maxDepth, maxBins) {
        var input_uw = Utils.unwrapObject(input);
        var categoricalFeaturesInfo_uw = Utils.createJavaHashMap(categoricalFeaturesInfo);
        var javaObject = org.apache.spark.mllib.tree.DecisionTree.trainClassifier(input_uw, numClasses, categoricalFeaturesInfo_uw, impurity, maxDepth, maxBins);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Method to train a decision tree model for regression.
     *
     * @param {module:eclairjs.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              Labels are real numbers.
     * @param {object} categoricalFeaturesInfo  key value  storing arity of categorical features.
     *                                E.g., an entry (n -> k) indicates that feature n is categorical
     *                                with k categories indexed from 0: {0, 1, ..., k-1}.
     * @param {string} impurity  Criterion used for information gain calculation.
     *                 Supported values: "variance".
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     *                  (suggested value: 5)
     * @param {number} maxBins  maximum number of bins used for splitting features
     *                 (suggested value: 32)
     * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
     */
    DecisionTree.trainRegressor = function (input, categoricalFeaturesInfo, impurity, maxDepth, maxBins) {
        var input_uw = Utils.unwrapObject(input);
        var categoricalFeaturesInfo_uw = Utils.createJavaHashMap(categoricalFeaturesInfo);
        var javaObject = org.apache.spark.mllib.tree.DecisionTree.trainRegressor(input_uw, categoricalFeaturesInfo_uw, impurity, maxDepth, maxBins);
        return Utils.javaToJs(javaObject);
    };

    module.exports = DecisionTree;

})();