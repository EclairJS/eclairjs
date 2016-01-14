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
 * Note to run this example you must include the JDBC jar file in the SPARK_CLASSPATH 
 * as described https://spark.apache.org/docs/latest/sql-programming-guide.html#jdbc-to-other-databases
 * Another option is to include the --driver-class-path option on the command line for example:
 * <path to EclairJS>/bin/eclairjs.sh  --jars <path to JDBC jar file> --driver-class-path <path to JDBC jar file> <path to EclairJS>/examples/sql/sparkjdbc.js
 */

var sparkContext = new SparkContext("local[*]", "dataframe");
var sqlContext = new SQLContext(sparkContext);
var url="jdbc:mysql://localhost:3306/eclairjstesting";
var prop = {};
prop["user"] = "root";
prop["password"] = "eclairjstestPW";
var peopleDF = sqlContext.read().jdbc(url, "people", prop);
peopleDF.show();
var peopleDF = sqlContext.read().jdbc(url, "people", ["age > 20"], prop);
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
