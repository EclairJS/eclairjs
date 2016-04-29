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

    var ClassificationModel = require(EclairJS_Globals.NAMESPACE + '/ml/classification/ClassificationModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     *
     * Model produced by a {@link ProbabilisticClassifier}.
     * Classes are indexed {0, 1, ..., numClasses - 1}.
     *
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.ClassificationModel
     */

    var ProbabilisticClassificationModel = function (jvmObject) {
        this.logger = Logger.getLogger("ProbabilisticClassificationModel_js");
        ClassificationModel.call(this, jvmObject);

    };

    ProbabilisticClassificationModel.prototype = Object.create(ClassificationModel.prototype);

    ProbabilisticClassificationModel.prototype.constructor = ProbabilisticClassificationModel;


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.ProbabilisticClassificationModel}
     */
    ProbabilisticClassificationModel.prototype.setProbabilityCol = function (value) {
        var javaObject = this.getJavaObject().setProbabilityCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {float[]} value
     * @returns {module:eclairjs/ml/classification.ProbabilisticClassificationModel}
     */
    ProbabilisticClassificationModel.prototype.setThresholds = function (value) {
        var javaObject = this.getJavaObject().setThresholds(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms dataset by reading from {@link featuresCol}, and appending new columns as specified by
     * parameters:
     *  - predicted labels as [[predictionCol]] of type {@link Double}
     *  - raw predictions (confidences) as [[rawPredictionCol]] of type {@link Vector}
     *  - probability of each class as [[probabilityCol]] of type {@link Vector}.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @returns {module:eclairjs/sql.DataFrame}  transformed dataset
     */
    ProbabilisticClassificationModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };

    module.exports = ProbabilisticClassificationModel;
})();