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
     * @extends DataType
     * @classdesc The data type representing Boolean values. Please use the singleton DataTypes.BooleanType.
     * @memberof module:eclairjs/sql/types
     */

    function BooleanType(jvmObj) {

        DataType.call(this, jvmObj);
    };


    BooleanType.prototype = Object.create(DataType.prototype);


    BooleanType.prototype.constructor = BooleanType;

    /**
     * The default size of a value of the BooleanType is 1 byte.
     * @returns {integer}
     */
    BooleanType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    BooleanType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    BooleanType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    BooleanType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };

    module.exports = BooleanType;

})();
