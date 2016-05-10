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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Model fitted by {@link ChiSqSelector}.
     * @class
     * @memberof module:eclairjs/ml/feature
     */
    
    
    var ChiSqSelectorModel = function(jvmObject) {

        this.logger = Logger.getLogger("ChiSqSelectorModel_js");
        //MLWritable.call(this, jvmObject);
        JavaWrapper.call(this, jvmObject);
    
    };
    
    //ChiSqSelectorModel.prototype = Object.create(MLWritable.prototype);
    ChiSqSelectorModel.prototype = Object.create(JavaWrapper.prototype);
    
    ChiSqSelectorModel.prototype.constructor = ChiSqSelectorModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    ChiSqSelectorModel.prototype.uid = function() {
        return  this.getJavaObject().uid();
    };

    /**
     * @returns {integer[]}
     */
    ChiSqSelectorModel.prototype.selectedFeatures = function() {
        return  this.getJavaObject().selectedFeatures();
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.setFeaturesCol = function(value) {
       var javaObject =  this.getJavaObject().setFeaturesCol(value);
       return new ChiSqSelectorModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new ChiSqSelectorModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.setLabelCol = function(value) {
       var javaObject =  this.getJavaObject().setLabelCol(value);
       return new ChiSqSelectorModel(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    ChiSqSelectorModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    ChiSqSelectorModel.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new ChiSqSelectorModel(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    ChiSqSelectorModel.prototype.write = function() {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    /**
     * Number of features that selector will select (ordered by statistic value descending).
     * If the number of features is < numTopFeatures, then this will select all features. The default value of numTopFeatures is 50.
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    ChiSqSelectorModel.prototype.numTopFeatures = function() {
        var javaObject =  this.getJavaObject().numTopFeatures();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {integer}
     */
    ChiSqSelectorModel.prototype.getNumTopFeatures = function() {
        return this.getJavaObject().getNumTopFeatures();
    };

    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    ChiSqSelectorModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject =  org.apache.spark.ml.feature.ChiSqSelectorModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.ChiSqSelectorModel.load(path);
       return new ChiSqSelectorModel(javaObject);
    };
    
    module.exports = ChiSqSelectorModel;
})();