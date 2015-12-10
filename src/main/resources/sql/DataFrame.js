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
/** 
 * @constructor
 * @classdesc A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
 * @example
 * var people = sqlContext.read.parquet("...") 
 * @example  
 * // Once created, it can be manipulated using the various domain-specific-language (DSL) functions defined in: 
 * // DataFrame (this class), Column, and functions.
 * // To select a column from the data frame:
 * var ageCol = people("age") 
 */
var DataFrame = function(jvmDataFrame) {
	JavaWrapper.call(this, jvmDataFrame);

	  // Initialize our Row-specific properties
	this.logger = Logger.getLogger("sql.DataFrame_js");
};

DataFrame.prototype = Object.create(JavaWrapper.prototype); 

//Set the "constructor" property to refer to DataFrame
DataFrame.prototype.constructor = DataFrame;

/**
 * aggregates on the entire DataFrame without groups.
 * @example
 * // df.agg(...) is a shorthand for df.groupBy().agg(...)
 * var map = {};
 * map["age"] = "max";
 * map["salary"] = "avg";
 * df.agg(map)
 * df.groupBy().agg(map)
 * @param {hashMap} - hashMap<String,String> exprs
 * @returns {DataFrame}
 */
DataFrame.prototype.agg = function(hashMap) {

    return new DataFrame(this.getJavaObject().agg(hashMap));

};
/**
 * Returns a new DataFrame with an alias set.
 * @param {string} alias
 * @returns {DataFrame}
 */
DataFrame.prototype.as = function(alias) {
    return new DataFrame(this.getJavaObject().as(alias));
};
/**
 * Selects column based on the column name and return it as a Column. 
 * Note that the column name can also reference to a nested column like a.b.
 * @param {string} colName
 * @returns {Column}
 */
DataFrame.prototype.apply = function(colName) {
    return new Column(this.getJavaObject().apply(colName));
};
/**
 * Persist this DataFrame with the default storage level (`MEMORY_ONLY`).
 * @returns {DataFrame}
 */
DataFrame.prototype.cache = function() {
    return new DataFrame(this.getJavaObject().cache());
};
/**
 * Returns a new DataFrame that has exactly numPartitions partitions. 
 * Similar to coalesce defined on an RDD, this operation results in a narrow dependency, 
 * e.g. if you go from 1000 partitions to 100 partitions, there will not be a shuffle, 
 * instead each of the 100 new partitions will claim 10 of the current partitions.
 * @param {integer} numPartitions
 * @returns {DataFrame}
 */
DataFrame.prototype.coalesce = function(numPartitions) {
    return new DataFrame(this.getJavaObject().coalesce());
};
/**
 * Selects column based on the column name and return it as a Column.
 * @param {string} name
 * @returns {Column}
 */
DataFrame.prototype.col = function(name) {
    return new Column(this.getJavaObject().col(name));
};
/**
 * Returns an array that contains all of Rows in this DataFrame.
 * @returns {Row[]}
 */
DataFrame.prototype.collect = function() {
    var jRows = this.getJavaObject().collect();
    var rows = [];
    for (var i = 0; i < jRows.length; i++) {
    	rows.push(new Row(jRows[i]));
    }
    return rows;
};
/**
 * Returns all column names as an array.
 * @returns {string[]}
 */
DataFrame.prototype.columns = function() {
	var x = this.getJavaObject().columns();
	var s = [];
	for (var i = 0; i < x.length; i++) {
		s.push(x[i]);
	}
    return s; 
};
/**
 * Returns the number of rows in the DataFrame.
 * @returns {integer}
 */
DataFrame.prototype.count = function() {
    return this.getJavaObject().count();
};
/**
 * Create a multi-dimensional cube for the current DataFrame using the specified columns, so we can run aggregation on them.
 * @param {string| Column} cols...
 * @example 
 * var df = peopleDataFrame.cube("age", "expense");
 * @returns {GroupedData}
 */
DataFrame.prototype.cube = function() {

	var args = Array.prototype.slice.call(arguments);
    if(typeof args[0] !== 'object') 
    	args = args.map(function(v) {
    		return this.col(v);
        }.bind(this));
    
    var jCols = args.map(function(v) {
        return Utils.unwrapObject(v);
    });
    
    return new GroupedData(this.getJavaObject().cube(jCols));
};
/**
 * Computes statistics for numeric columns, including count, mean, stddev, min, and max. 
 * If no columns are given, this function computes statistics for all numerical columns.
 * This function is meant for exploratory data analysis, as we make no guarantee about the backward 
 * compatibility of the schema of the resulting DataFrame. If you want to programmatically compute 
 * summary statistics, use the agg function instead.
 * @param {string} cols.... 
 * @example
 * var df = peopleDataFrame.describe("age", "expense");
 * @returns {DataFrame}
 */
