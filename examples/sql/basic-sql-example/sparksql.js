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


function exit() {
  process.exit();
}

function stop(e) {
  if (e) {
    console.log(e.stack);
  }
  sparkSession.stop().then(exit).catch(exit);
}

var root = process.env.EXAMPLE_ROOT || __dirname + "/../.."

function runBasicDataFrameExample(sparkSession, spark)
{
  return new Promise(function(resolve, reject) {
    // Load a text file and convert each line to a JavaScript Object.
    var df = sparkSession.read().json(root+'/data/people.json');
    var promises = [];

  // Displays the content of the DataFrame
    promises.push(df.take(5));

  // Select only the "name" column
    promises.push(df.select("name").take(5));


  var col = spark.sql.functions.col;

  // Select everybody, but increment the age by 1
    promises.push(df.select(col("name"), col("age").plus(1)).take(5));

  // Select people older than 21
    promises.push(df.filter(col("age").gt(21)).take(5));


  // Count people by age
    promises.push(df.groupBy("age").count());

  // Register the DataFrame as a SQL temporary view
  df.createOrReplaceTempView("people").then(function() {

     var sqlDF = sparkSession.sql("SELECT * FROM people");
    promises.push(sqlDF.take(5));

    Promise.all(promises).then(resolve).catch(reject);

  });


});
}




function runDatasetCreationExample(sparkSession, spark)
{
  return new Promise(function(resolve, reject) {

    // Create an instance of an object
    var person = {name:"Andy",age:32};

    // Encoders are created for Jsod
    var personEncoder=spark.sql.Encoders.json({ name: "String", age: "Integer"})

    var jsonDS = sparkSession.createDatasetFromJson(
     [person],
      personEncoder
    );


    // Encoders for most common types are provided in class Encoders
    var integerEncoder = spark.sql.Encoders.INT();
    var primitiveDS = sparkSession.createDataset([1, 2, 3], spark.sql.Encoders.INT());
    var transformedDS = primitiveDS.map( function(value) {
      return new java.lang.Integer(value + 1);
    }, integerEncoder);


    var promises = [];
    promises.push(jsonDS.take(5));
    // +---+----+
    // |age|name|
    // +---+----+
    // | 32|Andy|
    // +---+----+
    promises.push(transformedDS.collect());

    Promise.all(promises).then(resolve).catch(reject);

  });
}


function runProgrammaticSchemaExample(sparkSession, spark)
{
  return new Promise(function(resolve, reject) {
    // Load a text file and convert each line to a JavaScript Object.
    var rdd = sparkSession.read().textFile(root+'/data/people.txt').rdd();
    var people = rdd.map(function(line) {
      var parts = line.split(",");
      return person = {
        name: parts[0],
        age: parseInt(parts[1].trim())
      };
    });

    //Generate the schema
    var DataTypes = spark.sql.types.DataTypes;

    var fields = [];
    fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
    var schema = DataTypes.createStructType(fields);
    // Convert records of the RDD (people) to Rows.
    var rowRDD = people.map(function(person, RowFactory){
      return RowFactory.create([person.name, person.age]);
    }, [spark.sql.RowFactory]);

    //Apply the schema to the RDD.
    var peopleDataFrame = sparkSession.createDataFrame(rowRDD, schema);

    peopleDataFrame.toJSON().collect().then(function(res){
        console.log("peopleDataFrame.toJSON(): ",res);
    });

    // Register the DataFrame as a table.
    peopleDataFrame.registerTempTable("people").then(function() {
      // SQL can be run over RDDs that have been registered as tables.
      var results = sparkSession.sql("SELECT name FROM people");

      //The results of SQL queries are DataFrames and support all the normal RDD operations.
      //The columns of a row in the result can be accessed by ordinal.
      var names = results.toRDD().map(function(row) {
        return "Name: " + row.getString(0);
      });

      names.take(10).then(resolve).catch(reject);
    });

  });
}


function runInferSchemaExample(sparkSession, spark)
{
  return new Promise(function(resolve, reject) {
    // Load a text file and convert each line to a JavaScript Object.
    var rdd = sparkSession.read().textFile(root+'/data/people.txt').rdd();
    var peopleRDD = rdd.map(function(line) {
      var parts = line.split(",");
      return person = {
        name: parts[0],
        age: parseInt(parts[1].trim())
      };
    });


  //Generate the schema
  var DataTypes = spark.sql.types.DataTypes;

  var fields = [];
  fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
  var schema = DataTypes.createStructType(fields);
  var rowRDD = peopleRDD.map(function(person, RowFactory){
    return RowFactory.create([person.name, person.age]);
  },[spark.sql.RowFactory]);

  var peopleDF = sparkSession.createDataFrame(rowRDD, schema);
  // Register the DataFrame as a temporary view
  peopleDF.createOrReplaceTempView("people").then(function() {

    // SQL statements can be run by using the sql methods provided by spark
    var teenagersDF = sparkSession.sql("SELECT name FROM people WHERE age BETWEEN 13 AND 19");

    // The columns of a row in the result can be accessed by field index
    var stringEncoder = spark.sql.Encoders.STRING();
    var teenagerNamesByIndexDF = teenagersDF.map(
     function (row) {
      return "Name: " + row.getString(0);
    }, stringEncoder);


    var promises = [];
    promises.push(teenagerNamesByIndexDF.take(5));

          // or by field name
      var teenagerNamesByFieldDF = teenagersDF.map(function(row){
        return "Name: " + row.getAs("name");
      }, stringEncoder);

    promises.push(teenagerNamesByFieldDF.take(5));

    Promise.all(promises).then(resolve).catch(reject);


  });


});
}



if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('eclairjs');
  var spark = new eclairjs();
  var sparkSession = spark.sql.SparkSession
            .builder()
            .appName("Spark SQL Example")
            .getOrCreate();

    var promises = [];
    promises.push(runBasicDataFrameExample(sparkSession, spark));
    promises.push(runDatasetCreationExample(sparkSession, spark));
    promises.push(runInferSchemaExample(sparkSession, spark));
    promises.push(runProgrammaticSchemaExample(sparkSession, spark));

    Promise.all(promises).then(function(results) {

       function printRows(rows)
       {
          var s="\n"
          if (rows[0] && rows[0]._schema)
          {
            var fields=rows[0]._schema.fields;
            for (var i=0;i<fields.length;
             i++)
              s += fields[i].name + "   ";
            s += "\n";
            for (var i=0;i<fields.length; i++)
              s += "----------------------------".substr(0,fields[i].name.length) + "   ";
            s += "\n";
          }

          for (var i=0;i<rows.length;i++)
          {
            s = s+ rows[i].mkString("  ")+"\n";
          }
          return s;

       }

      console.log('Basic Dataframe Results for "df.take" : ', printRows(results[0][0]));
      console.log('Basic Dataframe Results for "df.select("name").take" : ', printRows(results[0][1]));
      console.log('Basic Dataframe Results for "df.select(col("name"), col("age").plus(1)).take" : ', printRows(results[0][2]));
      console.log('Basic Dataframe Results for "df.filter(col("age").gt(21)).take" : ', printRows(results[0][3]));
      console.log('Basic Dataframe Results for "SELECT * FROM people" : ', printRows(results[0][4]));

      console.log('Dataset Creation Example Results : ', printRows(results[1][0]));
      console.log('Dataset Creation Example Results : ', results[1][1]);
      console.log('Infer Schema Results : ', results[2]);
      console.log('Programmatic Schema Results : ', results[3]);
    stop();
  }).catch(stop);



}

