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

    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var MaxAbsScaler = Java.type('org.apache.spark.ml.feature.MaxAbsScaler');    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Rescale each feature individually to range [-1, 1] by dividing through the largest maximum
     * absolute value in each feature. It does not shift/center the data, and thus does not destroy
     * any sparsity.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Estimator
     * @param {string} uid
     * @constructor
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#<init>
     */
    var MaxAbsScaler = function(uid) {
        this.logger = Logger.getLogger("ml_feature_MaxAbsScaler_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.MaxAbsScaler) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.MaxAbsScaler(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.MaxAbsScaler();
        }
        Estimator.call(this, jvmObject);
    
    };

    MaxAbsScaler.prototype = Object.create(Estimator.prototype);

    MaxAbsScaler.prototype.constructor = MaxAbsScaler;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    MaxAbsScaler.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MaxAbsScaler} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#setInputCol
     */
    MaxAbsScaler.prototype.setInputCol = function(value) {
      var javaObject =  this.getJavaObject().setInputCol(value);
      return new MaxAbsScaler(javaObject);
    };
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MaxAbsScaler} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#setOutputCol
     */
    MaxAbsScaler.prototype.setOutputCol = function(value) {
      var javaObject =  this.getJavaObject().setOutputCol(value);
      return new MaxAbsScaler(javaObject);
    };
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.MaxAbsScalerModel} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#fit
     */
    MaxAbsScaler.prototype.fit = function(dataset) {
      var dataset_uw = Utils.unwrapObject(dataset);
      var javaObject =  this.getJavaObject().fit(dataset_uw);
      return Utils.javaToJs(javaObject);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#transformSchema
     */
    MaxAbsScaler.prototype.transformSchema = function(schema) {
      var schema_uw = Utils.unwrapObject(schema);
      var javaObject =  this.getJavaObject().transformSchema(schema_uw);
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.MaxAbsScaler} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#copy
     */
    MaxAbsScaler.prototype.copy = function(extra) {
      var extra_uw = Utils.unwrapObject(extra);
      var javaObject =  this.getJavaObject().copy(extra_uw);
      return new MaxAbsScaler(javaObject);
    };

    //
    //static methods
    //    

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.MaxAbsScaler} 
     * @function
     * @name module:eclairjs/ml/feature.MaxAbsScaler#load
     * @static
     */
    MaxAbsScaler.load = function(path) {
      var javaObject =  org.apache.spark.ml.feature.MaxAbsScaler.load(path);
      return new MaxAbsScaler(javaObject);
    };

    module.exports = MaxAbsScaler;
})();
