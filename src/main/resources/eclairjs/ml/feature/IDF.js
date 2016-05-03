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
    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Compute the Inverse Document Frequency (IDF) given a collection of documents.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Estimator
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var IDF = function(uid) {
           if (uid) {
               if (uid instanceof org.apache.spark.ml.feature.IDF) {
                   jvmObject = uid;
               } else {
                   jvmObject = new org.apache.spark.ml.feature.IDF(uid);
               }
           } else {
               jvmObject = new org.apache.spark.ml.feature.IDF();
           }
 	 this.logger = Logger.getLogger("IDF_js");
    	 Estimator.call(this, jvmObject);
    
    };
    
    IDF.prototype = Object.create(Estimator.prototype);
    
    IDF.prototype.constructor = IDF;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.IDF} 
     */
    IDF.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new IDF(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.IDF} 
     */
    IDF.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new IDF(javaObject);
    };
    
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/feature.IDF} 
     */
    IDF.prototype.setMinDocFreq = function(value) {
       var javaObject =  this.getJavaObject().setMinDocFreq(value);
       return new IDF(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/mllib/feature.IDFModel} 
     */
    IDF.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    IDF.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.IDF} 
     */
    IDF.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new IDF(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.IDF} 
     */
    IDF.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.IDF.load(path);
       return new IDF(javaObject);
    };
    
    module.exports = IDF;
})();