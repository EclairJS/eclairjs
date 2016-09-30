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
    
  var ProcessingTime = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.ProcessingTime');
    
    
    /**
     * @classdesc
     * 
     * A trigger that runs a query periodically based on the processing time. If `interval` is 0,
     * the query will run as fast as possible.
     *

     * @example 
     *   df.write.trigger(ProcessingTime.create("10 seconds"))
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @class ProcessingTime
     * @memberof module:eclairjs/sql/streaming
     */

    
    //
    // static methods
    //


    
    /**
     * Create a {@link ProcessingTime}. If `interval` is 0, the query will run as fast as possible.
     *
     * Example:
     * @example 
     *   df.write.trigger(ProcessingTime.create("10 seconds"))
     *  
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} interval
     * @returns {module:eclairjs/sql/streaming.ProcessingTime} 
     * @function create
     * @static
     * @memberof module:eclairjs/sql/streaming.ProcessingTime
     */

    module.exports = ProcessingTime;

})();