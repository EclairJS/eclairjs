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
/**
 * Counts words in UTF8 encoded, '\n' delimited text received from the network.
 */

function exit() {
	process.exit(0);
}

function stop(e) {
	if (e) {
		console.log('Error:', e);
	}

	if (sparkSession) {
		sparkSession.stop().then(exit).catch(exit);
	}
}

var net = require('net');

var server = net.createServer(function(socket) {
	setInterval(function() {
		socket.write("Words are great\n");
	}, 1000);
}).listen(4000);

//var eclairjs = require('../../../client/lib');
var eclairjs = require('eclairjs');
var spark = new eclairjs();

var host = "localhost";
var port = 4000;

var sparkSession = spark.sql.SparkSession
	.builder()
	.appName("structuredNetworkWordCount")
	.master("local[*]")
	.getOrCreate();


// Create DataFrame representing the stream of input lines from connection to host:port
var reader = sparkSession
    .readStream()
    .format("socket")
    .option("host", host)
    .option("port", port);
var ds = reader.load();
var lines = ds
    .as(spark.sql.Encoders.STRING());


// Split the lines into words
var words = lines.flatMap(function (sentence) {
    return sentence.split(" ");
}, spark.sql.Encoders.STRING());

// Generate running word count
var wordCounts = words.groupBy("value")
    .count();

// Start running the query that prints the running counts to the console
var query = words.writeStream()
	.outputMode("append")
	.format("console")
    .start("/tmp/wordcount");

query.awaitTermination().then(stop).catch(stop);

// stop spark streaming when we stop the node program
process.on('SIGTERM', stop);
process.on('SIGINT', stop);