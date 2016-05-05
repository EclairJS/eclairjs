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
     * Classification model based on the Multilayer Perceptron.
     * Each layer has sigmoid activation function, output layer has softmax.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/classification
     */
    
    
    var MultilayerPerceptronClassificationModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_classification_MultilayerPerceptronClassificationModel_js");
        PredictionModel.call(this, jvmObject);
    
    };
    
    MultilayerPerceptronClassificationModel.prototype = Object.create(PredictionModel.prototype);
    
    MultilayerPerceptronClassificationModel.prototype.constructor = MultilayerPerceptronClassificationModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MultilayerPerceptronClassificationModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {integer[]}
     */
    MultilayerPerceptronClassificationModel.prototype.layers = function () {
        return Utils.javaToJs(this.getJavaObject().layers());
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    MultilayerPerceptronClassificationModel.prototype.weights = function () {
        return Utils.javaToJs(this.getJavaObject().weights());
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassificationModel} 
     */
    MultilayerPerceptronClassificationModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new MultilayerPerceptronClassificationModel(javaObject);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    MultilayerPerceptronClassificationModel.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassificationModel.prototype.labelCol = function() {
        var javaObject =  this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    MultilayerPerceptronClassificationModel.prototype.getLabelCol = function() {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassificationModel.prototype.featuresCol = function() {
        var javaObject =  this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    MultilayerPerceptronClassificationModel.prototype.getFeaturesCol = function() {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassificationModel.prototype.predictionCol = function() {
        var javaObject =  this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    MultilayerPerceptronClassificationModel.prototype.getPredictionCol = function() {
        return this.getJavaObject().getPredictionCol();
    };

    module.exports = MultilayerPerceptronClassificationModel;
})();