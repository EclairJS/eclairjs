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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

	  var Column = require(EclairJS_Globals.NAMESPACE + '/sql/Column');
     var logger = Logger.getLogger("sql.Dataset_js");

	/**
	 * @constructor
     * @memberof module:eclairjs/sql
	 * @classdesc A distributed collection of data organized into named columns. A Dataset is equivalent to a relational table in Spark SQL.
	 * @example
	 * var people = sqlContext.read.parquet("...")
	 * @example
	 * // Once created, it can be manipulated using the various domain-specific-language (DSL) functions defined in:
	 * // Dataset (this class), Column, and functions.
	 * // To select a column from the data frame:
	 * var ageCol = people("age")
	 */
	 var Dataset = function (jvmDataset) {
        logger.debug("constructor");
		JavaWrapper.call(this, jvmDataset);

		// Initialize our Row-specific properties

	};

	Dataset.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to Dataset
	Dataset.prototype.constructor = Dataset;

	/**
	 * aggregates on the entire Dataset without groups.
	 * @example
	 * // df.agg(...) is a shorthand for df.groupBy().agg(...)
	 * var map = {};
	 * map["age"] = "max";
	 * map["salary"] = "avg";
	 * df.agg(map)
	 * df.groupBy().agg(map)
	 * @param {hashMap} - hashMap<String,String> exprs
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.agg = function (hashMap) {

		return Utils.javaToJs(this.getJavaObject().agg(hashMap));

	};
	/**
	 * Returns a new Dataset with an alias set.
	 * @param {string} alias
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.as = function (alias) {
		return Utils.javaToJs(this.getJavaObject().as(Utils.unwrapObject(alias)));
	};
	/**
	 * Selects column based on the column name and return it as a Column.
	 * Note that the column name can also reference to a nested column like a.b.
	 * @param {string} colName
	 * @returns {module:eclairjs/sql.Column}
	 */
	Dataset.prototype.apply = function (colName) {
		return Utils.javaToJs(this.getJavaObject().apply(colName));
	};
	/**
	 * Persist this Dataset with the default storage level (`MEMORY_ONLY`).
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.cache = function () {
		return Utils.javaToJs(this.getJavaObject().cache());
	};
	/**
	 * Returns a new Dataset that has exactly numPartitions partitions.
	 * Similar to coalesce defined on an RDD, this operation results in a narrow dependency,
	 * e.g. if you go from 1000 partitions to 100 partitions, there will not be a shuffle,
	 * instead each of the 100 new partitions will claim 10 of the current partitions.
	 * @param {integer} numPartitions
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.coalesce = function (numPartitions) {
		return Utils.javaToJs(this.getJavaObject().coalesce());
	};
	/**
	 * Selects column based on the column name and return it as a Column.
	 * @param {string} name
	 * @returns {module:eclairjs/sql.Column}
	 */
	Dataset.prototype.col = function (name) {
		return Utils.javaToJs(this.getJavaObject().col(name));
	};
	/**
	 * Returns an array that contains all of Rows in this Dataset.
	 * @returns {module:eclairjs/sql.Row[]}
	 */
	Dataset.prototype.collect = function () {
		var jRows = this.getJavaObject().collect();
		var rows = [];
		for (var i = 0; i < jRows.length; i++) {
			//rows.push(Utils.javaToJs(jRows[i]));
			rows.push(org.eclairjs.nashorn.Utils.javaToJs(jRows[i], org.eclairjs.nashorn.NashornEngineSingleton.getEngine()));
		}
		return rows;
	};
	/**
	 * Returns all column names as an array.
	 * @returns {string[]}
	 */
	Dataset.prototype.columns = function () {
		var x = this.getJavaObject().columns();
		var s = [];
		for (var i = 0; i < x.length; i++) {
			s.push(x[i]);
		}
		return s;
	};
	/**
	 * Returns the number of rows in the Dataset.
	 * @returns {integer}
	 */
	Dataset.prototype.count = function () {
		return this.getJavaObject().count();
	};
	/**
	 * Create a multi-dimensional cube for the current Dataset using the specified columns, so we can run aggregation on them.
	 * @param {string| Column} cols...
	 * @example
	 * var df = peopleDataset.cube("age", "expense");
	 * @returns {module:eclairjs/sql.GroupedData}
	 */
	Dataset.prototype.cube = function () {

		var args = Array.prototype.slice.call(arguments);
		if (typeof args[0] !== 'object')
			args = args.map(function (v) {
				return this.col(v);
			}.bind(this));

		var jCols = args.map(function (v) {
			return Utils.unwrapObject(v);
		});
        //var GroupedData = require('sql/GroupedData');
		return Utils.javaToJs(this.getJavaObject().cube(jCols));
	};
	/**
	 * Computes statistics for numeric columns, including count, mean, stddev, min, and max.
	 * If no columns are given, this function computes statistics for all numerical columns.
	 * This function is meant for exploratory data analysis, as we make no guarantee about the backward
	 * compatibility of the schema of the resulting Dataset. If you want to programmatically compute
	 * summary statistics, use the agg function instead.
	 * @param {string} cols....
	 * @example
	 * var df = peopleDataset.describe("age", "expense");
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.describe = function () {
		var args = Array.prototype.slice.call(arguments);
		return Utils.javaToJs(this.getJavaObject().describe(args));
	};
	/**
	 * Returns a new Dataset that contains only the unique rows from this Dataset. This is an alias for dropDuplicates.
	 */
	Dataset.prototype.distinct = function () {
		return this.dropDuplicates();
	};
	/**
	 * Returns a new Dataset with a column dropped.
	 * @param {string | module:eclairjs/sql.Column} col
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.drop = function (col) {
		return new Dataset(this.getJavaObject().drop(Utils.unwrapObject(col)));
	};
	/**
	 * Returns a new Dataset that contains only the unique rows from this Dataset, if colNames then considering only the subset of columns.
	 * @param {string[]} colNames
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.dropDuplicates = function (colNames) {
		if (!colNames) {
			return Utils.javaToJs(this.getJavaObject().dropDuplicates());
		} else {
			return Utils.javaToJs(this.getJavaObject().dropDuplicates(colNames));
		}

	};
	/**
	 * Returns all column names and their data types as an array of arrays. ex. [["name","StringType"],["age","IntegerType"],["expense","IntegerType"]]
	 * @returns {Array} Array of Array[2]
	 */
	Dataset.prototype.dtypes = function () {
		var d = this.getJavaObject().dtypes();
		var arrayOfTuple2 = [];
		for (var i = 0; i < d.length; i++) {
			var tuple2 = Utils.javaToJs(d[i]); // convert Tuple2 to array[o1, o2]
			arrayOfTuple2.push(tuple2);
		}

		return arrayOfTuple2;

	};
	/**
	 * Returns a new Dataset containing rows in this frame but not in another frame. This is equivalent to EXCEPT in SQL.
	 * @param {module:eclairjs/sql.Dataset} otherDataset to compare to this Dataset
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.except = function (otherDataset) {
		return Utils.javaToJs(this.getJavaObject().except(Utils.unwrapObject(otherDataset)));
	};
	/**
	 * Prints the plans (logical and physical) to the console for debugging purposes.
	 * @parma {boolean} if false prints the physical plans only.
	 */
	Dataset.prototype.explain = function (extended) {
		var b = (extended) ? true : false;
		this.getJavaObject().explain(b);
	};
	/**
	 * Filters rows using the given SQL expression string or Filters rows using the given Column..
	 * @param {string | module:eclairjs/sql.Column}
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.filter = function (arg) {
		if (typeof arg === 'object')
			return this.filterWithColumn(arguments[0]);
		else
			return this.filterWithString(arguments[0]);
	};
	/**
	 * Filters rows using the given Column
	 * @param {module:eclairjs/sql.Column} col
	 * @returns {module:eclairjs/sql.Dataset}
	 * @private
	 */
	Dataset.prototype.filterWithColumn = function (col) {
		return Utils.javaToJs(this.getJavaObject().filter(Utils.unwrapObject(col)));
	};
	/**
	 * Filters rows using the given SQL expression string
	 * @param {string} columnExpr
	 * @returns {module:eclairjs/sql.Dataset}
	 * @private
	 */
	Dataset.prototype.filterWithString = function (columnExpr) {
		return Utils.javaToJs(this.getJavaObject().filter(columnExpr));
	};
	/**
	 * Returns the first row. Alias for head().
	 * returns {module:eclairjs/sql.Row}
	 */
	Dataset.prototype.first = function () {
		return this.head();
	};
	/**
	 * Returns a new RDD by first applying a function to all rows of this Dataset, and then flattening the results.
	 * @param {function} func
	 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
	 * @returns {module:eclairjs.RDD}
	 */
	Dataset.prototype.flatMap = function (func, encoder, bindArgs) {
		//return this.toRDD().flatMap(func, bindArgs);
        var bindArgs;
        var fn = Utils.createLambdaFunction(func,org.eclairjs.nashorn.JSFlatMapFunction, bindArgs);
        var javaObject =  this.getJavaObject().flatMap(fn, Utils.unwrapObject(encoder));
        return Utils.javaToJs(javaObject);
	};
	/**
	 * Applies a function to all elements of this Dataset.
	 * @example
	 * rdd3.foreach(function(record) {
 *    var connection = createNewConnection()
 *    connection.send(record);	
 *    connection.close()
 * });
	 * @param {function} Function with one parameter
	 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
	 * @returns {void}
	 */
	Dataset.prototype.foreach = function (func, bindArgs) {

		return this.toRDD().foreach(func, bindArgs);
	};
	/**
	 * Applies a function to each partition of this Dataset.
	 * @example
	 * df.foreachPartition(function(partitionOfRecords) {
 *    var connection = createNewConnection()
 *    partitionOfRecords.forEach(function(record){
 *       connection.send(record);	
 *    });
 *    connection.close()
 * });
	 * @param {function} Function with one Array parameter
	 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
	 * @returns {void}
	 */
	Dataset.prototype.foreachPartition = function (func, bindArgs) {

		return this.toRDD().foreachPartition(func, bindArgs);
	};

	/**
	 * Groups the Dataset using the specified columns, so we can run aggregation on them
	 * @param {string[] | module:eclairjs/sql.Column[]} - Array of Column objects of column name strings
	 * @returns {module:eclairjs/sql.RelationalGroupedDataset}
	 */
	Dataset.prototype.groupBy = function () {
		var args = Array.prototype.slice.call(arguments);

		if (typeof args[0] === 'object')
			return this.groupByWithColumns(args);
		else
			return this.groupByWithStrings(args);
	};
	/**
	 * Groups the Dataset using the specified columns, so we can run aggregation on them
	 * @param {module:eclairjs/sql.Columns[]}
	 * @returns {module:eclairjs/sql.GroupedData}
	 * @private
	 */
	Dataset.prototype.groupByWithColumns = function (args) {
		var jCols = args.map(function (v) {
			return Utils.unwrapObject(v);
		});

		var jGroupedData = this.getJavaObject().groupBy(jCols);
		var gd = Utils.javaToJs(jGroupedData);
		return gd;
	};
	/**
	 * Groups the Dataset using the specified columns, so we can run aggregation on them
	 * @param {string[]} columnNames
	 * @returns {module:eclairjs/sql.GroupedData}
	 * @private
	 */
	Dataset.prototype.groupByWithStrings = function (args) {
		var jCols = args.map(function (v) {
			return this.col(v);
		}.bind(this));

		return this.groupByWithColumns(jCols);

	};
	/**
	 * Returns the first row.
	 * @returns {module:eclairjs/sql.Row}
	 */
	Dataset.prototype.head = function () {
		return Utils.javaToJs(this.getJavaObject().head());
	};
	/**
	 * Returns a best-effort snapshot of the files that compose this Dataset. This method simply asks each constituent
	 * BaseRelation for its respective files and takes the union of all results. Depending on the source relations,
	 * this may not find all input files. Duplicates are removed.
	 * @returns {string[]} files
	 */
	Dataset.prototype.inputFiles = function () {
		var files = this.getJavaObject().inputFiles();
		var retFiles = [];
		for (var i = 0; i < files.length; i++) {
			retFiles.push(files[i]);
		}
		return retFiles;
	};
	/**
	 * Returns a new Dataset containing rows only in both this frame and another frame. This is equivalent to INTERSECT in SQL
	 * @param {module:eclairjs/sql.Dataset} other
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.intersect = function (other) {
		return Utils.javaToJs(this.getJavaObject().intersect(Utils.unwrapObject(other)));
	};
	/**
	 * Returns true if the collect and take methods can be run locally (without any Spark executors).
	 * @returns {boolean}
	 */
	Dataset.prototype.isLocal = function () {
		return this.getJavaObject().isLocal();
	};
	/**
	 * Cartesian join with another Dataset. Note that cartesian joins are very expensive without an extra filter that can be pushed down.
	 * @param {module:eclairjs/sql.Dataset} Right side of the join operation.
	 * @param {string | string[] | module:eclairjs/sql.Column} [columnNamesOrJoinExpr] If string or array of strings column names, inner equi-join with another Dataset using the given columns.
	 * Different from other join functions, the join columns will only appear once in the output, i.e. similar to SQL's JOIN USING syntax.
	 * If Column object, joinExprs inner join with another Dataset, using the given join expression.
	 * @param {string} [joinType] only valid if using Column joinExprs.
	 * @returns {module:eclairjs/sql.Dataset}
	 * @example
	 * var joinedDf = df1.join(df2);
	 * // or
	 * var joinedDf = df1.join(df2,"age");
	 * // or
	 * var joinedDf = df1.join(df2, ["age", "DOB"]);
	 * // or Column joinExpr
	 * var joinedDf = df1.join(df2, df1.col("name").equalTo(df2.col("name")));
	 * // or Column joinExpr
	 * var joinedDf = df1.join(df2, df1.col("name").equalTo(df2.col("name")), "outer");
	 */
	Dataset.prototype.join = function (right, usingColumns, joinType) {
		var result;
		if (usingColumns) {
			if (Array.isArray(usingColumns)) {
				var scalaSeq = org.eclairjs.nashorn.Utils.toScalaSeq(usingColumns);
				result = this.getJavaObject().join(Utils.unwrapObject(right), scalaSeq);
			} else if (usingColumns instanceof Column) {
				var jType = !joinType ? "inner" : joinType;
				result = this.getJavaObject().join(Utils.unwrapObject(right), Utils.unwrapObject(usingColumns), jType);
			} else {
				result = this.getJavaObject().join(Utils.unwrapObject(right), usingColumns);
			}

		} else {
			result = this.getJavaObject().join(Utils.unwrapObject(right));
		}
		return Utils.javaToJs(result);

	};
	/**
	 * Returns a new Dataset by taking the first n rows. The difference between this function and head is that head
	 * returns an array while limit returns a new Dataset.
	 * @param {integer} number
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.limit = function (number) {

		return Utils.javaToJs(this.getJavaObject().limit(number));
	};
	/**
	 * Returns a new RDD by applying a function to all rows of this Dataset.
	 * @param {function} func
	 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
	 * @returns {module:eclairjs.RDD}
	 */
	Dataset.prototype.map = function (func, bindArgs) {
		return this.toRDD().map(func, bindArgs);
	};
	/**
	 * Return a new RDD by applying a function to each partition of this Dataset.
	 * Similar to map, but runs separately on each partition (block) of the Dataset, so func must accept an Array.
	 * func should return a array rather than a single item.
	 * @param {function}
	 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
	 * @returns {module:eclairjs.RDD}
	 */
	Dataset.prototype.mapPartitions = function (func, bindArgs) {
		return this.toRDD().mapPartitions(func, null, bindArgs);
	};
	/**
	 * Returns a DatasetNaFunctions for working with missing data.
	 * @returns {module:eclairjs/sql.DataframeNaFunctions}

	 */
	Dataset.prototype.na = function () {
		return Utils.javaToJs(this.getJavaObject().na());
	};
	/**
	 * Returns a new Dataset sorted by the specified columns, if columnName is used sorted in ascending order.
	 * This is an alias of the sort function.
	 * @param {string | module:eclairjs/sql.Column} columnName,...columnName or sortExprs,... sortExprs
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.orderBy = function () {
		return this.sort.apply(this, arguments);
	};
	/**
	 * @param {module:eclairjs/storage.StorageLevel} newLevel
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.persist = function (newLevel) {
		var arg = newLevel ? Utils.unwrapObject(newLevel) : null;
		return Utils.javaToJs(this.getJavaObject().persist(arg));
	};
	/**
	 * Prints the schema to the console in a nice tree format.
	 */
	Dataset.prototype.printSchema = function () {
		this.getJavaObject().printSchema();
	};
	/**
	 * @returns {SQLContextQueryExecution}
	 */
	Dataset.prototype.queryExecution = function () {
		return Utils.javaToJs(this.getJavaObject().queryExecution());
	};
	/**
	 * Randomly splits this Dataset with the provided weights.
	 * @param {float[]} weights - weights for splits, will be normalized if they don't sum to 1.
	 * @param {int} seed - Seed for sampling.
	 * @returns {module:eclairjs/sql.Dataset[]}
	 */
	Dataset.prototype.randomSplit = function (weights, seed) {
		var dfs = this.getJavaObject().randomSplit(weights, seed);
		var retDfs = [];
		for (var i = 0; i < dfs.length; i++) {
			retDfs.push(new Dataset(dfs[i]));
		}
		return retDfs;
	};
	/**
	 * Represents the content of the Dataset as an RDD of Rows.
	 * @returns {module:eclairjs.RDD}
	 */
	Dataset.prototype.rdd = function () {
		return this.toRDD();
	};
	/**
	 * Registers this Dataset as a temporary table using the given name.
	 * @param {string} tableName
	 */
	Dataset.prototype.registerTempTable = function (tableName) {
		this.getJavaObject().registerTempTable(tableName);
	};
	/**
	 * Returns a new Dataset that has exactly numPartitions partitions.
	 * @param {integer} numPartitions
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.repartition = function (numPartitions) {
		return Utils.javaToJs(this.getJavaObject().repartition(numPartitions));
	};
	/**
	 * Create a multi-dimensional rollup for the current Dataset using the specified columns,
	 * so we can run aggregation on them. See GroupedData for all the available aggregate functions.
	 * @param {string | module:eclairjs/sql.Column} columnName, .....columnName or sortExprs,... sortExprs
	 * @returns {module:eclairjs/sql.GroupedData}
	 * @example
	 *  var result = peopleDataset.rollup("age", "networth").count();
	 *  // or
	 *  var col = peopleDataset.col("age");
	 *    var result = peopleDataset.rollup(col).count();
	 */
	Dataset.prototype.rollup = function () {

		var columns = [];
		for (var i = 0; i < arguments.length; i++) {
			var o = arguments[i];
			if (typeof o === 'string' || o instanceof String) {
				o = this.col(o);
			}
			columns.push(Utils.unwrapObject(o));
		}
        //var GroupedData = require('sql/GroupedData');
		return Utils.javaToJs(this.getJavaObject().rollup(columns));
	};
	/**
	 * Returns a new Dataset by sampling a fraction of rows, using a random seed.
	 * @param {boolean} withReplacement
	 * @param {float} fraction
	 * @param {integer} [seed]
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.sample = function (withReplacement, fraction, seed) {
		return Utils.javaToJs(this.getJavaObject().sample(withReplacement, fraction, seed));
	};
	/**
	 * Returns the schema of this Dataset.
	 * @returns {module:eclairjs/sql/types.StructType}
	 */
	Dataset.prototype.schema = function () {
		return Utils.javaToJs(this.getJavaObject().schema());
	};
	/**
	 * Selects a set of column based expressions.
	 * @param {module:eclairjs/sql.Column[] | string[]}
	 * @returns  {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.select = function () {
		var args = Array.prototype.slice.call(arguments);

		if (typeof args[0] === 'object')
			return this.selectWithColumns(args);
		else
			return this.selectWithStrings(args);
	};
	/**
	 * Selects a set of SQL expressions. This is a variant of select that accepts SQL expressions.
	 * @param {string} exprs,...exprs
	 * @returns {module:eclairjs/sql.Dataset}
	 * @example
	 * var result = peopleDataset.selectExpr("name", "age > 19");
	 */
	Dataset.prototype.selectExpr = function () {
		var args = Array.prototype.slice.call(arguments);
		return Utils.javaToJs(this.getJavaObject().selectExpr(args));
	};

	/**
	 * Selects a set of column based expressions.
	 * @param {module:eclairjs/sql.Column[]}
	 * @returns {module:eclairjs/sql.Dataset}
	 * @private
	 */
	Dataset.prototype.selectWithColumns = function (args) {
		var jCols = args.map(function (v) {
			return Utils.unwrapObject(v);
		});
		var jdf = this.getJavaObject().select(jCols);
		var df = Utils.javaToJs(jdf);
		return df;
	};
	/**
	 * Selects a set of column based expressions.
	 * @param {string[]}
	 * @returns {module:eclairjs/sql.Dataset}
	 * @private
	 */
	Dataset.prototype.selectWithStrings = function (args) {
		var jCols = args.map(function (v) {
			return this.col(v);
		}.bind(this));

		return this.selectWithColumns(jCols);

	};
	/**
	 * Displays the Dataset rows in a tabular form.
	 * @param {interger} [numberOfRows] defaults to 20.
	 * @param {boolean] [truncate] defaults to false, Whether truncate long strings. If true, strings more than 20 characters will be
 * truncated and all cells will be aligned right
 */
	Dataset.prototype.show = function (numberOfRows, truncate) {
		var numRow = numberOfRows ? numberOfRows : 20;
		var trunk = truncate ? true : false;
		this.getJavaObject().show(numRow, trunk);
	};
	/**
	 * Returns a new Dataset sorted by the specified columns, if columnName is used sorted in ascending order.
	 * @param {string | module:eclairjs/sql.Column} columnName,...columnName or sortExprs,... sortExprs
	 * @returns {module:eclairjs/sql.Dataset}
	 * @example
	 *  var result = peopleDataset.sort("age", "name");
	 *  // or
	 *  var col = peopleDataset.col("age");
	 *    var colExpr = col.desc();
	 *    var result = peopleDataset.sort(colExpr);
	 */
	Dataset.prototype.sort = function () {

		var sortExprs = [];
		for (var i = 0; i < arguments.length; i++) {
			var o = arguments[i];
			if (typeof o === 'string' || o instanceof String) {
				o = this.col(o).asc();
			}
			sortExprs.push(Utils.unwrapObject(o));
		}

		return Utils.javaToJs(this.getJavaObject().sort(Utils.unwrapObject(sortExprs)));
	};
	/**
	 * Returns SQLContext
	 * @returns {module:eclairjs/sql.SQLContext}
	 */
	Dataset.prototype.sqlContext = function () {
		return Utils.javaToJs(this.getJavaObject().sqlContext());
	};
	/**
	 * Returns a DatasetStatFunctions for working statistic functions support.
	 * @example
	 * var stat = peopleDataset.stat().cov("income", "networth");
	 *
	 * @returns {module:eclairjs/sql.DatasetStatFunctions}
	 */
	Dataset.prototype.stat = function () {
		return Utils.javaToJs(this.getJavaObject().stat());
	};
	/**
	 * Returns the first n rows in the Dataset.
	 * @param {integer} num
	 * @returns {module:eclairjs/sql.Row[]}
	 */
	Dataset.prototype.take = function (num) {
		var rows = this.getJavaObject().take(num);
		var r = [];
		for (var i = 0; i < rows.length; i++) {
			r.push(Utils.javaToJs(rows[i]));
		}
		return r;
	};
	/**
	 * Returns a new Dataset with columns renamed. This can be quite convenient in conversion from a
	 * RDD of tuples into a Dataset with meaningful names. For example:
	 * @param {string} colNames,...colNames
	 * @return {module:eclairjs/sql.Dataset}
	 * @example
	 * var result = nameAgeDF.toDF("newName", "newAge");
	 */
	Dataset.prototype.toDF = function () {
		var args = Array.prototype.slice.call(arguments);;
		return Utils.javaToJs(this.getJavaObject().toDF(args));
	};
	/**
	 * Returns the content of the Dataset as JSON.
	 * @returns {object}
	 */
	Dataset.prototype.toJSON = function () {
        //return this.collect();
       var rows =  this.collect();
        var s = JSON.stringify(rows);
        var o = JSON.parse(s);
        return o;
	};
	/**
	 * Represents the content of the Dataset as an RDD of Rows.
	 * @returns {module:eclairjs.RDD}
	 */
	Dataset.prototype.toRDD = function () {
		return Utils.javaToJs(this.getJavaObject().javaRDD());
	};
	/**
	 * Returns a new Dataset containing union of rows in this frame and another frame. This is equivalent to UNION ALL in SQL.
	 * @param {module:eclairjs/sql.Dataset} other
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.unionAll = function (other) {
		return Utils.javaToJs(this.getJavaObject().unionAll(Utils.unwrapObject(other)));
	};
	/**
	 * @param {boolean} blocking
	 */
	Dataset.prototype.unpersist = function (blocking) {
		this.getJavaObject().unpersist(blocking);
	};
	/**
	 * Filters rows using the given Column or SQL expression.
	 * @param {module:eclairjs/sql.Column | string} condition - .
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.where = function (condition) {
		return this.filter(condition);
	};
	/**
	 * Returns a new Dataset by adding a column or replacing the existing column that has the same name.
	 * @param {string} name
	 * @param {module:eclairjs/sql.Column} col
	 * @returns {module:eclairjs/sql.Dataset}
	 * @example
	 *  var col = peopleDataset.col("age");
	 *  var df1 = peopleDataset.withColumn("newCol", col);
	 */
	Dataset.prototype.withColumn = function (name, col) {
		return Utils.javaToJs(this.getJavaObject().withColumn(name, Utils.unwrapObject(col)));
	};
	/**
	 * Returns a new Dataset with a column renamed. This is a no-op if schema doesn't contain existingName.
	 * @param {string} existingName
	 * @param {string} newName
	 * @returns {module:eclairjs/sql.Dataset}
	 */
	Dataset.prototype.withColumnRenamed = function (existingName, newName) {
		return Utils.javaToJs(this.getJavaObject().withColumnRenamed(existingName, newName));
	};
	/**
	 * Interface for saving the content of the Dataset out into external storage.
	 * @returns {module:eclairjs/sql.DatasetWriter}
	 */
	Dataset.prototype.write = function () {
		return Utils.javaToJs(this.getJavaObject().write());
	};

	/**
	 * Interface for saving the content of the Dataset out into external storage.
	 * @returns {module:eclairjs/sql/streaming.DataStreamWriter}
	 */
	Dataset.prototype.writeStream = function () {
		return Utils.javaToJs(this.getJavaObject().writeStream());
	};
    module.exports = Dataset;

})();
