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
    var Strategy = require(EclairJS_Globals.NAMESPACE + '/mllib/tree/configuration/Strategy');


    /**
     * Configuration options for {@link GradientBoostedTrees}.
     *
     * @param treeStrategy Parameters for the tree algorithm. We support regression and binary
     *                     classification for boosting. Impurity setting will be ignored.
     * @param loss Loss function used for minimization during gradient boosting.
     * @param numIterations Number of iterations of boosting.  In other words, the number of
     *                      weak hypotheses used in the final model.
     * @param learningRate Learning rate for shrinking the contribution of each estimator. The
     *                     learning rate should be between in the interval (0, 1]
     * @param validationTol validationTol is a condition which decides iteration termination when
     *                      runWithValidation is used.
     *                      The end of iteration is decided based on below logic:
     *                      If the current loss on the validation set is > 0.01, the diff
     *                      of validation error is compared to relative tolerance which is
     *                      validationTol * (current loss on the validation set).
     *                      If the current loss on the validation set is <= 0.01, the diff
     *                      of validation error is compared to absolute tolerance which is
     *                      validationTol * 0.01.
     *                      Ignored when
     *                      [[org.apache.spark.mllib.tree.GradientBoostedTrees.run()]] is used.
     * @classdesc
     */

    /**
     * @param {module:eclairjs/mllib/tree/configuration.Strategy} treeStrategy
     * @param {module:eclairjs/mllib/tree/loss.Loss} loss
     * @param {number} numIterations
     * @param {number} learningRate
     * @param {number} validationTol
     * @class
     * @memberof module:eclairjs/mllib/tree/configuration
     */
    var BoostingStrategy = function (treeStrategy, loss, numIterations, learningRate, validationTol) {
        this.logger = Logger.getLogger("BoostingStrategy_js");
        var jvmObject;
        if (treeStrategy instanceof Strategy) {
            var treeStrategy_uw = Utils.unwrapObject(treeStrategy);
            var loss_uw = Utils.unwrapObject(loss);
            jvmObject = new org.apache.spark.mllib.tree.configuration.BoostingStrategy(treeStrategy_uw, loss_uw, numIterations, learningRate, validationTol);
        }
        if (treeStrategy instanceof org.apache.spark.mllib.tree.configuration.BoostingStrategy) {
            jvmObject = treeStrategy;
        } else {
            throw "BoostingStrategy invalid parameters";
        }

        JavaWrapper.call(this, jvmObject);

    };

    BoostingStrategy.prototype = Object.create(JavaWrapper.prototype);

    BoostingStrategy.prototype.constructor = BoostingStrategy;
    /**
     *
     * @returns {module:eclairjs/mllib/tree/configuration.Strategy}
     */
    BoostingStrategy.prototype.getTreeStrategy = function () {
        return new Strategy(this.getJavaObject().getTreeStrategy());
    };

    /**
     *
     * @param {module:eclairjs/mllib/tree/configuration.Strategy} strategy
     */
    BoostingStrategy.prototype.setTreeStrategy = function (strategy) {
        this.getJavaObject().setTreeStrategy(Utils.unwrapObject(strategy));
    };

    /**
     *
     * @returns {module:eclairjs/mllib/tree/loss.Loss}
     */
    BoostingStrategy.prototype.getLoss = function () {
        return new Loss(this.getJavaObject().getLoss());
    };

    /**
     *
     * @param {module:eclairjs/mllib/tree/loss.Loss} loss
     */
    BoostingStrategy.prototype.setLoss = function (loss) {
        this.getJavaObject().setLoss(Utils.unwrapObject(loss));
    };
    /**
     *
     * @@returns {integer}
     */
    BoostingStrategy.prototype.getNumIterations = function () {
        return this.getJavaObject().getNumIterations();
    };
    /**
     *
     * @param {integer} num
     */
    BoostingStrategy.prototype.setNumIterations = function (num) {
        this.getJavaObject().setNumIterations(num);
    };
    /**
     * @returns {float}
     */
    BoostingStrategy.prototype.getLearningRate = function () {
        return this.getJavaObject().getLearningRate();
    };
    /**
     *
     * @param {float} rate
     */
    BoostingStrategy.prototype.setLearningRate = function (rate) {
        this.getJavaObject().setLearningRate(rate);
    };

    /**
     * @returns {flaot}
     */
    BoostingStrategy.prototype.getValidationTol = function () {
        return this.getJavaObject().getValidationTol();
    };
    /**
     *
     * @param {float} tol
     */
    BoostingStrategy.prototype.setValidationTol = function (tol) {
        return this.getJavaObject().setValidationTol(tol);
    };
//
// static methods
//


    /**
     * Returns default configuration for the boosting algorithm
     * @param {string} algo  Learning goal.  Supported: "Classification" or "Regression"
     * @returns {module:eclairjs/mllib/tree/configuration.BoostingStrategy}  Configuration for boosting algorithm
     */
    BoostingStrategy.defaultParams = function (algo) {
        var javaObject = org.apache.spark.mllib.tree.configuration.BoostingStrategy.defaultParams(algo);
        return new BoostingStrategy(javaObject);
    };


    module.exports = BoostingStrategy;

})();