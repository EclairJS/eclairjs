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
//var sqlTypes = require(EclairJS_Globals.NAMESPACE + '/sql/types');
var Encoders = require('eclairjs/sql/Encoders');
//var DataTypes = sqlTypes.DataTypes;
//var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');
//var ArrayType = sqlTypes.ArrayType;
//var StructType = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructType');
//var StructField = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructField');
var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
//var SqlTimestamp = require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp');
//var RowFactory = require(EclairJS_Globals.NAMESPACE + '/sql/RowFactory');
//var Column = require(EclairJS_Globals.NAMESPACE + '/sql/Column');
//var functions = require(EclairJS_Globals.NAMESPACE + '/sql/functions');
//var SqlDate = require(EclairJS_Globals.NAMESPACE + '/sql/SqlDate');
//var SqlTimestamp = require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp');
//var StorageLevel = require(EclairJS_Globals.NAMESPACE + '/storage/StorageLevel');
//var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
//var sql = require('sql');
//require('sql');
//var SparkConf = new SparkConf(false).setMaster("local[*]").setAppName("dataframe");
//
//var sparkContext = new SparkContext(SparkConf);
//
//var sparkSession = new sparkSession(sparkContext);
var sparkSession = SparkSession
                             .builder()
                             //.config('spark.sql.crossJoin.enabled', 'true')
                             .appName("datasets unit test")
                             .master("local[*]")
                             .getOrCreate();
var sparkContext = sparkSession.sparkContext();
var sqlContext = sparkSession.sqlContext();


var stringEncoder = function(file) {

   var dataset =  sparkSession.read().text(file).as(Encoders.STRING());
    return dataset.take(1)[0];
}

var intEncoder = function(file) {

    var dataset =  sparkSession.read().text(file);
    var obj = {
        "item1": 6,
        "item2": "test"
    }
    //var dataset = sparkSession.createDataset([obj], Encoders.json());
    dataset.printSchema();
    //var col = dataset.col('value').cast("int");
    //var ds = dataset.select(dataset.col('value').as('json')).as(Encoders.JSON());
    var ds = dataset.as(Encoders.JSON());
    ds.printSchema();
    //ds.flatMap(function(j){
    //    print("j " + j);
    //    return [j];
    //},Encoders.json());
    var o = ds.take(1)[0];
    return JSON.stringify(o);//ds.take(1)[0];
}
