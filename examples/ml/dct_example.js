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
 bin/eclairjs.sh examples/ml/dct_example.js"
 */


function run(sc) {

    var SQLContext = require('eclairjs/sql/SQLContext');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var ArrayType = require('eclairjs/sql/types/ArrayType');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var DCT = require('eclairjs/ml/feature/DCT');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');

    var sqlContext = new SQLContext(sc);
    var  data = sc.parallelize([
        RowFactory.create([Vectors.dense([0.0, 1.0, -2.0, 3.0])]),
        RowFactory.create([Vectors.dense([-1.0, 2.0, 4.0, -7.0])]),
        RowFactory.create([Vectors.dense([14.0, -2.0, -5.0, 1.0])])
    ]);
    var schema = new StructType([
        new StructField("features", new VectorUDT(), false, Metadata.empty())
    ]);
    var df = sqlContext.createDataFrame(data, schema);
    var dct = new DCT()
        .setInputCol("features")
        .setOutputCol("featuresDCT")
        .setInverse(false);
    var dctDf = dct.transform(df);
    return dctDf.select("featuresDCT");

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript DCT Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.show(3);
    sc.stop();
}


