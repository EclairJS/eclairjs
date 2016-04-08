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
   // var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
    var DataFrameReader = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrameReader');
    var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');

    /**
     * @constructor
     * @memberof module:sql
     * @classdesc  The entry point for working with structured data (rows and columns) in Spark.
     * Allows the creation of DataFrame objects as well as the execution of SQL queries.
     * @param {SparkContext}
     * @since EclairJS 0.1 Spark  1.0.0
     */
    var SQLContext = function (jsc) {
        this.logger = Logger.getLogger("sql.SQLContext_js");

        this.logger.debug("jsc type = " + jsc);
        var JavaSQLContext = Java.type("org.apache.spark.sql.SQLContext");
        var jvmObj = new JavaSQLContext(Utils.unwrapObject(jsc));
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
     * @param {RDD | object} rowRDD_or_values A RDD of [Rows]{@link Row} or array of arrays that contain values of valid {@link DataTypes}
     * @param {StructType} schema -
     * @returns {DataFrame}
     * @example
     * var df = sqlContext.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema);
     *
     */
    SQLContext.prototype.createDataFrame = function (rowRDD_or_values, schema) {
        var rowRDD_uw;
        if (Array.isArray(rowRDD_or_values)) {
            //var rows = [];
            var rows = new java.util.ArrayList();
            rowRDD_or_values.forEach(function (row) {

                if (Array.isArray(row)) {
                    var rowValues = [];
                    row.forEach(function (value) {
                        rowValues.push(Utils.unwrapObject(value));
                    })
                    rows.add(org.apache.spark.sql.RowFactory.create(rowValues));
                } else {
                    rows.add(Utils.unwrapObject(row)); // should be a Row
                }
            });
            rowRDD_uw = rows;
        } else {
            rowRDD_uw = Utils.unwrapObject(rowRDD_or_values)
        }
        //  var x = this.getJavaObject().createDataFrame(rowRDD_uw, Utils.unwrapObject(schema));
        var x = this.getJavaObject().createDataFrame(Utils.unwrapObject(rowRDD_uw), Utils.unwrapObject(schema));
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(x);
    };


    /**
     * Convert a [[BaseRelation]] created for external data sources into a {@link DataFrame}.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @returns {DataFrame}
     * @private
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
     * @returns {DataFrameReader}
     */
    SQLContext.prototype.read = function () {
        return new DataFrameReader(this.getJavaObject().read());
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
     * @returns {DataFrame}
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
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(javaObject);
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
     * @returns {DataFrame}
     */
    SQLContext.prototype.range = function (start, end, step, numPartitions) {
        var javaObject;
        if (start && end && step && numPartitions) {
            javaObject = this.getJavaObject().range(start, end, step, numPartitions);
        } else {
            javaObject = this.getJavaObject().range(start, end);
        }
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(javaObject);
    }


    /**
     * Executes a SQL query using Spark, returning the result as a {@link DataFrame}. The dialect that is
     * used for SQL parsing can be configured with 'spark.sql.dialect'.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} sqlText
     * @returns {DataFrame}
     */
    SQLContext.prototype.sql = function (sqlText) {
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(this.getJavaObject().sql(sqlText));
    };

    /**
     * Returns the specified table as a {@link DataFrame}.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} tableName
     * @returns {DataFrame}
     */
    SQLContext.prototype.table = function (tableName) {
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(this.getJavaObject().table(tableName));
    };


    /**
     * Returns a {@link DataFrame} containing names of existing tables in the database.
     * The returned DataFrame has two columns, tableName and isTemporary (a Boolean
     * indicating if a table is a temporary one or not).
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} [databaseName] if not specified the current database is used.
     * @returns {DataFrame}
     */
    SQLContext.prototype.tables = function (databaseName) {
        var javaObject;
        if (databaseName) {
            javaObject = this.getJavaObject().tables(databaseName);
        } else {
            javaObject = this.getJavaObject().tables();
        }
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(javaObject);
    };


    /**
     * Returns the names of tables in the database as an array.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} [databaseName] if not specified the current database is used.
     * @returns {string[]}
     */
    SQLContext.prototype.tableNames = function (databaseName) {
        var javaObject;
        if (databaseName) {
            javaObject = this.getJavaObject().tableNames(databaseName);
        } else {
            javaObject = this.getJavaObject().tableNames();
        }
        var DataFrame = require(EclairJS_Globals.NAMESPACE + '/sql/DataFrame');
        return new DataFrame(javaObject);
    };
    /**
     * Returns the SparkContext
     *
     * @since EclairJS 0.1
     * @returns {SparkContext}
     */
    SQLContext.prototype.sparkContext = function () {
        var javaObject;
        javaObject = this.getJavaObject().sparkContext();

        return new SparkContext(javaObject);
    };

    /**
     * Returns a SQLContext as new session, with separated SQL configurations, temporary tables,
     * registered functions, but sharing the same SparkContext, CacheManager, SQLListener and SQLTab.
     *
     * @since EclairJS 0.1 Spark  1.6.0
     * @returns {SQLContext}
     */
    SQLContext.prototype.newSession = function () {
        var javaObject = this.getJavaObject().newSession();
        return new SQLContext(javaObject);
    };


//
// static methods
//


    /**
     * Get the singleton SQLContext if it exists or create a new one using the given SparkContext.
     * This function can be used to create a singleton SQLContext object that can be shared across
     * the JVM.
     * @param {SparkContext}
     * @returns {SQLContext}
     */
    SQLContext.getOrCreate = function (sparkContext) {
        var sparkContext_uw = Utils.unwrapObject(sparkContext);
        var javaObject = this.getJavaObject().getOrCreate(sparkContext_uw);
        return new SQLContext(javaObject);
    };

    /**
     * @constructor
     * @classdesc
     */
    SQLContext.QueryExecution = function (jvmObj) {
        JavaWrapper.call(this, jvmObj);

        // Initialize our Row-specific properties
        this.logger = Logger.getLogger("sql.SQLContext.QueryExecution_js");
    };

    SQLContext.QueryExecution.prototype = Object.create(JavaWrapper.prototype);

    SQLContext.QueryExecution.prototype.constructor = SQLContext.QueryExecution;

    /*
     * @returns {LogicalPlan} sql.catalyst.plans.logical.LogicalPlan
     * @private
     */
    SQLContext.QueryExecution.prototype.logical = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().logical();
    };
    /**
     * assertAnalyzed
     */
    SQLContext.QueryExecution.prototype.assertAnalyzed = function () {
        this.getJavaObject().assertAnalyzed();
    };
    /**
     * @returns {LogicalPlan} org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
     * @private
     */
    SQLContext.QueryExecution.prototype.analyzed = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().analyzed();
    };
    /**
     * @returns {LogicalPlan} org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
     * @private
     */
    SQLContext.QueryExecution.prototype.withCachedData = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().withCachedData();
    };
    /**
     * @returns {LogicalPlan} org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
     * @private
     */
    SQLContext.QueryExecution.prototype.optimizedPlan = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().optimizedPlan();
    };
    /**
     * @returns {SparkPlan} org.apache.spark.sql.execution.SparkPlan
     * @private
     */
    SQLContext.QueryExecution.prototype.sparkPlan = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().sparkPlan();
    };
    /**
     * @returns {SparkPlan} org.apache.spark.sql.execution.SparkPlan
     * @private
     */
    SQLContext.QueryExecution.prototype.executedPlan = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().executedPlan();
    };
    /**
     * @returns {RDD} RDD<org.apache.spark.sql.catalyst.InternalRow>
     * @private
     */
    SQLContext.QueryExecution.prototype.toRdd = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().toRdd();
    };
    /**
     * @returns {string}
     */
    SQLContext.QueryExecution.prototype.simpleString = function () {
        return this.getJavaObject().simpleString();
    };
    /**
     * @returns {string}
     */
    SQLContext.QueryExecution.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    /**
     * @constructor
     * @classdesc
     */
    SQLContext.SparkPlanner = function (jvmObj) {
        JavaWrapper.call(this, jvmObj);

        // Initialize our Row-specific properties
        this.logger = Logger.getLogger("sql.SQLContext.SparkPlanner_js");
    };

    SQLContext.SparkPlanner.prototype = Object.create(JavaWrapper.prototype);

    SQLContext.SparkPlanner.prototype.constructor = SQLContext.SparkPlanner;

    /**
     * @returns {SparkContext}
     */
    SQLContext.SparkPlanner.prototype.sparkContext = function () {
        return new SparkContext(this.getJavaObject().sparkContext());
    };
    /**
     * @returns {SQLContext}
     */
    SQLContext.SparkPlanner.prototype.sqlContext = function () {
        return new SQLContext(this.getJavaObject().sqlContext());
    };
    /**
     * @returns {boolean}
     */
    SQLContext.SparkPlanner.prototype.codegenEnabled = function () {
        return this.getJavaObject().codegenEnabled();
    };
    /**
     * @returns {boolean}
     */
    SQLContext.SparkPlanner.prototype.unsafeEnabled = function () {
        return this.getJavaObject().unsafeEnabled();
    };
    /**
     * @returns {integer}
     */
    SQLContext.SparkPlanner.prototype.numPartitions = function () {
        return this.getJavaObject().numPartitions();
    };
    /**
     * @returns {GenericStrategy} scala.collection.Seq<org.apache.spark.sql.catalyst.planning.GenericStrategy<org.apache.spark.sql.execution.SparkPlan>>
     * @private
     */
    SQLContext.SparkPlanner.prototype.strategies = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().strategies();
    };
    /**
     * @returns {SparkPlan} org.apache.spark.sql.execution.SparkPlan
     * @private
     */
    SQLContext.SparkPlanner.prototype.pruneFilterProject = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().pruneFilterProject();
    };

    /**
     * @constructor
     * @classdesc
     */
    SQLContext.SQLSession = function (jvmObj) {
        JavaWrapper.call(this, jvmObj);

        // Initialize our Row-specific properties
        this.logger = Logger.getLogger("sql.SQLContext.SparkPlanner_js");
    };

    SQLContext.SQLSession.prototype = Object.create(JavaWrapper.prototype);

    SQLContext.SQLSession.prototype.constructor = SQLContext.SQLSession;

    /**
     * @returns {SQLConf}
     * @private
     */
    SQLContext.SQLSession.prototype.conf = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().conf();
    };


    /**
     * Changes the SQLContext that will be returned in this thread and its children when
     * SQLContext.getOrCreate() is called. This can be used to ensure that a given thread receives
     * a SQLContext with an isolated session, instead of the global (first created) context.
     *
     * @since EclairJS 0.1 Spark  1.6.0
     * @param {SQLContext} sqlContext
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