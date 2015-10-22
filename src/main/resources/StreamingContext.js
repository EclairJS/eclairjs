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
