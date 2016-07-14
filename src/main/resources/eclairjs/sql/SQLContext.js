/*
 * Copyright 2015 IBM Corp.
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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var logger = Logger.getLogger("sql.SQLContext_js");

    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdesc  The entry point for working with structured data (rows and columns) in Spark.
     * Allows the creation of DataFrame objects as well as the execution of SQL queries.
     * @param {module:eclairjs.SparkContext} sparkContext
     * @since EclairJS 0.1 Spark  1.0.0
     */
    var SQLContext = function (sc) {

       // logger.debug("jsc type = " + sc);
        var jvmObj;
        if (sc instanceof org.apache.spark.sql.SQLContext) {
            jvmObj = sc;
        } else {
            jvmObj =  new org.apache.spark.sql.SQLContext(Utils.unwrapObject(sc));
        }
        JavaWrapper.call(this, jvmObj);
    }

//Create a SQLContext.prototype object that inherits from JavaWrapper.prototype.

    SQLContext.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to SQLContext
    SQLContext.prototype.constructor = SQLContext;

    /**
     * Set Spark SQL configuration properties.
     * @param {string | object} prop if string sets the property with the value.
     * If object properties are set using the object properties as the keys and the object property value as the value.
     * @parma {string} value if prop is a string value then a value is required, if prop is object this argument is ignored
     * @example
     * sqlContext.setConf("dog", "Golden Retriever");
     * var map = {"dog": "Golden Retriever", "age": "> 3"};
     * sqlContext.setConf(map);
     * @since EclairJS 0.1 Spark  1.0.0
     */

    SQLContext.prototype.setConf = function () {
        var args = Array.prototype.slice.call(arguments);
        var props = args[0];
        if (args.length == 2) {
            //
            props = {};
            props[args[0]] = args[1];
        }
        for (var key in props) {
            this.getJavaObject().setConf(key, props[key]);
        }
    };


    /**
     * Return the value of Spark SQL configuration property for the given key. If the key is not set
     * yet, return `defaultValue`.
     *
     * @since EclairJS 0.1 Spark  1.0.0
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {string}
     */
    SQLContext.prototype.getConf = function (key, defaultValue) {
        if (defaultValue) {
            return this.getJavaObject().getConf(key, defaultValue);
        } else {
            return this.getJavaObject().getConf(key);
        }

    };

    /**
     * Return all the configuration properties that have been set (i.e. not the default).
     * This creates a new copy of the config properties in the form of a map.
     *
     * @since EclairJS 0.1 Spark  1.0.0
     * @returns {object} map of the key value pairs
     */
    SQLContext.prototype.getAllConfs = function () {
        var javaObject = this.getJavaObject().getAllConfs();
        /*
         * javaObject is a scala.collection.immutable.Map<java.lang.String,java.lang.String>
         * so we can process it using string functions.
         *
         */
        var propStr = javaObject.mkString("{mapSplitHere}");
        var props = propStr.split("{mapSplitHere}");
        var map = {};
        props.forEach(function (keyValueStr) {
            var kv = keyValueStr.split(" -> ");
            map[kv[0]] = kv[1];
        });
        return map;
    };


    /**
     * Returns true if the table is currently cached in-memory.
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} tableName
     * @returns {boolean}
     */
    SQLContext.prototype.isCached = function (tableName) {
        return this.getJavaObject().isCached(tableName);
    };


    /**
     * Caches the specified table in-memory.
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} tableName
     */
    SQLContext.prototype.cacheTable = function (tableName) {
        this.getJavaObject().cacheTable(tableName);
    };


    /**
     * Removes the specified table from the in-memory cache.
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} tableName
     */
    SQLContext.prototype.uncacheTable = function (tableName) {
        this.getJavaObject().uncacheTable(tableName);
    }


    /**
     * Removes all cached tables from the in-memory cache.
     * @since EclairJS 0.1 Spark  1.3.0
     */
    SQLContext.prototype.clearCache = function () {
        this.getJavaObject().clearCache();
    }


    /**
     * Creates a {@link DataFrame} from {@link RDD} of Rows using the schema
     * @param {module:eclairjs.RDD<module:eclairjs/sql.Row> | module:eclairjs/sql.Row[]} rowRDD_or_values A RDD of [Rows]{@link Row} or array of arrays that contain values of valid {@link DataTypes}
     * @param {module:eclairjs/sql/types.StructType} schema -
     * @returns {module:eclairjs/sql.DataFrame}
     * @example
     * var df = sqlContext.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema);
     *
     */
    SQLContext.prototype.createDataFrame = function (rowRDD_or_values, schema) {

        function castDataType(x, dt){
            /*
             Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects,
             depending on the computation performed.
             JavaScript numbers are not always converted to the correct Java type. So we need to force all the number types in the
             row to be matched to the type specified in the schema
             */
            if ((x instanceof java.lang.Integer) &&  (dt.getJavaObject() instanceof org.apache.spark.sql.types.DoubleType)) {
                return x.doubleValue();
            } else if ((x instanceof java.lang.Integer) &&  (dt.getJavaObject() instanceof org.apache.spark.sql.types.FloatType)) {
                return x.floatValue();
            } else if ((x instanceof java.lang.Double) &&  (dt.getJavaObject() instanceof org.apache.spark.sql.types.IntegerType)) {
                return x.intValue();
            } else if ((x instanceof java.lang.Double) &&  (dt.getJavaObject() instanceof org.apache.spark.sql.types.FloatType)) {
                return x.floatValue();
            } else if (dt.getJavaObject() instanceof org.apache.spark.sql.types.ArrayType) {
                var elmDt = dt.elementType();
                var elements =[];
                x.forEach(function(elem){
                    elements.push(castDataType(elem, elmDt))
                })
                return Serialize.jsToJava(elements);
            } else {
                return Utils.unwrapObject(x);
            }
        }

        var DoubleType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DoubleType');
        var rowRDD_uw;
        var schema_uw = Utils.unwrapObject(schema);
        var fields = schema.fields();
        if (Array.isArray(rowRDD_or_values)) {
            var rows = new java.util.ArrayList();
            rowRDD_or_values.forEach(function (row) {

                if (Array.isArray(row)) {
                    var rowValues = [];
                    for (var i = 0; i < row.length; i++) {
                        var x = row[i];
                        var dt = fields[i].dataType();
                        rowValues.push(castDataType(x, dt));
                    }
                    rows.add(org.apache.spark.sql.RowFactory.create(rowValues));
                } else {

                    var v = [];
                    for (var i = 0; i < row.length(); i++) {
                        var x = row.get(i);
                        var dt = fields[i].dataType();
                        v.push(castDataType(x, dt));
                    }
                    rows.add(org.apache.spark.sql.RowFactory.create(v));
                }
            });
            rowRDD_uw = rows;
        } else {
            rowRDD_uw = Utils.unwrapObject(rowRDD_or_values);
            /*
            Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed.
            JavaScript numbers are not always converted to the correct Java type. So we will use the Java function with
            RDD.map to force them to the correct java type based on the schema provided.
            NOTE: so far this seems to have only been an issue with number in RDD<Row> not when passed and Array. If we start seeing
            the same issue when passed an Array we may need to do something similar in the if clause.
             */
            var rdd_mapped = rowRDD_uw.map(new org.eclairjs.nashorn.sql.SqlContextCreateDataFrameFunction(schema_uw));
            rowRDD_uw = rdd_mapped;
        }

        var x = this.getJavaObject().createDataFrame(Utils.unwrapObject(rowRDD_uw), Utils.unwrapObject(schema));
        return Utils.javaToJs(x);
    };



    /**
     * Creates a {@link DataFrame} from RDD of JSON
     * @param {{module:eclairjs.RDD<object>}    RDD of JSON
     * @param {object} schema - object with keys corresponding to JSON field names (or getter functions), and values indicating Datatype
     * @returns {module:eclairjs/sql.DataFrame}
     * @example
     * var df = sqlContext.createDataFrame([{id:1,"name":"jim"},{id:2,"name":"tom"}], {"id":"Integer","name","String"});
     *
     */
    SQLContext.prototype.createDataFrameFromJson = function (jsonRDD, schemaJson) {
        var StructType = require('eclairjs/sql/types/StructType');
        var StructField = require('eclairjs/sql/types/StructField');
        var DataTypes = require('eclairjs/sql/types').DataTypes;
        var RowFactory = require('eclairjs/sql/RowFactory');


        var fields = [];
        var fieldNames = [];

        for (var prop in schemaJson)
        {
          var type=schemaJson[prop];
           var schemaType;
          if (type==="String")
            schemaType=DataTypes.StringType;
          else if (type==="Integer")
            schemaType=DataTypes.IntegerType;
          else if (type==="Boolean")
            schemaType=DataTypes.BooleanType;
          else if (type==="Double")
            schemaType=DataTypes.DoubleType;
          else if (type==="Array")
            schemaType=DataTypes.ArrayType;
          else if (type && typeof type == 'object' && type.getJavaObject)
            schemaType=type;

          fields.push(DataTypes.createStructField(prop, schemaType, true));
          fieldNames.push(prop);
        }
        var schema = DataTypes.createStructType(fields);
        // Convert records of the RDD (people) to Rows.

        var rowRDD = jsonRDD.map(function(obj, RowFactory,fieldNames){

           var values=[];
           for (var i=0;i<fieldNames.length;i++)
           {
             var value;
             var name=fieldNames[i];
             if (obj.hasOwnProperty(name))
             {
                 var value = obj[name]
                 //   if it is getter function, call to get value
                 if (typeof value == "function")
                 {
                   value=value.apply(obj);
                 }

             }
             else
             {
                name="get" + name.charAt(0).toUpperCase() + name.substr(1);
                 var value = obj[name]
                 //   if it is getter function, call to get value
                 if (typeof value == "function")
                 {
                   value=value.apply(obj);
                 }
             }
             values.push(value);
           }
          return RowFactory.create(values);
        },[RowFactory,fieldNames]);


        return this.createDataFrame(rowRDD, schema);
    };

    /**
     * Convert a [[BaseRelation]] created for external data sources into a {@link DataFrame}.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @returns {module:eclairjs/sql.DataFrame}
     * @private
     * @ignore
     */
    SQLContext.prototype.baseRelationToDataFrame = function (baseRelation) {
        throw "not implemented by ElairJS";
//   var baseRelation_uw = Utils.unwrapObject(baseRelation);
//   var javaObject =  this.getJavaObject().baseRelationToDataFrame(baseRelation_uw);
//   return new DataFrame(javaObject);
    }


    /**
     * :: Experimental ::
     * Returns a [[DataFrameReader]] that can be used to read data in as a {@link DataFrame}.
     * @example
     *   sqlContext.read.parquet("/path/to/file.parquet")
     *   sqlContext.read.schema(schema).json("/path/to/file.json")
     *
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
    SQLContext.prototype.read = function () {
        return Utils.javaToJs(this.getJavaObject().read());
    };


    /**
     * :: Experimental ::
     * Creates an external table from the given path and returns the corresponding DataFrame.
     * It will use the default data source configured by spark.sql.sources.default.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} tableName
     * @param {string} path
     * @param {string} [source] Creates an external table from the given path based on a data source
     * @param {object} [map] of options (key, value), if specified path is ignored.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SQLContext.prototype.createExternalTable = function (tableName, path, source, options, schema) {
        var javaObject;
        if (tableName && path && !source && !options && !schema) {
            javaObject = this.getJavaObject().createExternalTable(tableName, path);
        } else if (tableName && path && source && !options && !schema) {
            javaObject = this.getJavaObject().createExternalTable(tableName, path, source);
        } else if (tableName && source && options && !schema) {
            var options_uw = Utils.createJavaHashMap(options);
            javaObject = this.getJavaObject().createExternalTable(tableName, source, options_uw);
        } else if (tableName && source && options && schema) {
            var options_uw = Utils.createJavaHashMap(options);
            var schema_uw = Utils.unwrapObject(schema);
            javaObject = this.getJavaObject().createExternalTable(tableName, source, schema_uw, options_uw);
        }
        return Utils.javaToJs(javaObject);
    };


    /**
     * Drops the temporary table with the given table name in the catalog. If the table has been
     * cached/persisted before, it's also unpersisted.
     *
     * @param {string} tableName  the name of the table to be unregistered.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     */
    SQLContext.prototype.dropTempTable = function (tableName) {
        this.getJavaObject().dropTempTable(tableName);
    }


    /**
     * :: Experimental ::
     * Creates a [[DataFrame]] with a single {@link LongType} column named `id`, containing elements
     * in an range from 0 to `end` (exclusive) with step value 1.
     *
     * @since EclairJS 0.1 Spark  1.4.1
     * @param {integer} start
     * @param {integer} end
     * @param {integer} [step] defaults to 1
     * @param {integer} [numPartitions]
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SQLContext.prototype.range = function (start, end, step, numPartitions) {
        var javaObject;
        if (start && end && step && numPartitions) {
            javaObject = this.getJavaObject().range(start, end, step, numPartitions);
        } else {
            javaObject = this.getJavaObject().range(start, end);
        }
        return Utils.javaToJs(javaObject);
    }


    /**
     * Executes a SQL query using Spark, returning the result as a {@link DataFrame}. The dialect that is
     * used for SQL parsing can be configured with 'spark.sql.dialect'.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} sqlText
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SQLContext.prototype.sql = function (sqlText) {
        return Utils.javaToJs(this.getJavaObject().sql(sqlText));
    };

    /**
     * Returns the specified table as a {@link DataFrame}.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} tableName
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SQLContext.prototype.table = function (tableName) {
        return Utils.javaToJs(this.getJavaObject().table(tableName));
    };


    /**
     * Returns a {@link DataFrame} containing names of existing tables in the database.
     * The returned DataFrame has two columns, tableName and isTemporary (a Boolean
     * indicating if a table is a temporary one or not).
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} [databaseName] if not specified the current database is used.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SQLContext.prototype.tables = function (databaseName) {
        var javaObject;
        if (databaseName) {
            javaObject = this.getJavaObject().tables(databaseName);
        } else {
            javaObject = this.getJavaObject().tables();
        }
        return Utils.javaToJs(javaObject);
    };


    /**
     * Returns the names of tables in the database as an array.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} [databaseName] if not specified the current database is used.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SQLContext.prototype.tableNames = function (databaseName) {
        var javaObject;
        if (databaseName) {
            javaObject = this.getJavaObject().tableNames(databaseName);
        } else {
            javaObject = this.getJavaObject().tableNames();
        }
        return Utils.javaToJs(javaObject);
    };
    /**
     * Returns the SparkContext
     *
     * @since EclairJS 0.1
     * @returns {module:eclairjs.SparkContext}
     */
    SQLContext.prototype.sparkContext = function () {
        var javaObject;
        javaObject = this.getJavaObject().sparkContext();

        return Utils.javaToJs(javaObject);
    };

    /**
     * Returns a SQLContext as new session, with separated SQL configurations, temporary tables,
     * registered functions, but sharing the same SparkContext, CacheManager, SQLListener and SQLTab.
     *
     * @since EclairJS 0.1 Spark  1.6.0
     * @returns {module:eclairjs/sql.SQLContext}
     */
    SQLContext.prototype.newSession = function () {
        var javaObject = this.getJavaObject().newSession();
        return new SQLContext(javaObject);
    };

    /**
     * A methods for registering user-defined functions (UDF).
     * @example
     * sqlContext.udf().register("udfTest", function(col1, ...col22) {
     *       return col1 + ...col22;
     * }, DataTypes.StringType);
     * var smt = "SELECT *, udfTest(mytable.col1,...mytable.col22) as transformedByUDF FROM mytable";
     * var result = sqlContext.sql(smt).collect();
     * @returns {module:eclairjs/sql.UDFRegistration}
     */
    SQLContext.prototype.udf = function () {
        var javaObject = this.getJavaObject().udf();
        var udfr = Utils.javaToJs(javaObject);
        udfr.sparkContext(this.sparkContext());
        return  udfr;
    };


