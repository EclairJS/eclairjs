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
    this.javaStreamingContext = 
        new JavaStreamingContext(sparkContext.getJavaObject(), 
                                 duration.getJavaObject());
};

StreamingContext.prototype.start = function() {
    this.javaStreamingContext.start();
};

StreamingContext.prototype.stop = function() {
    this.javaStreamingContext.stop();
};

StreamingContext.prototype.socketTextStream = function(host, port) {
    var jDStream = this.javaStreamingContext.socketTextStream(host, port);

    return new DStream(jDStream);
};

StreamingContext.prototype.awaitTerminationOrTimeout = function(millis) {
    return this.javaStreamingContext.awaitTerminationOrTimeout(millis);
};

StreamingContext.prototype.awaitTermination = function() {
    return this.javaStreamingContext.awaitTermination();
};
