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

    var Predictor = require(EclairJS_Globals.NAMESPACE + '/ml/Predictor');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * [Random Forest]{@link http://en.wikipedia.org/wiki/Random_forest} learning algorithm for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/regression
     * @param {string} [uid]
     */
    var RandomForestRegressor = function(uid) {
    	 this.logger = Logger.getLogger("ml_regression_RandomForestRegressor_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.regression.RandomForestRegressor) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.regression.RandomForestRegressor(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.regression.RandomForestRegressor();
        }
        Predictor.call(this, jvmObject);
    
    };
    
    RandomForestRegressor.prototype = Object.create(Predictor.prototype);
    
    RandomForestRegressor.prototype.constructor = RandomForestRegressor;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    RandomForestRegressor.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setMaxDepth = function(value) {
       var javaObject =  this.getJavaObject().setMaxDepth(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setMaxBins = function(value) {
       var javaObject =  this.getJavaObject().setMaxBins(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setMinInstancesPerNode = function(value) {
       var javaObject =  this.getJavaObject().setMinInstancesPerNode(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setMinInfoGain = function(value) {
       var javaObject =  this.getJavaObject().setMinInfoGain(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setMaxMemoryInMB = function(value) {
       var javaObject =  this.getJavaObject().setMaxMemoryInMB(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setCacheNodeIds = function(value) {
       var javaObject =  this.getJavaObject().setCacheNodeIds(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setCheckpointInterval = function(value) {
       var javaObject =  this.getJavaObject().setCheckpointInterval(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setImpurity = function(value) {
       var javaObject =  this.getJavaObject().setImpurity(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setSubsamplingRate = function(value) {
       var javaObject =  this.getJavaObject().setSubsamplingRate(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setSeed = function(value) {
       var javaObject =  this.getJavaObject().setSeed(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setNumTrees = function(value) {
       var javaObject =  this.getJavaObject().setNumTrees(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.setFeatureSubsetStrategy = function(value) {
       var javaObject =  this.getJavaObject().setFeatureSubsetStrategy(value);
       return new RandomForestRegressor(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor} 
     */
    RandomForestRegressor.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new RandomForestRegressor(javaObject);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    RandomForestRegressor.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressor.prototype.labelCol = function () {
        var javaObject = this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestRegressor.prototype.getLabelCol = function () {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressor.prototype.featuresCol = function () {
        var javaObject = this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestRegressor.prototype.getFeaturesCol = function () {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressor.prototype.predictionCol = function () {
        var javaObject = this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    RandomForestRegressor.prototype.getPredictionCol = function () {
        return this.getJavaObject().getPredictionCol();
    };

    /*
     static methods

     */

    /**
     * Accessor for supported impurity settings: entropy, gini
     * @returns {string[]}
     */
    RandomForestRegressor.supportedImpurities = function () {
        var javaObject = org.apache.spark.ml.classification.RandomForestClassifier.supportedImpurities();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Accessor for supported featureSubsetStrategy settings: auto, all, onethird, sqrt, log2
     * @returns {string[]}
     */
    RandomForestRegressor.supportedFeatureSubsetStrategies = function () {
        var javaObject = org.apache.spark.ml.classification.RandomForestClassifier.supportedFeatureSubsetStrategies();
        return Utils.javaToJs(javaObject);
    };

    module.exports = RandomForestRegressor;
})();