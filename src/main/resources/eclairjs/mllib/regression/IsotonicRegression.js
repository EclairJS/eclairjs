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
 * Regression model for isotonic regression.
 *
 * @param boundaries Array of boundaries for which predictions are known.
 *                   Boundaries must be sorted in increasing order.
 * @param predictions Array of predictions associated to the boundaries at the same index.
 *                    Results of isotonic regression and therefore monotone.
 * @param isotonic indicates whether this is isotonic or antitonic.
 *
 * @classdesc
 */

/**
 * @param {float[]} boundaries
 * @param {float[]} predictions
 * @param {boolean} isotonic
 *  @class
 */
var IsotonicRegressionModel = function (boundaries, predictions, isotonic) {
    this.logger = Logger.getLogger("IsotonicRegressionModel_js");
    var jvmObject;
    if (boundaries instanceof org.apache.spark.mllib.regression.IsotonicRegressionModel) {
        jvmObject = boundaries;
    } else {
        jvmObject = new org.apache.spark.mllib.regression.IsotonicRegressionModel(boundaries, predictions, isotonic);
    }

    JavaWrapper.call(this, jvmObject);

};

IsotonicRegressionModel.prototype = Object.create(JavaWrapper.prototype);

IsotonicRegressionModel.prototype.constructor = IsotonicRegressionModel;


/**
 * Predict labels for provided features, or single label..
 * Using a piecewise linear function.
 *
 * @param {RDD | DoubleRDD | float} testData  Features to be labeled, if float.
 *          1) If testData exactly matches a boundary then associated prediction is returned.
 *           In case there are multiple predictions with the same boundary then one of them
 *           is returned. Which one is undefined (same as java.util.Arrays.binarySearch).
 *         2) If testData is lower or higher than all boundaries then first or last prediction
 *           is returned respectively. In case there are multiple predictions with the same
 *           boundary then the lowest or highest is returned respectively.
 *         3) If testData falls between two values in boundary array then prediction is treated
 *           as piecewise linear function and interpolated value is returned. In case there are
 *           multiple values with the same boundary then the same rules as in 2) are used.
 *
 * @returns {RDD | number}  Predicted labels or label.
 */
IsotonicRegressionModel.prototype.predict = function (testData) {
    var testData_uw = Utils.unwrapObject(testData);
    var javaObject = this.getJavaObject().predict(testData_uw);

    return Utils.javaToJs(javaObject);
};


/**
 * @param {SparkContext} sc
 * @param {string} path
 */
IsotonicRegressionModel.prototype.save = function (sc, path) {
    var sc_uw = Utils.unwrapObject(sc);
    this.getJavaObject().save(sc_uw.sc(), path);
};


/**
 * Isotonic regression.
 * Currently implemented using parallelized pool adjacent violators algorithm.
 * Only univariate (single feature) algorithm supported.
 *
 * Sequential PAV implementation based on:
 * Tibshirani, Ryan J., Holger Hoefling, and Robert Tibshirani.
 *   "Nearly-isotonic regression." Technometrics 53.1 (2011): 54-61.
 *   Available from [[http://www.stat.cmu.edu/~ryantibs/papers/neariso.pdf]]
 *
 * Sequential PAV parallelization based on:
 * Kearsley, Anthony J., Richard A. Tapia, and Michael W. Trosset.
 *   "An approach to parallelizing isotonic regression."
 *   Applied Mathematics and Parallel Computing. Physica-Verlag HD, 1996. 141-147.
 *   Available from [[http://softlib.rice.edu/pub/CRPC-TRs/reports/CRPC-TR96640.pdf]]
 *
 * @see [[http://en.wikipedia.org/wiki/Isotonic_regression Isotonic regression (Wikipedia)]]
 * @classdesc
 */

/**
 * Constructs IsotonicRegression instance with default parameter isotonic = true.
 *
 * @returns {??}  New instance of IsotonicRegression.
 *  @class
 */
var IsotonicRegression = function (jvmObject) {

    this.logger = Logger.getLogger("IsotonicRegression_js");
    if (!jvmObject || !(jvmObject instanceof org.apache.spark.mllib.regression.IsotonicRegression)) {
        jvmObject = new org.apache.spark.mllib.regression.IsotonicRegression();
    }

    JavaWrapper.call(this, jvmObject);

};

IsotonicRegression.prototype = Object.create(JavaWrapper.prototype);

IsotonicRegression.prototype.constructor = IsotonicRegression;


/**
 * Sets the isotonic parameter.
 *
 * @param {boolean} isotonic  Isotonic (increasing) or antitonic (decreasing) sequence.
 * @returns {IsotonicRegression}  This instance of IsotonicRegression.
 */
IsotonicRegression.prototype.setIsotonic = function (isotonic) {
    var javaObject = this.getJavaObject().setIsotonic(isotonic);
    return new IsotonicRegression(javaObject);
};


/**
 * Run IsotonicRegression algorithm to obtain isotonic regression model.
 *
 * @param {RDD} input  RDD of tuples (label, feature, weight) where label is dependent variable
 *              for which we calculate isotonic regression, feature is independent variable
 *              and weight represents number of measures with default 1.
 *              If multiple labels share the same feature value then they are ordered before
 *              the algorithm is executed.
 * @returns {IsotonicRegressionModel}  Isotonic regression model.
 */
IsotonicRegression.prototype.run = function (input) {
// // TODO: handle Tuple conversion for 'input'
    var input_uw = Utils.unwrapObject(input);
    var javaObject = this.getJavaObject().run(input_uw);
    return new IsotonicRegressionModel(javaObject);
};

//
// static methods
//


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {IsotonicRegressionModel}
 */
IsotonicRegressionModel.load = function (sc, path) {
    var sc_uw = Utils.unwrapObject(sc);
    var javaObject = org.apache.spark.mllib.regression.IsotonicRegressionModel.load(sc_uw.sc(), path);
    return new IsotonicRegressionModel(javaObject);
};
