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

    var PredictionModel = require(EclairJS_Globals.NAMESPACE + '/ml/PredictionModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * [GBTs]{@link http://en.wikipedia.org/wiki/Gradient_boosting Gradient-Boosted Trees}
     * model for classification.
     * It supports binary labels, as well as both continuous and categorical features.
     * Note: Multiclass labels are not currently supported.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/classification
     * @param {string} uid
     * @param {DecisionTreeRegressionModel[]} trees   Decision trees in the ensemble.
     * @param {float[]} treeWeights   Weights for the decision trees in the ensemble.
     */
    var GBTClassificationModel = function (uid, trees, treeWeights) {
        this.logger = Logger.getLogger("ml_classification_GBTClassificationModel_js");
        var jvmObject;
        if (uid instanceof org.apache.spark.ml.classification.GBTClassificationModel) {
            jvmObject = uid;
        } else {
            var tress_uw = Utils.unwrapObject(trees);
            jvmObject = new org.apache.spark.ml.classification.GBTClassificationModel(uid, tress_uw, treeWeights);
        }

        PredictionModel.call(this, jvmObject);

    };

    GBTClassificationModel.prototype = Object.create(PredictionModel.prototype);

    GBTClassificationModel.prototype.constructor = GBTClassificationModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    GBTClassificationModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };


    /**
     * @returns {DecisionTreeModel[]}
     */
    GBTClassificationModel.prototype.trees = function () {
        var javaObject = this.getJavaObject().trees();
        return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {float[]}
     */
    GBTClassificationModel.prototype.treeWeights = function () {
        return this.getJavaObject().treeWeights();
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.GBTClassificationModel}
     */
    GBTClassificationModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new GBTClassificationModel(javaObject);
    };


    /**
     * @returns {string}
     */
    GBTClassificationModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * @returns {string}
     */
    GBTClassificationModel.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };

    module.exports = GBTClassificationModel;
})();