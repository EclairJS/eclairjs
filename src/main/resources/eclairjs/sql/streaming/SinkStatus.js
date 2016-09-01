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

  var SinkStatus = Java.type('org.eclairjs.nashorn.wrap.sql.streaming.SinkStatus');
    
    
    /**
     * @classdesc
     * Status and metrics of a streaming {@link Sink}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @class SinkStatus
     * @memberof module:eclairjs/sql/streaming
     */

    /**
     *
     *
     * @function
     * @name module:eclairjs/sql/streaming.SinkStatus#description
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {string}
     */

    /**
     *
     *
     * @function
     * @name module:eclairjs/sql/streaming.SinkStatus#offsetDesc
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {string}
     */

    
    module.exports = SinkStatus;

})();