DataFrame.prototype.describe = function() {
	var args = Array.prototype.slice.call(arguments);
    return new DataFrame(this.getJavaObject().describe(args));
};
/**
 * Returns a new DataFrame that contains only the unique rows from this DataFrame. This is an alias for dropDuplicates.
 */
DataFrame.prototype.distinct = function() {
    return this.dropDuplicates();
};
/**
 * Returns a new DataFrame with a column dropped.
 * @param {string | Column} col 
 * @returns {DataFrame}
 */
DataFrame.prototype.drop = function(col) {
    return new DataFrame(this.getJavaObject().drop(Utils.unwrapObject(col)));
};
/**
 * Returns a new DataFrame that contains only the unique rows from this DataFrame, if colNames then considering only the subset of columns.
 * @param {string[]} colNames
 * @returns {DataFrame}
 */
DataFrame.prototype.dropDuplicates = function(colNames) {
	if (!colNames) {
		return new DataFrame(this.getJavaObject().dropDuplicates());
	} else {
		return new DataFrame(this.getJavaObject().dropDuplicates(colNames));
	}
    
};
/**
 * Returns all column names and their data types as an array of arrays. ex. [["name","StringType"],["age","IntegerType"],["expense","IntegerType"]]
 * @returns {Array} Array of Array[2] 
 */
DataFrame.prototype.dtypes = function() {
	var d = this.getJavaObject().dtypes();
	var arrayOfTuple2 = [];
	for (var i = 0; i < d.length; i++) {
		var tuple2 = Utils.javaToJs(d[i]); // convert Tuple2 to array[o1, o2]
		arrayOfTuple2.push(tuple2);
	}
	
	return arrayOfTuple2;
    
};
/**
 * Returns a new DataFrame containing rows in this frame but not in another frame. This is equivalent to EXCEPT in SQL.
 * @param {DataFrame} otherDataFrame to compare to this DataFrame
 * @returns {DataFrame}
 */
DataFrame.prototype.except = function(otherDataFrame) {
	return new DataFrame(this.getJavaObject().except(Utils.unwrapObject(otherDataFrame)));
};
/**
 * Prints the plans (logical and physical) to the console for debugging purposes.
 * @parma {boolean} if false prints the physical plans only.
 */
DataFrame.prototype.explain = function(extended) {
	var b = (extended) ? true : false;
	this.getJavaObject().explain(b);
};
/**
 * Filters rows using the given SQL expression string or Filters rows using the given Column..
 * @param {string | Column} 
 * @returns {DataFrame}
 */
DataFrame.prototype.filter = function(arg) {
    if(typeof arg === 'object') 
        return this.filterWithColumn(arguments[0]);
    else 
        return this.filterWithString(arguments[0]);
};
/**
 * Filters rows using the given Column
 * @param {Column} col
 * @returns {DataFrame}
 */
DataFrame.prototype.filterWithColumn = function(col) {
    return new DataFrame(this.getJavaObject().filter(Utils.unwrapObject(col)));
};
/**
 * Filters rows using the given SQL expression string
 * @param {string} columnExpr
 * @returns {DataFrame}
 */
DataFrame.prototype.filterWithString = function(columnExpr) {
    return new DataFrame(this.getJavaObject().filter(columnExpr));
};
/**
 * Returns the first row. Alias for head().
 * returns {Row}
 */
DataFrame.prototype.first = function() {
    return this.head();
};
/**
 * Returns a new RDD by first applying a function to all rows of this DataFrame, and then flattening the results.
 * @param {function} func
 * @returns {RDD}
 */
DataFrame.prototype.flatMap = function(func) {
 	return this.toRDD().flatMap(func);
};
/**
 * Applies a function to all elements of this DataFrame.
 * @example
 * rdd3.foreach(function(record) {
 *    var connection = createNewConnection()
 *    connection.send(record);	
 *    connection.close()
 * });
 * @param {function} Function with one parameter
 * @returns {void}
 */
DataFrame.prototype.foreach = function(func) {
	
	return this.toRDD().foreach(func);
};
/**
 * Applies a function to each partition of this DataFrame.
 * @example
 * df.foreachPartition(function(partitionOfRecords) {
 *    var connection = createNewConnection()
 *    partitionOfRecords.forEach(function(record){
 *       connection.send(record);	
 *    });
 *    connection.close()
 * });
 * @param {function} Function with one Array parameter
 * @returns {void}
 */
DataFrame.prototype.foreachPartition = function(func) {

	return this.toRDD().foreachPartition(func);
};

/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {string[] | Column[]} - Array of Column objects of column name strings
 * @returns {GroupedData}
 */
