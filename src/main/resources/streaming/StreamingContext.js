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

var StreamingContext = function(sparkContext, duration) {
	var jvmObj = 
        new JavaStreamingContext(sparkContext.getJavaObject(), 
                                 duration.getJavaObject());
	this.logger = Logger.getLogger("streaming.Duration_js");
	JavaWrapper.call(this, jvmObj);
};

StreamingContext.prototype = Object.create(JavaWrapper.prototype); 

StreamingContext.prototype.constructor = StreamingContext;


StreamingContext.prototype.start = function() {
    this.getJavaObject().start();
};

StreamingContext.prototype.stop = function() {
    this.getJavaObject().stop();
};

StreamingContext.prototype.socketTextStream = function(host, port) {
    var jDStream = this.getJavaObject().socketTextStream(host, port);

    return new DStream(jDStream);
};

StreamingContext.prototype.awaitTerminationOrTimeout = function(millis) {
    return this.getJavaObject().awaitTerminationOrTimeout(millis);
};

StreamingContext.prototype.awaitTermination = function() {
    return this.getJavaObject().awaitTermination();
};
