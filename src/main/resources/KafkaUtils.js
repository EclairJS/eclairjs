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

var KafkaUtils = function() {}

KafkaUtils.prototype.createStream = function(ssc, zkQuorum, group, topic) {
    var integer = new java.lang.Integer(1);
    var m = new java.util.HashMap();
    m.put(topic, integer);
    return new DStream(
        org.apache.spark.streaming.kafka.KafkaUtils.createStream(ssc.getJavaObject(),
                                                   zkQuorum,
                                                   group,
                                                   m));
};
