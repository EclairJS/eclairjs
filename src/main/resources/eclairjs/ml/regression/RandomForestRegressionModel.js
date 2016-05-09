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
     * [Random Forest]{@link http://en.wikipedia.org/wiki/Random_forest}  model for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/regression
     */
    
    
    var RandomForestRegressionModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_regression_RandomForestRegressionModel_js");
        PredictionModel.call(this, jvmObject);
    
    };
    
    RandomForestRegressionModel.prototype = Object.create(PredictionModel.prototype);
    
    RandomForestRegressionModel.prototype.constructor = RandomForestRegressionModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    RandomForestRegressionModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @returns {DecisionTreeModel[]} 
     */
    RandomForestRegressionModel.prototype.trees = function() {
       var javaObject =  this.getJavaObject().trees();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @returns {float[]}
     */
    RandomForestRegressionModel.prototype.treeWeights = function() {
        var javaObject =   this.getJavaObject().treeWeights();
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.RandomForestRegressionModel} 
     */
    RandomForestRegressionModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new RandomForestRegressionModel(javaObject);
    };
    
    
    /**
     * @returns {string} 
     */
    RandomForestRegressionModel.prototype.toString = function() {
       return  this.getJavaObject().toString();
    };

    /**
     * @returns {string}
     */
    RandomForestRegressionModel.prototype.toDebugString = function() {
        return  this.getJavaObject().toDebugString();
    };

    /**
     * Estimate of the importance of each feature.
     * This generalizes the idea of "Gini" importance to other losses, following the explanation of Gini importance
     * from "Random Forests" documentation by Leo Breiman and Adele Cutler, and following the implementation from scikit-learn.
     * This feature importance is calculated as follows: - Average over trees: - importance(feature j) = sum (over nodes which split on feature j)
     * of the gain, where gain is scaled by the number of instances passing through node - Normalize importances for
     * tree based on total number of training instances used to build tree. - Normalize feature importance vector to sum to 1.
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    RandomForestRegressionModel.prototype.featureImportances = function () {
        return Utils.javaToJs(this.getJavaObject().featureImportances());
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    RandomForestRegressionModel.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressionModel.prototype.labelCol = function () {
        var javaObject = this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestRegressionModel.prototype.getLabelCol = function () {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressionModel.prototype.featuresCol = function () {
        var javaObject = this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestRegressionModel.prototype.getFeaturesCol = function () {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressionModel.prototype.predictionCol = function () {
        var javaObject = this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestRegressionModel.prototype.getPredictionCol = function () {
        return this.getJavaObject().getPredictionCol();
    };

    module.exports = RandomForestRegressionModel;
})();