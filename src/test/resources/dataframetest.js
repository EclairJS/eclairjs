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

var sparkContext = new SparkContext("local[*]", "dataframe");
var sqlContext = new SQLContext(sparkContext);



var buildPeopleTable = function(file) {
	// Load a text file and convert each line to a JavaScript Object.
	var people = sparkContext.textFile(file).map(function(line) {
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
	var rowRDD = people.map(function(person){
		return RowFactory.create([person.name, person.age]);
	});


	//Apply the schema to the RDD.
	var peopleDataFrame = sqlContext.createDataFrame(rowRDD, schema);

	// Register the DataFrame as a table.
	peopleDataFrame.registerTempTable("people");
	return peopleDataFrame;
}

var programmaticallySpecifyingSchema = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	var results = sqlContext.sql("SELECT name FROM people");

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = results.toRDD().map(function(row) {
		return "Name: " + row.getString(0);
	});

    return names.take(10).toString();
}

var dataframeColTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.col("age");
	return result.toString();
	
}

var dataframeColumnsTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	return peopleDataFrame.columns().toString();
}

var dataframeFilterTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filter("age > 20");

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0);
	});
    return names.take(10).toString();
}

var dataframeFilterWithColumnTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var col = new Column("age");
	var testCol = col.gt("20");
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0);
	});
    return names.take(10).toString();
}

var dataframeFlatMapTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.flatMap(function(row) {
		var r = [];
		r.push(row.getString(0));
		r.push(row.getString(1));
		return r
	});
	print(result.take(10));
    return result.take(10).toString();
}

var dataframeGroupByTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var gd = dataFrame.groupBy(dataFrame.col("first"));
    var df2 = gd.count();

    df2.show();
    return df2.count();
}

var dataframeGroupByWithStringsTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var gd = dataFrame.groupBy("first");
    var df2 = gd.count();

    df2.show();
    return df2.count();
}

var dataframeHeadTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var row = dataFrame.head();
    return row.mkString();
}

var dataframeSelectTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.select("name", "age");
    return result.toString();
}

var dataframeWhereTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.where("age > 20");

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0);
	});
    return names.take(10).toString();
}

