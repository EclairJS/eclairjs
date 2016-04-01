
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
     * @extends module:sql/types/DataType
     * @classdesc The data type for Maps. Keys in a map are not allowed to have null values.
     * Please use DataTypes.createMapType() to create a specific instance.
     * @param {DataType} keyType The data type of map keys.
     * @param {DataType} valueType The data type of map values.
     * @param {boolean} valueContainsNull Indicates if map values have null values.
     * @memberof module:sql/types
     */

    function MapType(jvmObj) {
        var jvmObj;
        if (arguments[0] && (arguments[0] instanceof Object)) {
            jvmObj = arguments[0];
        } else if (arguments.length == 3) {
            jvmObj = new org.apache.spark.sql.types.MapType(arguments[0], arguments[1], arguments[1]);
        } else {
            jvmObj = new org.apache.spark.sql.types.MapType();
        }
        DataType.call(this, jvmObj);
    };


    MapType.prototype = Object.create(DataType.prototype);


    MapType.prototype.constructor = MapType;
    /**
     * Construct a MapType object with the given key type and value type.
     * @static
     * @param {DataType} keyType
     * @param {DataType} valueType
     * @returns {MapType}
     */
    MapType.apply = function (keyType, valueType) {
        return new MapType(org.apache.spark.sql.types.MapType.apply(keyType, valueType));
    };
    /**
     * The default size of a value of the MapType is 100 * (the default size of the key type + the default size of the value type).
     * @returns {integer}
     */
    MapType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    /**
     * @returns {DataType}
     */
    MapType.prototype.keyType = function () {
        return Utis.javaToJs(this.getJavaObject().keyType());
    };
    /**
     * @returns {DataType}
     */
    MapType.prototype.valueType = function () {
        return Utis.javaToJs(this.getJavaObject().valueType());
    };
    /**
     * Readable string representation for the type.
     * @returns {string}
     */
    MapType.prototype.simpleString = function () {
        return this.getJavaObject().simpleString();
    };
    /**
     * @returns {boolean}
     */
    MapType.prototype.valueContainsNull = function () {
        return this.getJavaObject().valueContainsNull();
    };

    module.exports = MapType;
}

