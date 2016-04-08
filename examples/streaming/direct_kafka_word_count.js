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
 * Usage: bin/eclairjs.sh examples/streaming/direct_kafka_word_count.js <brokers> <topics>
 *   <brokers> is a list of one or more Kafka brokers
 *   <topics> is a list of one or more kafka topics to consume from
 *
 * Example:
 *    $ bin/eclairjs.sh examples/streaming/direct_kafka_word_count.js  broker1-host:port,broker2-host:port topic1,topic2
 */

if ((typeof args == "undefined")||args.length<3)
{
          print(
          "Usage: bin/eclairjs.sh examples/streaming/direct_kafka_word_count.js  <brokers> <topics>\n" +
          "  <brokers> is a list of one or more Kafka brokers\n" +
          "  <topics> is a list of one or more kafka topics to consume from\n\n");
          java.lang.System.exit(-1);
}

    var brokers = args[1];
    var topics = args[2];
    // Create the context with a 1 second batch size

    var conf = new SparkConf().setAppName("Javascript Direct Kafka Word Count");
    var jssc = new StreamingContext(conf, new Duration(2000));



    var topicsList = topics.split(",");
    var kafkaParams = {
        "metadata.broker.list": brokers
    };

    // Create direct kafka stream with brokers and topics
    var messages = KafkaUtils.createDirectStream(
        jssc,
        kafkaParams,
        topicsList
    );

    // Get the lines, split them into words, count the words and print
    var lines = messages.map(function(tuple2) {
        return tuple2[1];
    });
    var words = lines.flatMap( function( x) {
        return x.split(/\s+/);
    });
    var wordCounts = words.mapToPair(function( s) {
          return new Tuple(s, 1);
      }).reduceByKey(
        function( i1,  i2) {
          return i1 + i2;
      });
    wordCounts.print();

    // Start the computation
    jssc.start();
    jssc.awaitTermination();

