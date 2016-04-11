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

    var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    /**
     * Evaluator for binary classification.
     *
     * @param scoreAndLabels an RDD of (score, label) pairs.
     * @param numBins if greater than 0, then the curves (ROC curve, PR curve) computed internally
     *                will be down-sampled to this many "bins". If 0, no down-sampling will occur.
     *                This is useful because the curve contains a point for each distinct score
     *                in the input, and this could be as large as the input itself -- millions of
     *                points or more, when thousands may be entirely sufficient to summarize
     *                the curve. After down-sampling, the curves will instead be made of approximately
     *                `numBins` points instead. Points are made from bins of equal numbers of
     *                consecutive points. The size of each bin is
     *                `floor(scoreAndLabels.count() / numBins)`, which means the resulting number
     *                of bins may not exactly equal numBins. The last bin in each partition may
     *                be smaller as a result, meaning there may be an extra sample at
     *                partition boundaries.
     * @memberof module:eclairjs/mllib/evaluation
     * @classdesc
     */

    /**
     * @param {RDD} scoreAndLabels
     * @param {number} numBins
     * @returns {??} 
     *  @class
     */
    var BinaryClassificationMetrics = function(scoreAndLabels,numBins) {
        var jvmObject;
        if (scoreAndLabels instanceof org.apache.spark.mllib.evaluation.BinaryClassificationMetrics) {
            jvmObject = scoreAndLabels;
        } else {
            jvmObject = new org.apache.spark.mllib.evaluation.BinaryClassificationMetrics(Utils.unwrapObject(scoreAndLabels).rdd(),numBins);
        }

         this.logger = Logger.getLogger("BinaryClassificationMetrics_js");
         JavaWrapper.call(this, jvmObject);

    };

    BinaryClassificationMetrics.prototype = Object.create(JavaWrapper.prototype);

    BinaryClassificationMetrics.prototype.constructor = BinaryClassificationMetrics;



    /**
     * Unpersist intermediate RDDs used in the computation.
     */
    BinaryClassificationMetrics.prototype.unpersist = function() {
        this.getJavaObject().unpersist();
    };


    /**
     * Returns thresholds in descending order.
     * @returns {RDD} 
     */
    BinaryClassificationMetrics.prototype.thresholds = function() {
       var javaObject =  this.getJavaObject().thresholds().toJavaRDD();
       return new RDD(javaObject);
    };


    /**
     * Returns the receiver operating characteristic (ROC) curve,
     * which is an RDD of (false positive rate, true positive rate)
     * with (0.0, 0.0) prepended and (1.0, 1.0) appended to it.
     * @see http://en.wikipedia.org/wiki/Receiver_operating_characteristic
     * @returns {RDD} 
     */
    BinaryClassificationMetrics.prototype.roc = function() {
    throw "not implemented by ElairJS";
        var javaObject =  this.getJavaObject().roc().toJavaRDD();
        return new RDD(javaObject);
    };


    /**
     * Computes the area under the receiver operating characteristic (ROC) curve.
     * @returns {number} 
     */
    BinaryClassificationMetrics.prototype.areaUnderROC = function() {
       return  this.getJavaObject().areaUnderROC();
    };


    /**
     * Returns the precision-recall curve, which is an RDD of (recall, precision),
     * NOT (precision, recall), with (0.0, 1.0) prepended to it.
     * @see http://en.wikipedia.org/wiki/Precision_and_recall
     * @returns {RDD} 
     */
    BinaryClassificationMetrics.prototype.pr = function() {
        return new RDD(this.getJavaObject().pr().toJavaRDD());
    };


    /**
     * Computes the area under the precision-recall curve.
     * @returns {number} 
     */
    BinaryClassificationMetrics.prototype.areaUnderPR = function() {
        return  this.getJavaObject().areaUnderPR();
    };


    /**
     * Returns the (threshold, F-Measure) curve.
     * @param {number} [beta]  the beta factor in F-Measure computation.
     * @see http://en.wikipedia.org/wiki/F1_score
     * @returns {RDD}  an RDD of (threshold, F-Measure) pairs.
     */
    BinaryClassificationMetrics.prototype.fMeasureByThreshold = function(beta) {
        if(beta) {
            return new RDD(this.getJavaObject().fMeasureByThreshold(beta).toJavaRDD());
        } else {
            return new RDD(this.getJavaObject().fMeasureByThreshold().toJavaRDD());
        }
    };


    /**
     * Returns the (threshold, precision) curve.
     * @returns {RDD} 
     */
    BinaryClassificationMetrics.prototype.precisionByThreshold = function() {
        return new RDD(this.getJavaObject().precisionByThreshold().toJavaRDD());
    };


    /**
     * Returns the (threshold, recall) curve.
     * @returns {RDD} 
     */
    BinaryClassificationMetrics.prototype.recallByThreshold = function() {
        return new RDD(this.getJavaObject().recallByThreshold().toJavaRDD());
    };

    module.exports = BinaryClassificationMetrics;

})();
