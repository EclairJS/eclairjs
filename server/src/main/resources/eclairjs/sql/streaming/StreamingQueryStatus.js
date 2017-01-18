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

  var StreamingQueryStatus = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.StreamingQueryStatus');
    
    
    /**
     * @classdesc
     * A class used to report information about the progress of a {@link StreamingQuery}.
     *
     * @class StreamingQueryInfo
     * @memberof module:eclairjs/sql/streaming
     */

    /**
     * Returns the name of the query. This name is unique across all active queries. This can be
     * set in the [[org.apache.spark.sql.DataStreamWriter DataStreamWriter]] as
     * `dataframe.writeStream.queryName("query").start()`.
     *
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryInfo#name
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {string}
     */

    /**
     * Returns the unique id of this query. This id is automatically generated and is unique across
     * all queries that have been started in the current process.
     *
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryInfo#id
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {number}
     */

    /**
     * Returns current status of all the sources.
     *
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryInfo#sourceStatuses
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql/streaming.SourceStatus[]}
     */


    /**
     *  Returns current status of the sink.
     *
     * @function
     * @name module:eclairjs/sql/streaming.StreamingQueryInfo#sinkStatus
     * @returns {module:eclairjs/sql/streaming.SinkStatus}
     */

    module.exports = StreamingQueryStatus;
})();