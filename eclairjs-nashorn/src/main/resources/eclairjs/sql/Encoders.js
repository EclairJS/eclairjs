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

    var Encoders = Java.type('org.eclairjs.nashorn.wrap.sql.Encoders');
    
    
    /**
     * @constructor
     * @class Encoders
     * @memberof module:eclairjs/sql
     */
    
    /**
     * An encoder for nullable boolean type.
     * @function
     * @name module:eclairjs/sql/Encoders#BOOLEAN
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */

    
    /**
     * An encoder for nullable int type.
     * @function
     * @name module:eclairjs/sql/Encoders#INT
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    
    
    /**
     * An encoder for nullable float type, same as {@link  module:eclairjs/sql/Encoders#DOUBLE}.
     * @function
     * @name module:eclairjs/sql/Encoders#FLOAT
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    
    
    /**
     * An encoder for nullable double type, same as {@link  module:eclairjs/sql/Encoders#FLOAT}.
     * @function
     * @name module:eclairjs/sql/Encoders#DOUBLE
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    
    
    /**
     * An encoder for nullable string type.
     * @function
     * @name module:eclairjs/sql/Encoders#STRING
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */

    /**
     * An encoder for nullable date type.
     * @function
     * @name module:eclairjs/sql/Encoders#DATE
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    
    
    /**
     * An encoder for nullable timestamp type.
     * @function
     * @name module:eclairjs/sql/Encoders#TIMESTAMP
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */

    
    /**
     * An encoder for 2-ary tuples.
     * @function
     * @name module:eclairjs/sql/Encoders#tuple2
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @returns {module:eclairjs/sql.Encoder} 
     */

    
    /**
     * An encoder for 3-ary tuples.
     * @function
     * @name module:eclairjs/sql/Encoders#tuple3
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @returns {module:eclairjs/sql.Encoder} 
     */
    
    /**
     * An encoder for 4-ary tuples.
     * @function
     * @name module:eclairjs/sql/Encoders#tuple4
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @returns {module:eclairjs/sql.Encoder} 
     */

    /**
     * An encoder for 5-ary tuples.
     * @function
     * @name module:eclairjs/sql/Encoders#tuple5
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @param {module:eclairjs/sql.Encoder} e4
     * @returns {module:eclairjs/sql.Encoder}
     */

    /**
    * Creates encoder for JSON
    * @function
     * @name module:eclairjs/sql/Encoders#json
    * @param {object} schema - object with keys corresponding to JSON field names (or getter functions), and values indicating Datatype
     * @returns {module:eclairjs/sql.Encoder}
    *
    */



    module.exports = Encoders;
})();