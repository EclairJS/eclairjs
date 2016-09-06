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
var SparkSession = require('eclairjs/sql/SparkSession');
var Encoders = require('eclairjs/sql/Encoders');
var StructType = require('eclairjs/sql/types/StructType');



var spark = SparkSession
    .builder()
    .appName("sql streaming")
    .getOrCreate();

var query;
var result;

function stop() {
    query.stop();
}

function streamingTest() {

    var file = "./src/test/resources/data/sql/streaming";
//Michael, 29, 1, 1996-03-07 00:00:00, 1200.40, true, 300000000.11
    var schema = new StructType()
        .add("name", "string")
        .add("age", "integer")
        .add("number", "integer")
        .add("date", "string")
        .add("salary", "float")
        .add("married", "boolean")
        .add("YTDE", "float");


    var csvDF = spark
        .readStream()
        //.option("sep", ",")
        .schema(schema)
        .csv(file);

    var names = csvDF.select("name");
    result = [];
    query = names.writeStream().foreach(function (partitionId, version) {
            // open connection
            //print("JS open " + partitionId + ":" + version);
            return {"connection": "test connection object", "partitionId": partitionId, "version": version};
        },
        function (connection, value) {
            //var t = {"connection": connection, "value": value};
            result.push(value);
            //print("JS process: " + JSON.stringify(t));
        },
        function (connection) {
            // close the connection
           // print("JS close " + JSON.stringify(connection));
            stop();
        }).start();


    query.awaitTermination();
    return JSON.stringify(result);
}

function processTimeTest() {
    var ProcessingTime = require('eclairjs/sql/streaming/ProcessingTime');
    var file = "./src/test/resources/data/sql/streaming";
//Michael, 29, 1, 1996-03-07 00:00:00, 1200.40, true, 300000000.11
    var schema = new StructType()
        .add("name", "string")
        .add("age", "integer")
        .add("number", "integer")
        .add("date", "string")
        .add("salary", "float")
        .add("married", "boolean")
        .add("YTDE", "float");


    var csvDF = spark
        .readStream()
        //.option("sep", ",")
        .schema(schema)
        .csv(file);

    var names = csvDF.select("name");
    result = [];
    query = names.writeStream()
        .trigger(ProcessingTime.create("10 seconds"))
        .foreach(function (partitionId, version) {
            // open connection
            //print("JS open " + partitionId + ":" + version);
            return {"connection": "test connection object", "partitionId": partitionId, "version": version};
        },
        function (connection, value) {
            //var t = {"connection": connection, "value": value};
            result.push(value);
            //print("JS process: " + JSON.stringify(t));
        },
        function (connection) {
            // close the connection
            // print("JS close " + JSON.stringify(connection));
            stop();
        })
        .start();


    query.awaitTermination();
    return JSON.stringify(result);
}

function sinkSourceStatusTest() {
    var ProcessingTime = require('eclairjs/sql/streaming/ProcessingTime');
    var file = "./src/test/resources/data/sql/streaming";
//Michael, 29, 1, 1996-03-07 00:00:00, 1200.40, true, 300000000.11
    var schema = new StructType()
        .add("name", "string")
        .add("age", "integer")
        .add("number", "integer")
        .add("date", "string")
        .add("salary", "float")
        .add("married", "boolean")
        .add("YTDE", "float");


    var csvDF = spark
        .readStream()
        //.option("sep", ",")
        .schema(schema)
        .csv(file);

    var names = csvDF.select("name");
    result = [];
    query = names.writeStream()
        .trigger(ProcessingTime.create("10 seconds"))
        .foreach(function (partitionId, version) {
                // open connection
                //print("JS open " + partitionId + ":" + version);
                return {"connection": "test connection object", "partitionId": partitionId, "version": version};
            },
            function (connection, value) {
                //var t = {"connection": connection, "value": value};
                result.push(value);
                //print("JS process: " + JSON.stringify(t));
            },
            function (connection) {
                // close the connection
                // print("JS close " + JSON.stringify(connection));
                //stop();
            })
        .start();


    query.awaitTermination(3000);
    var sink = query.sinkStatus();
    var source = query.sourceStatuses()[0];
    return JSON.stringify({
        "sink": {
            "description": sink.description().substr(0, 52),
            "offsetDesc": sink.offsetDesc().substr(0, 1)
        },
        "source": {
            "description": source.description().substr(0, 22),
            "offsetDesc": source.offsetDesc().substr(0, 1)
        }
    });
}


function queryManagerTest() {
    var ProcessingTime = require('eclairjs/sql/streaming/ProcessingTime');
    var file = "./src/test/resources/data/sql/streaming";
//Michael, 29, 1, 1996-03-07 00:00:00, 1200.40, true, 300000000.11
    var schema = new StructType()
        .add("name", "string")
        .add("age", "integer")
        .add("number", "integer")
        .add("date", "string")
        .add("salary", "float")
        .add("married", "boolean")
        .add("YTDE", "float");


    var csvDF = spark
        .readStream()
        //.option("sep", ",")
        .schema(schema)
        .csv(file);

    var names = csvDF.select("name");
    result = [];
    query = names.writeStream()
        .trigger(ProcessingTime.create("10 seconds"))
        .foreach(function (partitionId, version) {
                // open connection
                //print("JS open " + partitionId + ":" + version);
                return {"connection": "test connection object", "partitionId": partitionId, "version": version};
            },
            function (connection, value) {
                //var t = {"connection": connection, "value": value};
                result.push(value);
                //print("JS process: " + JSON.stringify(t));
            },
            function (connection) {
                // close the connection
                // print("JS close " + JSON.stringify(connection));
                stop();
            })
        .start();

    var queryManger = spark.streams();
    var queries = queryManger.active();

    return queries.length;
}

function queryEventListenersTest() {
    var ProcessingTime = require('eclairjs/sql/streaming/ProcessingTime');
    var file = "./src/test/resources/data/sql/streaming";
//Michael, 29, 1, 1996-03-07 00:00:00, 1200.40, true, 300000000.11
    var schema = new StructType()
        .add("name", "string")
        .add("age", "integer")
        .add("number", "integer")
        .add("date", "string")
        .add("salary", "float")
        .add("married", "boolean")
        .add("YTDE", "float");

    var queryManger = spark.streams();
    queryEventListenersTestResult = null;
    var listener = queryManger.addListener(
        function(queryStartedInfo, queryManger, listener){
            //print("queryStartedEvent");
            queryEventListenersTestResult = queryStartedInfo.name();
            queryManger.removeListener(listener);
        },
        function(queryProgressInfo){
            //print("queryProgressEvent" + queryProgressInfo.name());
        },
        function(queryTerminatedInfo){
            print("queryTerminatedEvent " + queryTerminatedInfo.name());
        }, [queryManger, listener]
    );

    var csvDF = spark
        .readStream()
        //.option("sep", ",")
        .schema(schema)
        .csv(file);

    var names = csvDF.select("name");
    query = names.writeStream()
        .trigger(ProcessingTime.create("10 seconds"))
        .foreach(function (partitionId, version) {
                // open connection
                //print("JS open " + partitionId + ":" + version);
                return {"connection": "test connection object", "partitionId": partitionId, "version": version};
            },
            function (connection, value) {
                //var t = {"connection": connection, "value": value};
                //result.push(value);
                //print("JS process: " + JSON.stringify(t));
            },
            function (connection) {
                // close the connection
                // print("JS close " + JSON.stringify(connection));
                stop();
            })
        .start();


    query.awaitTermination();
    return queryEventListenersTestResult.substring(0, 5);

}
