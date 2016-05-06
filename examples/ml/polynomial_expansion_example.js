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
 bin/eclairjs.sh examples/ml/polynomial_expansion_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require("eclairjs/sql/types/StructType");
    var StructField = require("eclairjs/sql/types/StructField");
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var PolynomialExpansion = require("eclairjs/ml/feature/PolynomialExpansion");
    var Vectors = require("eclairjs/mllib/linalg/Vectors");
    var VectorUDT = require("eclairjs/mllib/linalg/VectorUDT");
    var LogisticRegression = require("eclairjs/ml/classification/LogisticRegression");
    var Pipeline = require("eclairjs/ml/Pipeline");


    var sqlContext = new SQLContext(sc);

    var polyExpansion = new PolynomialExpansion()
        .setInputCol("features")
        .setOutputCol("polyFeatures")
        .setDegree(3);

    var data = sc.parallelize([
        RowFactory.create(Vectors.dense(-2.0, 2.3)),
        RowFactory.create(Vectors.dense(0.0, 0.0)),
        RowFactory.create(Vectors.dense(0.6, -1.1))
    ]);

    var schema = new StructType([
        new StructField("features", new VectorUDT(), false, Metadata.empty())
    ]);

    var df = sqlContext.createDataFrame(data, schema);
    var polyDF = polyExpansion.transform(df);

    return polyDF.select("polyFeatures").take(3);


}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var rows = run(sc);
    rows.forEach(function (r) {
        print(r.get(0));
    });

    sc.stop();
}