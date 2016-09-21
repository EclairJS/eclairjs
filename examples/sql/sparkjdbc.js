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

/*
 * The example requires a mySQL database "eclairjstesting" with a people table
 * the JDBC drivers must be added to the java class path
 * 
 * Note to run this example you must include the JDBC driver class must be visible to the primordial class loader
 * on the client session and on all executors. This is because Java’s DriverManager class does a security check
 * that results in it ignoring all drivers not visible to the primordial class loader when one goes to open a connection.
 * as described https://spark.apache.org/docs/latest/sql-programming-guide.html#jdbc-to-other-databases and http://stackoverflow.com/questions/29552799/spark-unable-to-find-jdbc-driver
 * Another option is to include the --driver-class-path option on the command line for example:
 * <path to EclairJS>/bin/eclairjs.sh  --conf spark.executor.extraClassPath= <path to JDBC jar file> --driver-class-path <path to JDBC jar file> <path to EclairJS>/examples/sql/sparkjdbc.js
 */
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');
var SQLContext = require('eclairjs/sql/SQLContext');

var SparkSession = require('eclairjs/sql/SparkSession');
var spark = SparkSession
    .builder()
    .appName("JavaScript Spark JDBC Example")
    .getOrCreate();

var url="jdbc:mysql://localhost:3306/eclairjstesting";
var prop = {};
prop["user"] = "root";
prop["password"] = "eclairjstestPW";
var peopleDF = spark.read().jdbc(url, "people", prop);
peopleDF.show();
var peopleDF = spark.read().jdbc(url, "people", ["age > 20"], prop);
peopleDF.show();
var writer = peopleDF.write();
try {
	writer.jdbc(url, "peoplewritetest", prop);
} catch (e) {
	print(" exception " + e);
	print("saving in overwrite mode");
	writer.mode('overwrite').jdbc(url, "peoplewritetest", prop);
}


//scala> val males = sqlContext.read.jdbc(url,"person",Array("gender='M'"),prop)
