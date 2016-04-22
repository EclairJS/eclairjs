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
     * Chi-Squared feature selection, which selects categorical features to use for predicting a
     * categorical label.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var ChiSqSelector = function(uid) {
        this.logger = Logger.getLogger("park.ml.feature.ChiSqSelector_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.ChiSqSelector) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.ChiSqSelector(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.ChiSqSelector();
        }
        JavaWrapper.call(this, jvmObject);
    
    };
    
    ChiSqSelector.prototype = Object.create(JavaWrapper.prototype);
    
    ChiSqSelector.prototype.constructor = ChiSqSelector;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    ChiSqSelector.prototype.uid = function() {
        return  this.getJavaObject().uid();
    };
    
    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setNumTopFeatures = function(value) {
       var javaObject =  this.getJavaObject().setNumTopFeatures(value);
       return new ChiSqSelector(javaObject);
    };

    /**
     *
     * @returns {integer}
     */
    ChiSqSelector.prototype.getNumTopFeatures = function() {
        return this.getJavaObject().getNumTopFeatures();
    };

    /**
     * Number of features that selector will select (ordered by statistic value descending).
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    ChiSqSelector.prototype.numTopFeatures = function() {
        return Utils.javaToJs(this.getJavaObject().numTopFeatures());
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setFeaturesCol = function(value) {
       var javaObject =  this.getJavaObject().setFeaturesCol(value);
       return new ChiSqSelector(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setOutputCol = function(value) {
       var javaObject =  this.getJavaObject().setOutputCol(value);
       return new ChiSqSelector(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setLabelCol = function(value) {
       var javaObject =  this.getJavaObject().setLabelCol(value);
       return new ChiSqSelector(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelector.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    ChiSqSelector.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new ChiSqSelector(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.ChiSqSelector.load(path);
       return new ChiSqSelector(javaObject);
    };
    
    module.exports = ChiSqSelector;
})();