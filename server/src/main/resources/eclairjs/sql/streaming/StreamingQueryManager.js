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

  var StreamingQueryManager = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.StreamingQueryManager');
    
    
    /**
     * @classdesc
     * 
     * A class to manage all the [[StreamingQuery]] active on a {@link SparkSession}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @class StreamingQueryManager
     * @memberof module:eclairjs/sql/streaming
     */
    
    
    /**
     * Returns a list of active queries associated with this SQLContext
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql/streaming.StreamingQuery[]}
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryManager#active
     */

    
    /**
     * Returns the query if there is an active query with the given id, or null.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {number} id
     * @returns {module:eclairjs/sql/streaming.StreamingQuery} 
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryManager#get
     */

    
    /**
     * Wait until any of the queries on the associated SQLContext has terminated since the
     * creation of the context, or since `resetTerminated()` was called. Returns whether any query
     * has terminated or not (multiple may have terminated). If any query has terminated with an
     * exception, then the exception will be thrown.
     *
     * If a query has terminated, then subsequent calls to `awaitAnyTermination()` will either
     * return `true` immediately (if the query was terminated by `query.stop()`),
     * or throw the exception immediately (if the query was terminated with exception). Use
     * `resetTerminated()` to clear past terminations and wait for new terminations.
     *
     * In the case where multiple queries have terminated since `resetTermination()` was called,
     * if any query has terminated with exception, then `awaitAnyTermination()` will
     * throw any of the exception. For correctly documenting exceptions across multiple queries,
     * users need to stop all of them after any of them terminates with exception, and then check the
     * `query.exception()` for each query.
     *
     * @throws StreamingQueryException, if any query has terminated with an exception
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {number} [timeoutMs]
     * @returns {boolean} 
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryManager#awaitAnyTermination
     */

    
    /**
     * Forget about past terminated queries so that `awaitAnyTermination()` can be used again to
     * wait for new terminations.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryManager#resetTerminated
     */


    /**
     * Register to receive callbacks for life cycle events of
     * {@link module:eclairjs/sql/streaming.StreamingQuery}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryManager#addListener
     *
     * @example
     *  var listener = queryManger.addListener(
     *      function(queryStartedInfo){
     *           //print("queryStartedEvent");
     *          result = queryStartedInfo.name();
     *      },
     *      function(queryProgressInfo){
     *           //print("queryProgressEvent" + queryProgressInfo.name());
     *      },
     *      function(queryTerminatedInfo){
     *          print("queryTerminatedEvent " + queryTerminatedInfo.name());
     *      }
     *  );
     *
     *
     * @since EclairJS 0.5 Spark  2.0.0
     * @param {module:eclairjs/sql/streaming.StreamingQueryManager~queryStartedCallback} queryStartedCallback
     * @param {module:eclairjs/sql/streaming.StreamingQueryManager~queryProcessCallback} queryProcessCallback
     * @param {module:eclairjs/sql/streaming.StreamingQueryManager~queryTerminateCallback} queryTerminateCallback
     * @param {object[]} [openFunctionBindArgs]
     * @param {object[]} [processFunctionBindArgs]
     * @param {object[]} [closeFunctionBindArgs]
     * @returns {module:eclairjs/sql/streaming.StreamingQueryListener}
     */

    /**
     * This callback called when query starts.
     * @callback module:eclairjs/sql/streaming.StreamingQueryManager~queryStartedCallback
     * @param {module:eclairjs/sql/streaming.StreamingQueryInfo} queryInfo
     * @param {object[]} [bindArgs]
     */

    /**
     * This callback called when query processing.
     * @callback module:eclairjs/sql/streaming.StreamingQueryManager~queryProcessCallback
     * @param {module:eclairjs/sql/streaming.StreamingQueryInfo} queryInfo
     * @param {object[]} [bindArgs]
     */

    /**
     * This callback called when query terminate.
     * @callback module:eclairjs/sql/streaming.StreamingQueryManager~queryTerminateCallback
     * @param {module:eclairjs/sql/streaming.StreamingQueryInfo} queryInfo
     * @param {object[]} [bindArgs]
     */

    
    /**
     * Deregister a {@link module:eclairjs/sql/streaming.StreamingQueryListener}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {module:eclairjs/sql/streaming.StreamingQueryListener} listener
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryManager#removeListener
     */

    module.exports = StreamingQueryManager;
})();