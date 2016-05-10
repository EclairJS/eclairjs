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
    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Model fitted by {@link IDF}.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Model
     */
    
    
    var IDFModel = function(obj) {
        var jvmObject;
       if (obj instanceof org.apache.spark.ml.feature.IDFModel) {
           jvmObject = obj;
       } else {
           jvmObject = new org.apache.spark.ml.feature.IDFModel();
       }

    	 this.logger = Logger.getLogger("IDFModel_js");
    	 Model.call(this, jvmObject);
    
    };
    
    IDFModel.prototype = Object.create(Model.prototype);
    
    IDFModel.prototype.constructor = IDFModel;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.IDFModel} 
     */
    IDFModel.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new IDFModel(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.IDFModel} 
     */
    IDFModel.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new IDFModel(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    IDFModel.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    IDFModel.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.IDFModel} 
     */
    IDFModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new IDFModel(javaObject);
    };
    
    
    /**
     *  Returns the IDF vector. 
     * @returns {module:eclairjs/mllib/linalg.Vector} 
     */
    IDFModel.prototype.idf = function() {
       var javaObject =  this.getJavaObject().idf();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    IDFModel.prototype.write = function() {
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
    IDFModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject =  org.apache.spark.ml.feature.IDFModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.IDFModel} 
     */
    IDFModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.IDFModel.load(path);
       return new IDFModel(javaObject);
    };
    
    module.exports = IDFModel;
})();