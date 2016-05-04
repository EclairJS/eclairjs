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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Model from train validation split.
     *
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml/tuning
     */
    
    
    var TrainValidationSplitModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_tuning_TrainValidationSplitModel_js");
        Model.call(this, jvmObject);
    
    };
    
    TrainValidationSplitModel.prototype = Object.create(Model.prototype);
    
    TrainValidationSplitModel.prototype.constructor = TrainValidationSplitModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    TrainValidationSplitModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };


    /**
     *
     * @returns {Object}
     */
    TrainValidationSplitModel.prototype.bestModel = function() {
        var javaObject = this.getJavaObject().bestModel();
        return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {float[]}
     */
    TrainValidationSplitModel.prototype.validationMetrics = function() {
       return Utils.javaToJs(this.getJavaObject().validationMetrics());
    };

    /**
     *
     */
    TrainValidationSplitModel.prototype.validateParams = function() {
        this.getJavaObject().validateParams();
    };

    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplitModel} 
     */
    TrainValidationSplitModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new TrainValidationSplitModel(javaObject);
    };

    /**
     * Param for ratio between train and validation data. Must be between 0 and 1. Default: 0.75
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    TrainValidationSplitModel.prototype.trainRatio = function() {
        return Utils.javaToJs(this.getJavaObject().trainRatio());
    };

    /**
     *
     * @returns {float}
     */
    TrainValidationSplitModel.prototype.getTrainRatio = function() {
        return this.getJavaObject().getTrainRatio();
    };

    /**
     * Param for ratio between train and validation data. Must be between 0 and 1. Default: 0.75
     * @returns {module:eclairjs/ml/param.Param}
     */
    TrainValidationSplitModel.prototype.estimator = function() {
        return Utils.javaToJs(this.getJavaObject().estimator());
    };

    /**
     *
     * @returns {module:eclairjs/ml.Estimator}
     */
    TrainValidationSplitModel.prototype.getEstimator = function() {
        return Utils.javaToJs(this.getJavaObject().getEstimator());
    };

    /**
     * Param for ratio between train and validation data. Must be between 0 and 1. Default: 0.75
     * @returns {module:eclairjs/ml/param.Param}
     */
    TrainValidationSplitModel.prototype.estimatorParamMaps = function() {
        return Utils.javaToJs(this.getJavaObject().estimatorParamMaps());
    };

    /**
     *
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    TrainValidationSplitModel.prototype.getEstimatorParamMaps = function() {
        return Utils.javaToJs(this.getJavaObject().getEstimatorParamMaps());
    };

    /**
     * param for the evaluator used to select hyper-parameters that maximize the validated metric
     * @returns {module:eclairjs/ml/param.Param}
     */
    TrainValidationSplitModel.prototype.evaluator = function() {
        return Utils.javaToJs(this.getJavaObject().evaluator());
    };

    /**
     *
     * @returns {module:eclairjs/ml/evaluation/Evaluator}
     */
    TrainValidationSplitModel.prototype.getEvaluator = function() {
        return Utils.javaToJs(this.getJavaObject().getEvaluator());
    };

    module.exports = TrainValidationSplitModel;
})();