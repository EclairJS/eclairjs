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
 * The entry point for working with structured data (rows and columns) in Spark. 
 * Allows the creation of DataFrame objects as well as the execution of SQL queries.
 * 
 * @constructor
 * @param {SparkContext}
 */
var SQLContext = function(jsc) {
	this.logger = Logger.getLogger("SQLContext_js");
    
    this.logger.debug("jsc type = " + jsc);
    var JavaSQLContext = Java.type("org.apache.spark.sql.SQLContext");
    var jvmObj = new JavaSQLContext(Utils.unwrapObject(jsc));
    JavaWrapper.call(this, jvmObj);
}

//Create a SQLContext.prototype object that inherits from JavaWrapper.prototype.

SQLContext.prototype = Object.create(JavaWrapper.prototype); 

//Set the "constructor" property to refer to SQLContext
SQLContext.prototype.constructor = SQLContext;
/**
 * Creates a DataFrame from RDD of Rows using the schema
 * @param {RDD[Row]} rowRDD - 
 * @param {StructType} schema - 
 * @returns {DataFrame}
 */
SQLContext.prototype.createDataFrame = function(rowRDD, schema) {
    return new DataFrame(this.getJavaObject().createDataFrame(Utils.unwrapObject(rowRDD), Utils.unwrapObject(schema)));
};
/**
 * 
 * @returns {DataFrameReader}
 */
SQLContext.prototype.read = function() {
    return new DataFrameReader(this.getJavaObject().read());
};
/**
 * 
 * @param sqlString
 * @returns {DataFrame}
 */
SQLContext.prototype.sql = function(sqlString) {
    return new DataFrame(this.getJavaObject().sql(sqlString));
};
/**
 *
 * @param name
 * @returns {DataFrame}
 */
SQLContext.prototype.table = function(name) {
    return new DataFrame(this.getJavaObject().table(name));
};



