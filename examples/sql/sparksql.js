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

var Encoders = require('eclairjs/sql/Encoders');
var DataTypes = require('eclairjs/sql/types').DataTypes;
var DataType = require('eclairjs/sql/types/DataType');
var RowFactory = require('eclairjs/sql/RowFactory');

var col = require('eclairjs/sql/functions').col;

var SparkSession = require('eclairjs/sql/SparkSession');

var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/people.txt";
var jsonFile = ((typeof args !== "undefined") && (args.length > 2)) ? args[2] :"examples/data/people.json"

var spark = SparkSession
      .builder()
      .appName("Java Spark SQL Example")
      .config("spark.some.config.option", "some-value")
      .getOrCreate();

//runBasicDataFrameExample(spark);
//runDatasetCreationExample(spark);
runInferSchemaExample(spark);
//runProgrammaticSchemaExample(spark);

spark.stop();

function runBasicDataFrameExample( spark) {
	var df = spark.read().json(jsonFile);

	// Displays the content of the DataFrame to stdout
	df.show();
	// +----+-------+
	// | age|   name|
	// +----+-------+
	// |null|Michael|
	// |  30|   Andy|
	// |  19| Justin|
	// +----+-------+

	// Print the schema in a tree format
	df.printSchema();
	// root
	// |-- age: long (nullable = true)
	// |-- name: string (nullable = true)

	// Select only the "name" column
	df.select("name").show();
	// +-------+
	// |   name|
	// +-------+
	// |Michael|
	// |   Andy|
	// | Justin|
	// +-------+

	// Select everybody, but increment the age by 1
	df.select(col("name"), col("age").plus(1)).show();
	// +-------+---------+
	// |   name|(age + 1)|
	// +-------+---------+
	// |Michael|     null|
	// |   Andy|       31|
	// | Justin|       20|
	// +-------+---------+

	// Select people older than 21
	df.filter(col("age").gt(21)).show();
	// +---+----+
	// |age|name|
	// +---+----+
	// | 30|Andy|
	// +---+----+

	// Count people by age
	df.groupBy("age").count().show();
	// +----+-----+
	// | age|count|
	// +----+-----+
	// |  19|    1|
	// |null|    1|
	// |  30|    1|
	// +----+-----+

	// Register the DataFrame as a SQL temporary view
	df.createOrReplaceTempView("people");

	var sqlDF = spark.sql("SELECT * FROM people");
	sqlDF.show();
	// +----+-------+
	// | age|   name|
	// +----+-------+
	// |null|Michael|
	// |  30|   Andy|
	// |  19| Justin|
	// +----+-------+
}

function runDatasetCreationExample(spark) {
	// Create an instance of an object
	var person = {name:"Andy",age:32};

	// Encoders are created for Jsod
	var personEncoder=Encoders.json({ name: "String", age: "Integer"})

	var jsonDS = spark.createDatasetFromJson(
	 [person],
	  personEncoder
	);

	jsonDS.show();
	// +---+----+
	// |age|name|
	// +---+----+
	// | 32|Andy|
	// +---+----+

	// Encoders for most common types are provided in class Encoders
	var integerEncoder = Encoders.INT();
	var primitiveDS = spark.createDataset([1, 2, 3], Encoders.INT());
	var transformedDS = primitiveDS.map( function(value) {
		return new java.lang.Integer(value + 1);
	}, integerEncoder);
	transformedDS.collect(); // Returns [2, 3, 4]

}

function runInferSchemaExample( spark) {
	// Create an RDD of Person objects from a text file
	var peopleRDD = spark.read()
	  .textFile(filename)
	  .rdd()
	  .map(function( line)  {
		  var parts = line.split(",");
		  return person = {
    				name: parts[0],
    				age: parseInt(parts[1].trim())
    		};
	  });

	// Apply a schema to an RDD of JavaBeans to get a DataFrame
	//Generate the schema
	var fields = [];
	fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
	fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
	var schema = DataTypes.createStructType(fields);
	var rowRDD = peopleRDD.map(function(person, RowFactory){
		return RowFactory.create([person.name, person.age]);
	},[RowFactory]);

	var peopleDF = spark.createDataFrame(rowRDD, schema);
	// Register the DataFrame as a temporary view
	peopleDF.createOrReplaceTempView("people");

	// SQL statements can be run by using the sql methods provided by spark
	var teenagersDF = spark.sql("SELECT name FROM people WHERE age BETWEEN 13 AND 19");

	// The columns of a row in the result can be accessed by field index
	var stringEncoder = Encoders.STRING();
	var teenagerNamesByIndexDF = teenagersDF.map(
	 function (row) {
		return "Name: " + row.getString(0);
	}, stringEncoder);
	teenagerNamesByIndexDF.show();
	// +------------+
	// |       value|
	// +------------+
	// |Name: Justin|
	// +------------+

	// or by field name
	var teenagerNamesByFieldDF = teenagersDF.map(function(row){
		return "Name: " + row.getAs("name");
	}, stringEncoder);
	teenagerNamesByFieldDF.show();
	// +------------+
	// |       value|
	// +------------+
	// |Name: Justin|
	// +------------+
}

function runProgrammaticSchemaExample( spark) {
	// Create an RDD
	var peopleRDD = spark.sparkContext()
	  .textFile(filename, 1)
	  .rdd();

	// The schema is encoded in a string
	var schemaString = "name age";

	// Generate the schema based on the string of schema
	var fields = [];
	for (var fieldName in schemaString.split(" ")) {
	  var field = DataTypes.createStructField(fieldName, DataTypes.StringType, true);
	  fields.push(field);
	}
	var schema = DataTypes.createStructType(fields);

	// Convert records of the RDD (people) to Rows
	var rowRDD = peopleRDD.map(function( record)  {
		var attributes = record.split(",");
		return RowFactory.create(attributes[0], attributes[1].trim());
	});

	// Apply the schema to the RDD
	var peopleDataFrame = spark.createDataFrame(rowRDD, schema);

	// Creates a temporary view using the DataFrame
	peopleDataFrame.createOrReplaceTempView("people");

	// SQL can be run over a temporary view created using DataFrames
	var results = spark.sql("SELECT name FROM people");

	// The results of SQL queries are DataFrames and support all the normal RDD operations
	// The columns of a row in the result can be accessed by field index or by field name
	var namesDS = results.map(function( row)  {
		return "Name: " + row.getString(0);
	}, Encoders.STRING());
	namesDS.show();
	// +-------------+
	// |        value|
	// +-------------+
	// |Name: Michael|
	// |   Name: Andy|
	// | Name: Justin|
	// +-------------+
}

