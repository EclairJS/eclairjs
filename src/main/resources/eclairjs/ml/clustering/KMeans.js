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

    var Estimator = require(EclairJS_Globals.NAMESPACE + '/ml/Estimator');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * K-means clustering with support for k-means|| initialization proposed by Bahmani et al.
     *
     * @see [Bahmani et al., Scalable k-means++.]{@link http://dx.doi.org/10.14778/2180912.2180915}
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/clustering
     * @param {string} [uid]
     */
    var KMeans = function (uid) {
        var jvmObject;
        this.logger = Logger.getLogger("ml_clusstering_KMeans_js");
        if (uid) {
            if (uid instanceof org.apache.spark.ml.clustering.KMeans) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.clustering.KMeans(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.clustering.KMeans();
        }
        Estimator.call(this, jvmObject);

    };

    KMeans.prototype = Object.create(Estimator.prototype);

    KMeans.prototype.constructor = KMeans;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    KMeans.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new KMeans(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setFeaturesCol = function (value) {
        var javaObject = this.getJavaObject().setFeaturesCol(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setPredictionCol = function (value) {
        var javaObject = this.getJavaObject().setPredictionCol(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setK = function (value) {
        var javaObject = this.getJavaObject().setK(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setInitMode = function (value) {
        var javaObject = this.getJavaObject().setInitMode(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setInitSteps = function (value) {
        var javaObject = this.getJavaObject().setInitSteps(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setMaxIter = function (value) {
        var javaObject = this.getJavaObject().setMaxIter(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setTol = function (value) {
        var javaObject = this.getJavaObject().setTol(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setSeed = function (value) {
        var javaObject = this.getJavaObject().setSeed(value);
        return new KMeans(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeans.prototype.fit = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().fit(dataset_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    KMeans.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return new StructType(javaObject);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.load = function (path) {
        var javaObject = org.apache.spark.ml.clustering.KMeans.load(path);
        return new KMeans(javaObject);
    };

    module.exports = KMeans;
})();