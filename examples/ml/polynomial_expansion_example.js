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

function run(spark) {
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require("eclairjs/sql/types/StructType");
    var StructField = require("eclairjs/sql/types/StructField");
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var PolynomialExpansion = require("eclairjs/ml/feature/PolynomialExpansion");
    var Vectors = require("eclairjs/ml/linalg/Vectors");
    var VectorUDT = require("eclairjs/ml/linalg/VectorUDT");

    var polyExpansion = new PolynomialExpansion()
        .setInputCol("features")
        .setOutputCol("polyFeatures")
        .setDegree(3);

    var data = [
        RowFactory.create(Vectors.dense(-2.0, 2.3)),
        RowFactory.create(Vectors.dense(0.0, 0.0)),
        RowFactory.create(Vectors.dense(0.6, -1.1))
    ];

    var schema = new StructType([
        new StructField("features", new VectorUDT(), false, Metadata.empty())
    ]);

    var df = spark.createDataFrame(data, schema);
    var polyDF = polyExpansion.transform(df);

    return polyDF.select("polyFeatures").take(3);


}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript PolynomialExpansion Example")
            .getOrCreate();
    var result = run(spark);
    result.forEach(function (r) {
        print(r.get(0));
    });

    spark.stop();
}
