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
     * Represents a classification model that predicts to which of a set of categories an example
     * belongs. The categories are represented by double values: 0.0, 1.0, 2.0, etc.
     * @classdesc
     * @class
     * @memberof module:eclairjs/mllib/classification
     *
     *
     */


    var ClassificationModel = function(jvmObject) {
        this.logger = Logger.getLogger("ClassificationModel_js");
        JavaWrapper.call(this, jvmObject);

    };

    ClassificationModel.prototype = Object.create(JavaWrapper.prototype);

    ClassificationModel.prototype.constructor = ClassificationModel;


    /**
     * Predict values for the given data set using the model trained.
     *
     * @param {module:eclairjs.RDD | module:eclairjs/mllib/linalg.Vector} testData  RDD representing data points to be predicted or Vector array representing a single data point
     * @returns {module:eclairjs.RDD | float}  an RDD[float] where each entry contains the corresponding prediction or float predicted category from the trained model
     */
    ClassificationModel.prototype.predict = function(testData) {
       var testData_uw = Utils.unwrapObject(testData);
       var javaObject =  this.getJavaObject().predict(testData_uw);
       return Utils.javaToJs(javaObject);
    };

    module.exports = ClassificationModel;

})();

