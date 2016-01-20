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
var useDateType = false;


var buildPeopleTable = function(file, date) {
	// Load a text file and convert each line to a JavaScript Object.
	var people = sparkContext.textFile(file).map(function(line) {
		var parts = line.split(",");
		return person = {
	    				name: parts[0], 
	    				age: parseInt(parts[1].trim()),
	    				expense: parseInt(parts[2].trim()),
	    				DOB: parts[3].trim(),
	    				income: parts[4].trim(),
	    				married: parts[5].trim(),
	    				networth: parts[6].trim()
	    		};
	});

	//Generate the schema
	var fields = [];
	fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
	fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
	fields.push(DataTypes.createStructField("expense", DataTypes.IntegerType, true));
	if (date) {
		useDateType = true;
		fields.push(DataTypes.createStructField("DOB", DataTypes.DateType, true));
	} else {
		useDateType = false;
		fields.push(DataTypes.createStructField("DOB", DataTypes.TimestampType, true));
	}
	//fields.push(DataTypes.createStructField("income", DataTypes.FloatType, true));
	fields.push(DataTypes.createStructField("income", DataTypes.DoubleType, true));
	fields.push(DataTypes.createStructField("married", DataTypes.BooleanType, true));
	fields.push(DataTypes.createStructField("networth", DataTypes.DoubleType, true));
	
	var schema = DataTypes.createStructType(fields);

	// Convert records of the RDD (people) to Rows.
	var rowRDD = people.map(function(person){
		var d = person.DOB;
		if (useDateType) {
			d = new SqlDate(person.DOB);
		} else {
			d = new SqlTimestamp(person.DOB);
		}
		var m =  person.married == "true" ? true : false
		var n = person.name ? person.name : null;
		return RowFactory.create([n, person.age, person.expense, d, parseFloat(person.income), m, parseFloat(person.networth)]);
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

var dataframeAggTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	var results = sqlContext.sql("SELECT name, age, expense FROM people");

	var m = {};
	m["age"] = "max";
	m["expense"] =  "sum";
	var x = results.agg(m);
	var rows = x.take(10);
	var s = JSON.stringify(rows[0]);

	return s;
	
}

var dataframeApplyTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	//var results = sqlContext.sql("SELECT name, age, expense FROM people");
	var col = peopleDataFrame.apply("name");
	
	var s = col.toString();
	return s;
	
}

var dataframeAsTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	//var results = sqlContext.sql("SELECT name, age, expense FROM people");
	var df = peopleDataFrame.as("aliasname");
	
	var s = df.toString();
	return s;
	
}

var dataframeColTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.col("age");
	return result.toString();
	
}

var dataframeCollectTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filter("age > 20");
    return JSON.stringify(result.collect());
	
}

var dataframeColumnsTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	return peopleDataFrame.columns().toString();
}

var dataframeCubeTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var cube = peopleDataFrame.cube("name", "expense");
	var dfCube = cube.avg("age");
	
	return dfCube.toString();
}

var dataframeDescribeTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var df = peopleDataFrame.describe("age", "expense");
	
	return df.toJSON().toArray().toString();
}

var dataframeDistinctTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var df = peopleDataFrame.distinct();
	return df.count().toString();
}

var dataframeDropDuplicatesTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var df = peopleDataFrame.dropDuplicates(["expense"]);
	return df.count().toString();
}

var dataframeDtypesTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var dt = peopleDataFrame.dtypes();
	return JSON.stringify(dt);
}

var dataframeExceptTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var df2 = peopleDataFrame.filter("age > 20");
	var resultDf = peopleDataFrame.except(df2);
	resultDf.explain(true);
	resultDf.printSchema();
	return resultDf.toJSON().toArray().toString();
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

var dataframeFirstTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var row = dataFrame.first();
    return row.mkString();
}

var dataframeFlatMapTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.flatMap(function(row) {
		var r = [];
		r.push(row.getString(0));
		return r
	});

    return result.take(10).toString();
}

var dataframeForeachTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	globalForeachResult = {}; // not the right way to do this but works for UT, we are running workers in the same JVM.
	var result = peopleDataFrame.foreach(function(row) {
		globalForeachResult[row.getString(0)] = row.getInt(1);
	});
	/*
	 * the names can be in any order so we will check them here instead of on the Java side
	 */
	if (globalForeachResult["Justin"] && globalForeachResult["Michael"] && globalForeachResult["Andy"])
		return "all good";
	else 
		return "bummer dude, the test failed";

}

var dataframeForeachPartitionTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	globalForeachResult = {}; // not the right way to do this but works for UT, we are running workers in the same JVM.
	peopleDataFrame.foreachPartition(function(rows) {
		rows.forEach(function(row){
			globalForeachResult[row.getString(0)] = row.getInt(1);
		   });
		
	});

	/*
	 * the names can be in any order so we will check them here instead of on the Java side
	 */
	if (globalForeachResult["Justin"] && globalForeachResult["Michael"] && globalForeachResult["Andy"])
		return "all good";
	else 
		return "bummer dude, the test failed";

}

var dataframeGroupByTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var gd = dataFrame.groupBy(dataFrame.col("first"));
    var df2 = gd.count();

    return df2.count();
}

var dataframeGroupByWithStringsTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var gd = dataFrame.groupBy("first");
    var df2 = gd.count();

    return df2.count();
}

var dataframeHeadTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var row = dataFrame.head();
    return row.mkString();
}

var dataframeInputFilesTest = function(file) {
    var dataFrame = sqlContext.read().json(file);
    var files = dataFrame.inputFiles();
 	/*
	 * the files are in temp directories for the path can change on each run of the test, so just checking the file name
	 */
	if (files[0].indexOf("test.json") > -1)
		return "all good";
	else 
		return "bummer dude, the test failed";

}

var dataframeIntersectTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var plus20s = peopleDataFrame.filter("age > 20");
	var results = peopleDataFrame.intersect(plus20s);
	
    return results.take(10).toString();
}

var dataframeIsLocalTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	return peopleDataFrame.isLocal();
	
}

var dataframeJoinTest = function(file, usingColumn) {
	
	var df1 = buildPeopleTable(file);
	var df2 = buildPeopleTable(file);
	var joinedDf = df1.join(df2, usingColumn);
	return joinedDf.head().toString();
	
}

var dataframeJoinUsingColumnsTest = function(file) {
	
	var df1 = buildPeopleTable(file);
	var df2 = buildPeopleTable(file);
	var joinedDf = df1.join(df2, ["age", "DOB"]);
	return joinedDf.head().toString();
	
}

var dataframeJoinColumnExprTest = function(file, joinType) {
	
	var people = buildPeopleTable(file);
	var df1 = sqlContext.sql("SELECT name, age FROM people");
	var df2 = sqlContext.sql("SELECT name, DOB FROM people");

	var colExpr = df1.col("name").equalTo(df2.col("name"));
	var joinedDf = df1.join(df2, colExpr, joinType);
	
	return joinedDf.head().toString();
	
}

var dataframeLimitTest = function(file) {
	
	var people = buildPeopleTable(file);
	var result = people.limit(1);

	return result.count();
	
}

var dataframeMapTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var names = peopleDataFrame.map(function(row) {
		return "Name: " + row.getString(0);
	});

    return names.take(10).toString();
}

var dataframeMapPartitionsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var names = peopleDataFrame.mapPartitions(function(rows) {
		return [rows.length];
	});

    return names.take(10).toString();
}

var dataframeNaTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.drop();

    return result.take(10).toString();
}

var dataframeOrderByTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.orderBy("age", "name");
	
    return result.take(10).toString();
}

var dataframePersistTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.persist(StorageLevel.MEMORY_ONLY());
	
    return result.head().toString();
}

var dataframeQueryExecutionTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var queryExecution = peopleDataFrame.queryExecution();
	var result = queryExecution.simpleString();
	/*
	 * the result string will can change with each run so we just check for a key 
	 */
	if (result.indexOf("== Physical Plan ==") > -1) {
		return "ok"
	} else {
		return "results not as expected";
	}
}

var dataframeRandomSplitTest = function(file, seed) {

	var peopleDataFrame = buildPeopleTable(file);
	var results = peopleDataFrame.randomSplit([0.5, 0.5], seed);
	
    return results.length;
}

var dataframeRollupTest = function(file, seed) {

	var peopleDataFrame = buildPeopleTable(file);
	var df = peopleDataFrame.repartition(1);
	var results = df.rollup("age", "networth").count();
	
    return results.take(10).toString();
}

var dataframeSchemaTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var results = peopleDataFrame.schema();
	
    return results.simpleString();
}

