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
     * Evaluator for multilabel classification.
     * @param predictionAndLabels an RDD of (predictions, labels) pairs,
     * both are non-null Arrays, each with unique elements.
     * @memberof module:eclairjs/mllib/evaluation
     * @classdesc
     * @param {module:eclairjs.RDD} predictionAndLabels
     * @class
     */
    var MultilabelMetrics = function(predictionAndLabels) {
        this.logger = Logger.getLogger("MultilabelMetrics_js");
        var jvmObject;
        if (predictionAndLabels instanceof org.apache.spark.mllib.evaluation.MultilabelMetrics) {
            jvmObject = predictionAndLabels;
        } else {
            jvmObject = new org.apache.spark.mllib.evaluation.MultilabelMetrics(Utils.unwrapObject(predictionAndLabels).rdd());
        }

         JavaWrapper.call(this, jvmObject);

    };

    MultilabelMetrics.prototype = Object.create(JavaWrapper.prototype);

    MultilabelMetrics.prototype.constructor = MultilabelMetrics;



    /**
     * Returns accuracy
     * @returns {float}
     */
    MultilabelMetrics.prototype.accuracy = function() {
        return  this.getJavaObject().accuracy();
    };

    /**
     * Returns subset accuracy (for equal sets of labels)
     * @returns {float}
     */
    MultilabelMetrics.prototype.subsetAccuracy = function() {
        return  this.getJavaObject().subsetAccuracy();
    };

    /**
     * Returns Hamming-loss
     * @returns {float}
     */
    MultilabelMetrics.prototype.hammingLoss = function() {
        return  this.getJavaObject().hammingLoss();
    };

    /**
     * Returns document-based precision averaged by the number of documents
     * @param {float} [label]  Returns precision for a given label (category)
     * @returns {float}
     */
    MultilabelMetrics.prototype.precision = function(label) {
        if (label) {
            return  this.getJavaObject().precision(label);
        } else {
            return  this.getJavaObject().precision();
        }

    };


    /**
     * Returns document-based recall averaged by the number of documents
     * @param {float} [label] Returns recall for a given label (category)
     * @returns {float}
     */
    MultilabelMetrics.prototype.recall = function(label) {
        if (label) {
            return  this.getJavaObject().recall(label);
        } else {
            return  this.getJavaObject().recall();
        }
    };


    /**
     * Returns document-based f1-measure averaged by the number of documents
     * @param {float} [label]  Returns f1-measure for a given label (category)
     * @returns {float}
     */
    MultilabelMetrics.prototype.f1Measure = function(label) {
        if (label) {
            return  this.getJavaObject().f1Measure(label);
        } else {
            return  this.getJavaObject().f1Measure();
        }
    };

    /**
     * Returns micro-averaged label-based precision (equals to micro-averaged document-based precision)
     * @returns {float}
     */
    MultilabelMetrics.prototype.microPrecision = function() {
        return  this.getJavaObject().microPrecision();
    };

    /**
     * Returns micro-averaged label-based recall (equals to micro-averaged document-based recall)
     * @returns {float}
     */
    MultilabelMetrics.prototype.microRecall = function() {
        return  this.getJavaObject().microRecall();
    };

    /**
     * Returns micro-averaged label-based f1-measure (equals to micro-averaged document-based f1-measure)
     * @returns {float}
     */
    MultilabelMetrics.prototype.microF1Measure = function() {
        return  this.getJavaObject().microF1Measure();
    };

    /**
     * Returns the sequence of labels in ascending order
     * @returns {float[]}
     */
    MultilabelMetrics.prototype.labels = function() {
        return  Java.from(this.getJavaObject().labels());
    };

    module.exports = MultilabelMetrics;

})();
