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
     * Standardizes features by removing the mean and scaling to unit variance using column summary
     * statistics on the samples in the training set.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Estimator
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var StandardScaler = function(uid) {
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.StandardScaler) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.StandardScaler(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.StandardScaler();
        }

    	 this.logger = Logger.getLogger("StandardScaler_js");
    	 Estimator.call(this, jvmObject);
    
    };
    
    StandardScaler.prototype = Object.create(Estimator.prototype);
    
    StandardScaler.prototype.constructor = StandardScaler;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.StandardScaler} 
     */
    StandardScaler.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new StandardScaler(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.StandardScaler} 
     */
    StandardScaler.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new StandardScaler(javaObject);
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/mllib/feature.StandardScaler} 
     */
    StandardScaler.prototype.setWithMean = function(value) {
       var javaObject =  this.getJavaObject().setWithMean(value);
       return new StandardScaler(javaObject);
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/mllib/feature.StandardScaler} 
     */
    StandardScaler.prototype.setWithStd = function(value) {
       var javaObject =  this.getJavaObject().setWithStd(value);
       return new StandardScaler(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/feature.StandardScalerModel} 
     */
    StandardScaler.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    StandardScaler.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.StandardScaler} 
     */
    StandardScaler.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new StandardScaler(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.StandardScaler} 
     */
    StandardScaler.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.StandardScaler.load(path);
       return new StandardScaler(javaObject);
    };
    
    module.exports = StandardScaler;
})();