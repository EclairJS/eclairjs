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

    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var UnaryTransformer = require(EclairJS_Globals.NAMESPACE + '/ml/UnaryTransformer');

    
    
    /**
     * @classdesc
     * A tokenizer that converts the input string to lowercase and then splits it by white spaces.
     *
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.UnaryTransformer
     */
    
    /**
     * @param {string} [uid]
     * @constructor
     */
    var Tokenizer = function(uid) {
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.Tokenizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.Tokenizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.Tokenizer();
        }
    	 this.logger = Logger.getLogger("ml_feature_Tokenizer_js");
        UnaryTransformer.call(this, jvmObject);
    
    };
    
    Tokenizer.prototype = Object.create(UnaryTransformer.prototype);
    
    Tokenizer.prototype.constructor = Tokenizer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Tokenizer.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     *
     * @returns {string}
     */
    Tokenizer.prototype.getOutputCol = function () {
        return this.getJavaObject().getOutputCol();
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.Tokenizer} 
     */
    Tokenizer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new Tokenizer(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Tokenizer} 
     */
    Tokenizer.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.Tokenizer.load(path);
       return new Tokenizer(javaObject);
    };
    
    module.exports = Tokenizer;
})();