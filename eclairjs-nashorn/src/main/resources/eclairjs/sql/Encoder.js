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


    var Encoder = Java.type('org.eclairjs.nashorn.wrap.sql.Encoder');
    
    /**
     * @classdesc
     * :: Experimental ::
     * Used to convert a JVM object of type `T` to and from the internal Spark SQL representation.
     *
     *
     * @example 
     *   var data = ["abc", "abc", "xyz"];
     *   var ds = context.createDataset(data, Encoders.STRING());
     *
     * Encoders can be composed into tuples:
     *
     * @example 
     *   var encoder2 = Encoders.tuple(Encoders.INT(), Encoders.STRING());
     *   var data2 = [new Tuple2(1, "a")];
     *   var ds2 = context.createDataset(data2, encoder2);
     *
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @class Encoder
     * @memberof module:eclairjs/sql
     */
    
    
    /**
     *  Returns the schema of encoding this type of object as a Row.
     *  @function
     *  @name  module:eclairjs/sql/Encoder#schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */

    
    /**
     *  A ClassTag that can be used to construct and Array to contain a collection of `T`.
     *  @function
     *  @name  module:eclairjs/sql/Encoder#schema
     * @returns {ClassTag}
     * @private
     */

    
    module.exports = Encoder;
})();