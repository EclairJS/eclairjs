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

    var PipelineStage = require(EclairJS_Globals.NAMESPACE + '/ml/PipelineStage');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * [Decision tree]{@link http://en.wikipedia.org/wiki/Decision_tree_learning} model for classification.
     * It supports both binary and multiclass labels, as well as both continuous and categorical
     * features.
     * @class
     * @memberof module:eclairjs/ml/classification
     */
    
    
    var DecisionTreeClassificationModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml.classification.DecisionTreeClassificationModel_js");
        PipelineStage.call(this, jvmObject);
    
    };
    
    DecisionTreeClassificationModel.prototype = Object.create(PipelineStage.prototype);
    
    DecisionTreeClassificationModel.prototype.constructor = DecisionTreeClassificationModel;


    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    DecisionTreeClassificationModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {module:eclairjs/ml/tree.Node}
     */
    DecisionTreeClassificationModel.prototype.rootNode = function () {
        return Utils.javaToJs(this.getJavaObject().rootNode());
    };

    /**
     * Returns the number of features the model was trained on. If unknown, returns -1
     * @returns {integer}
     */
    DecisionTreeClassificationModel.prototype.numFeatures = function () {
        return this.getJavaObject().numFeatures();
    };

    /**
     * Number of classes (values which the label can take).
     * @returns {integer}
     */
    DecisionTreeClassificationModel.prototype.numClasses = function () {
        return this.getJavaObject().numClasses();
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassificationModel} 
     */
    DecisionTreeClassificationModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new DecisionTreeClassificationModel(javaObject);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    DecisionTreeClassificationModel.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
        var schema_uw = Utils.unwrapObject(schema);
        var featuresDataType_uw = Utils.unwrapObject(featuresDataType);
        var javaObject = this.getJavaObject().validateAndTransformSchema(schema_uw, fitting, featuresDataType_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeClassificationModel.prototype.rawPredictionCol = function() {
        var javaObject =  this.getJavaObject().rawPredictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeClassificationModel.prototype.getRawPredictionCol = function() {
        return this.getJavaObject().getRawPredictionCol();
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeClassificationModel.prototype.labelCol = function() {
        var javaObject =  this.getJavaObject().labelCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeClassificationModel.prototype.getLabelCol = function() {
        return this.getJavaObject().getLabelCol();
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeClassificationModel.prototype.featuresCol = function() {
        var javaObject =  this.getJavaObject().featuresCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeClassificationModel.prototype.getFeaturesCol = function() {
        return this.getJavaObject().getFeaturesCol();
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    DecisionTreeClassificationModel.prototype.predictionCol = function() {
        var javaObject =  this.getJavaObject().predictionCol();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {string}
     */
    DecisionTreeClassificationModel.prototype.getPredictionCol = function() {
        return this.getJavaObject().getPredictionCol();
    };

    /**
     * @returns {string} 
     */
    DecisionTreeClassificationModel.prototype.toString = function() {
       return  this.getJavaObject().toString();
    };

    /**
     * @returns {string}
     */
    DecisionTreeClassificationModel.prototype.toDebugString = function() {
        return  this.getJavaObject().toDebugString();
    };

    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    DecisionTreeClassificationModel.prototype.write = function() {
       var javaObject =  this.getJavaObject().write();
       return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     * @static
     */
    DecisionTreeClassificationModel.read = function() {
       var javaObject =  org.apache.spark.ml.classification.DecisionTreeClassificationModel.read();
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} path
     * @static
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassificationModel}
     */
    DecisionTreeClassificationModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.classification.DecisionTreeClassificationModel.load(path);
       return new DecisionTreeClassificationModel(javaObject);
    };


    module.exports = DecisionTreeClassificationModel;
})();