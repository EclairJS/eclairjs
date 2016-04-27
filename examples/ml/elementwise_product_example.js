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


function run(sc) {

    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');
    //var VectorIndexer = require('eclairjs/ml/feature/VectorIndexer');
    var ElementwiseProduct = require('eclairjs/ml/feature/ElementwiseProduct');
    //var RegressionEvaluator = require('eclairjs/ml/evaluation/RegressionEvaluator');
    //var Pipeline = require('eclairjs/ml/Pipeline');

    var sqlContext = new SQLContext(sc);
    // Create some vector data; also works for sparse vectors
    var rdd = sc.parallelize([
        RowFactory.create(["a", Vectors.dense([1.0, 2.0, 3.0])]),
        RowFactory.create(["b", Vectors.dense([4.0, 5.0, 6.0])])
    ]);

    var fields = [
        DataTypes.createStructField("id", DataTypes.StringType, false),
        DataTypes.createStructField("vector", new VectorUDT(), false)
    ];

    var schema = DataTypes.createStructType(fields);

    var dataFrame = sqlContext.createDataFrame(rdd, schema);

    var transformingVector = Vectors.dense([0.0, 1.0, 2.0]);

    var transformer = new ElementwiseProduct()
        .setScalingVec(transformingVector)
        .setInputCol("vector")
        .setOutputCol("transformedVector");

    // Batch transform the vectors to create new column:
   return transformer.transform(dataFrame);

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript Elementwise Product Example");
    var sc = new SparkContext(sparkConf);
    var retDF = run(sc);
    retDF.show();

    sc.stop();
}