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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');
    var logger = Logger.getLogger("sql.StructField_js");

    /**
     * @constructor
     * @classdesc A field inside a StructType.
     * @memberof module:eclairjs/sql/types
     * @param {string} name - The name of this field.
     * @param {module:eclairjs/sql/types.DataType} dataType - The data type of this field.
     * @param {boolean}  nullable -  Indicates if values of this field can be null values.
     * @param {module:eclairjs/sql/types.Metadata} metadata - The metadata of this field. The metadata should be preserved during transformation if the content of the column is not modified, e.g, in selection.
     */
    var StructField = function(name, dataType, nullable, metadata) {
        // StructField(java.lang.String name, DataType dataType, boolean nullable, Metadata metadata)
        var jvmObj = null;
        if (dataType == null) {
            logger.debug("Java object ");
            jvmObj = name; // the name is really a jvmObject created by one of our wrappers.
        } else {
            var dt = Utils.unwrapObject(dataType);
            var md = Utils.unwrapObject(metadata);
            jvmObj = new org.apache.spark.sql.types.StructField(name, dt, nullable, md);

        }
        // Call the parent constructor, making sure (using Function#call)
        // that "this" is set correctly during the call
        JavaWrapper.call(this, jvmObj);
        logger.debug("StructField constructor");
    };

//Create a StructField.prototype object that inherits from JavaWrapper.prototype.

    StructField.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to StructField
    StructField.prototype.constructor = StructField;
    /**
     * @returns {module:eclairjs/sql/types.DataType}
     */
    StructField.prototype.dataType = function () {
        return Utils.javaToJs(this.getJavaObject().dataType());
    };
    /**
     * @returns {module:eclairjs/sql/types.Metadata}
     */
    StructField.prototype.metadata = function () {
        //Metadata	metadata()
        return this.getJavaObject().metadata();
    };
    /**
     * @returns {string}
     */
    StructField.prototype.name = function () {
        //java.lang.String	name()
        return this.getJavaObject().name();
    };
    /**
     * @returns {boolean}
     */
    StructField.prototype.nullable = function () {
        //boolean	nullable()
        return this.getJavaObject().nullable();
    };
    /**
     * @returns {string}
     */
    /*StructField.prototype.toString = function() {
     return this.toString();
     };*/

    StructField.prototype.toJSON = function () {
        var jsonObj = {};
        jsonObj.name = this.name();
        jsonObj.dataType = this.dataType();
        jsonObj.nullable = this.nullable();
        jsonObj.metadata = this.metadata();
        return jsonObj;
    };

    module.exports = StructField;

})();
