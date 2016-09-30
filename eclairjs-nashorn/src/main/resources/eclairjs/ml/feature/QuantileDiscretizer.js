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
     * `QuantileDiscretizer` takes a column with continuous features and outputs a column with binned
     * categorical features. The bin ranges are chosen by taking a sample of the data and dividing it
     * into roughly equal parts. The lower and upper bin bounds will be -Infinity and +Infinity,
     * covering all real values. This attempts to find numBuckets partitions based on a sample of data,
     * but it may find fewer depending on the data sample values.
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var QuantileDiscretizer = function (uid) {
        this.logger = Logger.getLogger("ml_feature_QuantileDiscretizer_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.QuantileDiscretizer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.QuantileDiscretizer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.QuantileDiscretizer();
        }
        Estimator.call(this, jvmObject);

    };

    QuantileDiscretizer.prototype = Object.create(Estimator.prototype);

    QuantileDiscretizer.prototype.constructor = QuantileDiscretizer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    QuantileDiscretizer.prototype.uid = function () {
        return this.getJavaObject().uid();
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.setNumBuckets = function (value) {
        var javaObject = this.getJavaObject().setNumBuckets(value);
        return new QuantileDiscretizer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.setInputCol = function (value) {
        var javaObject = this.getJavaObject().setInputCol(value);
        return new QuantileDiscretizer(javaObject);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.setOutputCol = function (value) {
        var javaObject = this.getJavaObject().setOutputCol(value);
        return new QuantileDiscretizer(javaObject);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.copy = function (extra) {
        var extra_uw = Utils.unwrapObject(extra);
        var javaObject = this.getJavaObject().copy(extra_uw);
        return new QuantileDiscretizer(javaObject);
    };

    /**
     * Maximum number of buckets (quantiles, or categories) into which data points are grouped. Must be >= 2. default: 2
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    QuantileDiscretizer.prototype.numBuckets = function () {
        var javaObject = this.getJavaObject().numBuckets();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    QuantileDiscretizer.prototype.getNumBuckets = function () {
        return this.getJavaObject().getNumBuckets();
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.load = function (path) {
        var javaObject = org.apache.spark.ml.feature.QuantileDiscretizer.load(path);
        return new QuantileDiscretizer(javaObject);
    };

    module.exports = QuantileDiscretizer;
})();