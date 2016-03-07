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


/**
 * A class that implements a [[http://en.wikipedia.org/wiki/Random_forest  Random Forest]]
 * learning algorithm for classification and regression.
 * It supports both continuous and categorical features.
 *
 * The settings for featureSubsetStrategy are based on the following references:
 *  - log2: tested in Breiman (2001)
 *  - sqrt: recommended by Breiman manual for random forests
 *  - The defaults of sqrt (classification) and onethird (regression) match the R randomForest
 *    package.
 * [[http://www.stat.berkeley.edu/~breiman/randomforest2001.pdf  Breiman (2001)]]
 * [[http://www.stat.berkeley.edu/~breiman/Using_random_forests_V3.1.pdf  Breiman manual for
 *     random forests]]
 *
 * @param {Strategy} strategy The configuration parameters for the random forest algorithm which specify
 *                 the type of algorithm (classification, regression, etc.), feature type
 *                 (continuous, categorical), depth of the tree, quantile calculation strategy,
 *                 etc.
 * @param {Number} numTrees If 1, then no bootstrapping is used.  If > 1, then bootstrapping is done.
 * @param featureSubsetStrategy Number of features to consider for splits at each node.
 *                              Supported: "auto", "all", "sqrt", "log2", "onethird".
 *                              If "auto" is set, this parameter is set based on numTrees:
 *                                if numTrees == 1, set to "all";
 *                                if numTrees > 1 (forest) set to "sqrt" for classification and
 *                                  to "onethird" for regression.
 * @param seed Random seed for bootstrapping and choosing feature subsets.
 */
var RandomForest = {};


/**
 * Method to train a decision tree model for regression.
 *
 * @param {RDD} input Training dataset: RDD of [[org.apache.spark.mllib.regression.LabeledPoint]].
 *              Labels are real numbers.
 * @param {Object} categoricalFeaturesInfo Map storing arity of categorical features.
 *                                E.g., an entry (n -> k) indicates that feature n is categorical
 *                                with k categories indexed from 0: {0, 1, ..., k-1}.
 * @param {Number} numTrees Number of trees in the random forest.
 * @param {Number} featureSubsetStrategy Number of features to consider for splits at each node.
 *                              Supported: "auto", "all", "sqrt", "log2", "onethird".
 *                              If "auto" is set, this parameter is set based on numTrees:
 *                                if numTrees == 1, set to "all";
 *                                if numTrees > 1 (forest) set to "onethird".
 * @param impurity Criterion used for information gain calculation.
 *                 Supported values: "variance".
 * @param {Int} maxDepth Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 *                  (suggested value: 4)
 * @param {Int} maxBins maximum number of bins used for splitting features
 *                 (suggested value: 100)
 * @param {Number} seed  Random seed for bootstrapping and choosing feature subsets.
 * @return {RandomForestModel} a random forest model that can be used for prediction
 */
RandomForest.trainRegressor = function(
    input, 
    categoricalFeaturesInfo, 
    numTrees, 
    featureSubsetStrategy, 
    impurity,
    maxDepth,
    maxBins,
    seed
) {
                       
    var categoricalFeaturesInfo_uw = Utils.createJavaHashMap(categoricalFeaturesInfo);
    var javaObject =  org.apache.spark.mllib.tree.RandomForest.trainRegressor(
        Utils.unwrapObject(input), 
        categoricalFeaturesInfo_uw, 
        numTrees, 
        featureSubsetStrategy, 
        impurity, 
        maxDepth, 
        maxBins, 
        seed
    );

    return new RandomForestModel(javaObject);
};

/**
 * Method to train a decision tree model for binary or multiclass classification.
 *
 * @param {RDD} input Training dataset: RDD of [[org.apache.spark.mllib.regression.LabeledPoint]].
 *              Labels should take values {0, 1, ..., numClasses-1}.
 * @param {Int} numClasses number of classes for classification.
 * @param {Object} categoricalFeaturesInfo Map storing arity of categorical features.
 *                                E.g., an entry (n -> k) indicates that feature n is categorical
 *                                with k categories indexed from 0: {0, 1, ..., k-1}.
 * @param {Int} numTrees Number of trees in the random forest.
 * @param {String} featureSubsetStrategy Number of features to consider for splits at each node.
 *                              Supported: "auto", "all", "sqrt", "log2", "onethird".
 *                              If "auto" is set, this parameter is set based on numTrees:
 *                                if numTrees == 1, set to "all";
 *                                if numTrees > 1 (forest) set to "sqrt".
 * @param {String} impurity Criterion used for information gain calculation.
 *                 Supported values: "gini" (recommended) or "entropy".
 * @param {Int} maxDepth Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 *                  (suggested value: 4)
 * @param {Int} maxBins maximum number of bins used for splitting features
 *                 (suggested value: 100)
 * @param seed  Random seed for bootstrapping and choosing feature subsets.
 * @return a random forest model  that can be used for prediction
 */
RandomForest.trainClassifier = function(
    input,
    numClasses,
    categoricalFeaturesInfo, 
    numTrees, 
    featureSubsetStrategy, 
    impurity,
    maxDepth,
    maxBins,
    seed
) {
                       
    var categoricalFeaturesInfo_uw = Utils.createJavaHashMap(categoricalFeaturesInfo);
    var javaObject =  org.apache.spark.mllib.tree.RandomForest.trainClassifier(
        Utils.unwrapObject(input), 
        numClasses,
        categoricalFeaturesInfo_uw, 
        numTrees, 
        featureSubsetStrategy, 
        impurity, 
        maxDepth, 
        maxBins, 
        seed
    );

    return new RandomForestModel(javaObject);
};
