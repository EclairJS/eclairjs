/*
 * Copyright 2015 IBM Corp.
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
     * @constructor
     * @memberof module:eclairjs/mllib/regression
     * @classdesc Class that represents the features and labels of a data point.
     * @param {double} label
     * @param {Vector} features
     */
    {
        var LabeledPoint = function (label, features) {
            this.logger = Logger.getLogger("mllib.regression.LabeledPoint_js");
            var jvmObj;
            if (features == null) {
                this.logger.debug("Java object ");
                jvmObj = label;
            } else {
                jvmObj = new org.apache.spark.mllib.regression.LabeledPoint(label, Utils.unwrapObject(features));

            }
            JavaWrapper.call(this, jvmObj);
        };

        LabeledPoint.prototype = Object.create(JavaWrapper.prototype);

        LabeledPoint.prototype.constructor = LabeledPoint;
        /**
         * Returns features
         * @returns {Vector}
         */
        LabeledPoint.prototype.getFeatures = function () {
            return Serialize.javaToJs(this.getJavaObject().features());
        };
        /**
         * Returns label
         * @returns {float}
         */
        LabeledPoint.prototype.getLabel = function () {
            return this.getJavaObject().label();
        };
        /**
         * Parses a string resulted from LabeledPoint#toString into an LabeledPoint.
         * @param string
         * @returns {LabeledPoint}
         */
        LabeledPoint.prototype.parse = function (string) {
            var lp = org.apache.spark.mllib.regression.LabeledPoint.parse(s);
            var l = new LabeledPoint(lp);
            return l;
        };
        /**
         * Returns string representation of object
         * @returns {string}
         */
        LabeledPoint.prototype.toString = function () {
            return "[" + this.getLabel() + ", [" + this.getFeatures() + "]]";
        };
        /**
         * Returns string representation of JSON object
         * @returns {string}
         */
        LabeledPoint.prototype.toJSON = function () {
            //return "{label: " + this.getLabel() + ", features: " + this.getFeatures() + " }";
            var jsonObj = {};
            jsonObj.label = this.getLabel();
            jsonObj.features = this.getFeatures();
            return jsonObj;
        };

        module.exports = LabeledPoint;

})();
