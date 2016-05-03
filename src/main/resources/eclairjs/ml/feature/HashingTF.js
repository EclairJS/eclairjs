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
    var Transformer = require(EclairJS_Globals.NAMESPACE + '/ml/Transformer');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Maps a sequence of terms to their term frequencies using the hashing trick.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Transformer
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var HashingTF = function(uid) {
    	 this.logger = Logger.getLogger("HashingTF_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.HashingTF) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.HashingTF(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.HashingTF();
        }
    	 Transformer.call(this, jvmObject);
    
    };
    
    HashingTF.prototype = Object.create(Transformer.prototype);
    
    HashingTF.prototype.constructor = HashingTF;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.HashingTF} 
     */
    HashingTF.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new HashingTF(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.HashingTF} 
     */
    HashingTF.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new HashingTF(javaObject);
    };
    
    
    /**
     * @returns {number} 
     */
    HashingTF.prototype.getNumFeatures = function() {
       return  this.getJavaObject().getNumFeatures();
    };
    
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/feature.HashingTF} 
     */
    HashingTF.prototype.setNumFeatures = function(value) {
       var javaObject =  this.getJavaObject().setNumFeatures(value);
       return new HashingTF(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    HashingTF.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    HashingTF.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.HashingTF} 
     */
    HashingTF.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new HashingTF(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.HashingTF} 
     */
    HashingTF.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.HashingTF.load(path);
       return new HashingTF(javaObject);
    };
    
    module.exports = HashingTF;
})();