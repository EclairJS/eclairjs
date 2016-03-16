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

    // Create the context with a 1 second batch size

    var conf = new SparkConf().setAppName("Javascript Queue Stream");
    var ssc = new StreamingContext(conf, new Duration(1000));

    // Create the queue through which RDDs can be pushed to
          // a QueueInputDStream
          var rddQueue = [];

          // Create and push some RDDs into the queue
          var list = [];
          for (var i = 0; i < 1000; i++) {
            list.push(i);
          }
          for (var i = 0; i < 30; i++) {
            rddQueue.push(ssc.sparkContext().parallelize(list));
          }

          // Create the QueueInputDStream and use it do some processing
          var inputStream = ssc.queueStream(rddQueue);
          var mappedStream = inputStream.mapToPair(
                function(i) {
                  return new Tuple(i % 10, 1);
              });
          var reducedStream = mappedStream.reduceByKey(
              function(i1, i2) {
                return i1 + i2;
          });

          reducedStream.print();



    ssc.start();
    ssc.awaitTermination();
