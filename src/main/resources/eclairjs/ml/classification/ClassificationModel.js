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

    var PredictionModel = require(EclairJS_Globals.NAMESPACE + '/ml/PredictionModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     *
     * Model produced by a {@link module:eclairjs/ml/classification.Classifier}.
     * Classes are indexed {0, 1, ..., numClasses - 1}.
     *
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/classification
     *
     */

    var ClassificationModel = function (jvmObject) {
        this.logger = Logger.getLogger("ml_classification_ClassificationModel_js");
        PredictionModel.call(this, jvmObject);

    };

    ClassificationModel.prototype = Object.create(PredictionModel.prototype);

    ClassificationModel.prototype.constructor = ClassificationModel;


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.ClassificationModel}
     */
    ClassificationModel.prototype.setRawPredictionCol = function (value) {
        var javaObject = this.getJavaObject().setRawPredictionCol(value);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {int}
     */
    ClassificationModel.prototype.numClasses = function () {
        return this.getJavaObject().numClasses();
    };


    /**
     * Transforms dataset by reading from {@link featuresCol}, and appending new columns as specified by
     * parameters:
     *  - predicted labels as [[predictionCol]] of type {@link Double}
     *  - raw predictions (confidences) as [[rawPredictionCol]] of type {@link Vector}.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @returns {module:eclairjs/sql.DataFrame}  transformed dataset
     */
    ClassificationModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };

    module.exports = ClassificationModel;
})();