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

    var Model = require(EclairJS_Globals.NAMESPACE + '/ml/Model');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');


    /**
     * @classdesc
     * Model fitted by KMeans.
     *
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Model
     */


    var KMeansModel = function (jvmObject) {

        this.logger = Logger.getLogger("ml_clustering_KMeansModel_js");
        Model.call(this, jvmObject);

    };

    KMeansModel.prototype = Object.create(Model.prototype);

    KMeansModel.prototype.constructor = KMeansModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    KMeansModel.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeansModel.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new KMeansModel(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    KMeansModel.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return new DataFrame(javaObject);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    KMeansModel.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return new StructType(javaObject);
    };


    /**
     * @returns {module:eclairjs/mllib/linalg.Vector[]}
     */
    KMeansModel.prototype.clusterCenters = function () {
        var javaObject = this.getJavaObject().clusterCenters();
        return Utils.javaToJs(javaObject);
    };


    /**
     * Return the K-means cost (sum of squared distances of points to their nearest center) for this
     * model on the given data.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {number}
     */
    KMeansModel.prototype.computeCost = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        return this.getJavaObject().computeCost(dataset_uw);
    };


    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    KMeansModel.prototype.write = function () {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };

    //
    // static methods
    //


    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    KMeansModel.read = function () {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.clustering.KMeansModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeansModel.load = function (path) {
        var javaObject = org.apache.spark.ml.clustering.KMeansModel.load(path);
        return new KMeansModel(javaObject);
    };

    module.exports = KMeansModel;
})();