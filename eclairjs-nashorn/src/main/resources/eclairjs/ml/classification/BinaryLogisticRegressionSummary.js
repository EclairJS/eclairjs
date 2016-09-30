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

    var LogisticRegressionSummary = require(EclairJS_Globals.NAMESPACE + '/ml/classification/LogisticRegressionSummary');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Binary Logistic regression results for a given model.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.LogisticRegressionSummary
     */
    
    
    var BinaryLogisticRegressionSummary = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_classification_BinaryLogisticRegressionSummary_js");
    	 LogisticRegressionSummary.call(this, jvmObject);
    
    };
    
    BinaryLogisticRegressionSummary.prototype = Object.create(LogisticRegressionSummary.prototype);
    
    BinaryLogisticRegressionSummary.prototype.constructor = BinaryLogisticRegressionSummary;

    /**
     * objective function (scaled loss + regularization) at each iteration
     * @returns {float[]}
     */
    BinaryLogisticRegressionSummary.prototype.objectiveHistory = function() {
        return Utils.javaToJs(this.getJavaObject().objectiveHistory());
    };

    /**
     * Number of training iterations until termination
     * @returns {integer}
     */
    BinaryLogisticRegressionSummary.prototype.totalIterations = function() {
        return this.getJavaObject().totalIterations();
    };

    /**
     * Returns the receiver operating characteristic (ROC) curve, which is an Dataframe having two fields (FPR, TPR) with (0.0, 0.0)
     * prepended and (1.0, 1.0) appended to it.Note: This ignores instance weights (setting all to 1.0) from LogisticRegression.weightCol.
     * Note: This will change in later Spark versions.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    BinaryLogisticRegressionSummary.prototype.roc = function() {
        return Utils.javaToJs(this.getJavaObject().roc());
    };

    /**
     * Computes the area under the receiver operating characteristic (ROC) curve.
     * Note: This ignores instance weights (setting all to 1.0) from LogisticRegression.weightCol. This will change in later Spark versions.
     * @returns {float}
     */
    BinaryLogisticRegressionSummary.prototype.areaUnderROC = function() {
        return this.getJavaObject().areaUnderROC();
    };

    /**
     * Returns the precision-recall curve, which is an Dataframe containing two fields recall, precision with (0.0, 1.0) prepended to it.
     * Note: This ignores instance weights (setting all to 1.0) from LogisticRegression.weightCol. This will change in later Spark versions.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    BinaryLogisticRegressionSummary.prototype.pr = function() {
        return Utils.javaToJs(this.getJavaObject().pr());
    };

    /**
     * Returns a dataframe with two fields (threshold, F-Measure) curve with beta = 1.0.
     * Note: This ignores instance weights (setting all to 1.0) from LogisticRegression.weightCol. This will change in later Spark versions.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    BinaryLogisticRegressionSummary.prototype.fMeasureByThreshold = function() {
        return Utils.javaToJs(this.getJavaObject().fMeasureByThreshold());
    };

    /**
     * Returns a dataframe with two fields (threshold, precision) curve. Every possible probability
     * obtained in transforming the dataset are used as thresholds used in calculating the precision.
     * Note: This ignores instance weights (setting all to 1.0) from LogisticRegression.weightCol. This will change in later Spark versions.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    BinaryLogisticRegressionSummary.prototype.precisionByThreshold = function() {
        return Utils.javaToJs(this.getJavaObject().precisionByThreshold());
    };

    /**
     * Returns a dataframe with two fields (threshold, recall) curve. Every possible probability obtained in
     * transforming the dataset are used as thresholds used in calculating the recall.
     * Note: This ignores instance weights (setting all to 1.0) from LogisticRegression.weightCol. This will change in later Spark versions.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    BinaryLogisticRegressionSummary.prototype.recallByThreshold = function() {
        return Utils.javaToJs(this.getJavaObject().recallByThreshold());
    };

    module.exports = BinaryLogisticRegressionSummary;
})();