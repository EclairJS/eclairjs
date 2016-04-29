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
 bin/eclairjs.sh examples/ml/pca_example.js"
 */

function run(sc) {

    var SQLContext = require('eclairjs/sql/SQLContext');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var PCA = require('eclairjs/ml/feature/PCA');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');

    var sqlContext = new SQLContext(sc);
    var  data = sc.parallelize([
        RowFactory.create(Vectors.sparse(5, [1, 3], [1.0, 7.0])),
        RowFactory.create(Vectors.dense([2.0, 0.0, 3.0, 4.0, 5.0])),
        RowFactory.create(Vectors.dense([4.0, 0.0, 0.0, 6.0, 7.0]))
    ]);

    var schema = new StructType([
        new StructField("features", new VectorUDT(), false, Metadata.empty())
    ]);
    var df = sqlContext.createDataFrame(data, schema);
    var pca = new PCA()
        .setInputCol("features")
        .setOutputCol("pcaFeatures")
        .setK(3)
        .fit(df);
    var pcaDf = pca.transform(df).select("pcaFeatures");
    return pcaDf.select("pcaFeatures");
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript PCA Example");
    var sc = new SparkContext(sparkConf);
    var resultDF = run(sc);
    resultDF.show(3);
    sc.stop();
}
