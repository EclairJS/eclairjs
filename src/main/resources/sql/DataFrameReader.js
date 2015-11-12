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
 * @constructor
 * @classdesc Interface used to load a DataFrame from external storage systems (e.g. file systems, key-value stores, etc). 
 * Use SQLContext.read to access this.
 */
var DataFrameReader = function(javaDataFrameReader) {
	var jvmObj;
	this.logger = Logger.getLogger("sql.DataFrameReader_js");
	jvmObj = javaDataFrameReader;
    JavaWrapper.call(this, jvmObj);
};

DataFrameReader.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to DataFrameReader
DataFrameReader.prototype.constructor = DataFrameReader;

/**
 * Loads a JSON file, or RDD[String] storing JSON objects (one object per line) and returns the result as a DataFrame.
 * @param {string | RDD} 
 * @returns {DataFrame}
 */
DataFrameReader.prototype.json = function() {
    if(typeof arguments[0] === 'object')
        return this.jsonFromRDD(arguments[0]);

    return this.jsonFromPath(arguments[0]);
};
/**
 * Loads a JSON file (one object per line) and returns the result as a DataFrame.
 * @param {string} path
 * @returns {DataFrame}
 */
DataFrameReader.prototype.jsonFromPath = function(path) {
    return new DataFrame(this.getJavaObject().json(path));
};
/**
 * Loads an RDD[String] storing JSON objects (one object per record) and returns the result as a DataFrame.
 * @param {RDD} rdd
 * @returns {DataFrame}
 */
DataFrameReader.prototype.jsonFromRDD = function(rdd) {
    return new DataFrame(this.getJavaObject().json(rdd.getJavaObject()));
};
/**
 * Loads a Parquet file, returning the result as a DataFrame.
 * @param {string} path
 * @returns {DataFrame}
 */
DataFrameReader.prototype.parquet = function(path) {
    return new DataFrame(this.getJavaObject().parquet(path));
};