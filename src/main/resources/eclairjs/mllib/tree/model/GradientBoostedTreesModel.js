/**
 * Created by billreed on 4/11/16.
 *//*
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
    /**
     * Represents a gradient boosted trees model.
     *
     * @param algo algorithm for the ensemble model, either Classification or Regression
     * @param trees tree ensembles
     * @param treeWeights tree ensemble weights
     * @classdesc
     */

    /**
     * @param {Algo} algo
     * @param {DecisionTreeModel[]} trees
     * @param {number[]} treeWeights
     * @returns {??}
     *  @class
     *  @memberof module:eclairjs/mllib/tree/model
     */
    var GradientBoostedTreesModel = function (algo, trees, treeWeights) {
        this.logger = Logger.getLogger("GradientBoostedTreesModel_js");
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.tree.model.GradientBoostedTreesModel) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.tree.model.GradientBoostedTreesModel(Utils.unwrapObject(arguments[0]),
                Utils.unwrapObject(trees),
                treeWeights
            );
        }
        JavaWrapper.call(this, jvmObject);

    };

    GradientBoostedTreesModel.prototype = Object.create(JavaWrapper.prototype);

    GradientBoostedTreesModel.prototype.constructor = GradientBoostedTreesModel;


    /**
     * @param {SparkContext} sc   Spark context used to save model data.
     * @param {string} path   Path specifying the directory in which to save this model.
     *              If the directory already exists, this method throws an exception.
     */
    GradientBoostedTreesModel.prototype.save = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(), path);
    };


    /**
     * Method to compute error or loss for every iteration of gradient boosting.
     * @param {RDD} data  RDD of {@link LabeledPoint}
     * @param {Loss} loss  evaluation metric.
     *         containing the first i+1 trees
     * @returns {number[]}  an array with index i having the losses or errors for the ensemble
     */
    GradientBoostedTreesModel.prototype.evaluateEachIteration = function (data, loss) {
        throw "not implemented by ElairJS";
//   var data_uw = Utils.unwrapObject(data);
//   var loss_uw = Utils.unwrapObject(loss);
//   return  this.getJavaObject().evaluateEachIteration(data_uw,loss_uw);
    };

    GradientBoostedTreesModel.prototype.predict = function (features) {
        var features_uw = Utils.unwrapObject(features);
        return this.getJavaObject().predict(features_uw);
    };

    /**
     * Print the full model to a string.
     * @returns {string}
     */
    GradientBoostedTreesModel.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };

    /**
     * Print a summary of the model.
     * @returns {string}
     */
    GradientBoostedTreesModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

//
// static methods
//

    /**
     * @param {SparkContext} sc   Spark context used for loading model files.
     * @param {string} path   Path specifying the directory to which the model was saved.
     * @returns {GradientBoostedTreesModel}   Model instance
     */
    GradientBoostedTreesModel.load = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        var javaObject = org.apache.spark.mllib.tree.model.GradientBoostedTreesModel.load(sc_uw.sc(), path);
        return new GradientBoostedTreesModel(javaObject);
    };

    module.exports = GradientBoostedTreesModel;

})();