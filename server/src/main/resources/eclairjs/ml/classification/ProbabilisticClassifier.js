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

    var Classifier = require(EclairJS_Globals.NAMESPACE + '/ml/classification/Classifier');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     *
     * Single-label binary or multiclass classifier which can output class conditional probabilities.
     *
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.Classifier
     */

    var ProbabilisticClassifier = function(jvmObject) {
     	 this.logger = Logger.getLogger("ProbabilisticClassifier_js");
    	 Classifier.call(this, jvmObject);
    
    };
    
    ProbabilisticClassifier.prototype = Object.create(Classifier.prototype);
    
    ProbabilisticClassifier.prototype.constructor = ProbabilisticClassifier;
    
    
    
    /**
     * @param {string} value
     * @returns {object} 
     */
    ProbabilisticClassifier.prototype.setProbabilityCol = function(value) {
       var javaObject =  this.getJavaObject().setProbabilityCol(value);
       return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    ProbabilisticClassifier.prototype.probabilityCol = function() {
        return Utils.javaToJs(this.getJavaObject().probabilityCol());
    };
    
    /**
     * @param {float[]} value
     * @returns {object} 
     */
    ProbabilisticClassifier.prototype.setThresholds = function(value) {
       var javaObject =  this.getJavaObject().setThresholds(value);
       return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    ProbabilisticClassifier.prototype.thresholds = function() {
        return Utils.javaToJs(this.getJavaObject().thresholds());
    };

    module.exports = ProbabilisticClassifier;
})();