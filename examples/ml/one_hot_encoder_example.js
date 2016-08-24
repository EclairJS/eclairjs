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
 bin/eclairjs.sh examples/ml/one_hot_encoder_example.js"
 */

function run(spark) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require("eclairjs/sql/types/StructType");
    var StructField = require("eclairjs/sql/types/StructField");
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var StringIndexer = require("eclairjs/ml/feature/StringIndexer");
    var OneHotEncoder = require("eclairjs/ml/feature/OneHotEncoder");

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

    var rdd = sc.parallelize([
        RowFactory.create(0.0, "a"),
        RowFactory.create(1.0, "b"),
        RowFactory.create(2.0, "c"),
        RowFactory.create(3.0, "a"),
        RowFactory.create(4.0, "a"),
        RowFactory.create(5.0, "c")
    ]);

    var schema = new StructType([
        new StructField("id", DataTypes.DoubleType, false, Metadata.empty()),
        new StructField("category", DataTypes.StringType, false, Metadata.empty())
    ]);

    var df = sqlContext.createDataFrame(rdd, schema);

    var indexer = new StringIndexer()
        .setInputCol("category")
        .setOutputCol("categoryIndex")
        .fit(df);
    var indexed = indexer.transform(df);

    var encoder = new OneHotEncoder()
        .setInputCol("categoryIndex")
        .setOutputCol("categoryVec");
    var encoded = encoder.transform(indexed);
    return encoded.select("id", "categoryVec");

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript OneHotEncoder Example")
            .getOrCreate();
    var result = run(spark);
    result.show();

    spark.stop();
}
