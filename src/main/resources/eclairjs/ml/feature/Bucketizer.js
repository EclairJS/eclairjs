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
     * `Bucketizer` maps a column of continuous features to a column of feature buckets.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var Bucketizer = function(uid) {

    	 this.logger = Logger.getLogger("ml.feature.Bucketizer_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.Bucketizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.Bucketizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.Bucketizer();
        }

        JavaWrapper.call(this, jvmObject);
    
    };
    
    Bucketizer.prototype = Object.create(JavaWrapper.prototype);
    
    Bucketizer.prototype.constructor = Bucketizer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Bucketizer.prototype.uid = function() {
        return  this.getJavaObject().uid();
    };
    
    /**
     * @returns {float[]}
     */
    Bucketizer.prototype.getSplits = function() {
       return  this.getJavaObject().getSplits();
    };
    
    
    /**
     * @param {float[]} value
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.setSplits = function(value) {
       var javaObject =  this.getJavaObject().setSplits(value);
       return new Bucketizer(javaObject);
    };

    /**
     * Parameter for mapping continuous features into buckets.
     * @returns {module:eclairjs/ml/param.DoubleArrayParam}
     */
    Bucketizer.prototype.splits = function() {
        var javaObject =  this.getJavaObject().splits();
        return  Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new Bucketizer(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new Bucketizer(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    Bucketizer.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Bucketizer.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new Bucketizer(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.Bucketizer.load(path);
       return new Bucketizer(javaObject);
    };
    
    module.exports = Bucketizer;
})();