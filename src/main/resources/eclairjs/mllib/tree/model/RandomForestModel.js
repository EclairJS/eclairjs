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
     * Represents a random forest model.
     *
     * @param algo algorithm for the ensemble model, either Classification or Regression
     * @param trees tree ensembles
     * @classdesc
     */

    /**
     * @param {Algo} algo
     * @param {DecisionTreeModel[]} trees
     * @returns {??}
     * @class
     * @memberof module:eclairjs/mllib/tree/model
     */
    var RandomForestModel = function (algo, trees) {
        this.logger = Logger.getLogger("RandomForestModel_js");
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.tree.model.RandomForestModel) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.tree.model.RandomForestModel(
                Utils.unwrapObject(arguments[0]),
                Utils.unwrapObject(trees)
            );
        }

        JavaWrapper.call(this, jvmObject);
    };

    RandomForestModel.prototype = Object.create(JavaWrapper.prototype);

    RandomForestModel.prototype.constructor = RandomForestModel;


    /**
     *
     * @param {module:eclairjs.SparkContext} sc   Spark context used to save model data.
     * @param {string} path   Path specifying the directory in which to save this model.
     *              If the directory already exists, this method throws an exception.
     */
    RandomForestModel.prototype.save = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(), path);
    };

    /**
     * Predict values for a single data point using the model trained.
     *
     * @param features array representing a single data point
     * @return predicted category from the trained model
     */
    RandomForestModel.prototype.predict = function (features) {
        var features_uw = Utils.unwrapObject(features);
        return Utils.javaToJs(this.getJavaObject().predict(features_uw));
    };

    /**
     * Print the full model to a string.
     * @returns {string}
     */
    RandomForestModel.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };


//
// static methods
//


    /**
     *
     * @param {module:eclairjs.SparkContext} sc   Spark context used for loading model files.
     * @param {string} path   Path specifying the directory to which the model was saved.
     * @returns {RandomForestModel}   Model instance
     */
    RandomForestModel.load = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        var javaObject = org.apache.spark.mllib.tree.model.RandomForestModel.load(sc_uw.sc(), path);
        return new RandomForestModel(javaObject);
    };


    module.exports = RandomForestModel;

})();

