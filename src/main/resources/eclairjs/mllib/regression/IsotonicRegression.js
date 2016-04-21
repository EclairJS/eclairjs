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
     * @memberof module:eclairjs/mllib/regression
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
     * @param {module:eclairjs.RDD} input  RDD of tuples (label, feature, weight) where label is dependent variable
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
        return Utils.javaToJs(javaObject);
    };


    module.exports = IsotonicRegression;

})();
