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
     * @classdesc The data type representing Int values. Please use the singleton DataTypes.IntegerType.
     * @memberof module:eclairjs/sql/types
     */

    var IntegerType = function(jvmObj) {

        NumericType.call(this, jvmObj);
    };


    IntegerType.prototype = Object.create(NumericType.prototype);


    IntegerType.prototype.constructor = IntegerType;

    /**
     * The default size of a value of the IntegerType is 4 bytes.
     * @returns {integer}
     */
    IntegerType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    /**
     * @returns {string}
     */
    IntegerType.prototype.simpleString = function () {
        return this.getJavaObject().simpleString();
    };
    IntegerType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    IntegerType.prototype.numeric = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    IntegerType.prototype.fractional = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().fractional();
    };
    IntegerType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    IntegerType.prototype.asIntegral = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().asIntegral();
    };
    IntegerType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };
    IntegerType.prototype.unapply = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().unapply();
    };

    module.exports = IntegerType;

})();
