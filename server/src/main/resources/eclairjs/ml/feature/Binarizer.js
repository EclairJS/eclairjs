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
     * :: Experimental ::
     * Binarize a column of continuous features given a threshold.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     * @constructor
     */
    var Binarizer = function(uid) {
        var jvmObject;
        this.logger = Logger.getLogger("ml.feature.Binarizer_js");
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.Binarizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.Binarizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.Binarizer();
        }


    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    Binarizer.prototype = Object.create(JavaWrapper.prototype);
    
    Binarizer.prototype.constructor = Binarizer;
    
    
    
    /**
     * @returns {float}
     */
    Binarizer.prototype.getThreshold = function() {
       return  this.getJavaObject().getThreshold();
    };

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Binarizer.prototype.uid = function() {
        return  this.getJavaObject().uid();
    };
    
    
    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/feature.Binarizer}
     */
    Binarizer.prototype.setThreshold = function(value) {
       var javaObject =  this.getJavaObject().setThreshold(value);
       return new Binarizer(javaObject);
    };

    /**
     * Param for threshold used to binarize continuous features.
     * The features greater than the threshold, will be binarized to 1.0.
     * The features equal to or less than the threshold, will be binarized to 0.0. Default: 0.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    Binarizer.prototype.threshold = function() {
        var javaObject =  this.getJavaObject().threshold();
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Binarizer}
     */
    Binarizer.prototype.setInputCol = function(value) {
       var javaObject =  this.getJavaObject().setInputCol(value);
       return new Binarizer(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Binarizer}
     */
    Binarizer.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new Binarizer(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    Binarizer.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Binarizer.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.Binarizer}
     */
    Binarizer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new Binarizer(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Binarizer}
     */
    Binarizer.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.Binarizer.load(path);
       return new Binarizer(javaObject);
    };
    
    module.exports = Binarizer;
})();