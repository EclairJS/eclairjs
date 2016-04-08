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
    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');

    /**
     *
     * @constructor
     * @classdesc Metadata is a wrapper over Map[String, Any] that limits the value type to simple ones:
     * Boolean, Long, Double, String, Metadata, Array[Boolean], Array[Long], Array[Double], Array[String], and Array[Metadata].
     * JSON is used for serialization.
     * The default constructor is private. User should use either MetadataBuilder or Metadata.fromJson() to create Metadata instances.
     * @protected
     * @memberof module:sql/types
     */
    var Metadata = function (jvmObj) {

        this.logger = Logger.getLogger("sql.Metadata_js");
        JavaWrapper.call(this, jvmObj);
    };

    Metadata.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to Metadata
    Metadata.prototype.constructor = Metadata;
    /**
     * Tests whether this Metadata contains a binding for a key.
     * @param {string} key
     * @returns {boolean}
     */
    Metadata.prototype.contains = function (key) {
        return this.getJavaObject().contains(key);
    };
    /**
     * Returns an empty Metadata.
     * @static
     * @returns {Metadata}
     */
    Metadata.empty = function () {
        return new Metadata(org.apache.spark.sql.types.Metadata.empty());
    };
    /**
     *
     * @param {object} obj
     * @returns {boolean}
     */
    Metadata.prototype.equals = function (obj) {
        return this.getJavaObject().equals(obj);
    };
    /**
     * Creates a Metadata instance from JSON
     * @static
     * @param {string} json
     * @returns {Metadata}
     */
    Metadata.fromJson = function (json) {
        return new Metadata(org.apache.spark.sql.types.Metadata.fromJson(json));
    };
    /**
     * Gets a Boolean.
     * @param {string} key
     * @returns {boolean}
     */
    Metadata.prototype.getBoolean = function (key) {
        return this.getJavaObject().getBoolean(key);
    };
    /**
     * Gets a Boolean array.
     * @param {string} key
     * @returns {boolean[]}
     */
    Metadata.prototype.getBooleanArray = function (key) {
        return this.getJavaObject().getBooleanArray(key);
    };
    /**
     * Gets a Double.
     * @param {string} key
     * @returns {double}
     */
    Metadata.prototype.getDouble = function (key) {
        return this.getJavaObject().getDouble(key);
    };
    /**
     * Gets a Double array.
     * @param {string} key
     * @returns {double[]}
     */
    Metadata.prototype.getDoubleArray = function (key) {
        return this.getJavaObject().getDoubleArray(key);
    };
    /**
     * Gets a Long.
     * @param {string} key
     * @returns {long}
     */
    Metadata.prototype.getLong = function (key) {
        return this.getJavaObject().getLong(key);
    };
    /**
     * Gets a Long array.
     * @param {string} key
     * @returns {long[]}
     */
    Metadata.prototype.getLongArray = function (key) {
        return this.getJavaObject().getLongArray(key);
    };
    /**
     * Gets a Metadata.
     * @param {string} key
     * @returns {Metadata}
     */
    Metadata.prototype.getMetadata = function (key) {
        return this.getJavaObject().getMetadata(key);
    };
    /**
     * Gets a Metadata array.
     * @param {string} key
     * @returns {Metadata[]}
     */
    Metadata.prototype.getMetadataArray = function (key) {
        return this.getJavaObject().getMetadataArray(key);
    };
    /**
     * Gets a String..
     * @param {string} key
     * @returns {string}
     */
    Metadata.prototype.getString = function (key) {
        return this.getJavaObject().getString(key);
    };
    /**
     * Gets a String array..
     * @param {string} key
     * @returns {string[]}
     */
    Metadata.prototype.getStringArray = function (key) {
        return this.getJavaObject().getStringArray(key);
    };
    /**
     * @returns {integer}
     */
    Metadata.prototype.hashCode = function () {
        return this.getJavaObject().hashCode();
    };
    /**
     * Converts to its JSON representation.
     * @returns {string}
     */
    Metadata.prototype.json = function () {
        return this.getJavaObject().json();
    };
    /**
     *
     * @returns {map}
     */
    Metadata.prototype.map = function () {
        return this.getJavaObject().map();
    };
    Metadata.prototype.toJSON = function () {
        return JSON.parse(this.json());
    };

    Metadata.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    module.exports = Metadata;
}
