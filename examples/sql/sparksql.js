/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var DataTypes = require('eclairjs/sql/types').DataTypes;
var DataType = require('eclairjs/sql/types/DataType');
var SQLContext = require('eclairjs/sql/SQLContext');
var sql = require('eclairjs/sql');
var RowFactory = sql.RowFactory;
//var DataFrame = sql.DataFrame;
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');
var sparkConf = new SparkConf().setAppName("JavaScriptSparkSQL");
var ctx = new SparkContext(sparkConf);
var sqlContext = new SQLContext(ctx);

var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/people.txt";
var jsonFile = ((typeof args !== "undefined") && (args.length > 2)) ? args[2] :"examples/data/test.json"
// Load a text file and convert each line to a JavaScript Object.
var people = ctx.textFile(filename).map(function(line) {
	var parts = line.split(",");
	return person = {
    				name: parts[0], 
    				age: parseInt(parts[1].trim())
    		};
});

//Generate the schema
var fields = [];
fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
var schema = DataTypes.createStructType(fields);
// Convert records of the RDD (people) to Rows.
var rowRDD = people.map(function(person, RowFactory){
	return RowFactory.create([person.name, person.age]);
},[RowFactory]);


//Apply the schema to the RDD.
var peopleDataFrame = sqlContext.createDataFrame(rowRDD, schema);

// Register the DataFrame as a table.
peopleDataFrame.registerTempTable("people");

// SQL can be run over RDDs that have been registered as tables.
var results = sqlContext.sql("SELECT name FROM people");

//The results of SQL queries are DataFrames and support all the normal RDD operations.
//The columns of a row in the result can be accessed by ordinal.
var names = results.toRDD().map(function(row) {
	return "Name: " + row.getString(0);
});

print("names = " + names.take(10));
var dataFrame = sqlContext.read().json(jsonFile);
var col = dataFrame.col("first")
var gd = dataFrame.groupBy(col);
var df2 = gd.count();

df2.show();
df2.count();
