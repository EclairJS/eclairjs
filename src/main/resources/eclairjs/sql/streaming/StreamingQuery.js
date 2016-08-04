/*                                                                         
* Copyright 2016 IBM Corp.                                                 
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

    //var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    //var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    //var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    //var logger = Logger.getLogger("sql.streaming.StreamingQuery_js");


    
    
    /**
     * @classdesc
     * :: Experimental ::
     * A handle to a query that is executing continuously in the background as new data arrives.
     * All these methods are thread-safe.
     * @since EclairJS 0.5 Spark  2.0.0
     * @class
     * @memberof module:eclairjs/sql/streaming
     */

    var StreamingQuery = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.StreamingQuery');
    //var StreamingQuery = function() {
    //	 throw "Can't instantiate abstract class - StreamingQuery";
    //\\ 	 this.logger = Logger.getLogger("StreamingQuery_js");
    //\\ 	 JavaWrapper.call(this, jvmObject);
    //
    //};
    //
    //StreamingQuery.prototype = Object.create(JavaWrapper.prototype);
    //
    //StreamingQuery.prototype.constructor = StreamingQuery;
    
    
    
    /**
     * Returns the name of the query. This name is unique across all active queries. This can be
     * set in the [[org.apache.spark.sql.DataStreamWriter DataStreamWriter]] as
     * `dataframe.writeStream.queryName("query").start()`.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {string} 
     */
    //StreamingQuery.prototype.name = function() {
    //throw "not implemented by ElairJS";
    ////   return  this.getJavaObject().name();
    //};
    
    
    /**
     * Returns the unique id of this query. This id is automatically generated and is unique across
     * all queries that have been started in the current process.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {number} 
     */
    //StreamingQuery.prototype.id = function() {
    //throw "not implemented by ElairJS";
    ////   return  this.getJavaObject().id();
    //};
    
    
    /**
     * Returns the {@link SparkSession} associated with `this`.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.SparkSession} 
     */
    //StreamingQuery.prototype.sparkSession = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().sparkSession();
    ////   return new SparkSession(javaObject);
    //};
    
    
    /**
     * Whether the query is currently active or not
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {boolean} 
     */
    //StreamingQuery.prototype.isActive = function() {
    //throw "not implemented by ElairJS";
    ////   return  this.getJavaObject().isActive();
    //};
    
    
    /**
     * Returns the {@link StreamingQueryException} if the query was terminated by an exception.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql/streaming.StreamingQueryException} 
     */
    //StreamingQuery.prototype.exception = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().exception();
    ////   return new StreamingQueryException(javaObject);
    //};
    
    
    /**
     * Returns current status of all the sources.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {SourceStatus[]} 
     */
    //StreamingQuery.prototype.sourceStatuses = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().sourceStatuses();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     *  Returns current status of the sink. 
     * @returns {module:eclairjs/sql/streaming.SinkStatus} 
     */
    //StreamingQuery.prototype.sinkStatus = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().sinkStatus();
    ////   return new SinkStatus(javaObject);
    //};
    
    
    /**
     * Waits for the termination of `this` query, either by `query.stop()` or by an exception.
     * If the query has terminated with an exception, then the exception will be thrown.
     * Otherwise, it returns whether the query has terminated or not within the `timeoutMs`
     * milliseconds.
     *
     * If the query has terminated, then all subsequent calls to this method will either return
     * `true` immediately (if the query was terminated by `stop()`), or throw the exception
     * immediately (if the query has terminated with exception).
     *
     * @throws StreamingQueryException, if `this` query has terminated with an exception
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {number} [timeoutMs]
     * @returns {boolean} 
     */
    //StreamingQuery.prototype.awaitTermination = function(timeoutMs) {
    //throw "not implemented by ElairJS";
    ////
    ////   if (arguments[0]) {
    ////   return  this.getJavaObject().awaitTermination(timeoutMs);
    ////   } else {
    ////   return  this.getJavaObject().awaitTermination();
    ////   }
    //};
    
    
    /**
     * Blocks until all available data in the source has been processed and committed to the sink.
     * This method is intended for testing. Note that in the case of continually arriving data, this
     * method may block forever. Additionally, this method is only guaranteed to block until data that
     * has been synchronously appended data to a {@link Source}
     * prior to invocation. (i.e. `getOffset` must immediately reflect the addition).
     * @since EclairJS 0.5 Spark  2.0.0
     */
    //StreamingQuery.prototype.processAllAvailable = function() {
    //throw "not implemented by ElairJS";
    ////    this.getJavaObject().processAllAvailable();
    //};
    
    
    /**
     * Stops the execution of this query if it is running. This method blocks until the threads
     * performing execution has stopped.
     * @since EclairJS 0.5 Spark  2.0.0
     */
    //StreamingQuery.prototype.stop = function() {
    //throw "not implemented by ElairJS";
    ////    this.getJavaObject().stop();
    //};
    
    
    /**
     * Prints the physical plan to the console for debugging purposes.
     *
     * @param {boolean} [extended]  whether to do extended explain or not
     * @since EclairJS 0.5 Spark  2.0.0
     */
    //StreamingQuery.prototype.explain = function(extended) {
    //throw "not implemented by ElairJS";
    ////
    ////   if (arguments[0]) {
    ////    this.getJavaObject().explain(extended);
    ////   } else {
    ////    this.getJavaObject().explain();
    ////   }
    //};
    
    module.exports = StreamingQuery;
})();