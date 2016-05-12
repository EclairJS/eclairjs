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
var sqlTypes = require(EclairJS_Globals.NAMESPACE + '/sql/types');
var DataTypes = sqlTypes.DataTypes;
var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');
var ArrayType = sqlTypes.ArrayType;
var StructType = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructType');
var StructField = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructField');
var SQLContext = require(EclairJS_Globals.NAMESPACE + '/sql/SQLContext');
var SqlTimestamp = require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp');
var RowFactory = require(EclairJS_Globals.NAMESPACE + '/sql/RowFactory');
var Column = require(EclairJS_Globals.NAMESPACE + '/sql/Column');
var functions = require(EclairJS_Globals.NAMESPACE + '/sql/functions');
var SqlDate = require(EclairJS_Globals.NAMESPACE + '/sql/SqlDate');

var StorageLevel = require(EclairJS_Globals.NAMESPACE + '/storage/StorageLevel');
var SparkConf = require(EclairJS_Globals.NAMESPACE + '/SparkConf');
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');
var sparkContext = new SparkContext("local[*]", "user defined function test");
var sqlContext = new SQLContext(sparkContext);

var udf1Test = function() {

    var fields = [];
    fields.push(DataTypes.createStructField("test", DataTypes.StringType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["test 1"], ["string 2"],["string 3"]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("stringLengthTest", function(str) {
            return str.length();
    }, DataTypes.IntegerType);

    var result = sqlContext.sql("SELECT *, stringLengthTest(mytable.test) as transformedByUDF FROM mytable").collect();

    return JSON.stringify(result);
}

var udf2Test = function() {

    var fields = [];
    fields.push(DataTypes.createStructField("test", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("item2", DataTypes.IntegerType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["test 1", 1], ["string 2", 2],["string 3", 3]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("udfTest", function(str, num) {
        return str.length() + num;
    }, DataTypes.IntegerType);

    var result = sqlContext.sql("SELECT *, udfTest(mytable.test, mytable.item2) as transformedByUDF FROM mytable").collect();

    return JSON.stringify(result);
}

var udf3Test = function() {

    var fields = [];
    fields.push(DataTypes.createStructField("test", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("item2", DataTypes.IntegerType, true));
    fields.push(DataTypes.createStructField("floatNum", DataTypes.DoubleType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["test 1", 1, 3.0], ["string 2", 2, 1.1],["string 3", 3, 2.2]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("udfTest", function(str, num, floatNum) {
        return str.length() + num + floatNum;
    }, DataTypes.FloatType);

    var result = sqlContext.sql("SELECT *, udfTest(mytable.test, mytable.item2, mytable.floatNum) as transformedByUDF FROM mytable").collect();

    return JSON.stringify(result);
}

var udf4Test = function() {

    var fields = [];
    fields.push(DataTypes.createStructField("test", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("item2", DataTypes.IntegerType, true));
    fields.push(DataTypes.createStructField("floatNum", DataTypes.DoubleType, true));
    fields.push(DataTypes.createStructField("floatNum2", DataTypes.FloatType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["test 1", 1, 3.0, 2.2]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("udfTest", function(str, num, floatNum, floatNum2) {
        return str.length() + num + floatNum + floatNum2;
    }, DataTypes.DoubleType);

    var result = sqlContext.sql("SELECT *, udfTest(mytable.test, mytable.item2, mytable.floatNum, mytable.floatNum2) as transformedByUDF FROM mytable").collect();

    return JSON.stringify(result);
}

var udf5Test = function() {

    var fields = [];
    fields.push(DataTypes.createStructField("test", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("item2", DataTypes.IntegerType, true));
    fields.push(DataTypes.createStructField("floatNum", DataTypes.DoubleType, true));
    fields.push(DataTypes.createStructField("floatNum2", DataTypes.FloatType, true));
    fields.push(DataTypes.createStructField("dob", DataTypes.TimestampType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["test 1", 1, 3.0, 2.2, new SqlTimestamp("1996-03-07 00:00:00")]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("udfTest", function(str, num, floatNum, floatNum2, ts) {
        return str +" "+ num +" "+ floatNum +" "+ floatNum2 +" "+ ts;
    }, DataTypes.StringType);

    var result = sqlContext.sql("SELECT *, udfTest(mytable.test, mytable.item2, mytable.floatNum, mytable.floatNum2, mytable.dob) as transformedByUDF FROM mytable").collect();

    return JSON.stringify(result);
}

var udf6Test = function() {
    var SqlTimestamp = require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp');
    var fields = [];
    fields.push(DataTypes.createStructField("day", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("month", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("year", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("hour", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("minute", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("second", DataTypes.StringType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["26", "6", "1999", "9", "12", "30"]], schema);
    df.registerTempTable("mytable");

    //df.show();
    sqlContext.udf().register("udfTest", function(day, month, year, hour, minute, second, SqlTimestamp) {
        //var SqlTimestamp = require("eclairjs/sql/SqlTimestamp");
        //print(day+";"+ month+";"+year+";"+hour+";"+minute+";"+second);
        var ts = new SqlTimestamp(new Date(year, month-1, day, hour, minute, second));
        return ts;
    }, DataTypes.TimestampType, [SqlTimestamp]);

    var result = sqlContext.sql("SELECT *, udfTest(mytable.day, mytable.month, mytable.year, mytable.hour, mytable.minute, mytable.second) as timestamp FROM mytable").collect();

    return JSON.stringify(result);
}

var udf7Test = function() {
    var fields = [];
    fields.push(DataTypes.createStructField("col1", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col2", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col3", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col4", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col5", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col6", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col7", DataTypes.StringType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["1", "2", "3", "4", "5", "6", "7"]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("udfTest", function(col1, col2, col3, col4, col5, col6, col7) {
        return col1 + col2 + col3 + col4 + col5 + col6 + col7;
    }, DataTypes.StringType);
    var smt = "SELECT *, " +
        "udfTest(mytable.col1, mytable.col2, mytable.col3, mytable.col4, mytable.col5, mytable.col6, mytable.col7) " +
        "as transformedByUDF FROM mytable";
    var result = sqlContext.sql(smt).collect();

    return JSON.stringify(result);
}

var udf8Test = function() {
    var fields = [];
    fields.push(DataTypes.createStructField("col1", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col2", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col3", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col4", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col5", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col6", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col7", DataTypes.StringType, true));
    fields.push(DataTypes.createStructField("col8", DataTypes.StringType, true));
    var schema = DataTypes.createStructType(fields);
    var df = sqlContext.createDataFrame([["1", "2", "3", "4", "5", "6", "7", "8"]], schema);
    df.registerTempTable("mytable");

    sqlContext.udf().register("udfTest", function(col1, col2, col3, col4, col5, col6, col7, col8) {
        return col1 + col2 + col3 + col4 + col5 + col6 + col7 + col8;
    }, DataTypes.StringType);
    var smt = "SELECT *, " +
        "udfTest(mytable.col1, mytable.col2, mytable.col3, mytable.col4, mytable.col5, mytable.col6, mytable.col7, mytable.col8) " +
        "as transformedByUDF FROM mytable";
    var result = sqlContext.sql(smt).collect();
    return JSON.stringify(result);
}