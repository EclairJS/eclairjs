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
 * Counts words in UTF8 encoded, '\n' delimited text received from the network over a
 * sliding window of configurable duration. Each line from the network is tagged
 * with a timestamp that is used to determine the windows into which it falls.
 *
 * Usage: structuredNetworkWordCountWindowed <hostname> <port> <window duration>
 *   [<slide duration>]
 * <hostname> and <port> describe the TCP server that Structured Streaming
 * would connect to receive data.
 * <window duration> gives the size of window, specified as integer number of seconds
 * <slide duration> gives the amount of time successive windows are offset from one another,
 * given in the same units as above. <slide duration> should be less than or equal to
 * <window duration>. If the two are equal, successive windows have no overlap. If
 * <slide duration> is not provided, it defaults to <window duration>.
 *
 * To run this on your local machine, you need to first run a Netcat server
 *    `$ nc -lk 9999`
 * and then run the example
 *    `$ bin/eclairjs.sh structuredNetworkWordCountWindowed.js localhost 9999 <window duration in seconds> [<slide duration in seconds>]`
 *
 * One recommended <window duration>, <slide duration> pair is 10, 5
 */

var SparkSession = require('eclairjs/sql/SparkSession');
var Encoders = require('eclairjs/sql/Encoders');
var functions = require('eclairjs/sql/functions');
var Tuple2 = require('eclairjs/Tuple2');

if (args.length < 4) {
    print("Usage: structuredNetworkWordCountWindowed <hostname> <port>" +
        " <window duration in seconds> [<slide duration in seconds>]");
    exit(1);
}

var host = args[1];
var port = parseInt(args[2]);
var windowSize = parseInt(args[3]);
var slideSize = (args.length == 4) ? windowSize : parseInt(args[4]);
if (slideSize > windowSize) {
    print("<slide duration> must be less than or equal to <window duration>");
}
var windowDuration = windowSize + " seconds";
var slideDuration = slideSize + " seconds";

var spark = SparkSession
    .builder()
    .appName("JavaStructuredNetworkWordCountWindowed")
    .getOrCreate();

// Create DataFrame representing the stream of input lines from connection to host:port
var lines = spark
    .readStream()
    .format("socket")
    .option("host", host)
    .option("port", port)
    .option("includeTimestamp", true)
    .load();

var words = lines
    .as(Encoders.tuple2(Encoders.STRING(), Encoders.TIMESTAMP()))
    .flatMap(function(tuple2, Tuple2){
        var timestamp = tuple2._2();
        var words = tuple2._1().split(" ");
        var results = [];
        words.forEach(function(word){
            results.push(new Tuple2(word, timestamp));
        });
        return results;
    }, Encoders.tuple2(Encoders.STRING(), Encoders.TIMESTAMP()), [Tuple2])
    .toDF("word", "timestamp");

// Group the data by window and word and compute the count of each group
var windowedCounts = words
    .groupBy(
        functions.window(words.col("timestamp"), windowDuration, slideDuration),
        words.col("word")
    )
    .count()
    .orderBy("window");

// Start running the query that prints the windowed word counts to the console
var query = windowedCounts
    .writeStream()
    .outputMode("complete")
    .format("console")
    .option("truncate", "false")
    .start();

query.awaitTermination();
