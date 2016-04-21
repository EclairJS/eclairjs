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
     * @extends module:eclairjs/sql/types.NumericType
     * @classdesc The data type representing Short values. Please use the singleton DataTypes.ShortType. not a valid primitive type for JavaScript
     * @memberof module:eclairjs/sql/types
     * @ignore
     */

    var ShortType = function(jvmObj) {
        throw "not implemented by ElairJS";
        //NumericType.call(this, jvmObj);
    };


    ShortType.prototype = Object.create(NumericType.prototype);


    ShortType.prototype.constructor = ShortType;

    /**
     * The default size of a value of the ShortType is 2 bytes.
     * @returns {integer}
     * @ignore
     */
    ShortType.prototype.defaultSize = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().defaultSize();
    };
    /**
     * @returns {string}
     * @ignore
     */
    ShortType.prototype.simpleString = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().simpleString();
    };
    ShortType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    ShortType.prototype.numeric = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    ShortType.prototype.fractional = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().fractional();
    };
    ShortType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    ShortType.prototype.asIntegral = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().asIntegral();
    };
    ShortType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };
    ShortType.prototype.unapply = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().unapply();
    };

    module.exports = ShortType;

})();
