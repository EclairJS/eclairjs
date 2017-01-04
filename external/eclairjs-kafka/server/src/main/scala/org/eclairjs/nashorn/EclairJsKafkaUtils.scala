package org.eclairjs.nashorn

import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.StreamingContext
import org.apache.spark.streaming.dstream.ReceiverInputDStream
import org.apache.spark.streaming.api.java._

/**
  * Created by bburns on 10/25/16.
  */
object EclairJsKafkaUtils {

  def createStream(
    ssc: StreamingContext,
    props: java.util.Map[String, Object],
    topic: String,
    storageLevel: StorageLevel = StorageLevel.MEMORY_AND_DISK
  ): ReceiverInputDStream[(String, String)] = {
    new KafkaInputDStream[String, String, StringDeserializer, StringDeserializer](ssc, props, topic, storageLevel)
  }

  def createJavaStream(
    jssc: JavaStreamingContext,
    props: java.util.Map[String, Object],
    topic: String,
    storageLevel: StorageLevel = StorageLevel.MEMORY_AND_DISK
  ): JavaPairReceiverInputDStream[String, String] = {
    createStream(jssc.ssc, props, topic, storageLevel)
  }
}
