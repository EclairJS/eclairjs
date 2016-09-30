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

    var ProbabilisticClassificationModel = require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassificationModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * [Random Forest]{@link http://en.wikipedia.org/wiki/Random_forest} model for classification.
     * It supports both binary and multiclass labels, as well as both continuous and categorical
     * features.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassificationModel
     * @memberof module:eclairjs/ml/classification
     */


    var RandomForestClassificationModel = function (jvmObject) {

        this.logger = Logger.getLogger("ml_classification_RandomForestClassificationModel_js");
        ProbabilisticClassificationModel.call(this, jvmObject);

    };

    RandomForestClassificationModel.prototype = Object.create(ProbabilisticClassificationModel.prototype);

    RandomForestClassificationModel.prototype.constructor = RandomForestClassificationModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {module:eclairjs/ml/tree.DecisionTreeModel[]}
     */
    RandomForestClassificationModel.prototype.trees = function () {
        var javaObject = this.getJavaObject().trees();
        return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {float[]}
     */
    RandomForestClassificationModel.prototype.treeWeights = function () {
        return this.getJavaObject().treeWeights();
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.RandomForestClassificationModel}
     */
    RandomForestClassificationModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new RandomForestClassificationModel(javaObject);
    };


    /**
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };

    /**
     * Estimate of the importance of each feature.
     * This generalizes the idea of "Gini" importance to other losses, following the explanation of Gini importance
     * from "Random Forests" documentation by Leo Breiman and Adele Cutler, and following the implementation from scikit-learn.
     * This feature importance is calculated as follows: - Average over trees: - importance(feature j) = sum
     * (over nodes which split on feature j) of the gain, where gain is scaled by the number of instances passing
     * through node - Normalize importances for tree based on total number of training instances used to build tree. -
     * Normalize feature importance vector to sum to 1.
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    RandomForestClassificationModel.prototype.featureImportances = function () {
        return Utils.javaToJs(this.getJavaObject().featureImportances());
    };

    /**
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassificationModel.prototype.rawPredictionCol = function () {
        var javaObject = this.getJavaObject().rawPredictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.getRawPredictionCol = function () {
        return this.getJavaObject().getRawPredictionCol();
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassificationModel.prototype.labelCol = function () {
        var javaObject = this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.getLabelCol = function () {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassificationModel.prototype.featuresCol = function () {
        var javaObject = this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.getFeaturesCol = function () {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassificationModel.prototype.predictionCol = function () {
        var javaObject = this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestClassificationModel.prototype.getPredictionCol = function () {
        return this.getJavaObject().getPredictionCol();
    };

    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    RandomForestClassificationModel.prototype.write = function() {
       var javaObject =  this.getJavaObject().write();
       return Utils.javaToJs(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    RandomForestClassificationModel.read = function() {
       var javaObject =  org.apache.spark.ml.classification.RandomForestClassificationModel.read();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/classification.RandomForestClassificationModel} 
     */
    RandomForestClassificationModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.classification.RandomForestClassificationModel.load(path);
       return new RandomForestClassificationModel(javaObject);
    };
    

    module.exports = RandomForestClassificationModel;
})();