var dataframeSampleTest = function(file, seed) {

	var peopleDataFrame = buildPeopleTable(file);
	peopleDataFrame.show();
	var results = peopleDataFrame.sample(true, 0.5);
	
    return results.take(10).toString();
}

var dataframeSelectTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.select("name", "age");
    return result.take(10).toString();
}

var dataframeSelectExprTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.selectExpr("name", "age > 19");
    return result.take(10).toString();
}

var dataframeSortTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var result = peopleDataFrame.sort("age", "name");
	
    return result.take(10).toString();
}

var dataframeSortDescTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var col = peopleDataFrame.col("age");
	var colExpr = col.desc();	
	var result = peopleDataFrame.sort(colExpr);

    return result.take(10).toString();
}

var dataframeToDFTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var nameAgeDF = peopleDataFrame.select("name", "age");
	var result = nameAgeDF.toDF("newName", "newAge");
    return result.toString();
}

var dataframeUnionAllTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var df1 = peopleDataFrame.selectExpr("name", "age < 30");
	var df2 = peopleDataFrame.selectExpr("name", "age > 20");
	var result = df1.unionAll(df2);
    return result.take(10).toString();
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

var dataframeWithColumnTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var col = peopleDataFrame.col("age");
	var df1 = peopleDataFrame.withColumn("newCol", col);

    return df1.take(10).toString();
}

var dataframeWithColumnRenamedTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var df1 = peopleDataFrame.withColumnRenamed("age", "renamedAge");

    return df1.toString();
}

/*
 * DataFrame Column tests
 */

var asCloumn = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = new Column("age");
	var testCol = col.as(["newAge", "ventage"]);

    return testCol.toString();
}

var betweenCloumn = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = new Column("age");
	var testCol = col.between(10, 29);
	var results = peopleDataFrame.select(testCol);
    return results.take(10).toString();
}

var castCloumn = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = new Column("age");
	var testCol = col.cast(DataTypes.StringType);
	var df = peopleDataFrame.select(testCol);
	var rows = df.take(10);
	var results = [];
	rows.forEach(function(r){
		results.push(r.getString(0));
	})
    return JSON.stringify(results);
}

var containsCloumn = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = new Column("name");
	var testCol = col.contains("dogs");
    return testCol.toString();
}

var divideCloumn = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = peopleDataFrame.col("networth");
	var testCol = col.divide(peopleDataFrame.col("income"));
	var results = peopleDataFrame.select(testCol);
    return results.take(10).toString();
}

var inCloumn = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = peopleDataFrame.col("age");
	var testCol = col.in([20, 19]);
	var results = peopleDataFrame.select(testCol);
    return results.take(10).toString();
}

var otherwiseCloumn = function(file) {
	var people = buildPeopleTable(file, false);
	var results = people.select(functions.when(people.col("age").notEqual(19), true).otherwise(false));
						
    return results.take(10).toString();
}

/*
 * 
 * Dataframe DataType tests
 * 
 */

var timestampType = function(file) {

	var peopleDataFrame = buildPeopleTable(file, false);
	var col = new Column("DOB");
	var testCol = col.gt(new SqlTimestamp("1996-03-07"));
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0) + " DOB: " + row.getTimestamp(3);
	});
    return names.take(10).toString();
}

var dateType = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("DOB");
	var testCol = col.gt(new SqlDate("1996-03-07"));
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0) + " DOB: " + row.getDate(3);
	});
    return names.take(10).toString();
}

var floatType = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("income");
	var testCol = col.gt(1300.00);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0) + " income: " + row.getFloat(4);
	});
    return names.take(10).toString();
}

var doubleType = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("income");
	var testCol = col.gt(1300.00);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0) + " income: " + row.getDouble(4);
	});
    return names.take(10).toString();
}

var booleanType = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("married");
	var testCol = col.equalTo(true);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	//The results of SQL queries are DataFrames and support all the normal RDD operations.
	//The columns of a row in the result can be accessed by ordinal.
	var names = result.toRDD().map(function(row) {
		return "Name: " + row.getString(0) + " married: " + row.getBoolean(5);
	});
    return names.take(10).toString();
}

var arrayTypeTest = function() {

	var at = ArrayType.apply(DataTypes.IntegerType, true);
	return at.elementType().defaultSize();
}

