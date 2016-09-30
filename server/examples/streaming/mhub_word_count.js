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
 * Consumes messages from one or more topics in Kafka and does wordcount.
 *
 * Usage: bin/eclairjs.sh examples/streaming/kafka_word_count.js <zkQuorum> <group> <topics> <numThreads>
 *   <zkQuorum> is a list of one or more zookeeper servers that make quorum
 *   <group> is the name of kafka consumer group
 *   <topics> is a list of one or more kafka topics to consume from
 *   <numThreads> is the number of threads the kafka consumer should use
 *
 * To run this example:
 *   `$ bin/eclairjs.sh examples/streaming/kafka_word_count.js zoo01,zoo02, \
 *    zoo03 my-consumer-group topic1,topic2 1`
 */

var KafkaUtils = require('eclairjs/streaming/kafka/KafkaUtils');
var Duration = require('eclairjs/streaming/Duration');
var StreamingContext = require('eclairjs/streaming/StreamingContext');
var Tuple2 = require('eclairjs/Tuple2');
var SparkConf = require(EclairJS_Globals.NAMESPACE + '/SparkConf');


var conf = new SparkConf().setAppName("Javascript Kafka Word Count");
var jssc = new StreamingContext(conf, new Duration(2000));

var creds = {
  "credentials": {
    "mqlight_lookup_url": "https://mqlight-lookup-prod01.messagehub.services.us-south.bluemix.net/Lookup?serviceId=d7b72093-b49e-4f0f-94d4-8e1249426e43",
    "api_key": "VkzywbIOqdojnqWuKfZtmH1lW0odnHD3Oh4rF6n2kSh5xQLK",
    "kafka_admin_url": "https://kafka-admin-prod01.messagehub.services.us-south.bluemix.net:443",
    "kafka_rest_url": "https://kafka-rest-prod01.messagehub.services.us-south.bluemix.net:443",
    "kafka_brokers_sasl": [
      "kafka01-prod01.messagehub.services.us-south.bluemix.net:9093",
      "kafka02-prod01.messagehub.services.us-south.bluemix.net:9093",
      "kafka03-prod01.messagehub.services.us-south.bluemix.net:9093",
      "kafka04-prod01.messagehub.services.us-south.bluemix.net:9093",
      "kafka05-prod01.messagehub.services.us-south.bluemix.net:9093"
    ],
    "user": "VkzywbIOqdojnqWu",
    "password": "KfZtmH1lW0odnHD3Oh4rF6n2kSh5xQLK"
  }
}

var messages =
  KafkaUtils.createMessageHubStream(
    jssc, 
    creds.credentials.kafka_brokers_sasl.join(","),
    "sales",
    creds.credentials.user,
    creds.credentials.password,
    creds.credentials.api_key
);

messages.print();
jssc.start();
jssc.awaitTermination();

/*
    var lines = messages.map(function(tuple2) {
        return tuple2[1];
    });

    var words = lines.flatMap(function( x) {
        return x.split(/\s+/);
    });

    var wordCounts = words.mapToPair(function(s, Tuple2) {
          return new Tuple2(s, 1);
      }, [Tuple2]).reduceByKey(function( i1,  i2) {
          return i1 + i2;
      });

    wordCounts.print();
*/


    // Start the computation

