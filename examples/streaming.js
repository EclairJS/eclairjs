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

var conf = new SparkConf().setAppName("JavaScript streaming").setMaster("local[*]"); 
var sparkContext = new SparkContext(conf);
var streamingContext = new StreamingContext(sparkContext, new Duration(2000));
//var dstream = streamingContext.socketTextStream("localhost", 9999);
print("KafkaUtils");
print(KafkaUtils);
print(KafkaUtils.createStream);
var dstream = KafkaUtils
    .createStream(streamingContext,
                  "169.54.140.107:2181",
                  "floyd",
                  "airline")
    //.window(new Duration(1000 * 60 * 15))
    .flatMap(function(chunk) {
       return chunk[1].split('\n');
    })
    .map(function(line) {
        var lineArr = line.split(",");
        var str = JSON.stringify({
          "origin": lineArr[16],
          "carrier": lineArr[8],
          "flight_num": lineArr[9],
          "destination": lineArr[17],
          "take_off_delay_mins": parseInt(lineArr[15])
        })

        return str;
    })


var sqlContext = new org.apache.spark.sql.hive.HiveContext(sparkContext.getJavaObject().sc());
sqlContext.sql("CREATE TABLE IF NOT EXISTS airline (origin STRING, carrier STRING, flight_num STRING, destination STRING, take_off_delay_mins INT)")
dstream.foreachRDD(function(rdd) {
    var df = sqlContext.read().json(rdd)
    var writer = df.write().mode(org.apache.spark.sql.SaveMode.Append)
    //df.show()
    writer.saveAsTable("airline");
    //print(rdd.collect());
});

streamingContext.start();
streamingContext.awaitTermination();
