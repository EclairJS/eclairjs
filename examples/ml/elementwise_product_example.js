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
 bin/eclairjs.sh examples/ml/elementwise_product_example.js"
 */


function run(spark) {

    var RowFactory = require('eclairjs/sql/RowFactory');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var Vectors = require('eclairjs/ml/linalg/Vectors');
    var VectorUDT = require('eclairjs/ml/linalg/VectorUDT');
    var ElementwiseProduct = require('eclairjs/ml/feature/ElementwiseProduct');

    // Create some vector data; also works for sparse vectors
    var rdd = spark.sparkContext().parallelize([
        RowFactory.create(["a", Vectors.dense([1.0, 2.0, 3.0])]),
        RowFactory.create(["b", Vectors.dense([4.0, 5.0, 6.0])])
    ]);

    var fields = [
        DataTypes.createStructField("id", DataTypes.StringType, false),
        DataTypes.createStructField("vector", new VectorUDT(), false)
    ];

    var schema = DataTypes.createStructType(fields);

    var dataFrame = spark.createDataFrame(rdd, schema);

    var transformingVector = Vectors.dense([0.0, 1.0, 2.0]);

    var transformer = new ElementwiseProduct()
        .setScalingVec(transformingVector)
        .setInputCol("vector")
        .setOutputCol("transformedVector");

    // Batch transform the vectors to create new column:
   return transformer.transform(dataFrame);

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Elementwise Product Example")
            .getOrCreate();
    var result = run(spark);
    result.show();

    spark.stop();
}
