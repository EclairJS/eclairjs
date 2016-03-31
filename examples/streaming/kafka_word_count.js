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


if ((typeof args == "undefined")||args.length<5)
{
          print(
          "Usage: bin/eclairjs.sh examples/streaming/kafka_word_count.js  <zkQuorum> <group> <topics> <numThreads>\n" +
          "  <zkQuorum> is a list of one or more zookeeper servers that make quorum\n" +
          "  <group> is the name of kafka consumer group\n" +
          "  <topics> is a list of one or more kafka topics to consume from\n" +
          "  <numThreads> is the number of threads the kafka consumer should use\n\n");
          java.lang.System.exit(-1);
}


    var conf = new SparkConf().setAppName("Javascript Kafka Word Count");
    var jssc = new StreamingContext(new SparkContext(conf), new Duration(2000));


    var numThreads = parseInt(args[4]);
    var topicMap = {};
    var topics = args[3].split(",");
    for (var i=0;i<topics.length;i++) {
      topicMap[topics[i]]=numThreads;
    }

    var messages =
            KafkaUtils.createStream(jssc, args[1], args[2], topicMap);

    var lines = messages.map(function(tuple2) {
        return tuple2[1];
    });

    var words = lines.flatMap(function( x) {
        return x.split(/\s+/);
    });

    var wordCounts = words.mapToPair(function( s) {
          return new Tuple(s, 1);
      }).reduceByKey(function( i1,  i2) {
          return i1 + i2;
      });

    wordCounts.print();



    // Start the computation
    jssc.start();
    jssc.awaitTermination();

