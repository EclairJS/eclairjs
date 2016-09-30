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

    
    
    /**
     * @classdesc
     * Abstraction for prediction problems (regression and classification).
     *
     *                       E.g., {@link VectorUDT} for vector features.
     *                  parameter to specify the concrete type.
     *            parameter to specify the concrete type for the corresponding model.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Estimator
     */

    var Predictor = function(jvmObject) {
     	 this.logger = Logger.getLogger("Predictor_js");
     	 Estimator.call(this, jvmObject);
    
    };
    
    Predictor.prototype = Object.create(Estimator.prototype);
    
    Predictor.prototype.constructor = Predictor;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.setLabelCol = function(value) {
       var javaObject =  this.getJavaObject().setLabelCol(value);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.setFeaturesCol = function(value) {
       var javaObject =  this.getJavaObject().setFeaturesCol(value);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.setPredictionCol = function(value) {
       var javaObject =  this.getJavaObject().setPredictionCol(value);
      return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * NOTE: we are inhering this from ml.Estimator
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml.PredictionModel}
     * @ignore
     */
  /*  Predictor.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
       return Utils.javaToJs(javaObject);
    };*/
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    Predictor.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    module.exports = Predictor;
})();