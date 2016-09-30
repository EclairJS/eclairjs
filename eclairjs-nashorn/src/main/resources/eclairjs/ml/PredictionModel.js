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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Abstraction for a model for prediction tasks (regression and classification).
     *
     *                       E.g., {@link VectorUDT} for vector features.
     *            parameter to specify the concrete type for the corresponding model.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Model
     */

    var PredictionModel = function(jvmObject) {

    	 this.logger = Logger.getLogger("ml.PredictionModel_js");
    	 Model.call(this, jvmObject);
    
    };
    
    PredictionModel.prototype = Object.create(Model.prototype);
    
    PredictionModel.prototype.constructor = PredictionModel;
    
    
    
    /**
     * @param {string} value
     * @returns {object} 
     */
    PredictionModel.prototype.setFeaturesCol = function(value) {
       var javaObject =  this.getJavaObject().setFeaturesCol(value);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {object} 
     */
    PredictionModel.prototype.setPredictionCol = function(value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @returns {integer}
     */
    PredictionModel.prototype.numFeatures = function() {
       return  this.getJavaObject().numFeatures();
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    PredictionModel.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * Transforms dataset by reading from {@link featuresCol}, calling [[predict()]], and storing
     * the predictions as a new column {@link predictionCol}.
     *
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @returns {module:eclairjs/sql.Dataset}  transformed dataset with [[predictionCol]] of type [[Double]]
     */
    PredictionModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    PredictionModel.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };
    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    PredictionModel.prototype.labelCol = function() {
        var javaObject =  this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    PredictionModel.prototype.getLabelCol = function() {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    PredictionModel.prototype.featuresCol = function() {
        var javaObject =  this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    PredictionModel.prototype.getFeaturesCol = function() {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    PredictionModel.prototype.predictionCol = function() {
        var javaObject =  this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    PredictionModel.prototype.getPredictionCol = function() {
        return this.getJavaObject().getPredictionCol();
    };


    module.exports = PredictionModel;
})();