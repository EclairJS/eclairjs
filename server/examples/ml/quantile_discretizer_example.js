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
 bin/eclairjs.sh examples/ml/quantile_discretizer_example.js"
 */

function run(spark) {
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require("eclairjs/sql/types/StructType");
    var StructField = require("eclairjs/sql/types/StructField");
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var PolynomialExpansion = require("eclairjs/ml/feature/PolynomialExpansion");
    var Vectors = require("eclairjs/mllib/linalg/Vectors");
    var VectorUDT = require("eclairjs/mllib/linalg/VectorUDT");
    var QuantileDiscretizer = require("eclairjs/ml/feature/QuantileDiscretizer");

    var data = [
            RowFactory.create(0, 18.0),
            RowFactory.create(1, 19.0),
            RowFactory.create(2, 8.0),
            RowFactory.create(3, 5.0),
            RowFactory.create(4, 2.2)
        ];

    var schema = new StructType([
        new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("hour", DataTypes.DoubleType, false, Metadata.empty())
    ]);

    var df = spark.createDataFrame(data, schema);
    // Output of QuantileDiscretizer for such small datasets can depend on the number of
    // partitions. Here we force a single partition to ensure consistent results.
    // Note this is not necessary for normal use cases
    df = df.repartition(1);

    var discretizer = new QuantileDiscretizer()
        .setInputCol("hour")
        .setOutputCol("result")
        .setNumBuckets(3);

    return discretizer.fit(df).transform(df);

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript QuantileDiscretizer Example")
            .getOrCreate();
    var result = run(spark);
    result.show();
    spark.stop();
}
