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
    //var logger = Logger.getLogger("sql.Encoder_js");


    var Encoder = Java.type('org.eclairjs.nashorn.wrap.sql.Encoder');
    
    /**
     * @classdesc
     * :: Experimental ::
     * Used to convert a JVM object of type `T` to and from the internal Spark SQL representation.
     *
     * == Scala ==
     * Encoders are generally created automatically through implicits from a `SparkSession`, or can be
     * explicitly created by calling static methods on {@link Encoders}.
     *
     * @example 
     *   import spark.implicits._
     *
     *   val ds = Seq(1, 2, 3).toDS() // implicitly provided (spark.implicits.newIntEncoder)
     *  
     *
     * == Java ==
     * Encoders are specified by calling static methods on {@link Encoders}.
     *
     * @example 
     *   List<String> data = Arrays.asList("abc", "abc", "xyz");
     *   Dataset<String> ds = context.createDataset(data, Encoders.STRING());
     *  
     *
     * Encoders can be composed into tuples:
     *
     * @example 
     *   Encoder<Tuple2<Integer, String>> encoder2 = Encoders.tuple(Encoders.INT(), Encoders.STRING());
     *   List<Tuple2<Integer, String>> data2 = Arrays.asList(new scala.Tuple2(1, "a");
     *   Dataset<Tuple2<Integer, String>> ds2 = context.createDataset(data2, encoder2);
     *  
     *
     * Or constructed from Java Beans:
     *
     * @example 
     *   Encoders.bean(MyClass.class);
     *  
     *
     * == Implementation ==
     *  - Encoders are not required to be thread-safe and thus they do not need to use locks to guard
     *    against concurrent access if they reuse internal buffers to improve performance.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @class
     * @memberof module:eclairjs/sql
     */
    
    //
    //var Encoder = function() {
    //	 throw "Can't instantiate abstract class - Encoder";
    //\\ 	 this.logger = Logger.getLogger("Encoder_js");
    //\\ 	 JavaWrapper.call(this, jvmObject);
    //
    //};
    //
    //Encoder.prototype = Object.create(JavaWrapper.prototype);
    //
    //Encoder.prototype.constructor = Encoder;
    //
    
    
    /**
     *  Returns the schema of encoding this type of object as a Row. 
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    //Encoder.prototype.schema = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().schema();
    ////   return new StructType(javaObject);
    //};
    
    
    /**
     *  A ClassTag that can be used to construct and Array to contain a collection of `T`. 
     * @returns {ClassTag} 
     */
    //Encoder.prototype.clsTag = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  this.getJavaObject().clsTag();
    ////   return new ClassTag(javaObject);
    //};
    
    module.exports = Encoder;
})();