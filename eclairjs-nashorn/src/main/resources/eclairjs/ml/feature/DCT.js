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
     * @classdesc
     * :: Experimental ::
     * A feature transformer that takes the 1D discrete cosine transform of a real vector. No zero
     * padding is performed on the input vector.
     * It returns a real vector of the same length representing the DCT. The return vector is scaled
     * such that the transform matrix is unitary (aka scaled DCT-II).
     *
     * More information on [[https://en.wikipedia.org/wiki/Discrete_cosine_transform#DCT-II Wikipedia]].
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     * @constructor
     */
    var DCT = function (uid) {
        this.logger = Logger.getLogger("ml.feature.DCT_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.DCT) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.DCT(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.DCT();
        }
        JavaWrapper.call(this, jvmObject);

    };

    DCT.prototype = Object.create(JavaWrapper.prototype);

    DCT.prototype.constructor = DCT;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    DCT.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * Indicates whether to perform the inverse DCT (true) or forward DCT (false).
     * Default: false
     * @returns {module:eclairjs/ml/param.BooleanParam}
     */
    DCT.prototype.inverse = function () {
           return  Utils.javaToJs(this.getJavaObject().inverse());
    };


    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.setInverse = function (value) {
           var javaObject =  this.getJavaObject().setInverse(value);
           return new DCT(javaObject);
    };


    /**
     * @returns {boolean}
     */
    DCT.prototype.getInverse = function () {
           return  this.getJavaObject().getInverse();
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DCT.prototype.transform = function (dataset) {
        var dataset_uw = Utils.unwrapObject(dataset);
        var javaObject = this.getJavaObject().transform(dataset_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    DCT.prototype.transformSchema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().transformSchema(schema_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return Utils.javaToJs(javaObject);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.load = function (path) {
           var javaObject =  org.apache.spark.ml.feature.DCT.load(path);
           return new DCT(javaObject);
    };

    module.exports = DCT;
})();