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

/**
 * :: Experimental ::
 * Interface used to write a {@link DataFrame} to external storage systems (e.g. file systems,
 * key-value stores, etc). Use {@link write} to access this.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @constructor
 * @classdesc
 */
var DataFrameWriter = function(javaDataFrameWriter) {
	var jvmObj = javaDataFrameWriter;
	this.logger = Logger.getLogger("sql.DataFrameWriter_js");
	JavaWrapper.call(this, jvmObj);
};

DataFrameWriter.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to DataFrameWriter
DataFrameWriter.prototype.constructor = DataFrameWriter;


/**
 * Specifies the behavior when data or table already exists. Options include:
 *   - `overwrite`: overwrite the existing data.
 *   - `append`: append the data.
 *   - `ignore`: ignore the operation (i.e. no-op).
 *   - `error`: default option, throw an exception at runtime.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string}
 * @returns {DataFrameWriter} 
 */
DataFrameWriter.prototype.mode = function(saveMode) {
	var javaObject =  this.getJavaObject().mode(saveMode);
	return new DataFrameWriter(javaObject);
}


/**
 * Specifies the underlying output data source. Built-in options include "parquet", "json", etc.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} source
 * @returns {DataFrameWriter} 
 */
DataFrameWriter.prototype.format = function(source) {
   var javaObject =  this.getJavaObject().format(source);
   return new DataFrameWriter(javaObject);
}


/**
 * Adds an output option for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string | object} keyOrMap
 * If object, the object is expected to be a HashMap, the key of the map is type: 'String'
 * The value must be of the following type: `String`. 
 * @param {string}
 * @returns {DataFrameWriter} 
 */
DataFrameWriter.prototype.option = function(keyOrMap,value) {
	var javaObject;
	if (typeof keyOrMap === 'object') {
		var map = Utils.createJavaHashMap(keyOrMap);
		javaObject =  this.getJavaObject().option(map);
	} else {
		javaObject =  this.getJavaObject().option(keyOrMap,value);
	}
	return new DataFrameWriter(javaObject);
};


/**
 * Partitions the output by the given columns on the file system. If specified, the output is
 * laid out on the file system similar to Hive's partitioning scheme.
 *
 * This is only applicable for Parquet at the moment.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} colName,...colName
 * @returns {DataFrameWriter} 
 */
DataFrameWriter.prototype.partitionBy = function() {
	/*
	 * Create a argument list we can send to Java
	 */
	var args = Array.prototype.slice.call(arguments);
	var str = "this.getJavaObject().partitionBy("
	for (var i = 0; i < args.length; i++) {
		var spacer = i < 1 ? "" : ",";
		str += spacer + "args[" + i + "]";
	}	
	str += ");";
	
	var javaObject = eval(str);

	return new DataFrameWriter(javaObject);

};


/**
 * Saves the content of the {@link DataFrame} as the specified table., unless path is specified.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} [path] Saves the content of the {@link DataFrame} at the specified path.
 */
DataFrameWriter.prototype.savewithPath = function(path) {
	if(path) {
		this.getJavaObject().save(path);
	} else {
		this.getJavaObject().save();
	}  
};



/**
 * Inserts the content of the {@link DataFrame} to the specified table. It requires that
 * the schema of the {@link DataFrame} is the same as the schema of the table.
 *
 * Because it inserts data to an existing table, format or options will be ignored.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} tableName
 */
DataFrameWriter.prototype.insertInto = function(tableName) {
	this.getJavaObject().insertInto(tableName);
};


/**
 * Saves the content of the {@link DataFrame} as the specified table.
 *
 * In the case the table already exists, behavior of this function depends on the
 * save mode, specified by the `mode` function (default to throwing an exception).
 * When `mode` is `Overwrite`, the schema of the {@link DataFrame} does not need to be
 * the same as that of the existing table.
 * When `mode` is `Append`, the schema of the {@link DataFrame} need to be
 * the same as that of the existing table, and format or options will be ignored.
 *
 * When the DataFrame is created from a non-partitioned {@link HadoopFsRelation} with a single input
 * path, and the data source provider can be mapped to an existing Hive builtin SerDe (i.e. ORC
 * and Parquet), the table is persisted in a Hive compatible format, which means other systems
 * like Hive will be able to read this table. Otherwise, the table is persisted in a Spark SQL
 * specific format.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} tableName
 */
DataFrameWriter.prototype.saveAsTable = function(tableName) {
    this.javaDataFrameWriter.saveAsTable(tableName);
};


/**
 * Saves the content of the {@link DataFrame} to a external database table via JDBC. In the case the
 * table already exists in the external database, behavior of this function depends on the
 * save mode, specified by the `mode` function (default to throwing an exception).
 *
 * Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
 * your external database systems.
 *
 * @param {string} url  JDBC database url of the form `jdbc:subprotocol:subname`
 * @param {string} table  Name of the table in the external database.
 * @param {object} connectionProperties  JDBC database connection arguments, a list of arbitrary string
 *                             tag/value. Normally at least a "user" and "password" property
 *                             should be included.
 */
DataFrameWriter.prototype.jdbc = function(url,table,connectionProperties) {

	var map = Utils.createJavaHashMap(connectionProperties, new java.util.Properties());
	var connectionProperties_uw = Utils.unwrapObject(connectionProperties);
    this.getJavaObject().jdbc(url,table,map);
};


/**
 * Saves the content of the {@link DataFrame} in JSON format at the specified path.
 * This is equivalent to:
 * @example 
 *   format("json").save(path)
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} path
 */
DataFrameWriter.prototype.json = function(path) {
    this.getJavaObject().json(path);
};


/**
 * Saves the content of the {@link DataFrame} in Parquet format at the specified path.
 * This is equivalent to:
 * @example 
 *   format("parquet").save(path)
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} path
 */
DataFrameWriter.prototype.parquet = function(path) {
    this.getJavaObject().parquet(path);
};


/**
 * Saves the content of the {@link DataFrame} in ORC format at the specified path.
 * This is equivalent to:
 * @example 
 *   format("orc").save(path)
 *  
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @note Currently, this method can only be used together with `HiveContext`.
 * @param {string} path
 */
DataFrameWriter.prototype.orc = function(path) {
    this.getJavaObject().orc(path);
};

