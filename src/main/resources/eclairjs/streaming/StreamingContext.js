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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var JavaStreamingContext =
        Java.type('org.apache.spark.streaming.api.java.JavaStreamingContext');

    var JLinkedList = Java.type('java.util.LinkedList');

    /**
     * @constructor
     * @memberof module:eclairjs/streaming
     * @classdesc Main entry point for Spark Streaming functionality. It provides methods used to create DStreams from various input sources.
     *  It can be either created by providing a Spark master URL and an appName, or from a org.apache.spark.SparkConf configuration
     *  (see core Spark documentation), or from an existing org.apache.spark.SparkContext. The associated SparkContext can be accessed
     *  using context.sparkContext. After creating and transforming DStreams, the streaming computation can be started and stopped using
     *  context.start() and context.stop(), respectively. context.awaitTermination() allows the current thread to wait for the termination
     *  of the context by stop() or by an exception.
     *  @param {SparkContex} sparkContext
     *  @param {module:eclairjs/streaming.Duration} duration
     */
    var StreamingContext = function (sparkContext, duration) {
        var jvmObj;
        if (arguments.length == 1 && (org.apache.spark.streaming.api.java.JavaStreamingContext))
            jvmObj = arguments[0];
        else
            jvmObj =
                new JavaStreamingContext(Utils.unwrapObject(sparkContext),
                    Utils.unwrapObject(duration)
                );
        this.logger = Logger.getLogger("streaming.Duration_js");
        JavaWrapper.call(this, jvmObj);
    };

    StreamingContext.prototype = Object.create(JavaWrapper.prototype);

    StreamingContext.prototype.constructor = StreamingContext;

    /**
     * The underlying SparkContext
     * @returns {module:eclairjs.SparkContext}
     */
    StreamingContext.prototype.sparkContext = function () {
        var javaObject = this.getJavaObject().sparkContext();
        return Utils.javaToJs(javaObject);
    };

    /**
     * Wait for the execution to stop
     */
    StreamingContext.prototype.awaitTermination = function () {
        this.getJavaObject().awaitTermination();
    };
    /**
     * Wait for the execution to stop, or timeout
     * @param {long} millis
     * @returns {boolean}
     */
    StreamingContext.prototype.awaitTerminationOrTimeout = function (millis) {
        return this.getJavaObject().awaitTerminationOrTimeout(millis);
    };
    /**
     * Start the execution of the streams.
     */
    StreamingContext.prototype.start = function () {
        this.getJavaObject().start();
    };
    /**
     * Stops the execution of the streams.
     */
    StreamingContext.prototype.stop = function () {
        if (arguments.length == 1) {
            this.getJavaObject().stop(arguments[0]);
        } else {
            this.getJavaObject().stop();
        }
    };

    StreamingContext.prototype.close = function () {
        this.getJavaObject().close();
    };

    /**
     * Create a input stream from TCP source hostname:port.
     * @param {string} host
     * @param {string} port
     * @returns {module:eclairjs/streaming/dstream.DStream}
     */
    StreamingContext.prototype.socketTextStream = function (host, port) {
        var jDStream = this.getJavaObject().socketTextStream(host, port);

        return Utils.javaToJs(jDStream, this);
    };

    /**
     * Create an input stream from an queue of RDDs. In each batch,
     * it will process either one or all of the RDDs returned by the queue.
     *
     * NOTE:
     * 1. Changes to the queue after the stream is created will not be recognized.
     * 2. Arbitrary RDDs can be added to `queueStream`, there is no way to recover data of
     * those RDDs, so `queueStream` doesn't support checkpointing.
     *
     * @param {RDD[] } queue       Queue of RDDs
     * @param {boolean}  [oneAtATime=true]   Whether only one RDD should be consumed from the queue in every interval
     * @param {module:eclairjs.RDD} [defaultRDD]  Default RDD is returned by the DStream when the queue is empty
     * @returns {module:eclairjs/streaming/dstream.DStream}
     */
    StreamingContext.prototype.queueStream = function (queue) {
        var jQueue = new JLinkedList();
        for (var index in queue)
            jQueue.add(Utils.unwrapObject(queue[index]));
        var oneAtATime = (arguments.length > 1) ? arguments[1] : true;
        var javaObject;
        if (arguments.length > 2) {
            var defaultRDD_uw = Utils.unwrapObject(arguments[2]);
            javaObject = this.getJavaObject().queueStream(jQueue, oneAtATime, defaultRDD_uw);
        }
        else
            javaObject = this.getJavaObject().queueStream(jQueue, oneAtATime);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Sets the context to periodically checkpoint the DStream operations for master
     * fault-tolerance. The graph will be checkpointed every batch interval.
     * @param {string} directory  HDFS-compatible directory where the checkpoint data will be reliably stored
     */
    StreamingContext.prototype.checkpoint = function (directory) {
        this.getJavaObject().checkpoint(directory);
    };

//
///  Static Functions
///
///

    /**
     * Either recreate a StreamingContext from checkpoint data or create a new StreamingContext.
     * If checkpoint data exists in the provided `checkpointPath`, then StreamingContext will be
     * recreated from the checkpoint data. If the data does not exist, then the provided factory
     * will be used to create a JavaStreamingContext.
     *
     * @param {string} checkpointPath  Checkpoint directory used in an earlier JavaStreamingContext program
     * @param {func} creatingFunc    Function to create a new JavaStreamingContext
     * @returns {JavaStreamingContext}
     */
    StreamingContext.getOrCreate = function (checkpointPath, creatingFunc) {
        var bindArgs;
        var fn = Utils.createLambdaFunction(creatingFunc, org.eclairjs.nashorn.JSFunction0, this.sparkContext(), bindArgs);
        var javaObject = org.apache.spark.streaming.api.java.JavaStreamingContext.getOrCreate(checkpointPath, fn);
        return new Utils.javaToJs(javaObject);
    };


    module.exports = StreamingContext;

})();
