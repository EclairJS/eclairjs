var JavaKafkaUtils = 
    Java.type('org.apache.spark.streaming.kafka.KafkaUtils');

var KafkaUtils = function() {} 

KafkaUtils.prototype.createStream = function(ssc, zkQuorum, group, topic) {
    var integer = new java.lang.Integer(1);
    var m = new java.util.HashMap();
    m.put(topic, integer);
    return new DStream(JavaKafkaUtils.createStream(ssc.getJavaObject(),
                                                   zkQuorum,
                                                   group,
                                                   m));
};
