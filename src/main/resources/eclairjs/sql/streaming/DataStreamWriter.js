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

    
    /**
     * @classdesc
     * :: Experimental ::
     * Interface used to write a streaming {@link Dataset} to external storage systems (e.g. file systems,
     * key-value stores, etc). Use {@link writeStream} to access this.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @class DataStreamWriter
     * @memberof module:eclairjs/sql/streaming
     */
    var DataStreamWriter = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter');
    
    
    /**
     * :: Experimental ::
     * Specifies how data of a streaming DataFrame/Dataset is written to a streaming sink.
     *   - `append`: only the new rows in the streaming DataFrame/Dataset will be
     *                            written to the sink
     *   - `complete`: all the rows in the streaming DataFrame/Dataset will be written
     *                              to the sink every time these is some updates
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#outputMode
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} outputMode
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */

    
    
    /**
     * :: Experimental ::
     * Set the trigger for the stream query. The default value is `ProcessingTime(0)` and it will run
     * the query as fast as possible.
     *
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#trigger
     *
     * @example 
     *   df.writeStream().trigger(ProcessingTime.create("10 seconds"))
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {module:eclairjs/sql/streaming.Trigger} trigger
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    
    
    /**
     * :: Experimental ::
     * Specifies the name of the {@link StreamingQuery} that can be started with `start()`.
     * This name must be unique among all the currently active queries in the associated SQLContext.
     *
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#queryName
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} queryName
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */

    
    /**
     * :: Experimental ::
     * Specifies the underlying output data source. Built-in options include "parquet", "json", etc.
     *
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#format
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} source
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    
    
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
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#partitionBy
     * @since EclairJS 0.5 Spark  1.4.0
     * @param {...string} colNames
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    
    
    /**
     * :: Experimental ::
     * Adds an output option for the underlying data source.
     *
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#option
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} key
     * @param {string} value
     * @returns {module:eclairjs/sql/streaming.DataStreamWriter} 
     */
    
    
    /**
     * :: Experimental ::
     * Starts the execution of the streaming query, which will continually output results to the given
     * path as new data arrives. The returned {@link StreamingQuery} object can be used to interact with
     * the stream.
     *
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#start
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} [path]
     * @returns {module:eclairjs/sql/streaming.StreamingQuery} 
     */
    
    
    /**
     * NOTE not implemented in eclairJS.
     * :: Experimental ::
     * Starts the execution of the streaming query, which will continually send results to the given
     * [[ForeachWriter]] as as new data arrives. The {@link ForeachWriter} can be used to send the data
     * generated by the [[DataFrame]]/{@link Dataset} to an external system.
     *
     * @function
     * @name module:eclairjs/sql/streaming.DataStreamWriter#foreach
     *
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
     * @private
     */
    
    module.exports = DataStreamWriter;
})();