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
     * PCA trains a model to project vectors to a low-dimensional space using PCA.
     *
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     * @constructor
     */
    var PCA = function(uid) {
    	 this.logger = Logger.getLogger("spark.ml.feature.PCA_js");
         var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.PCA) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.PCA(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.PCA();
        }
    	 JavaWrapper.call(this, jvmObject);

    };
    
    PCA.prototype = Object.create(JavaWrapper.prototype);
    
    PCA.prototype.constructor = PCA;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    PCA.prototype.uid = function () {
        return this.getJavaObject().uid();
    }; 
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.PCA} 
     */
    PCA.prototype.setInputCol = function(value) {
        var javaObject =  this.getJavaObject().setInputCol(value);
        return new PCA(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.PCA} 
     */
    PCA.prototype.setOutputCol = function(value) {
        var javaObject =  this.getJavaObject().setOutputCol(value);
        return new PCA(javaObject);
    };
    
    
    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/feature.PCA} 
     */
    PCA.prototype.setK = function(value) {
        var javaObject =  this.getJavaObject().setK(value);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * Computes a {@link PCAModel} that contains the principal components of the input vectors.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/mllib/feature.PCAModel} 
     */
    PCA.prototype.fit = function(dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject =  this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    PCA.prototype.transformSchema = function(schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/feature.PCA} 
     */
    PCA.prototype.copy = function(extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject =  this.getJavaObject().copy(extra_uw);
        return new PCA(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.PCA} 
     */
    PCA.load = function(path) {
        var javaObject =  org.apache.spark.ml.feature.PCA.load(path);
        return new PCA(javaObject);
    };
    
    module.exports = PCA;
})();
