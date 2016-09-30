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
    var UnaryTransformer = require(EclairJS_Globals.NAMESPACE + '/ml/UnaryTransformer');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * A regex based tokenizer that extracts tokens either by using the provided regex pattern to split
     * the text (default) or repeatedly matching the regex (if `gaps` is false).
     * Optional parameters also allow filtering tokens using a minimal length.
     * It returns an array of strings that can be empty.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.UnaryTransformer
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var RegexTokenizer = function(uid) {
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.RegexTokenizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.RegexTokenizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.RegexTokenizer();
        }
    	 this.logger = Logger.getLogger("RegexTokenizer_js");
    	 UnaryTransformer.call(this, jvmObject);
    
    };
    
    RegexTokenizer.prototype = Object.create(UnaryTransformer.prototype);
    
    RegexTokenizer.prototype.constructor = RegexTokenizer;
    
    
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.RegexTokenizer} 
     */
    RegexTokenizer.prototype.setMinTokenLength = function(value) {
       var javaObject =  this.getJavaObject().setMinTokenLength(value);
       return new RegexTokenizer(javaObject);
    };
    
    
    /**
     * @returns {number} 
     */
    RegexTokenizer.prototype.getMinTokenLength = function() {
       return  this.getJavaObject().getMinTokenLength();
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.RegexTokenizer} 
     */
    RegexTokenizer.prototype.setGaps = function(value) {
       var javaObject =  this.getJavaObject().setGaps(value);
       return new RegexTokenizer(javaObject);
    };
    
    
    /**
     * @returns {boolean} 
     */
    RegexTokenizer.prototype.getGaps = function() {
       return  this.getJavaObject().getGaps();
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.RegexTokenizer} 
     */
    RegexTokenizer.prototype.setPattern = function(value) {
       var javaObject =  this.getJavaObject().setPattern(value);
       return new RegexTokenizer(javaObject);
    };
    
    
    /**
     * @returns {string} 
     */
    RegexTokenizer.prototype.getPattern = function() {
       return  this.getJavaObject().getPattern();
    };
    
    
    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.RegexTokenizer} 
     */
    RegexTokenizer.prototype.setToLowercase = function(value) {
       var javaObject =  this.getJavaObject().setToLowercase(value);
       return new RegexTokenizer(javaObject);
    };
    
    
    /**
     * @returns {boolean} 
     */
    RegexTokenizer.prototype.getToLowercase = function() {
       return  this.getJavaObject().getToLowercase();
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.RegexTokenizer} 
     */
    RegexTokenizer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new RegexTokenizer(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.RegexTokenizer} 
     */
    RegexTokenizer.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.RegexTokenizer.load(path);
       return new RegexTokenizer(javaObject);
    };
    
    module.exports = RegexTokenizer;
})();