DataFrame.prototype.groupBy = function() {
    var args = Array.prototype.slice.call(arguments);
 
    if(typeof args[0] === 'object') 
        return this.groupByWithColumns(args);
    else 
        return this.groupByWithStrings(args);
};
/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {Columns[]}
 * @returns {GroupedData}
 */
DataFrame.prototype.groupByWithColumns = function(args) {
    var jCols = args.map(function(v) {
        return Utils.unwrapObject(v);
    });

    var jGroupedData = this.getJavaObject().groupBy(jCols);
    var gd = new GroupedData(jGroupedData);

    return gd;
};
/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {string[]} columnNames
 * @returns {GroupedData}
 */
DataFrame.prototype.groupByWithStrings = function(args) {
	var jCols = args.map(function(v) {
		return this.col(v);
    }.bind(this));
	
	return this.groupByWithColumns(jCols);

};
/**
 * Returns the first row.
 * @returns {Row}
 */
DataFrame.prototype.head = function() {
    return new Row(this.getJavaObject().head());
};
/**
 * Returns a best-effort snapshot of the files that compose this DataFrame. This method simply asks each constituent 
 * BaseRelation for its respective files and takes the union of all results. Depending on the source relations, 
 * this may not find all input files. Duplicates are removed.
 * @returns {string[]} files
 */
DataFrame.prototype.inputFiles = function() {
    var files=  this.getJavaObject().inputFiles();
    var retFiles = [];
    for (var i = 0; i < files.length; i++ ) {
    	retFiles.push(files[i]);
    }
    return retFiles;
};
/**
 * Returns a new DataFrame containing rows only in both this frame and another frame. This is equivalent to INTERSECT in SQL
 * @param {DataFrame} other
 * @returns {DataFrame}
 */
DataFrame.prototype.intersect = function(other) {
    return new DataFrame(this.getJavaObject().intersect(Utils.unwrapObject(other)));
};
/**
 * Returns true if the collect and take methods can be run locally (without any Spark executors).
 * @returns {boolean}
 */
DataFrame.prototype.isLocal = function() {
	return this.getJavaObject().isLocal();
};
/**
 * Cartesian join with another DataFrame. Note that cartesian joins are very expensive without an extra filter that can be pushed down.
 * @param {DataFrame} Right side of the join operation.
 * @param {string | string[] | Column} columnNamesOrJoinExpr Optional: If string or array of strings column names, inner equi-join with another DataFrame using the given columns. 
 * Different from other join functions, the join columns will only appear once in the output, i.e. similar to SQL's JOIN USING syntax.
 * If Column object, joinExprs inner join with another DataFrame, using the given join expression.
 * @param {string} joinType Optional, only valid if using Column joinExprs. 
 * @returns {DataFrame} 
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
DataFrame.prototype.join = function(right, usingColumns, joinType) {
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
	return new DataFrame(result);
	
};
/**
 * Returns a new DataFrame by taking the first n rows. The difference between this function and head is that head 
 * returns an array while limit returns a new DataFrame.
 * @param {integer} number
 * @returns {DataFrame}
 */
DataFrame.prototype.limit = function(number) {

	return new DataFrame(this.getJavaObject().limit(number));
};
/**
 * Returns a new RDD by applying a function to all rows of this DataFrame.
 * @param {function} func
 * @returns {RDD}
 */
DataFrame.prototype.map = function(func) {
 	return this.toRDD().map(func);
};
/**
 * Return a new RDD by applying a function to each partition of this DataFrame. 
 * Similar to map, but runs separately on each partition (block) of the DataFrame, so func must accept an Array.  
 * func should return a array rather than a single item.
 * @param {function}  
 * @returns {RDD}
 */
DataFrame.prototype.mapPartitions = function(func) {
 	return this.toRDD().mapPartitions(func);
};
/**
 * Returns a DataFrameNaFunctions for working with missing data.
 * @returns {DataFrameNaFunctions}
 
 */
DataFrame.prototype.na = function() {
 	return new DataFrameNaFunctions(this.getJavaObject().na());
};
/**
 * Returns a new DataFrame sorted by the specified columns, if columnName is used sorted in ascending order.
 * This is an alias of the sort function.
 * @param {string | Column} columnName, .....columnName or sortExprs,... sortExprs
 * @returns {DataFrame}
 */
DataFrame.prototype.orderBy = function() {
 	return this.sort.apply(this, arguments);
};
/**
 * @param {StorageLevel} newLevel
 * @returns {DataFrame}
 */
DataFrame.prototype.persist = function(newLevel) {
	var arg = newLevel ? Utils.unwrapObject(newLevel) : null;
 	return new DataFrame(this.getJavaObject().persist(arg));
};
/**
 * Prints the schema to the console in a nice tree format.
 */
DataFrame.prototype.printSchema = function() {
 	this.getJavaObject().printSchema();
};
/**
 * @returns {SQLContextQueryExecution}
 */
