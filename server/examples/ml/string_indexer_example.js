/*
 * Copyright 2015 IBM Corp.
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
 bin/eclairjs.sh examples/ml/vector_slicer_example.js"
 */

function run(spark) {


    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require('eclairjs/sql/types/StructType');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var StringIndexer = require('eclairjs/ml/feature/StringIndexer');

    var data = [
      RowFactory.create(0, "a"),
      RowFactory.create(1, "b"),
      RowFactory.create(2, "c"),
      RowFactory.create(3, "a"),
      RowFactory.create(4, "a"),
      RowFactory.create(5, "c")
    ];
    var schema = new StructType([
      DataTypes.createStructField("id", DataTypes.IntegerType, false),
      DataTypes.createStructField("category", DataTypes.StringType, false)
    ]);
    var df = spark.createDataFrame(data, schema);
    var indexer = new StringIndexer()
      .setInputCol("category")
      .setOutputCol("categoryIndex");
    var indexed = indexer.fit(df).transform(df);
    indexed.show();

    return indexed;
}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript StringIndexer Example")
            .getOrCreate();
    var result = run(spark);


    // $example off$
    spark.stop();
}
