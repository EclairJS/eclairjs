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
     * The entry point to programming Spark with the Dataset and DataFrame API.
     *
     * In environments that this has been created upfront (e.g. REPL, notebooks), use the builder
     * to get an existing session:
     *
     * @example 
     *   SparkSession.builder().getOrCreate()
     *  
     *
     * The builder can also be used to create a new session:
     *
     * @example 
     *   SparkSession.builder()
     *     .master("local")
     *     .appName("Word Count")
     *     .config("spark.some.config.option", "some-value").
     *     .getOrCreate()
     *  
     * @class
     * @memberof module:eclairjs/sql
     */
    
      var SparkSession = Java.type('org.eclairjs.nashorn.wrap.sql.SparkSession');

    
    
    /**
     * The version of Spark on which this application is running.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#version
     * @returns {string}
     */


    /**
     * The underlying SparkContext.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#sparkContext
     * @returns {module:eclairjs/SparkContext}
     */

    /**
     * A collection of methods for registering user-defined functions (UDF).
     * Note that the user-defined functions must be deterministic. Due to optimization,
     * duplicate invocations may be eliminated or the function may even be invoked more times than
     * it is present in the query.
     *
     * The following example registers a Scala closure as UDF:
     * @example 
     *   sparkSession.udf.register("myUDF", (arg1: Int, arg2: String) => arg2 + arg1)
     *  
     *
     * The following example registers a UDF in Java:
     * @example 
     *   sparkSession.udf().register("myUDF",
     *       new UDF2<Integer, String, String>() {
     *           @Override
     *           public String call(Integer arg1, String arg2) {
     *               return arg2 + arg1;
     *           }
     *      }, DataTypes.StringType);
     *  
     *
     * Or, to use Java 8 lambda syntax:
     * @example 
     *   sparkSession.udf().register("myUDF",
     *       (Integer arg1, String arg2) -> arg2 + arg1,
     *       DataTypes.StringType);
     *  
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#udf
     * @returns {module:eclairjs/sql.UDFRegistration}
     */
/*
    SparkSession.prototype.udf = function() {
       var javaObject =  this.getJavaObject().udf();
       return Utils.javaToJs(javaObject);
    };
    
*/

    /**
     * :: Experimental ::
     * Returns a {@link StreamingQueryManager} that allows managing all the
     * [[StreamingQuery StreamingQueries]] active on `this`.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#streams
     * @returns {module:eclairjs/sql/streaming.StreamingQueryManager}
     */
/*
    SparkSession.prototype.streams = function() {
       var javaObject =  this.getJavaObject().streams();
       return Utils.javaToJs(javaObject);
    };
*/

    
    /**
     * Start a new session with isolated SQL configurations, temporary tables, registered
     * functions are isolated, but sharing the underlying {@link SparkContext} and cached data.
     *
     * Note: Other than the {@link SparkContext}, all shared state is initialized lazily.
     * This method will force the initialization of the shared state to ensure that parent
     * and child sessions are set up with the same shared state. If the underlying catalog
     * implementation is Hive, this will initialize the metastore, which may take some time.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#newSession
     * @returns {module:eclairjs/sql.SparkSession}
     */
/*    SparkSession.prototype.newSession = function() {
       var javaObject =  this.getJavaObject().newSession();
       return Utils.javaToJs(javaObject);
    };
    */
    
    /**
     * :: Experimental ::
     * Creates a new {@link Dataset} of type T containing zero elements.
     *
     * @function
     * @name module:eclairjs/sql.SparkSession#emptyDataset
     * @returns {module:eclairjs/sql.Dataset}  2.0.0
     */
/*
    SparkSession.prototype.emptyDataset = function() {
       var javaObject =  this.getJavaObject().emptyDataset();
           return Utils.javaToJs(javaObject);

    };
*/