//
// static methods
//


    /**
     * Get the singleton SQLContext if it exists or create a new one using the given SparkContext.
     * This function can be used to create a singleton SQLContext object that can be shared across
     * the JVM.
     * @param {module:eclairjs.SparkContext}
     * @returns {module:eclairjs/sql.SQLContext}
     */
    SQLContext.getOrCreate = function (sparkContext) {
        var sparkContext_uw = Utils.unwrapObject(sparkContext);
        var javaObject = this.getJavaObject().getOrCreate(sparkContext_uw);
        return new SQLContext(javaObject);
    };

    /**
     * Changes the SQLContext that will be returned in this thread and its children when
     * SQLContext.getOrCreate() is called. This can be used to ensure that a given thread receives
     * a SQLContext with an isolated session, instead of the global (first created) context.
     *
     * @since EclairJS 0.1 Spark  1.6.0
     * @param {module:eclairjs/sql.SQLContext} sqlContext
     */
    SQLContext.setActive = function (sqlContext) {
        var sqlContext_uw = Utils.unwrapObject(sqlContext);
        org.apache.spark.sql.SQLContext.setActive(sqlContext_uw);
    };


    /**
     * Clears the active SQLContext for current thread. Subsequent calls to getOrCreate will
     * return the first created context instead of a thread-local override.
     *
     * @since EclairJS 0.1 Spark  1.6.0
     */
    SQLContext.clearActive = function () {
        org.apache.spark.sql.SQLContext.clearActive();
    };

    module.exports = SQLContext;

})();