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

    var PipelineStage = require(EclairJS_Globals.NAMESPACE + '/ml/PipelineStage');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Class for indexing categorical feature columns in a dataset of {@link Vector}.
     *
     * This has 2 usage modes:
     *  - Automatically identify categorical features (default behavior)
     *     - This helps process a dataset of unknown vectors into a dataset with some continuous
     *       features and some categorical features. The choice between continuous and categorical
     *       is based upon a maxCategories parameter.
     *     - Set maxCategories to the maximum number of categorical any categorical feature should have.
     *     - E.g.: Feature 0 has unique values {-1.0, 0.0}, and feature 1 values {1.0, 3.0, 5.0}.
     *       If maxCategories = 2, then feature 0 will be declared categorical and use indices {0, 1},
     *       and feature 1 will be declared continuous.
     *  - Index all features, if all features are categorical
     *     - If maxCategories is set to be very large, then this will build an index of unique
     *       values for all features.
     *     - Warning: This can cause problems if features are continuous since this will collect ALL
     *       unique values to the driver.
     *     - E.g.: Feature 0 has unique values {-1.0, 0.0}, and feature 1 values {1.0, 3.0, 5.0}.
     *       If maxCategories >= 3, then both features will be declared categorical.
     *
     * This returns a model which can transform categorical features to use 0-based indices.
     *
     * Index stability:
     *  - This is not guaranteed to choose the same category index across multiple runs.
     *  - If a categorical feature includes value 0, then this is guaranteed to map value 0 to index 0.
     *    This maintains vector sparsity.
     *  - More stability may be added in the future.
     *
     * TODO: Future extensions: The following functionality is planned for the future:
     *  - Preserve metadata in transform; if a feature's metadata is already present, do not recompute.
     *  - Specify certain features to not index, either via a parameter or via existing metadata.
     *  - Add warning if a categorical feature has only 1 category.
     *  - Add option for allowing unknown categories.
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var VectorIndexer = function (uid) {
        this.logger = Logger.getLogger("ml.feature.VectorIndexer_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.VectorIndexer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.VectorIndexer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.VectorIndexer();
        }
        PipelineStage.call(this, jvmObject);

    };

    VectorIndexer.prototype = Object.create(PipelineStage.prototype);

    VectorIndexer.prototype.constructor = VectorIndexer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    VectorIndexer.prototype.uid = function () {
        return this.getJavaObject().uid();
    };


    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.setMaxCategories = function (value) {
        var javaObject = this.getJavaObject().setMaxCategories(value);
        return new VectorIndexer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new VectorIndexer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new VectorIndexer(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexer.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    VectorIndexer.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new VectorIndexer(javaObject);
    };

    /**
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    VectorIndexer.prototype.maxCategories = function () {
        var javaObject = this.getJavaObject().maxCategories();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    VectorIndexer.prototype.getMaxCategories = function () {
        return this.getJavaObject().getMaxCategories();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.VectorIndexer.load(path);
        return new VectorIndexer(javaObject);
    };

    module.exports = VectorIndexer;
})();