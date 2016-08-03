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
    //var logger = Logger.getLogger("sql.streaming.DataStreamWriter_js");


    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Interface used to write a streaming {@link Dataset} to external storage systems (e.g. file systems,
     * key-value stores, etc). Use {@link writeStream} to access this.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @class
     * @memberof module:eclairjs/sql/streaming
     */
    var DataStreamWriter = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter');
    
    //var DataStreamWriter = function() {
    //
    //	 this.logger = Logger.getLogger("DataStreamWriter_js");
    //	 JavaWrapper.call(this, jvmObject);
    //
    //};
    //
    //DataStreamWriter.prototype = Object.create(JavaWrapper.prototype);
    //
    //DataStreamWriter.prototype.constructor = DataStreamWriter;
    
    
    
    /**
     * :: Experimental ::
     * Specifies how data of a streaming DataFrame/Dataset is written to a streaming sink.
     *   - `OutputMode.Append()`: only the new rows in the streaming DataFrame/Dataset will be
     *                            written to the sink
     *   - `OutputMode.Complete()`: all the rows in the streaming DataFrame/Dataset will be written
     *                              to the sink every time these is some updates
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {OutputMode} outputMode
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.outputModewithOutputMode = function(outputMode) {
    //throw "not implemented by ElairJS";
    ////   var outputMode_uw = Utils.unwrapObject(outputMode);
    ////   var javaObject =  this.getJavaObject().outputMode(outputMode_uw);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Specifies how data of a streaming DataFrame/Dataset is written to a streaming sink.
     *   - `append`:   only the new rows in the streaming DataFrame/Dataset will be written to
     *                 the sink
     *   - `complete`: all the rows in the streaming DataFrame/Dataset will be written to the sink
     *                 every time these is some updates
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} outputMode
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.outputModewithstring = function(outputMode) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().outputMode(outputMode);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Set the trigger for the stream query. The default value is `ProcessingTime(0)` and it will run
     * the query as fast as possible.
     *
     * Scala Example:
     * @example 
     *   df.writeStream.trigger(ProcessingTime("10 seconds"))
     *
     *   import scala.concurrent.duration._
     *   df.writeStream.trigger(ProcessingTime(10.seconds))
     *  
     *
     * Java Example:
     * @example 
     *   df.writeStream().trigger(ProcessingTime.create("10 seconds"))
     *
     *   import java.util.concurrent.TimeUnit
     *   df.writeStream().trigger(ProcessingTime.create(10, TimeUnit.SECONDS))
     *  
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {module:eclairjs/sql/streaming.Trigger} trigger
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.trigger = function(trigger) {
    //throw "not implemented by ElairJS";
    ////   var trigger_uw = Utils.unwrapObject(trigger);
    ////   var javaObject =  this.getJavaObject().trigger(trigger_uw);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Specifies the name of the {@link StreamingQuery} that can be started with `start()`.
     * This name must be unique among all the currently active queries in the associated SQLContext.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} queryName
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.queryName = function(queryName) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().queryName(queryName);
    ////   return new DataStreamWriter(javaObject);
    //};
    //
    
    /**
     * :: Experimental ::
     * Specifies the underlying output data source. Built-in options include "parquet", "json", etc.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} source
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.format = function(source) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().format(source);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * Partitions the output by the given columns on the file system. If specified, the output is
     * laid out on the file system similar to Hive's partitioning scheme. As an example, when we
     * partition a dataset by year and then month, the directory layout would look like:
     *
     *   - year=2016/month=01/
     *   - year=2016/month=02/
     *
     * Partitioning is one of the most widely used techniques to optimize physical data layout.
     * It provides a coarse-grained index for skipping unnecessary data reads when queries have
     * predicates on the partitioned columns. In order for partitioning to work well, the number
     * of distinct values in each column should typically be less than tens of thousands.
     *
     * This was initially applicable for Parquet but in 1.5+ covers JSON, text, ORC and avro as well.
     *
     * @since EclairJS 0.5 Spark  1.4.0
     * @param {...string} colNames
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.partitionBy = function(colNames) {
    //throw "not implemented by ElairJS";
    //// // TODO: handle repeated parm 'colNames'
    ////   var javaObject =  this.getJavaObject().partitionBy(colNames);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Adds an output option for the underlying data source.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} key
     * @param {string} value
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.option0 = function(key,value) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().option(key,value);
    ////   return new DataStreamWriter(javaObject);
    //};
    //
    
    /**
     * :: Experimental ::
     * Adds an output option for the underlying data source.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} key
     * @param {boolean} value
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.option1 = function(key,value) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().option(key,value);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Adds an output option for the underlying data source.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} key
     * @param {number} value
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.option2 = function(key,value) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().option(key,value);
    ////   return new DataStreamWriter(javaObject);
    //};
    //
    
    /**
     * :: Experimental ::
     * Adds an output option for the underlying data source.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} key
     * @param {number} value
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.option3 = function(key,value) {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().option(key,value);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * (Scala-specific) Adds output options for the underlying data source.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {Map} options
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.optionswithMap = function(options) {
    //throw "not implemented by ElairJS";
    ////   var options_uw = Utils.unwrapObject(options);
    ////   var javaObject =  this.getJavaObject().options(options_uw);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Adds output options for the underlying data source.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {Map} options
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.optionswithMap = function(options) {
    //throw "not implemented by ElairJS";
    ////   var options_uw = Utils.unwrapObject(options);
    ////   var javaObject =  this.getJavaObject().options(options_uw);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    
    /**
     * :: Experimental ::
     * Starts the execution of the streaming query, which will continually output results to the given
     * path as new data arrives. The returned {@link StreamingQuery} object can be used to interact with
     * the stream.
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {string} [path]
     * @returns {module:eclairjs/sql/streaming.StreamingQuery} 
     */
    //DataStreamWriter.prototype.start = function(path) {
    //throw "not implemented by ElairJS";
    ////
    ////   if (arguments[0]) {
    ////   var javaObject =  this.getJavaObject().start(path);
    ////   return Utils.javaToJs(javaObject);
    ////   } else {
    ////   var javaObject =  this.getJavaObject().start();
    ////   return Utils.javaToJs(javaObject);
    ////   }
    //};
    
    
    /**
     * :: Experimental ::
     * Starts the execution of the streaming query, which will continually send results to the given
     * [[ForeachWriter]] as as new data arrives. The {@link ForeachWriter} can be used to send the data
     * generated by the [[DataFrame]]/{@link Dataset} to an external system.
     *
     * Scala example:
     * @example 
     *   datasetOfString.writeStream.foreach(new ForeachWriter[String] {
     *
     *     def open(partitionId: Long, version: Long): Boolean = {
     *       // open connection
     *     }
     *
     *     def process(record: String) = {
     *       // write string to connection
     *     }
     *
     *     def close(errorOrNull: Throwable): Unit = {
     *       // close the connection
     *     }
     *   }).start()
     *  
     *
     * Java example:
     * @example 
     *  datasetOfString.writeStream().foreach(new ForeachWriter<String>() {
     *
     *    @Override
     *    public boolean open(long partitionId, long version) {
     *      // open connection
     *    }
     *
     *    @Override
     *    public void process(String value) {
     *      // write string to connection
     *    }
     *
     *    @Override
     *    public void close(Throwable errorOrNull) {
     *      // close the connection
     *    }
     *  }).start();
     *  
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {module:eclairjs/sql.ForeachWriter} writer
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    //DataStreamWriter.prototype.foreach = function(writer) {
    //throw "not implemented by ElairJS";
    ////   var writer_uw = Utils.unwrapObject(writer);
    ////   var javaObject =  this.getJavaObject().foreach(writer_uw);
    ////   return new DataStreamWriter(javaObject);
    //};
    
    module.exports = DataStreamWriter;
})();