DataFrame.prototype.queryExecution = function() {
 	return new SQLContextQueryExecution(this.getJavaObject().queryExecution());
};
/**
 * Randomly splits this DataFrame with the provided weights.
 * @param {float[]} weights - weights for splits, will be normalized if they don't sum to 1.
 * @param {int} seed - Seed for sampling.
 * @returns {DataFrame[]}
 */
DataFrame.prototype.randomSplit = function(weights, seed) {
	var dfs = this.getJavaObject().randomSplit(weights, seed);
	var retDfs = [];
	for (var i = 0; i < dfs.length; i++) {
		retDfs.push(new DataFrame(dfs[i]));
	}
 	return retDfs;
};
/**
 * Represents the content of the DataFrame as an RDD of Rows.
 * @returns {RDD}
 */
DataFrame.prototype.rdd = function() {
	return this.toRDD();
};
/**
 * Registers this DataFrame as a temporary table using the given name.
 * @param {string} tableName
 */
DataFrame.prototype.registerTempTable = function(tableName) {
    this.getJavaObject().registerTempTable(tableName);
};

/**
 * Selects a set of column based expressions.
 * @param {Column[] | string[]}
 * @returns  {DataFrame}
 */
DataFrame.prototype.select = function() {
    var args = Array.prototype.slice.call(arguments);

    if(typeof args[0] === 'object') 
        return this.selectWithColumns(args);
    else 
        return this.selectWithStrings(args);
};
/**
 * Selects a set of column based expressions.
 * @param {Column[]}
 * @returns {DataFrame}
 */
DataFrame.prototype.selectWithColumns = function(args) {
	var jCols = args.map(function(v) {
		return Utils.unwrapObject(v);
	});
	var jdf = this.getJavaObject().select(jCols);
	var df = new DataFrame(jdf);
	return df;
};
/**
 * Selects a set of column based expressions.
 * @param {string[]}
 * @returns {DataFrame}
 */
DataFrame.prototype.selectWithStrings = function(args) {
	var jCols = args.map(function(v) {
		return this.col(v);
    }.bind(this));
	
	return this.selectWithColumns(jCols);

};
/**
 * Displays the top 20 rows of DataFrame in a tabular form.
 */
DataFrame.prototype.show = function() {
    this.getJavaObject().show();
};
/**
 * Returns a new DataFrame sorted by the specified columns, if columnName is used sorted in ascending order.
 * @param {string | Column} columnName, .....columnName or sortExprs,... sortExprs
 * @returns {DataFrame}
 * @example
 *  var result = peopleDataFrame.sort("age", "name");
 *  // or 
 *  var col = peopleDataFrame.col("age");
 *	var colExpr = col.desc();
 *	var result = peopleDataFrame.sort(colExpr);
 */
DataFrame.prototype.sort = function() {
	
	var sortExprs = [];
	for (var i = 0; i < arguments.length; i++) {
		var o = arguments[i];
		if (typeof o === 'string' || o instanceof String) {
			o = this.col(o).asc();		
		} 
		sortExprs.push(Utils.unwrapObject(o));
	}

 	return new DataFrame(this.getJavaObject().sort(Utils.unwrapObject(sortExprs)));
};
/**
 * Returns the first n rows in the DataFrame.
 * @param {integer} num
 * @returns {Row[]}
 */
DataFrame.prototype.take = function(num) {
    var rows = this.getJavaObject().take(num);
    var r = [];
    for (var i = 0; i < rows.length; i++) {
    	r.push(new Row(rows[i]));
    }
    return r;
};
/**
 * Returns the content of the DataFrame as a RDD of JSON strings.
 * @returns {RDD}
 */
DataFrame.prototype.toJSON = function() {
    return new RDD(this.getJavaObject().toJSON());
};
/**
 * Represents the content of the DataFrame as an RDD of Rows.
 * @returns {RDD}
 */
DataFrame.prototype.toRDD = function() {
    return new RDD(this.getJavaObject().javaRDD());
};
/**
 * Filters rows using the given Column or SQL expression.
 * @param {Column | string} condition - .
 * @returns {DataFrame}
 */
DataFrame.prototype.where = function(condition) {
    return this.filter(condition);
};
/**
 * Returns a new DataFrame by adding a column or replacing the existing column that has the same name.
 * @param {string} name
 * @param {Column} col
 * @returns {DataFrame}
 */
DataFrame.prototype.withColumn = function(name, col) {
    return new DataFrame(this.getJavaObject().withColumn(name, col));
};
/**
 * Interface for saving the content of the DataFrame out into external storage. 
 * @returns {DataFrameWriter}
 */
DataFrame.prototype.write = function() {
    return new DataFrameWriter(this.getJavaObject().write());
};
