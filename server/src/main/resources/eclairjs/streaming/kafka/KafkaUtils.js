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

(function () {

    function sslTrustStore() {
        var javaHome = java.lang.System.getProperty("java.home") + java.io.File.separator + "lib" + java.io.File.separator + "security" + java.io.File.separator + "cacerts";
        print("default location of ssl Trust store is: " + javaHome);
        return javaHome;
    }
    var KAFKA_TOPIC = "kafka.topic";    //Key for name of the kafka topic holding used for publishing events
    var KAFKA_USER_NAME = "kafka.user.name";
    var KAFKA_USER_PASSWORD = "kafka.user.password";

    var MESSAGEHUB_API_KEY = "api_key";
    var MESSAGEHUB_REST_URL = "kafka_rest_url";


    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    var EclairJsKafkaUtils = Java.type("org.eclairjs.nashorn.EclairJsKafkaUtils");

    /**
     * @memberof module:eclairjs/streaming/kafka
     * @constructor
     */
    var KafkaUtils = function () {
    };

    var StorageLevel = Java.type("org.apache.spark.storage.StorageLevel");
    var CommonClientConfigs = Java.type("org.apache.kafka.clients.CommonClientConfigs");
    var SslConfigs = Java.type("org.apache.kafka.common.config.SslConfigs");

    function createKafkaStream(ssc, group, brokers, topic, kafkaProps) {

        kafkaProps.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        kafkaProps.put("group.id", group);
        kafkaProps.put("auto.offset.reset", "latest");
        kafkaProps.put("acks", "-1");
        kafkaProps.put("retries", "0");
        kafkaProps.put("batch.size", "16384");
        kafkaProps.put("linger.ms", "1");
        kafkaProps.put("buffer.memory", "33554432");
        kafkaProps.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        kafkaProps.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        kafkaProps.put(KAFKA_TOPIC, topic);
        kafkaProps.put("bootstrap.servers",brokers);

        var dstream = EclairJsKafkaUtils.createJavaStream(
            ssc.getJavaObject(), kafkaProps, topic, StorageLevel.MEMORY_AND_DISK()
        );

        return Utils.javaToJs(dstream);
    }

    KafkaUtils.createMessageHubStream = function(ssc, group, brokers, topic, username, password, api_key) {
        var kafkaProps = new java.util.HashMap();

        kafkaProps.put(SslConfigs.SSL_PROTOCOL_CONFIG, "TLSv1.2"),
        kafkaProps.put(SslConfigs.SSL_ENABLED_PROTOCOLS_CONFIG, "TLSv1.2"),
        kafkaProps.put(SslConfigs.SSL_TRUSTSTORE_TYPE_CONFIG, "JKS"),
        kafkaProps.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, sslTrustStore()),
        kafkaProps.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, "changeit"),
        kafkaProps.put(SslConfigs.SSL_ENDPOINT_IDENTIFICATION_ALGORITHM_CONFIG, "HTTPS"),
        kafkaProps.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SASL_SSL" ),

        kafkaProps.put(KAFKA_USER_NAME, username);
        kafkaProps.put(KAFKA_USER_PASSWORD, password);
        kafkaProps.put(MESSAGEHUB_API_KEY, api_key);
        kafkaProps.put(MESSAGEHUB_REST_URL, "https://kafka-rest-prod01.messagehub.services.us-south.bluemix.net:443");
        kafkaProps.put("sasl.mechanism","PLAIN");

        return createKafkaStream(ssc, group, brokers, topic, kafkaProps);
    };

    /**
     * Create an input stream that pulls messages from Kafka Brokers.
     * Storage level of the data will be the default StorageLevel.MEMORY_AND_DISK_SER_2.
     * @param {StreamingContext} jssc       StreamingContext object
     * @param {string} group      The group id for this consumer
     * @param {string} brokers    Kafka Brokers "hostname:port,hostname:port,.."
     * @param {string} topics     Kafka Topic
     * @returns {module:eclairjs/streaming/dstream.PairDStream}  PairDStream of (Kafka message key, Kafka message value)
     */
    KafkaUtils.createStream = function(ssc, group, brokers, topic) {
        var kafkaProps = new java.util.HashMap();
        return createKafkaStream(ssc, group, brokers, topic, kafkaProps);
    };

    /**
     *  NOTE: This currently only works on Kafka key/values which are Strings
     *
     * Create an input stream that directly pulls messages from Kafka Brokers
     * without using any receiver. This stream can guarantee that each message
     * from Kafka is included in transformations exactly once (see points below).
     *
     * Points to note:
     *  - No receivers: This stream does not use any receiver. It directly queries Kafka
     *  - Offsets: This does not use Zookeeper to store offsets. The consumed offsets are tracked
     *    by the stream itself. For interoperability with Kafka monitoring tools that depend on
     *    Zookeeper, you have to update Kafka/Zookeeper yourself from the streaming application.
     *    You can access the offsets used in each batch from the generated RDDs (see
     *    {@link HasOffsetRanges}).
     *  - Failure Recovery: To recover from driver failures, you have to enable checkpointing
     *    in the {@link StreamingContext}. The information on consumed offset can be
     *    recovered from the checkpoint. See the programming guide for details (constraints, etc.).
     *  - End-to-end semantics: This stream ensures that every records is effectively received and
     *    transformed exactly once, but gives no guarantees on whether the transformed data are
     *    outputted exactly once. For end-to-end exactly-once semantics, you have to either ensure
     *    that the output operation is idempotent, or use transactions to output records atomically.
     *    See the programming guide for more details.
     *
     * @param {module:eclairjs/streaming.StreamingContext} ssc  StreamingContext object
     * @param {object} kafkaParams  map of Kafka options (key, value). Kafka <a href="http://kafka.apache.org/documentation.html#configuration">
     *   configuration parameters</a>. Requires "metadata.broker.list" or "bootstrap.servers"
     *   to be set with Kafka broker(s) (NOT zookeeper servers), specified in
     *   host1:port1,host2:port2 form.
     *   If not starting from a checkpoint, "auto.offset.reset" may be set to "largest" or "smallest"
     *   to determine where the stream starts (defaults to "largest")
     * @param {string[]} topics  Names of the topics to consume
     * @returns {module:eclairjs/streaming/dstream.DStream}  DStream of (Kafka message key, Kafka message value)
     */
    KafkaUtils.createDirectStream = function (ssc, kafkaParams, topics) {
        // TODO: Not working with toree spark 2.0, kafka 0.10. Commenting Out.
        // Works fine standalone.

        /*
        //var JavaKakfaUtils = Java.type("org.apache.spark.streaming.kafka010.KafkaUtils");
        //var JavaLocationStrategies = Java.type("org.apache.spark.streaming.kafka010.LocationStrategies");
        //var JavaConsumerStrategies = Java.type("org.apache.spark.streaming.kafka010.ConsumerStrategies");

        var ssc_uw = Utils.unwrapObject(ssc);

        var kafkaParams_uw = Utils.createJavaHashMap(kafkaParams);
        // TODO: Make sure all streaming examples to use new prop name of "bootstrap.servers"
        // instead of "metadata.broker.list".
        kafkaParams_uw.put("bootstrap.servers", kafkaParams["bootstrap.servers"] || "unused");
        // Remove the reference to "metadata.broker.list" so we don't get Config warning
        // TODO: We won't need to do this any more once examples are updated.
        kafkaParams_uw.remove("metadata.broker.list");
        kafkaParams_uw.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer"),
        kafkaParams_uw.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        kafkaParams_uw.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        kafkaParams_uw.put("enable.auto.commit", new java.lang.Boolean(false));
        //kafkaParams_uw.put("auto.offset.reset", "latest");
        kafkaParams_uw.put("auto.offset.reset", "earliest");
        kafkaParams_uw.put("group.id", kafkaParams["groub.id"] || "example");

        var topics_uw = Utils.createJavaSet(topics);

        // Use PreferConsistent in most cases as it consistently distributes partitions across all executors.
        // Use PreferBrokers if your executors are on the same hosts as your Kafka brokers.
        //var preferredHosts = ssc_uw.sparkContext().isLocal() ?
            //JavaLocationStrategies.PreferBrokers() : JavaLocationStrategies.PreferConsistent();
        var preferredHosts = JavaLocationStrategies.PreferBrokers();

        var javaObject = JavaKakfaUtils.createDirectStream(ssc_uw,
            preferredHosts,
            JavaConsumerStrategies.Subscribe(topics_uw, kafkaParams_uw));

        return Utils.javaToJs(javaObject, ssc);
        */
    };

    module.exports = KafkaUtils;

})();
