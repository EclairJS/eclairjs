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

/*
 * Calculates popular hashtags (topics) over sliding 10 and 60 second windows from a Twitter
 * stream. The stream is instantiated with credentials and optionally filters supplied by the
 * command line arguments.
 *
 *
 */
var TwitterAuthorization = require('eclairjs/streaming/twitter/TwitterAuthorization');
var TwitterUtils = require('eclairjs/streaming/twitter/TwitterUtils');
var Duration = require('eclairjs/streaming/Duration');
var StreamingContext = require('eclairjs/streaming/StreamingContext');
var Tuple = require('eclairjs/Tuple');
var SparkConf = require(EclairJS_Globals.NAMESPACE + '/SparkConf');

if ((typeof args == "undefined")||args.length<5)
{
          print(
          "Usage: bin/eclairjs.sh examples/streaming/twitter_popular_tags.js  <consumer key> <consumer secret> " +
        "         <access token> <access token secret> [<filters>]\n" );
         return;
}


    var conf = new SparkConf().setAppName("Javascript Twitter Popular Tags");
    var jssc = new StreamingContext(conf, new Duration(2000));

    var filters = (args.length>5)? args[5] : [];


    var auth=new TwitterAuthorization(args[1],args[2],args[3],args[4]);
    var stream = TwitterUtils.createStream(jssc, auth, filters);

    var hashTags = stream.flatMap(function(status){
      return status.getText().split(" ");
     }).filter(function(s) {
      return s.startsWith("#");
     });

    var topCounts60 = hashTags.mapToPair(function(s){
        return new Tuple(s,1.0);
    }).reduceByKeyAndWindow(function(i1,i2){
      return i1+i2;
    }, new Duration(60000))
    .mapToPair(function(tuple){
      return new Tuple(tuple[1],tuple[0]);
    }).transformToPair(function (rdd) {
      return rdd.sortByKey(false);
     });


    var topCounts10 = hashTags.mapToPair(function(s){
        return new Tuple(s,1.0);
    }).reduceByKeyAndWindow(function(i1,i2){
      return i1+i2;
    }, new Duration(10000))
    .mapToPair(function(tuple){
      return new Tuple(tuple[1],tuple[0]);
    }).transformToPair(function (rdd) {
      return rdd.sortByKey(false);
     });


    // Print popular hashtags
    topCounts60.foreachRDD(function(rdd)  {
      var topList = rdd.take(10);
      print("\nPopular topics in last 60 seconds ("+rdd.count()+" total):");
      for(var i=0;i<topList.length;i++) {
        var tuple=topList[i];
        print(tuple[1]+" ("+tuple[0]+" tweets)");
      }
    });


    topCounts10.foreachRDD(function(rdd)  {
      var topList = rdd.take(10);
      print("\nPopular topics in last 10 seconds ("+rdd.count()+" total):");
      for(var i=0;i<topList.length;i++) {
        var tuple=topList[i];
        print(tuple[1]+" ("+tuple[0]+" tweets)");
      }
    });

    // Start the computation
    jssc.start();
    jssc.awaitTermination();

