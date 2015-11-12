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
 * Returns a new DataFrame with an alias set.
 * @param {string} alias
 * @returns {DataFrame}
 */
DataFrame.prototype.as = function(alias) {
    return new DataFrame(this.getJavaObject().as(alias));
};
/**
 * Persist this DataFrame with the default storage level (`MEMORY_ONLY`).
 * @returns {DataFrame}
 */
DataFrame.prototype.cache = function() {
    return new DataFrame(this.getJavaObject().cache());
};
/**
 * Selects column based on the column name and return it as a Column.
 * @param name
 * @returns {Column}
 */
DataFrame.prototype.col = function(name) {
    return new Column(this.getJavaObject().col(name));
};
/**
 * Returns all column names as an array.
 * @returns {string[]}
 */
DataFrame.prototype.columns = function() {
    return this.getJavaObject().columns();
};
/**
 * Returns the number of rows in the DataFrame.
 * @returns {integer}
 */
DataFrame.prototype.count = function() {
    return this.getJavaObject().count();
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
    return new DataFrame(this.getJavaObject().filter(col.getJavaObject()));
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
 * Returns a new RDD by first applying a function to all rows of this DataFrame, and then flattening the results.
 * @param {function} func
 * @returns {RDD}
 */
DataFrame.prototype.flatMap = function(func) {
    var sv = Utils.createJavaParams(func);
    var fn = new org.eclairjs.nashorn.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
    return new RDD(this.getJavaObject().flatMap(fn));
};
/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {string[] | Column[]} - Array of Column objects of column name strings
 * @returns {GroupedData}
 */
DataFrame.prototype.groupBy = function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;

    if(args.length == 0)
        return self;

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
        return v.getJavaObject();
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
    var jGroupedData = this.getJavaObject().groupBy(args);
    var gd = new GroupedData(jGroupedData);

    return gd;
};
/**
 * Returns the first row.
 * @returns {Row}
 */
DataFrame.prototype.head = function() {
    return new Row(this.getJavaObject().head());
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
    var len = args.length;

    if(args.length == 0)
        return self;

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
    var jdf = this.getJavaObject().select(args);
    var df = new DataFrame(jdf);

    return df;
};
/**
 * Selects a set of column based expressions.
 * @param {string[]}
 * @returns {DataFrame}
 */
DataFrame.prototype.selectWithStrings = function(args) {
    var jdf = this.getJavaObject().select(args);
    var df = new DataFrame(jdf);

    return df;
};
/**
 * Displays the top 20 rows of DataFrame in a tabular form.
 */
DataFrame.prototype.show = function() {
    this.getJavaObject().show();
};
/**
 * Returns the first n rows in the DataFrame.
 * @param {integer} num
 * @returns {Row[]}
 */
DataFrame.prototype.take = function(num) {
    var rows = this.getJavaObject().take(num);
    return rows.map(function(row) {
        return new Row(row);
    })
};
/**
 * Returns the content of the DataFrame as a RDD of JSON strings.
 * @returns {RDD}
 */
DataFrame.prototype.toJSON = function() {
    return new RDD(this.getJavaObject().toJSON());
};
/**
 * Returns a RDD object.
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
    return new DataFrame(this.getJavaObject().where(condition));
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
