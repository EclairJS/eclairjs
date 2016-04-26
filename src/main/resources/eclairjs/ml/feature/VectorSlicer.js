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
     * This class takes a feature vector and outputs a new feature vector with a subarray of the
     * original features.
     *
     * The subset of features can be specified with either indices ([[setIndices()]])
     * or names ([[setNames()]]).  At least one feature must be selected. Duplicate features
     * are not allowed, so there can be no overlap between selected indices and names.
     *
     * The output vector will order features with the selected indices first (in the order given),
     * followed by the selected names (in the order given).
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Transformer
     * @param {string} [uid]
     * @constructor
     */
    var VectorSlicer = function(uid) {
    	 var jvmObject;
    	  if (arguments[0]) {
            if (uid instanceof org.apache.spark.ml.feature.VectorSlicer) {
                jvmObject = uid;
            } else {
    	     jvmObject = new org.apache.spark.ml.feature.VectorSlicer(uid);
            }
    	  }
          else
    	   jvmObject = new org.apache.spark.ml.feature.VectorSlicer();
    	 this.logger = Logger.getLogger("VectorSlicer_js");
    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    VectorSlicer.prototype = Object.create(JavaWrapper.prototype);
    
    VectorSlicer.prototype.constructor = VectorSlicer;
    
    
    
    /**
     * @returns {number[]} 
     */
    VectorSlicer.prototype.getIndices = function() {
       return  this.getJavaObject().getIndices();
    };
    
    
    /**
     * @param {number[]} value
     * @returns {module:eclairjs/ml/feature.VectorSlicer} 
     */
    VectorSlicer.prototype.setIndices = function(value) {
       var javaObject =  this.getJavaObject().setIndices(value);
       return new VectorSlicer(javaObject);
    };
    
    
    /**
     * @returns {string[]} 
     */
    VectorSlicer.prototype.getNames = function() {
       return  this.getJavaObject().getNames();
    };
    
    
    /**
     * @param {string[]} value
     * @returns {module:eclairjs/ml/feature.VectorSlicer} 
     */
    VectorSlicer.prototype.setNames = function(value) {
       var javaObject =  this.getJavaObject().setNames(value);
       return new VectorSlicer(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorSlicer} 
     */
    VectorSlicer.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new VectorSlicer(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorSlicer} 
     */
    VectorSlicer.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new VectorSlicer(javaObject);
    };
    
    
    
    VectorSlicer.prototype.validateParams = function() {
        this.getJavaObject().validateParams();
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    VectorSlicer.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    VectorSlicer.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.VectorSlicer} 
     */
    VectorSlicer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new VectorSlicer(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.VectorSlicer} 
     */
    VectorSlicer.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.VectorSlicer.load(path);
       return new VectorSlicer(javaObject);
    };
    
    module.exports = VectorSlicer;
})();