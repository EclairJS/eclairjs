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
     *
     * [Gradient-Boosted Trees (GBTs)]{@link http://en.wikipedia.org/wiki/Gradient_boosting}
     * model for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/regression
     * @oaram {string} uid
     * @param {DecisionTreeRegressionModel[]} trees   Decision trees in the ensemble.
     * @param {float[]} treeWeights   Weights for the decision trees in the ensemble.

     */
    var GBTRegressionModel = function (uid, trees, treeWeights) {
        this.logger = Logger.getLogger("ml_regression_GBTRegressionModel_js");
        var jvmObject;
        if (uid instanceof org.apache.spark.ml.regression.GBTRegressionModel) {
            jvmObject = uid;
        } else {
            var tress_uw = Utils.unwrapObject(trees);
            jvmObject = new org.apache.spark.ml.regression.GBTRegressionModel(uid, tress_uw, treeWeights);
        }
        PredictionModel.call(this, jvmObject);

    };

    GBTRegressionModel.prototype = Object.create(PredictionModel.prototype);

    GBTRegressionModel.prototype.constructor = GBTRegressionModel;


    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    GBTRegressionModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @returns {DecisionTreeModel[]}
     */
    GBTRegressionModel.prototype.trees = function () {
        var javaObject = this.getJavaObject().trees();
        return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {float[]}
     */
    GBTRegressionModel.prototype.treeWeights = function () {
        return this.getJavaObject().treeWeights();
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.GBTRegressionModel}
     */
    GBTRegressionModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new GBTRegressionModel(javaObject);
    };


    /**
     * @returns {string}
     */
    GBTRegressionModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * @returns {string}
     */
    GBTRegressionModel.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };

    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    GBTRegressionModel.prototype.write = function() {
       var javaObject =  this.getJavaObject().write();
       return Utils.javaToJs(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    GBTRegressionModel.read = function() {
       var javaObject =  org.apache.spark.ml.regression.GBTRegressionModel.read();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.GBTRegressionModel} 
     */
    GBTRegressionModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.regression.GBTRegressionModel.load(path);
       return new GBTRegressionModel(javaObject);
    };


    module.exports = GBTRegressionModel;
})();