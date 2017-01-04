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

/**
 * eclairjs kafka module.
 * @example
 * var ejsKafka = require('eclairjs-kafka');
 * @module eclairjs-kafka
 */

function KafkaUtils(obj) {
  this.jar = obj.jar;
  this.eclairjs = obj.eclairjs;

  if(process.env.VCAP_SERVICES) {
    var vcap = JSON.parse(process.env.VCAP_SERVICES);
    if(vcap['messagehub']) {
      this.username = vcap.messagehub[0].credentials.user;
      this.password = vcap.messagehub[0].credentials.password;
      this.apikey = vcap.messagehub[0].credentials.api_key;
      this.brokers = vcap.messagehub[0].credentials.kafka_brokers_sasl.join(',');
    }
  }
}

KafkaUtils.prototype.init = function(sparkContext) {
  return this.eclairjs.addJar(this.jar);
}

KafkaUtils.prototype.createStream = function (ssc, zk, consumer_group, topic) {
  return this.eclairjs.executeMethod({
    target: KafkaUtils,
    method: 'createStream',
    static: true,
    args: this.eclairjs.getUtils().wrapArguments(arguments),
    returnType: this.eclairjs.streaming.dstream.DStream
  });
};


KafkaUtils.prototype.createMessageHubStream = function(
  ssc, group, topic, brokers, username, password, api_key
) {

  var args = [ssc,group,topic];
  if(arguments[3]) {
    args.push(arguments[3])
  } else if(this.brokers) {
    args.push(this.brokers);
  } else {
    args.push('localhost:9092');
  }

  if(arguments[4]) {
    args.push(arguments[4])
  } else if(this.username) {
    args.push(this.username);
  } else {
    args.push("");
  }

  if(arguments[5]) {
    args.push(arguments[5])
  } else if(this.password) {
    args.push(this.password);
  } else {
    args.push("");
  }

  if(arguments[6]) {
    args.push(arguments[6])
  } else if(this.apikey) {
    args.push(this.apikey);
  } else {
    args.push("");
  }

  return this.eclairjs.executeMethod({
    target: KafkaUtils,
    method: 'createMessageHubStream',
    static: true,
    args: this.eclairjs.getUtils().wrapArguments(args),
    returnType: this.eclairjs.streaming.dstream.DStream
  });
};

KafkaUtils.moduleLocation = '/streaming/kafka/KafkaUtils';


module.exports = KafkaUtils;
