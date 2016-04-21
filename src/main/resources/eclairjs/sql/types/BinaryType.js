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

    var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');

    /**
     * @constructor
     * @extends module:eclairjs/sql/types.DataType
     * @classdesc The data type representing Array[Byte] values. Please use the singleton DataTypes.BinaryType.
     * @memberof module:eclairjs/sql/types
     */

    var BinaryType = function () {
        var jvmObj = arguments[0];
        DataType.call(this, jvmObj);
    };


    BinaryType.prototype = Object.create(DataType.prototype);


    BinaryType.prototype.constructor = BinaryType;

    /**
     * The default size of a value of the BinaryType is 4096 bytes.
     * @returns {integer}
     */
    BinaryType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    BinaryType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    BinaryType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };

    module.exports = BinaryType;

})();
