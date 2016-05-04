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
     * A feature transformer that filters out stop words from input.
     * Note: null values from input array are preserved unless adding null to stopWords explicitly.
     * @see [[http://en.wikipedia.org/wiki/Stop_words]]
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Transformer
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var StopWordsRemover = function(uid) {
         var jvmObject;
         if (uid) {
             if (uid instanceof org.apache.spark.ml.feature.StopWordsRemover) {
                 jvmObject = uid;
             } else {
                 jvmObject = new org.apache.spark.ml.feature.StopWordsRemover(uid);
             }
         } else {
             jvmObject = new org.apache.spark.ml.feature.StopWordsRemover();
         }

    	 this.logger = Logger.getLogger("StopWordsRemover_js");
    	 Transformer.call(this, jvmObject);
    
    };
    
    StopWordsRemover.prototype = Object.create(Transformer.prototype);
    
    StopWordsRemover.prototype.constructor = StopWordsRemover;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StopWordsRemover} 
     */
    StopWordsRemover.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new StopWordsRemover(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StopWordsRemover} 
     */
    StopWordsRemover.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new StopWordsRemover(javaObject);
    };
    
    
    /**
     * @param {string[]} value
     * @returns {module:eclairjs/ml/feature.StopWordsRemover} 
     */
    StopWordsRemover.prototype.setStopWords = function(value) {
       var javaObject =  this.getJavaObject().setStopWords(value);
       return new StopWordsRemover(javaObject);
    };
    
    
    /**
     * @returns {string[]} 
     */
    StopWordsRemover.prototype.getStopWords = function() {
       return  this.getJavaObject().getStopWords();
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.StopWordsRemover} 
     */
    StopWordsRemover.prototype.setCaseSensitive = function(value) {
       var javaObject =  this.getJavaObject().setCaseSensitive(value);
       return new StopWordsRemover(javaObject);
    };
    
    
    /**
     * @returns {boolean} 
     */
    StopWordsRemover.prototype.getCaseSensitive = function() {
       return  this.getJavaObject().getCaseSensitive();
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame} 
     */
    StopWordsRemover.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    StopWordsRemover.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.StopWordsRemover} 
     */
    StopWordsRemover.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new StopWordsRemover(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.StopWordsRemover} 
     */
    StopWordsRemover.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.StopWordsRemover.load(path);
       return new StopWordsRemover(javaObject);
    };
    
    module.exports = StopWordsRemover;
})();