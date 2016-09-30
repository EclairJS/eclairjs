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
     * Model fitted by {@link PCA}.
     *
     * @param pc A principal components Matrix. Each column is one principal component.
     * @class
     * @memberof module:eclairjs/ml/feature
     */


    var PCAModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("spark.ml.feature.PCAModel_js");
    	 //MLWritable.call(this, jvmObject);
         JavaWrapper.call(this, jvmObject);
 
    };
    
    //PCAModel.prototype = Object.create(MLWritable.prototype);
    PCAModel.prototype = Object.create(JavaWrapper.prototype);
    
    PCAModel.prototype.constructor = PCAModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    PCAModel.prototype.uid = function() {
        return  this.getJavaObject().uid();
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.PCAModel} 
     */
    PCAModel.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new PCAModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.PCAModel} 
     */
    PCAModel.prototype.setOutputCol = function(value) {
        var javaObject =  this.getJavaObject().setOutputCol(value);
        return new PCAModel(javaObject);
    };
    
    
    /**
     * Transform a vector by computed Principal Components.
     * NOTE: Vectors to be transformed must be the same length
     * as the source vectors given to [[PCA.fit()]].
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset} 
     */
    PCAModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {StructType} schema
     * @returns {StructType} 
     */
    PCAModel.prototype.transformSchema = function(schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.PCAModel} 
     */
    PCAModel.prototype.copy = function(extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject =  this.getJavaObject().copy(extra_uw);
        return new PCAModel(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    PCAModel.prototype.write = function() {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    PCAModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject =  org.apache.spark.ml.feature.PCAModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.PCAModel} 
     */
    PCAModel.load = function(path) {
        var javaObject =  org.apache.spark.ml.feature.PCAModel.load(path);
        return new PCAModel(javaObject);
    };
    
    module.exports = PCAModel;
})();
