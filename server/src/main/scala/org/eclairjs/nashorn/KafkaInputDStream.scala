/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.eclairjs.nashorn

import java.io.{File, FileWriter, InputStream}

import scala.collection.JavaConversions._
import scala.collection.Map
import scala.reflect.ClassTag
import scala.reflect.classTag
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.clients.consumer.KafkaConsumer
import org.apache.kafka.common.serialization.Deserializer
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.StreamingContext
import org.apache.spark.streaming.dstream._
import org.apache.spark.streaming.receiver.Receiver
import kafka.utils.Logging
import org.apache.kafka.common.security.JaasUtils

import scala.io.Source

class KafkaInputDStream(
    ssc : StreamingContext,
    kafkaParams: java.util.Map[String, Object],
    topic: String,
    storageLevel: StorageLevel = StorageLevel.MEMORY_AND_DISK
  ) extends ReceiverInputDStream[(String, String)](ssc) with Logging {

  def getReceiver(): Receiver[(String, String)] = {
      new KafkaReceiver(kafkaParams, List(topic), storageLevel)
  }
}

class KafkaReceiver(
    kafkaParams: java.util.Map[String,Object],
    topics: List[String],
    storageLevel: StorageLevel
  ) extends Receiver[(String, String)](storageLevel) {

  // Connection to Kafka
  var kafkaConsumer: KafkaConsumer[String, String] = null

  private def fixPath(path: String):String = {
    path.replaceAll("\\ / : * ? \" < > |,", "_")
  }

  def createJaasConfiguration( userName: String, password: String){
    if ( System.getProperty(JaasUtils.JAVA_LOGIN_CONFIG_PARAM) != null ){
      //Already configured
      return
    }

    //Create the jaas configuration
      var is:InputStream = null
      try{
        is = this.getClass.getResourceAsStream("/jaas.conf");
        System.out.println("*********" + is);
        val confString = Source.fromInputStream( is ).mkString
          .replace( "$USERNAME", userName)
          .replace( "$PASSWORD", password )

        val confDir= new File( System.getProperty("java.io.tmpdir") + File.separator + fixPath( userName ) )
        confDir.mkdirs
        val confFile = new File( confDir, "jaas.conf");
        val fw = new FileWriter( confFile );
        fw.write( confString )
        fw.close

        //Set the jaas login config property
        //logInfo("Registering JaasConfiguration: " + confFile.getAbsolutePath)
        System.setProperty(JaasUtils.JAVA_LOGIN_CONFIG_PARAM, confFile.getAbsolutePath )
      }catch{
        case e:Throwable => {
          //logError( e.getMessage, e)
          throw e
        }
      }finally{
        if ( is != null ) is.close
      }
  }

  def onStop() {
    if (kafkaConsumer != null) {
      kafkaConsumer.synchronized {
        //logInfo("Stopping kafkaConsumer")
        kafkaConsumer.close()
        kafkaConsumer = null
      }
    }
  }

  def onStart() {
    //logInfo("Starting Kafka Consumer Stream")
    
    //Make sure the Jaas Login config param is set
    createJaasConfiguration( kafkaParams.get("kafka.user.name").toString,
      kafkaParams.get("kafka.user.password").toString)
    
    val keyDeserializer = classTag[StringDeserializer].runtimeClass.getConstructor().newInstance().asInstanceOf[Deserializer[String]]
    val valueDeserializer = classTag[StringDeserializer].runtimeClass.getConstructor().newInstance().asInstanceOf[Deserializer[String]]
    
    //Create a new kafka consumer and subscribe to the relevant topics
    kafkaConsumer = new KafkaConsumer[String, String](kafkaParams)
    kafkaConsumer.subscribe( topics )
    new Thread( new Runnable {
      def run(){
        try{
			    while( kafkaConsumer != null ){
            var it:Iterator[ConsumerRecord[String, String]] = null;
            
            if ( kafkaConsumer != null ){
              kafkaConsumer.synchronized{     
                //Poll for new events
                it = kafkaConsumer.poll(1000L).iterator              
                while( it != null && it.hasNext ){
                  //Get the record and store it
                  try{
                    val record = it.next();
                    if ( record.value != null ){
                      store( (record.key, record.value) )
                    }
                  }catch{
                    //Something wrong while deserializing this record, log error and keep going
                    case e: Throwable=>System.out.println(e.getMessage)//logError( e.getMessage, e )
                  }
                }
                kafkaConsumer.commitSync
              }
            }            

            Thread.sleep( 1000L )
          }  
          println("Exiting Thread")
        }catch{
          case e:Throwable => {
            reportError( "Error in KafkaConsumer thread", e);
            e.printStackTrace()
          }
        }
	    }
    }).start
  }
}
