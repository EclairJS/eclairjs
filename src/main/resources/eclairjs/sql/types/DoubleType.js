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
     * @classdesc The data type representing Double values. Please use the singleton DataTypes.DoubleType.
     * @memberof module:eclairjs/sql/types
     */

    DoubleType = function(jvmObj) {

        NumericType.call(this, jvmObj);
    };


    DoubleType.prototype = Object.create(NumericType.prototype);


    DoubleType.prototype.constructor = DoubleType;

    /**
     * The default size of a value of the DoubleType is 8 bytes.
     * @returns {integer}
     */
    DoubleType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    DoubleType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    DoubleType.prototype.numeric = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    DoubleType.prototype.fractional = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().fractional();
    };
    DoubleType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    DoubleType.prototype.asIntegral = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().asIntegral();
    };
    DoubleType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };
    DoubleType.prototype.unapply = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().unapply();
    };

    module.exports = DoubleType;

})();
