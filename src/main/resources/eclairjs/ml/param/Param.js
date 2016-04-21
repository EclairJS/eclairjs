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
     * :: Experimental ::
     * A param with self-contained documentation and optionally default value. Primitive-typed param should use the specialized versions,
     * which are more friendly to Java users.param: parent parent object param: name param name param: doc documentation param: isValid
     * optional validation method which indicates if a value is valid. See ParamValidators for factory methods for common validation functions.
     * @classdesc
     * @param {string} parent
     * @param {string} name
     * @param {string} doc
     *  @class
     *  @memberof module:eclairjs/ml/param
     */
    var Param = function (parent,  name,  doc) {
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.ml.param.Param) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.ml.param.Param(parent,  name,  doc);
        }

        this.logger = Logger.getLogger("ParamPair_js");
        JavaWrapper.call(this, jvmObject);

    };

    Param.prototype = Object.create(JavaWrapper.prototype);

    Param.prototype.constructor = Param;

    Param.prototype.parent = function() {
        return this.getJavaObject().parent();
    }

    Param.prototype.name = function() {
        return this.getJavaObject().name();
    }

    Param.prototype.doc = function() {
        return this.getJavaObject().doc();
    }

    /**
     * Creates a param pair with the given value
     * @param {object} value
     * @returns {module:eclairjs/ml/param.ParamPair}
     */
    Param.prototype.w = function(value) {
        return Utils.javaToJs(this.getJavaObject().w(Utils.unwrapObject(value)));
    }

    /**
     * Encodes a param value into JSON, which can be decoded by jsonDecode().
     * @param {object} value
     * @returns {string}
     */
    Param.prototype.jsonEncode = function(value) {
        return this.getJavaObject().jsonEncode(Utils.unwrapObject(value));
    }

    /**
     * Decodes a param value from JSON.
     * @param {string} json
     * @returns {object}
     */
    Param.prototype.jsonDecode = function(json) {
        return this.getJavaObject().jsonDecode(json);
    }

    /**
     * @returns {string}
     */
    Param.prototype.toString = function() {
        return this.getJavaObject().toString();
    }

    /**
     * @returns {integer}
     */
    Param.prototype.hashCode = function() {
        return this.getJavaObject().hashCode();
    }

    /**
     * @param {module:eclairjs/ml/param.Param} obj
     * @returns {boolean}
     */
    Param.prototype.equals = function(obj) {
        return this.getJavaObject().equals(Utils.unwrapObject(obj));
    }

    module.exports = Param;

})();
