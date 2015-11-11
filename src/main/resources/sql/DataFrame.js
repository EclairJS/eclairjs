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
 * A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
 * @constructor
 */
var DataFrame = function(jvmDataFrame) {
	JavaWrapper.call(this, jvmDataFrame);

	  // Initialize our Row-specific properties
	this.logger = Logger.getLogger("DataFrame_js");
};

DataFrame.prototype = Object.create(JavaWrapper.prototype); 

//Set the "constructor" property to refer to DataFrame
DataFrame.prototype.constructor = DataFrame;

DataFrame.prototype.as = function(alias) {
    return new DataFrame(this.getJavaObject().as(alias));
};

DataFrame.prototype.cache = function() {
    return new DataFrame(this.getJavaObject().cache());
};

DataFrame.prototype.col = function(name) {
    return new Column(this.getJavaObject().col(name));
};

DataFrame.prototype.columns = function() {
    return this.getJavaObject().columns();
};

DataFrame.prototype.count = function() {
    return this.getJavaObject().count();
};

DataFrame.prototype.filter = function(arg) {
    if(typeof arg === 'object') 
        return this.filterWithColumn(arguments[0]);
    else 
        return this.filterWithString(arguments[0]);
};

DataFrame.prototype.filterWithColumn = function(col) {
    return new DataFrame(this.getJavaObject().filter(col.getJavaObject()));
};

DataFrame.prototype.filterWithString = function(columnExpr) {
    return new DataFrame(this.getJavaObject().filter(columnExpr));
};

DataFrame.prototype.flatMap = function(func) {
    var sv = Utils.createJavaParams(func);
    var fn = new org.eclairjs.nashorn.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
    return new RDD(this.getJavaObject().flatMap(fn));
};

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

DataFrame.prototype.groupByWithColumns = function(args) {
    var jCols = args.map(function(v) {
        return v.getJavaObject();
    });

    var jGroupedData = this.getJavaObject().groupBy(jCols);
    var gd = new GroupedData(jGroupedData);

    return gd;
};

DataFrame.prototype.groupByWithStrings = function(args) {
    var jGroupedData = this.getJavaObject().groupBy(args);
    var gd = new GroupedData(jGroupedData);

    return gd;
};

DataFrame.prototype.head = function() {
    return new Row(this.getJavaObject().head());
};

DataFrame.prototype.registerTempTable = function(name) {
    this.getJavaObject().registerTempTable(name);
};

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

DataFrame.prototype.selectWithStrings = function(args) {
    var jdf = this.getJavaObject().select(args);
    var df = new DataFrame(jdf);

    return df;
};

DataFrame.prototype.show = function() {
    this.getJavaObject().show();
};

DataFrame.prototype.take = function(num) {
    var rows = this.getJavaObject().take(num);
    return rows.map(function(row) {
        return new Row(row);
    })
};

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

DataFrame.prototype.where = function(condition) {
    return new DataFrame(this.getJavaObject().where(condition));
};

DataFrame.prototype.withColumn = function(name, col) {
    return new DataFrame(this.getJavaObject().withColumn(name, col));
};

DataFrame.prototype.write = function() {
    return new DataFrameWriter(this.getJavaObject().write());
};