var binaryTypeTest = function() {

	//Generate the schema
	var fields = [];
	fields.push(DataTypes.createStructField("key", DataTypes.IntegerType, true));
	fields.push(DataTypes.createStructField("value", DataTypes.BinaryType, true));
	var schema = DataTypes.createStructType(fields);
	var df = sqlContext.createDataFrame([[1,"101010"], [2,"101010"], [3,"101010"]], schema);
	
	df.show();
	var results = df.toRDD().map(function(row) {
		return "key: " + row.getInt(0) + " value: " + row.getString(1);
	});

	return JSON.stringify(results.take(10));
}


/*
 * sql.functions
 */

var functionsLit = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("age");
	var result = functions.lit(col);
    return result.toString();
}

var functionsApproxCountDistinct = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("age");
	var testCol = functions.approxCountDistinct(col);
	var results = peopleDataFrame.select(testCol)
    return results.take(10).toString();
}

var functionsCountDistinct = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col1 = new Column("age");
	var col2 = new Column("name");
	var testCol = functions.countDistinct(col1, col2);
	var results = peopleDataFrame.select(testCol);
    return results.take(10).toString();
}

var functionsArray = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col1 = new Column("age");
	var col2 = new Column("expense");
	//var testCol = functions.array("age", "expense");
	var testCol = functions.array(col1, col2);
    return testCol.toString();
}

var functionsCoalesce = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var testCol = functions.coalesce(peopleDataFrame.col("name"), peopleDataFrame.col("age"));
    return testCol.toString();
}

var functionsStruct = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	//var testCol = functions.struct(peopleDataFrame.col("name"), peopleDataFrame.col("age"));
	var testCol = functions.struct("name", "age");
    return testCol.toString();
}

var functionsExpr = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var results = peopleDataFrame.groupBy(functions.expr("length(name)")).count();

    return results.take(10).toString();
}

var functionsAtan2 = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col1 = new Column("age");
	var col2 = new Column("expense");
	var result = functions.atan2(col1, col2);
	if (result.toString() != "ATAN2(age, expense)") {
		return "error testing atan2(Column, Column)";
	}
	result = functions.atan2(col1, "name");
	if (result.toString() != "ATAN2(age, name)") {
		return "error testing atan2(Column, string)";
	}
	result = functions.atan2("age", col2);
	if (result.toString() != "ATAN2(age, expense)") {
		return "error testing atan2(string, Column)";
	}
	result = functions.atan2("age", "expense");
	if (result.toString() != "ATAN2(age, expense)") {
		return "error testing atan2(string, string)";
	}
	result = functions.atan2(col1, 2.0);
	if (result.toString() != "ATAN2(age, 2.0)") {
		return "error testing atan2(Column, double) ";
	}
	result = functions.atan2("age", 2.0);
	if (result.toString() != "ATAN2(age, 2.0)") {
		return "error testing atan2(string, double) ";
	}
	result = functions.atan2(2.0, col2);
	if (result.toString() != "ATAN2(2.0, expense)") {
		return "error testing atan2(double, Column) ";
	}
	result = functions.atan2(2.0, "expense");
	if (result.toString() != "ATAN2(2.0, expense)") {
		return "error testing atan2(double, string) ";
	}

    return "all good";
}

var functionsGreatest = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var testCol = functions.greatest(peopleDataFrame.col("name"), peopleDataFrame.col("age"));
	//var testCol = functions.greatest("name", "age");
    return testCol.toString();
}

var functionsConcat = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var testCol = functions.concat(peopleDataFrame.col("name"), peopleDataFrame.col("age"));
    return testCol.toString();
}

var functionsFrom_unixtime = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var testCol = functions.from_unixtime(peopleDataFrame.col("DOB"), "yyyy-MM-dd");
	//var testCol = functions.from_unixtime(peopleDataFrame.col("DOB"));
    return testCol.toString();
}

var functionsUnix_timestamp = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	//var testCol = functions.unix_timestamp(peopleDataFrame.col("DOB"), "yyyy-MM-dd");
	//var testCol = functions.unix_timestamp(peopleDataFrame.col("DOB"));
	var testCol = functions.unix_timestamp();
    return testCol.toString();
}

var functionsSort_array = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var testCol = functions.sort_array(peopleDataFrame.col("DOB"));
	//var testCol = functions.sort_array(peopleDataFrame.col("DOB"), true);
	//var testCol = functions.sort_array(peopleDataFrame.col("DOB"), false);
    return testCol.toString();
}

/*
 * Row tests
 */

