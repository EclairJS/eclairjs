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
     * [Decision tree]{@link http://en.wikipedia.org/wiki/Decision_tree_learning} learning algorithm
     * for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/regression
     * @param {string} [uid]
     */
    var DecisionTreeRegressor = function(uid) {

        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.regression.DecisionTreeRegressor) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.regression.DecisionTreeRegressor(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.regression.DecisionTreeRegressor();
        }
        Predictor.call(this, jvmObject);
    
    };
    
    DecisionTreeRegressor.prototype = Object.create(Predictor.prototype);
    
    DecisionTreeRegressor.prototype.constructor = DecisionTreeRegressor;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    DecisionTreeRegressor.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setMaxDepth = function(value) {
       var javaObject =  this.getJavaObject().setMaxDepth(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setMaxBins = function(value) {
       var javaObject =  this.getJavaObject().setMaxBins(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setMinInstancesPerNode = function(value) {
       var javaObject =  this.getJavaObject().setMinInstancesPerNode(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setMinInfoGain = function(value) {
       var javaObject =  this.getJavaObject().setMinInfoGain(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setMaxMemoryInMB = function(value) {
       var javaObject =  this.getJavaObject().setMaxMemoryInMB(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setCacheNodeIds = function(value) {
       var javaObject =  this.getJavaObject().setCacheNodeIds(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setCheckpointInterval = function(value) {
       var javaObject =  this.getJavaObject().setCheckpointInterval(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setImpurity = function(value) {
       var javaObject =  this.getJavaObject().setImpurity(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setSeed = function(value) {
       var javaObject =  this.getJavaObject().setSeed(value);
       return new DecisionTreeRegressor(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.setVarianceCol = function(value) {
       var javaObject =  this.getJavaObject().setVarianceCol(value);
       return new DecisionTreeRegressor(javaObject);
    };
    

    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new DecisionTreeRegressor(javaObject);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    DecisionTreeRegressor.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };
    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeRegressor.prototype.labelCol = function() {
        var javaObject =  this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeRegressor.prototype.getLabelCol = function() {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeRegressor.prototype.featuresCol = function() {
        var javaObject =  this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeRegressor.prototype.getFeaturesCol = function() {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeRegressor.prototype.predictionCol = function() {
        var javaObject =  this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeRegressor.prototype.getPredictionCol = function() {
        return this.getJavaObject().getPredictionCol();
    };

    /*
    static methods
     */
    /**
     * Accessor for supported impurities: variance
     * @returns {string[]}
     */
    DecisionTreeRegressor.supportedImpurities = function() {
        return org.apache.spark.ml.regression.DecisionTreeRegressor.supportedImpurities();
    }

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor} 
     */
    DecisionTreeRegressor.load = function(path) {
       var javaObject =  org.apache.spark.ml.regression.DecisionTreeRegressor.load(path);
       return new DecisionTreeRegressor(javaObject);
    };
    

    
    module.exports = DecisionTreeRegressor;
})();