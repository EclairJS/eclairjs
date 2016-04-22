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
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');

    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdesc Interface used to load a DataFrame from external storage systems (e.g. file systems, key-value stores, etc).
     * Use SQLContext.read to access this.
     */
    var DataFrameReader = function (javaDataFrameReader) {
        var jvmObj;
        this.logger = Logger.getLogger("sql.DataFrameReader_js");
        jvmObj = javaDataFrameReader;
        JavaWrapper.call(this, jvmObj);
    };

    DataFrameReader.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to DataFrameReader
    DataFrameReader.prototype.constructor = DataFrameReader;

    /**
     * Specifies the input data source format.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {string} source
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
    DataFrameReader.prototype.format = function (source) {
        var javaObject = this.getJavaObject().format(source);
        return new DataFrameReader(javaObject);
    }


    /**
     * Specifies the input schema. Some data sources (e.g. JSON) can infer the input schema
     * automatically from data. By specifying the schema here, the underlying data source can
     * skip the schema inference step, and thus speed up data loading.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
    DataFrameReader.prototype.schema = function (schema) {
        var schema_uw = Utils.unwrapObject(schema);
        var javaObject = this.getJavaObject().schema(schema_uw);
        return new DataFrameReader(javaObject);
    }


    /**
     * Adds an input option for the underlying data source.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {string | object} keyOrMap
     * If object, the object is expected to be a HashMap, the key of the map is type: 'String'
     * The value must be of the following type: `String`.
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
    DataFrameReader.prototype.option = function (keyOrMap, value) {
        var javaObject;
        if (typeof keyOrMap === 'object') {
            var map = Utils.createJavaHashMap(keyOrMap);
            javaObject = this.getJavaObject().option(map);
        } else {
            javaObject = this.getJavaObject().option(keyOrMap, value);
        }
        return new DataFrameReader(javaObject);
    };

    /**
     * Adds input options for the underlying data source.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {Map} map
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
    DataFrameReader.prototype.options = function (map) {
        var jmap = Utils.createJavaHashMap(map);
        var javaObject = this.getJavaObject().options(jmap);
        return new DataFrameReader(javaObject);
    };

    /**
     * Loads input in as a {@link DataFrame}
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {string} [path] Loads data sources that require a path (e.g. data backed by
     * a local or distributed file system). If not specified loads data sources that don't require a path (e.g. external
     * key-value stores).
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DataFrameReader.prototype.load = function (path) {
        var javaObject;
        if (path) {
            javaObject = this.getJavaObject().load(path);
        } else {
            javaObject = this.getJavaObject().load();
        }
        return Utils.javaToJs(javaObject);
    };


    /**
     * Construct a {@link DataFrame} representing the database table accessible via JDBC URL
     * @example
     * // url named table and connection properties.
     * var url="jdbc:mysql://localhost:3306/eclairjstesting";
     * var table = "people";
     * var connectionProperties = {"user" : "root", "password": "mypassword"};
     * var predicates = ["age > 20"];
     *
     * // url named table and connection properties.
     * var peopleDF = sqlContext.read().jdbc(url, table, connectionProperties);
     *
     * // or
     * // Partitions of the table will be retrieved in parallel based on the parameters
     * // passed to this function.
     * // Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
     * //your external database systems.
     * var peopleDF = sqlContext.read().jdbc(url,table,columnName,lowerBound,upperBound,numPartitions,connectionProperties);
     *
     * // or
     * // url named table using connection properties. The `predicates` parameter gives a list
     * // expressions suitable for inclusion in WHERE clauses; each one defines one partition of the {@link DataFrame}.
     * // Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
     * // your external database systems.
     * var peopleDF = sqlContext.read().jdbc(url,table,predicates,connectionProperties);
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {string} url
     * @param {string} table
     * @param {object | string | string[]} connectionPropertiesMap|columnName|predicates
     * If connectionPropertiesMap connectionProperties  JDBC database connection arguments, a map of arbitrary string tag/value.
     * Normally at least a "user" and "password" property should be included.
     * If columnName  the name of a column of integral type that will be used for partitioning.
     * If predicates Condition in the where clause for each partition.
     * @param {number | object} lowerBound|connectionPropertiesMap
     * If lowerBound the minimum value of `columnName` used to decide partition stride
     * If connectionProperties  JDBC database connection arguments, a list of arbitrary string
     * tag/value. Normally at least a "user" and "password" property should be included.
     * @param {number} upperBound  the maximum value of `columnName` used to decide partition stride
     * @param {number} numPartitions  the number of partitions.  the range `minValue`-`maxValue` will be split
     *                      evenly into this many partitions
     * @param {object} connectionProperties  JDBC database connection arguments, a list of arbitrary string
     *                             tag/value. Normally at least a "user" and "password" property
     *                             should be included.

     * @returns {module:eclairjs/sql.DataFrame}
     */
    DataFrameReader.prototype.jdbc = function () {
        var javaObject;
        if (arguments.length == 3) {
            // connectionPropertiesMap
            var map = Utils.createJavaHashMap(arguments[2], new java.util.Properties());
            javaObject = this.getJavaObject().jdbc(arguments[0], arguments[1], map);
        } else if (arguments.length == 4) {
            // predicates
            var map = Utils.createJavaHashMap(arguments[3], new java.util.Properties());
            javaObject = this.getJavaObject().jdbc(arguments[0], arguments[1], arguments[2], map);
        } else if (arguments.length == 7) {
            var map = Utils.createJavaHashMap(arguments[6], new java.util.Properties());
            javaObject = this.getJavaObject().jdbc(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], map);
        } else {
            throw "DataFrameReader.jdbc() invalid number of arguments.";
        }

        return Utils.javaToJs(javaObject);
    }


    /**
     * Loads a JSON file, or RDD[String] storing JSON objects (one object per line) and returns the result as a {@link DataFrame}.
     * If path this function goes through the input once to determine the input schema. If you know the
     * schema in advance, use the version that specifies the schema to avoid the extra scan.
     * If RDD  unless the schema is specified using {@link schema} function, this function goes through the
     * input once to determine the input schema.
     * @param {string | module:eclairjs.RDD} path or RDD
     * @returns {module:eclairjs/sql.DataFrame}
     * @since EclairJS 0.1 Spark  1.4.0
     */
    DataFrameReader.prototype.json = function () {
        var arg = arguments[0];
        if (typeof arg === 'object') {
            arg = Utils.unwrapObject(arg);
        }

        return Utils.javaToJs(this.getJavaObject().json(arg));
    };

    /**
     * Loads a Parquet file, returning the result as a {@link DataFrame}. This function returns an empty
     * {@link DataFrame} if no paths are passed in.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {string} path
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DataFrameReader.prototype.parquet = function (paths) {
        var javaObject = this.getJavaObject().parquet(paths);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Loads an ORC file and returns the result as a {@link DataFrame}.
     *
     * @param {string} path  input path
     * @since EclairJS 0.1 Spark  1.5.0
     * @note Currently, this method can only be used together with `HiveContext`.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DataFrameReader.prototype.orc = function (path) {
        var javaObject = this.getJavaObject().orc(path);

        return Utils.javaToJs(javaObject);
    };


    /**
     * Returns the specified table as a {@link DataFrame}.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {string} tableName
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DataFrameReader.prototype.table = function (tableName) {
        var javaObject = this.getJavaObject().table(tableName);

        return Utils.javaToJs(javaObject);
    };

    /**
     * Loads a text file and returns a {@link DataFrame} with a single string column named "value".
     * Each line in the text file is a new row in the resulting DataFrame. For example:
     * @example
     *   sqlContext.read().text("/path/to/spark/README.md")
     *
     *
     * @param {...string} paths  input path
     * @since EclairJS 0.1 Spark  1.6.0
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DataFrameReader.prototype.text = function (paths) {
        var javaObject = this.getJavaObject().text(paths);

        return Utils.javaToJs(javaObject);
    };

    module.exports = DataFrameReader;

})();