var rowMkStringType = function(file, sep, start, end) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var col = new Column("networth");
	var testCol = col.gt(100000.00);
	// SQL can be run over RDDs that have been registered as tables.
	var result = peopleDataFrame.filterWithColumn(testCol);

	var rows = result.collect();
	var s = "";
	rows.forEach(function(row){
		s += row.mkString(sep, start, end);
	})
    return s;
}

/*
 * GroupedData tests
 */

var groupdedDataAgg = function(file) {

	var peopleDataFrame = buildPeopleTable(file, true);
	var group = peopleDataFrame.groupBy("name");
	print("group " + group)
	var maxFunc = functions.max("age");
	print("max " + maxFunc)
	var sumFunc = functions.sum("expense");
	print("sum " + sumFunc)
	var result = group.agg(functions.max("age"), functions.sum("expense"));
	return result.take(10).toString();
}

/*
 * DataFrameNaFunctions Tests
 */

var dataframeNaFunctionsDropTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.drop('all');

    return result.take(10).toString();
}

var dataframeNaFunctionsDropColsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.drop(["name" , "income"]);

    return result.take(10).toString();
}

var dataframeNaFunctionsDropAllColsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.drop('all', ["name" , "income"]);

    return result.take(10).toString();
}

var dataframeNaFunctionsDropIntTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.drop(0);

    return result.take(10).toString();
}

var dataframeNaFunctionsDropIntColsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.drop(1,  ["name" , "income"]);

    return result.take(10).toString();
}

var dataframeNaFunctionsFillNumberTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.fill(99.99);

    return result.take(10).toString();
}

var dataframeNaFunctionsFillNumberColsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.fill(99.99, ["name", "age"]);

    return result.take(10).toString();
}

var dataframeNaFunctionsFillStringTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.fill("missing");

    return result.take(10).toString();
}

var dataframeNaFunctionsFillStringColsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var result = naFunc.fill("missing", ["name", "age"]);

    return result.take(10).toString();
}

var dataframeNaFunctionsFillHashMapTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var hash = {"name": "missing", "age": "99"};
	var result = naFunc.fill(hash);

    return result.take(10).toString();
}

var dataframeNaFunctionsReplaceTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var hash = {"Michael": "MichaelReplace", "Andy": "AndyReplace"};
	var result = naFunc.replace("name", hash);

    return result.take(10).toString();
}

var dataframeNaFunctionsReplaceColsTest = function(file) {

	var peopleDataFrame = buildPeopleTable(file);
	var naFunc = peopleDataFrame.na();
	var hash = {"1600.00": 99.99, "500000000.11": 11.11, "29": 0};
	var result = naFunc.replace(["age", "income", "networth"], hash);

    return result.take(10).toString();
}

var dataFrameParquetTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var parquetWriter = peopleDataFrame.write();
	parquetWriter.mode('overwrite').parquet("/tmp/people.parquet");
	var parquetFileDF = sqlContext.read().parquet("/tmp/people.parquet");
	parquetFileDF.registerTempTable("parquetFile");
	tweenties = sqlContext.sql("SELECT name FROM parquetFile WHERE age >= 20 AND age <= 29");
	return JSON.stringify(tweenties.take(10));
}

/*
 * SQLContext test
 */

var sqlContextSetConfTest = function() {
	
	sqlContext.setConf("dog", "Golden Retriever");
	var result = sqlContext.getConf("dog");
    return result;
}

var sqlContextGetAllConfTest = function() {
	var map = {"prop1" : "value1", "prop2": "value2"};
	sqlContext.setConf(map);
	var result = sqlContext.getAllConfs();
    return JSON.stringify(result);
}

var sqlContextRangeTest = function() {

	var result = sqlContext.range(1,5);

    return result.take(10).toString();
}

/*
* DataFrameStatFunctions test
*/

var dataFrameStatCovTest = function(file) {
	var peopleDataFrame = buildPeopleTable(file);
	var stat = peopleDataFrame.stat().cov("income", "networth");
	return stat.toString();
}

var dataFrameStatCrossTabTest = function(file) {
	
	//Generate the schema
	var fields = [];
	fields.push(DataTypes.createStructField("key", DataTypes.IntegerType, true));
	fields.push(DataTypes.createStructField("value", DataTypes.IntegerType, true));
	var schema = DataTypes.createStructType(fields);
	var df = sqlContext.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema);
	
	df.show();
	
	var ct = df.stat().crosstab("key", "value");
	ct.show();
	return JSON.stringify(ct.take(10));
}
