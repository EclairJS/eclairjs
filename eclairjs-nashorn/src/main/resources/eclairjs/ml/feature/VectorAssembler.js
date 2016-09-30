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
     * A feature transformer that merges multiple columns into a vector column.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Transformer
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var VectorAssembler = function(uid) {
    	 this.logger = Logger.getLogger("VectorAssembler_js");

            var jvmObject;
            if (uid) {
                if (uid instanceof org.apache.spark.ml.feature.VectorAssembler) {
                    jvmObject = uid;
                } else {
                    jvmObject = new org.apache.spark.ml.feature.VectorAssembler(uid);
                }
            } else {
                jvmObject = new org.apache.spark.ml.feature.VectorAssembler();
            }

    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    VectorAssembler.prototype = Object.create(JavaWrapper.prototype);
    
    VectorAssembler.prototype.constructor = VectorAssembler;
    
    
    
    /**
     * @param {string[]} value
     * @returns {module:eclairjs/ml/feature.VectorAssembler} 
     */
    VectorAssembler.prototype.setInputCols = function(value) {
       var javaObject =  this.getJavaObject().setInputCols(value);
       return new VectorAssembler(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorAssembler} 
     */
    VectorAssembler.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new VectorAssembler(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset} 
     */
    VectorAssembler.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    VectorAssembler.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.VectorAssembler} 
     */
    VectorAssembler.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new VectorAssembler(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.VectorAssembler} 
     */
    VectorAssembler.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.VectorAssembler.load(path);
       return new VectorAssembler(javaObject);
    };
    
    module.exports = VectorAssembler;
})();