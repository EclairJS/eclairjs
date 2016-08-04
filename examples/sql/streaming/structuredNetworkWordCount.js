/*
 * Copyright 2016 IBM Corp.
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
var SparkSession = require('eclairjs/sql/SparkSession');

if (args.length < 2) {
    print("Usage: structuredNetworkWordCount <hostname> <port>");
    exit(1);
}

var host = args[1];
var port = parseInt(args[2]);

var spark = SparkSession
    .builder()
    .appName("JavaStructuredNetworkWordCount")
    .getOrCreate();

// Create DataFrame representing the stream of input lines from connection to host:port
var lines = spark
    .readStream() // returns org.apache.spark.sql.streaming.DataStreamReader
    .format("socket") // returns org.apache.spark.sql.streaming.DataStreamReader
    .option("host", host) // returns org.apache.spark.sql.streaming.DataStreamReader
    .option("port", port) // returns org.apache.spark.sql.streaming.DataStreamReader
    .load(); // returns org.apache.spark.sql.Dataset
    /*.as(Encoders.STRING()*/


// Split the lines into words
var words = lines.flatMap(function (row) {
    print(row.get(0))
    var sentence = row.get(0);
    return sentence.split(" ");
});

// Generate running word count
var wordCounts = words.groupBy("value") // returns org.apache.spark.sql.RelationalGroupedDataset
    .count(); // returns Dataset
//wordCounts.show();
// Start running the query that prints the running counts to the console
var query = wordCounts.writeStream() // returns org.apache.spark.sql.streaming.DataStreamWriter
    .outputMode("complete") // returns org.apache.spark.sql.streaming.DataStreamWriter
    .format("console") // returns org.apache.spark.sql.streaming.DataStreamWriter
    .start(); // returns org.apache.spark.sql.streaming.StreamingQuery

query.awaitTermination();