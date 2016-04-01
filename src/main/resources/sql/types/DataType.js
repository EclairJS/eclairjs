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
    var JavaWrapper = require('JavaWrapper');

    /**
     * @constructor
     * @classdesc The base type of all Spark SQL data types.
     * @memberof module:sql/types
     */

    var DataType = function(jvmObj) {

        JavaWrapper.call(this, jvmObj);
    };


    DataType.prototype = Object.create(JavaWrapper.prototype);


    DataType.prototype.constructor = DataType;

    /**
     * The default size of a value of this data type, used internally for size estimation.
     * @abstract
     * @returns {integer}
     */
    DataType.prototype.defaultSize = function () {
        print("dt")
        var pack = this.getJavaObject().getClass().getPackage();
        print(pack.getName());
        return this.getJavaObject().defaultSize();
    };
    /**
     * @param {string} json
     * @returns {DataType}
     */
    DataType.fromJson = function (json) {
        return new DataType(new org.apache.spark.sql.types.DataType.fromJson(json));
    };
    /**
     * The compact JSON representation of this data type.
     * @returns {string}
     */
    DataType.prototype.json = function () {
        return this.getJavaObject().json();
    };
    DataType.prototype.toJSON = function () {
        return this.typeName();
    };
    /**
     *The pretty (i.e. indented) JSON representation of this data type.
     * @returns {string}
     */
    DataType.prototype.prettyJson = function () {
        return this.getJavaObject().prettyJson();
    };
    /**
     * Name of the type used in JSON serialization.
     * @returns {string}
     */
    DataType.prototype.typeName = function () {
        return this.getJavaObject().typeName();
    };
    /**
     * @returns {string}
     */
    DataType.prototype.simpleString = function () {
        return this.getJavaObject().simpleString();
    };

    module.exports = DataType;
}