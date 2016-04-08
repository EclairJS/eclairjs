
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
{
    var DataType = require('sql/types/DataType');

    /**
     * @constructor
     * @extends DataType
     * @classdesc The data type representing String values. Please use the singleton DataTypes.StringType.
     * @memberof module:sql/types
     */

    var StringType = function(jvmObj) {

        DataType.call(this, jvmObj);
    };


    StringType.prototype = Object.create(DataType.prototype);


    StringType.prototype.constructor = StringType;

    /**
     * The default size of a value of the StringType is 4096 bytes.
     * @returns {integer}
     */
    StringType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    StringType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    StringType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    StringType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };

    module.exports = StringType;
}

