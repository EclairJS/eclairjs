
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
    var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');
    /**
     * @constructor
     * @extends DataType
     * @classdesc The base type of all Spark SQL Numeric data types.
     * @memberof module:sql/types
     */

    function NumericType(jvmObj) {

        DataType.call(this, jvmObj);
    };


    NumericType.prototype = Object.create(DataType.prototype);


    NumericType.prototype.constructor = NumericType;

    /**
     * The default size of a value of this data type, used internally for size estimation.
     * @abstract
     * @returns {integer}
     */
    NumericType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    NumericType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };
    NumericType.prototype.numeric = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    NumericType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    NumericType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };
    NumericType.prototype.unapply = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().unapply();
    };

    module.exports = NumericType;
}