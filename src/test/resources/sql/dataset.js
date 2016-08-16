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
var Tuple2 = require('eclairjs/Tuple2');
var Tuple3 = require('eclairjs/Tuple3');
var Tuple4 = require('eclairjs/Tuple4');
var Tuple5 = require('eclairjs/Tuple5');
//var DataTypes = sqlTypes.DataTypes;
//var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');
//var ArrayType = sqlTypes.ArrayType;
//var StructType = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructType');
//var StructField = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructField');
var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
var SqlTimestamp = require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp');
//var RowFactory = require(EclairJS_Globals.NAMESPACE + '/sql/RowFactory');
//var Column = require(EclairJS_Globals.NAMESPACE + '/sql/Column');
//var functions = require(EclairJS_Globals.NAMESPACE + '/sql/functions');
var SqlDate = require(EclairJS_Globals.NAMESPACE + '/sql/SqlDate');
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


var stringEncoder = function() {
    var ds = sparkSession.createDataset(["1","2","3"], Encoders.STRING());
    return JSON.stringify(ds);
}

var intEncoder = function() {
    var ds = sparkSession.createDataset([1,2,3], Encoders.INT());
    ds =ds.map( function(value) {
    		return value + 1;
    	}, Encoders.INT());
    return JSON.stringify(ds);
}

var floatEncoder = function() {
    var ds = sparkSession.createDataset([1.0,2.2,3.45], Encoders.FLOAT());
    return JSON.stringify(ds);
}

var doubleEncoder = function() {
    var ds = sparkSession.createDataset([1.0,2.2,3.45], Encoders.DOUBLE());
    return JSON.stringify(ds);
}

var booleanEncoder = function() {
    var ds = sparkSession.createDataset([true, false], Encoders.BOOLEAN());
    return JSON.stringify(ds);
}

var dateEncoder = function() {
    var date = new SqlDate(30000);
    var ds = sparkSession.createDataset([date], Encoders.DATE());
    return JSON.stringify(ds);
}

var timestampEncoder = function() {
    var date = new SqlTimestamp(30000);
    var ds = sparkSession.createDataset([date], Encoders.TIMESTAMP());
    return JSON.stringify(ds);
}

var tuple2Encoder = function() {
    var ds = sparkSession.createDataset([new Tuple2(1, "two")], Encoders.tuple2(Encoders.INT(), Encoders.STRING()));
    return JSON.stringify(ds);
}

var tuple3Encoder = function() {
    var ds = sparkSession.createDataset([new Tuple3(1, "two", 2.234)], Encoders.tuple3(Encoders.INT(), Encoders.STRING(), Encoders.FLOAT()));
    return JSON.stringify(ds);
}

var tuple4Encoder = function() {
    var ds = sparkSession.createDataset([new Tuple4(1, "two", 2.234, true)], Encoders.tuple4(
                                                                                                Encoders.INT(),
                                                                                                Encoders.STRING(),
                                                                                                Encoders.FLOAT(),
                                                                                                Encoders.BOOLEAN()
                                                                                            )
    );
    return JSON.stringify(ds);
}

var tuple5Encoder = function() {
    var ds = sparkSession.createDataset([new Tuple5(1, "two", 2.234, true, 3)], Encoders.tuple5(
        Encoders.INT(),
        Encoders.STRING(),
        Encoders.FLOAT(),
        Encoders.BOOLEAN(),
        Encoders.INT()
        )
    );
    return JSON.stringify(ds);
}