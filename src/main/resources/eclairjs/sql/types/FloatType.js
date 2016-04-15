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

    var NumericType = require(EclairJS_Globals.NAMESPACE + '/sql/types/NumericType');

    /**
     * @constructor
     * @extends NumericType
     * @classdesc The data type representing Float values. Please use the singleton DataTypes.FloatType.
     * @memberof module:eclairjs/sql/types
     */

    function FloatType(jvmObj) {

        NumericType.call(this, jvmObj);
    };


    FloatType.prototype = Object.create(NumericType.prototype);


    FloatType.prototype.constructor = FloatType;

    /**
     * The default size of a value of the FloatType is 4 bytes.
     * @returns {integer}
     */
    FloatType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    FloatType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    FloatType.prototype.numeric = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    FloatType.prototype.fractional = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().fractional();
    };
    FloatType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    FloatType.prototype.asIntegral = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().asIntegral();
    };
    FloatType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };
    FloatType.prototype.unapply = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().unapply();
    };

    module.exports = FloatType;

})();