//
//    /**
//     * :: Experimental ::
//     * Creates a {@link DataFrame} from an RDD of Product (e.g. case classes, tuples).
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {module:eclairjs/rdd.RDD} rdd
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame0 = function(rdd) {
//    throw "not implemented by ElairJS";
//    //   var rdd_uw = Utils.unwrapObject(rdd);
//    //   var javaObject =  this.getJavaObject().createDataFrame(rdd_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * :: Experimental ::
//     * Creates a {@link DataFrame} from a local Seq of Product.
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {object[]} data
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame1 = function(data) {
//    throw "not implemented by ElairJS";
//    //   var data_uw = Utils.unwrapObject(data);
//    //   var javaObject =  this.getJavaObject().createDataFrame(data_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * :: DeveloperApi ::
//     * Creates a [[DataFrame]] from an [[RDD]] containing {@link Row}s using the given schema.
//     * It is important to make sure that the structure of every {@link Row} of the provided RDD matches
//     * the provided schema. Otherwise, there will be runtime exception.
//     * Example:
//     * @example
//     *  import org.apache.spark.sql._
//     *  import org.apache.spark.sql.types._
//     *  val sparkSession = new org.apache.spark.sql.SparkSession(sc)
//     *
//     *  val schema =
//     *    StructType(
//     *      StructField("name", StringType, false) ::
//     *      StructField("age", IntegerType, true) :: Nil)
//     *
//     *  val people =
//     *    sc.textFile("examples/src/main/resources/people.txt").map(
//     *      _.split(",")).map(p => Row(p(0), p(1).trim.toInt))
//     *  val dataFrame = sparkSession.createDataFrame(people, schema)
//     *  dataFrame.printSchema
//     *  // root
//     *  // |-- name: string (nullable = false)
//     *  // |-- age: integer (nullable = true)
//     *
//     *  dataFrame.createOrReplaceTempView("people")
//     *  sparkSession.sql("select name from people").collect.foreach(println)
//     *
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {module:eclairjs/rdd.RDD} rowRDD
//     * @param {module:eclairjs/sql/types.StructType} schema
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame2 = function(rowRDD,schema) {
//    throw "not implemented by ElairJS";
//    //   var rowRDD_uw = Utils.unwrapObject(rowRDD);
//    //   var schema_uw = Utils.unwrapObject(schema);
//    //   var javaObject =  this.getJavaObject().createDataFrame(rowRDD_uw,schema_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * :: DeveloperApi ::
//     * Creates a [[DataFrame]] from a [[JavaRDD]] containing {@link Row}s using the given schema.
//     * It is important to make sure that the structure of every {@link Row} of the provided RDD matches
//     * the provided schema. Otherwise, there will be runtime exception.
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {module:eclairjs/api/java.JavaRDD} rowRDD
//     * @param {module:eclairjs/sql/types.StructType} schema
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame3 = function(rowRDD,schema) {
//    throw "not implemented by ElairJS";
//    //   var rowRDD_uw = Utils.unwrapObject(rowRDD);
//    //   var schema_uw = Utils.unwrapObject(schema);
//    //   var javaObject =  this.getJavaObject().createDataFrame(rowRDD_uw,schema_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * :: DeveloperApi ::
//     * Creates a [[DataFrame]] from a [[java.util.List]] containing {@link Row}s using the given schema.
//     * It is important to make sure that the structure of every {@link Row} of the provided List matches
//     * the provided schema. Otherwise, there will be runtime exception.
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {[]} rows
//     * @param {module:eclairjs/sql/types.StructType} schema
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame4 = function(rows,schema) {
//    throw "not implemented by ElairJS";
//    //   var schema_uw = Utils.unwrapObject(schema);
//    //   var javaObject =  this.getJavaObject().createDataFrame(rows,schema_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * Applies a schema to an RDD of Java Beans.
//     *
//     * WARNING: Since there is no guaranteed ordering for fields in a Java Bean,
//     * SELECT * queries will return the columns in an undefined order.
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {module:eclairjs/rdd.RDD} rdd
//     * @param {Class} beanClass
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame5 = function(rdd,beanClass) {
//    throw "not implemented by ElairJS";
//    //   var rdd_uw = Utils.unwrapObject(rdd);
//    //   var beanClass_uw = Utils.unwrapObject(beanClass);
//    //   var javaObject =  this.getJavaObject().createDataFrame(rdd_uw,beanClass_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * Applies a schema to an RDD of Java Beans.
//     *
//     * WARNING: Since there is no guaranteed ordering for fields in a Java Bean,
//     * SELECT * queries will return the columns in an undefined order.
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {module:eclairjs/api/java.JavaRDD} rdd
//     * @param {Class} beanClass
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame6 = function(rdd,beanClass) {
//    throw "not implemented by ElairJS";
//    //   var rdd_uw = Utils.unwrapObject(rdd);
//    //   var beanClass_uw = Utils.unwrapObject(beanClass);
//    //   var javaObject =  this.getJavaObject().createDataFrame(rdd_uw,beanClass_uw);
//    //   return new DataFrame(javaObject);
//    };
//
//
//    /**
//     * Applies a schema to a List of Java Beans.
//     *
//     * WARNING: Since there is no guaranteed ordering for fields in a Java Bean,
//     *          SELECT * queries will return the columns in an undefined order.
//     * @since EclairJS 0.6 Spark  1.6.0
//     * @param {[]} data
//     * @param {Class} beanClass
//     * @returns {DataFrame}
//     */
//    SparkSession.prototype.createDataFrame7 = function(data,beanClass) {
//    throw "not implemented by ElairJS";
//    //   var beanClass_uw = Utils.unwrapObject(beanClass);
//    //   var javaObject =  this.getJavaObject().createDataFrame(data,beanClass_uw);
//    //   return new DataFrame(javaObject);
//    };
    
    
    /**
     * Convert a [[BaseRelation]] created for external data sources into a {@link DataFrame}.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#baseRelationToDataFrame
     * @param {module:eclairjs/sql/sources.BaseRelation} baseRelation
     * @returns {DataFrame} 
     */
/*    SparkSession.prototype.baseRelationToDataFrame = function(baseRelation) {
       var baseRelation_uw = Utils.unwrapObject(baseRelation);
       var javaObject =  this.getJavaObject().baseRelationToDataFrame(baseRelation_uw);
       return Utils.javaToJs(javaObject);
    };*/
    
//
//    /**
//     * :: Experimental ::
//     * Creates a {@link Dataset} from a local Seq of data of a given type. This method requires an
//     * encoder (to convert a JVM object of type `T` to and from the internal Spark SQL representation)
//     * that is generally created automatically through implicits from a `SparkSession`, or can be
//     * created explicitly by calling static methods on {@link Encoders}.
//     *
//     * == Example ==
//     *
//     * @example
//     *
//     *   import spark.implicits._
//     *   case class Person(name: String, age: Long)
//     *   val data = Seq(Person("Michael", 29), Person("Andy", 30), Person("Justin", 19))
//     *   val ds = spark.createDataset(data)
//     *
//     *   ds.show()
//     *   // +-------+---+
//     *   // |   name|age|
//     *   // +-------+---+
//     *   // |Michael| 29|
//     *   // |   Andy| 30|
//     *   // | Justin| 19|
//     *   // +-------+---+
//     *
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {object[]} data
//     * @returns {module:eclairjs/sql.Dataset}
//     */
//    SparkSession.prototype.createDataset0 = function(data) {
//    throw "not implemented by ElairJS";
//    //   var data_uw = Utils.unwrapObject(data);
//    //   var javaObject =  this.getJavaObject().createDataset(data_uw);
//    //   return new Dataset(javaObject);
//    };
//
//
//    /**
//     * :: Experimental ::
//     * Creates a {@link Dataset} from an RDD of a given type. This method requires an
//     * encoder (to convert a JVM object of type `T` to and from the internal Spark SQL representation)
//     * that is generally created automatically through implicits from a `SparkSession`, or can be
//     * created explicitly by calling static methods on {@link Encoders}.
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {module:eclairjs/rdd.RDD} data
//     * @returns {module:eclairjs/sql.Dataset}
//     */
//    SparkSession.prototype.createDataset1 = function(data) {
//    throw "not implemented by ElairJS";
//    //   var data_uw = Utils.unwrapObject(data);
//    //   var javaObject =  this.getJavaObject().createDataset(data_uw);
//    //   return new Dataset(javaObject);
//    };
//
//
//    /**
//     * :: Experimental ::
//     * Creates a [[Dataset]] from a {@link List} of a given type. This method requires an
//     * encoder (to convert a JVM object of type `T` to and from the internal Spark SQL representation)
//     * that is generally created automatically through implicits from a `SparkSession`, or can be
//     * created explicitly by calling static methods on {@link Encoders}.
//     *
//     * == Java Example ==
//     *
//     * @example
//     *     List<String> data = Arrays.asList("hello", "world");
//     *     Dataset<String> ds = spark.createDataset(data, Encoders.STRING());
//     *
//     *
//     * @since EclairJS 0.6 Spark  2.0.0
//     * @param {[]} data
//     * @returns {module:eclairjs/sql.Dataset}
//     */
//    SparkSession.prototype.createDataset2 = function(data) {
//    throw "not implemented by ElairJS";
//    //   var javaObject =  this.getJavaObject().createDataset(data);
//    //   return new Dataset(javaObject);
//    };
    

    
    /**
     * :: Experimental ::
     * Creates a [[Dataset]] with a single {@link LongType} column named `id`, containing elements
     * in a range from `start` to `end` (exclusive) with a step value, with partition number
     * specified.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#range
     * @param {string} tableName
     * @param {number} start
     * @param {number} end
     * @param {number} [step]
     * @param {number} [numPartitions]
     * @returns {module:eclairjs/sql.Dataset} 
     */
/*
    SparkSession.prototype.range3 = function(start,end,step,numPartitions) {
    throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().range(start,end,step,numPartitions);
//       return Utils.javaToJs(javaObject);
    };
*/

    
    /**
     * Returns the specified table as a {@link DataFrame}.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#table
     * @param {string} tableName
     * @returns {DataFrame} 
     */
/*
    SparkSession.prototype.table = function(tableName) {
       var javaObject =  this.getJavaObject().table(tableName);
       return Utils.javaToJs(javaObject);
    };
*/

    
    /**
     * Executes a SQL query using Spark, returning the result as a {@link DataFrame}.
     * The dialect that is used for SQL parsing can be configured with 'spark.sql.dialect'.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#sql
     * @param {string} sqlText
     * @returns {DataFrame} 
     */
/*
    SparkSession.prototype.sql = function(sqlText) {
       var javaObject =  this.getJavaObject().sql(sqlText);
       return Utils.javaToJs(javaObject);

    };
*/

    
    /**
     * Returns a {@link DataFrameReader} that can be used to read non-streaming data in as a
     * {@link DataFrame}.
     * @example 
     *   sparkSession.read.parquet("/path/to/file.parquet")
     *   sparkSession.read.schema(schema).json("/path/to/file.json")
     *  
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#read
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
/*
    SparkSession.prototype.read = function() {
       var javaObject =  this.getJavaObject().read();
       return new DataFrameReader(javaObject);
    };
*/

    
    /**
     * :: Experimental ::
     * Returns a [[DataStreamReader]] that can be used to read streaming data in as a {@link DataFrame}.
     * @example 
     *   sparkSession.readStream.parquet("/path/to/directory/of/parquet/files")
     *   sparkSession.readStream.schema(schema).json("/path/to/directory/of/json/files")
     *  
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#readStream
     * @returns {module:eclairjs/sql/streaming.DataStreamReader}
     */
/*    SparkSession.prototype.readStream = function() {
       var javaObject =  this.getJavaObject().readStream();
       return new DataStreamReader(javaObject);
    };
    */
    
    /**
     * Stop the underlying {@link SparkContext}.
     *
     * @function
     * @name module:eclairjs/sql.SparkSession#stop
     * @since EclairJS 0.6 Spark  2.0.0
     */

    //
    // static methods
    //
    
    
    /**
     * Creates a [[SparkSessionBuilder]] for constructing a {@link SparkSession}.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @static
     * @name module:eclairjs/sql.SparkSession#builder
     * @returns {module:eclairjs/sql.SparkSessionBuilder}
     */

    
    /**
     * Changes the SparkSession that will be returned in this thread and its children when
     * SparkSession.getOrCreate() is called. This can be used to ensure that a given thread receives
     * a SparkSession with an isolated session, instead of the global (first created) context.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @static
     * @name module:eclairjs/sql.SparkSession#setActiveSession
     * @param {module:eclairjs/sql.SparkSession} session
     */

    
    /**
     * Clears the active SparkSession for current thread. Subsequent calls to getOrCreate will
     * return the first created context instead of a thread-local override.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @static
     * @name module:eclairjs/sql.SparkSession#clearActiveSession
     */

    
    /**
     * Sets the default SparkSession that is returned by the builder.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @static
     * @name module:eclairjs/sql.SparkSession#setDefaultSession
     * @param {module:eclairjs/sql.SparkSession} session
     */

    
    /**
     * Clears the default SparkSession that is returned by the builder.
     *
     * @function
     * @static
     * @name module:eclairjs/sql.SparkSession#clearDefaultSession
     * @since EclairJS 0.6 Spark  2.0.0
     */

    module.exports = SparkSession;
})();