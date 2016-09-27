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
 bin/eclairjs.sh examples/ml/index_to_string_example.js"
 */


function run(spark) {

    var RowFactory = require('eclairjs/sql/RowFactory');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructType = require('eclairjs/sql/types/StructType');
    var StructField = require('eclairjs/sql/types/StructField');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var StringIndexer = require('eclairjs/ml/feature/StringIndexer');
    var IndexToString = require('eclairjs/ml/feature/IndexToString');;

    var data = [
        RowFactory.create(0, "a"),
        RowFactory.create(1, "b"),
        RowFactory.create(2, "c"),
        RowFactory.create(3, "a"),
        RowFactory.create(4, "a"),
        RowFactory.create(5, "c")
    ];
    var schema = new StructType([
        new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
            new StructField("category", DataTypes.StringType, false, Metadata.empty())
    ]);
    var df = spark.createDataFrame(data, schema);

    var indexer = new StringIndexer()
        .setInputCol("category")
        .setOutputCol("categoryIndex")
        .fit(df);
    var indexed = indexer.transform(df);

    var converter = new IndexToString()
        .setInputCol("categoryIndex")
        .setOutputCol("originalCategory");
    var converted = converter.transform(indexed);
    return converted.select("id", "originalCategory");

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Gradient Boosted Tree Regressor Example")
            .getOrCreate();
    var result = run(spark);
    result.show();

    spark.stop();
}
