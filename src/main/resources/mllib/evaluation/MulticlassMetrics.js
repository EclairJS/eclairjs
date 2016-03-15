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



/**
 * ::Experimental::
 * Evaluator for multiclass classification.
 *
 * @classdesc
 * @param {RDD} predictionAndLabels an RDD of (prediction, label) pairs.
 *  @class
 */
var MulticlassMetrics = function (predictionAndLabels) {
    var jvmObject;
    this.logger = Logger.getLogger("MulticlassMetrics_js");
    if (predictionAndLabels instanceof org.apache.spark.mllib.evaluation.MulticlassMetrics) {
        jvmObject = predictionAndLabels;
    } else {
        jvmObject = new org.apache.spark.mllib.evaluation.MulticlassMetrics(Utils.unwrapObject(predictionAndLabels).rdd());
    }


    JavaWrapper.call(this, jvmObject);

};

MulticlassMetrics.prototype = Object.create(JavaWrapper.prototype);

MulticlassMetrics.prototype.constructor = MulticlassMetrics;


/**
 * Returns confusion matrix:
 * predicted classes are in columns,
 * they are ordered by class label ascending,
 * as in "labels"
 * @returns {Matrix}
 */
MulticlassMetrics.prototype.confusionMatrix = function () {
   var javaObject =  this.getJavaObject().confusionMatrix();
   return Utils.javaToJs(javaObject);
};


/**
 * Returns true positive rate for a given label (category)
 * @param {float} label  the label.
 * @returns {float}
 */
MulticlassMetrics.prototype.truePositiveRate = function (label) {
   return  this.getJavaObject().truePositiveRate(label);
};

/**
 * Returns weighted true positive rate (equals to precision, recall and f-measure)
 * @returns {float}
 */
MulticlassMetrics.prototype.weightedTruePositiveRate = function () {
    return  this.getJavaObject().weightedTruePositiveRate();
};

/**
 * Returns false positive rate for a given label (category)
 * @param {float} label  the label.
 * @returns {float}
 */
MulticlassMetrics.prototype.falsePositiveRate = function (label) {
   return  this.getJavaObject().falsePositiveRate(label);
};

/**
 * Returns weighted false positive rate
 * @returns {float}
 */
MulticlassMetrics.prototype.weightedFalsePositiveRate = function () {
    return  this.getJavaObject().weightedFalsePositiveRate();
};

/**
 * Returns precision
 * @param {float} label  Optional Returns precision for a given label (category)
 * @returns {float}
 */
MulticlassMetrics.prototype.precision = function (label) {
    if (label) {
        return  this.getJavaObject().precision(label);
    } else {
        return  this.getJavaObject().precision();
    }

};

/**
 * Returns weighted averaged precision
 * @returns {float}
 */
MulticlassMetrics.prototype.weightedPrecision = function () {

    return  this.getJavaObject().weightedPrecision();

};

/**
 * Returns recall (equals to precision for multiclass classifier because sum of all false positives is equal to sum of all false negatives)
 * @param {float} label Optional, Returns recall for a given label (category)
 * @returns {float}
 */
MulticlassMetrics.prototype.recall = function (label) {
    if (label) {
        return  this.getJavaObject().recall(label);
    } else {
        return  this.getJavaObject().recall();
    }
};

/**
 * Returns weighted averaged recall (equals to precision, recall and f-measure)
 * @returns {float}
 */
MulticlassMetrics.prototype.weightedRecall = function () {

    return  this.getJavaObject().weightedRecall();

};

/**
 * Returns f-measure (equals to precision and recall because precision equals recall)
 * @param {float} [label] Optional, Returns f1-measure for a given label (category)
 * @param {float} [beta]
 * @returns {float}
 */
MulticlassMetrics.prototype.fMeasure = function (label, beta) {
    if (label && beta) {
        return  this.getJavaObject().fMeasure(label, beta);
    } if (label) {
        return  this.getJavaObject().fMeasure(label);
    } else {
        return  this.getJavaObject().fMeasure();
    }
};


/**
 * Returns weighted averaged f-measure
 * @param {number} [beta]  the beta parameter.
 * @returns {number}
 */
MulticlassMetrics.prototype.weightedFMeasure = function (beta) {
    if (beta) {
        return  this.getJavaObject().weightedFMeasure(beta);
    } else {
        return  this.getJavaObject().weightedFMeasure();
    }
};

/**
 * Returns the sequence of labels in ascending order
 * @returns {float[]}
 */
MulticlassMetrics.prototype.labels = function () {
    return  Java.from(this.getJavaObject().labels());
};