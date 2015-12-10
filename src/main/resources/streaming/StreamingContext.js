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

var JavaStreamingContext = 
    Java.type('org.apache.spark.streaming.api.java.JavaStreamingContext');
/**
 * @constructor
 * @classdesc Main entry point for Spark Streaming functionality. It provides methods used to create DStreams from various input sources.
 *  It can be either created by providing a Spark master URL and an appName, or from a org.apache.spark.SparkConf configuration 
 *  (see core Spark documentation), or from an existing org.apache.spark.SparkContext. The associated SparkContext can be accessed 
 *  using context.sparkContext. After creating and transforming DStreams, the streaming computation can be started and stopped using 
 *  context.start() and context.stop(), respectively. context.awaitTermination() allows the current thread to wait for the termination 
 *  of the context by stop() or by an exception.
 *  @param {SparkContex} sparkContext
 *  @param {Duration} duration
 */
var StreamingContext = function(sparkContext, duration) {
	var jvmObj = 
        new JavaStreamingContext(Utils.unwrapObject(sparkContext), 
    							 Utils.unwrapObject(duration)
    							 );
	this.logger = Logger.getLogger("streaming.Duration_js");
	JavaWrapper.call(this, jvmObj);
};

StreamingContext.prototype = Object.create(JavaWrapper.prototype); 

StreamingContext.prototype.constructor = StreamingContext;
/**
 * Wait for the execution to stop
 */
StreamingContext.prototype.awaitTermination = function() {
    this.getJavaObject().awaitTermination();
};
/**
 * Wait for the execution to stop, or timeout
 * @param {long} millis
 * @returns {boolean}
 */
StreamingContext.prototype.awaitTerminationOrTimeout = function(millis) {
    return this.getJavaObject().awaitTerminationOrTimeout(millis);
};
/**
 * Start the execution of the streams.
 */
StreamingContext.prototype.start = function() {
    this.getJavaObject().start();
};
/**
 * Stops the execution of the streams.
 */
StreamingContext.prototype.stop = function() {
    if(arguments.length == 1) {
        this.getJavaObject().stop(arguments[0]);
    } else {
        this.getJavaObject().stop();
    }
};

StreamingContext.prototype.close = function() {
    this.getJavaObject().close();
};

/**
 * Create a input stream from TCP source hostname:port.
 * @param {string} host
 * @param {string} port
 * @returns {DStream}
 */
StreamingContext.prototype.socketTextStream = function(host, port) {
    var jDStream = this.getJavaObject().socketTextStream(host, port);

    return new DStream(jDStream, this);
};




