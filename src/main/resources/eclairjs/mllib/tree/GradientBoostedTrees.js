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
 * A class that implements
 * [[http://en.wikipedia.org/wiki/Gradient_boosting  Stochastic Gradient Boosting]]
 * for regression and binary classification.
 *
 * The implementation is based upon:
 *   J.H. Friedman.  "Stochastic Gradient Boosting."  1999.
 *
 * Notes on Gradient Boosting vs. TreeBoost:
 *  - This implementation is for Stochastic Gradient Boosting, not for TreeBoost.
 *  - Both algorithms learn tree ensembles by minimizing loss functions.
 *  - TreeBoost (Friedman, 1999) additionally modifies the outputs at tree leaf nodes
 *    based on the loss function, whereas the original gradient boosting method does not.
 *     - When the loss is SquaredError, these methods give the same result, but they could differ
 *       for other loss functions.
 *
 * @param boostingStrategy Parameters for the gradient boosting algorithm.
 * @classdesc
 */

/**
 * @param {BoostingStrategy} boostingStrategy
 *  @class
 */
var GradientBoostedTrees = function (boostingStrategy) {
    this.logger = Logger.getLogger("GradientBoostedTrees_js");
    var jvmObject;
    var obj = Utils.unwrapObject(boostingStrategy);
    if (obj instanceof org.apache.spark.mllib.tree.configuration.BoostingStrategy) {
        jvmObject = new org.apache.spark.mllib.tree.GradientBoostedTrees(obj);
    } else if (boostingStrategy instanceof org.apache.spark.mllib.tree.GradientBoostedTrees) {
        jvmObject = obj;
    } else {
        throw "GradientBoostedTrees constructor accepts only a BoostingStrategy";
    }
    JavaWrapper.call(this, jvmObject);

};

GradientBoostedTrees.prototype = Object.create(JavaWrapper.prototype);

GradientBoostedTrees.prototype.constructor = GradientBoostedTrees;


/**
 * Method to train a gradient boosting model
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 * @returns {GradientBoostedTreesModel}  a gradient boosted trees model that can be used for prediction
 */
GradientBoostedTrees.prototype.run = function (input) {
    var input_uw = Utils.unwrapObject(input);
    var javaObject = this.getJavaObject().run(input_uw);
    return Utils.javaToJs(javaObject);
};


/**
 * Method to validate a gradient boosting model
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 * @param {RDD} validationInput  Validation dataset.
 *                        This dataset should be different from the training dataset,
 *                        but it should follow the same distribution.
 *                        E.g., these two datasets could be created from an original dataset
 *                        by using [[org.apache.spark.rdd.RDD.randomSplit()]]
 * @returns {GradientBoostedTreesModel}  a gradient boosted trees model that can be used for prediction
 */
GradientBoostedTrees.prototype.runWithValidation = function (input, validationInput) {
    var input_uw = Utils.unwrapObject(input);
    var validationInput_uw = Utils.unwrapObject(validationInput);
    var javaObject = this.getJavaObject().runWithValidation(input_uw, validationInput_uw);
    return Utils.javaToJs(javaObject);
};


//
// static methods
//


/**
 * Method to train a gradient boosting model.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              For classification, labels should take values {0, 1, ..., numClasses-1}.
 *              For regression, labels are real numbers.
 * @param {BoostingStrategy} boostingStrategy  Configuration options for the boosting algorithm.
 * @returns {GradientBoostedTreesModel}  a gradient boosted trees model that can be used for prediction
 */
GradientBoostedTrees.train = function (input, boostingStrategy) {
    var input_uw = Utils.unwrapObject(input);
    var boostingStrategy_uw = Utils.unwrapObject(boostingStrategy);
    var javaObject = org.apache.spark.mllib.tree.GradientBoostedTrees.train(input_uw, boostingStrategy_uw);
    return Utils.javaToJs(javaObject);
};
