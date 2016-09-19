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

/*
 Usage:
 bin/eclairjs.sh examples/ml/chi_sq_selector_example.js"
 */


function run(spark) {

    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var ChiSqSelector = require('eclairjs/ml/feature/ChiSqSelector');
    var Vectors = require('eclairjs/ml/linalg/Vectors');
    var VectorUDT = require('eclairjs/ml/linalg/VectorUDT');

    var rdd = spark.sparkContext().parallelize([
        RowFactory.create([7, Vectors.dense(0.0, 0.0, 18.0, 1.0), 1.0]),
        RowFactory.create([8, Vectors.dense(0.0, 1.0, 12.0, 0.0), 0.0]),
        RowFactory.create([9, Vectors.dense(1.0, 0.0, 15.0, 0.1), 0.0])
    ]);
    var schema = new StructType(
    [
        new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
            new StructField("features", new VectorUDT(), false, Metadata.empty()),
            new StructField("clicked", DataTypes.DoubleType, false, Metadata.empty())
    ]);

    var df = spark.createDataFrame(rdd, schema);

    var selector = new ChiSqSelector()
        .setNumTopFeatures(1)
        .setFeaturesCol("features")
        .setLabelCol("clicked")
        .setOutputCol("selectedFeatures");

    return selector.fit(df).transform(df);
}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Chi Sq Selector Example")
            .getOrCreate();
    var result = run(spark);
    result.show();
    spark.stop();
}

