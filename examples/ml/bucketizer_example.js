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
 bin/eclairjs.sh examples/ml/bucketizer_example.js"
 */



function run(spark) {
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var Bucketizer = require('eclairjs/ml/feature/Bucketizer');

    var splits = [Number.NEGATIVE_INFINITY, -0.5, 0.0, 0.5, Number.POSITIVE_INFINITY];

    var data = spark.sparkContext().parallelize([
        RowFactory.create([-0.5]),
        RowFactory.create([-0.3]),
        RowFactory.create([0.0]),
        RowFactory.create([0.2])
    ]);
    var schema = new StructType([
        new StructField("features", DataTypes.DoubleType, false, Metadata.empty())
    ]);
    var dataFrame = spark.createDataFrame(data, schema);

    var bucketizer = new Bucketizer()
        .setInputCol("features")
        .setOutputCol("bucketedFeatures")
        .setSplits(splits);

// Transform original data into its bucket index.
    return bucketizer.transform(dataFrame);
}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Bucketizer Example")
            .getOrCreate();
    var result = run(spark);
    result.show();
    spark.stop();
}
