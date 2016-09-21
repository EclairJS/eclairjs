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

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var StopWordsRemover = require('eclairjs/ml/feature/StopWordsRemover');
    var StructType = require('eclairjs/sql/types/StructType');
    var StructField = require('eclairjs/sql/types/StructField');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Metadata = require('eclairjs/sql/types/Metadata');
    var RowFactory = require('eclairjs/sql/RowFactory');

    var sqlContext = new SQLContext(sc);

    var remover = new StopWordsRemover()
      .setInputCol("raw")
      .setOutputCol("filtered");

    var rdd = sc.parallelize([
      RowFactory.create([["I", "saw", "the", "red", "baloon"]]),
      RowFactory.create([["Mary", "had", "a", "little", "lamb"]])
    ]);

    var schema = new StructType([
      new StructField(
        "raw", DataTypes.createArrayType(DataTypes.StringType), false, Metadata.empty())
    ]);

    var dataset = sqlContext.createDataFrame(rdd, schema);
    return remover.transform(dataset);//.show();



}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript StopWordsRemoverExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.show();
    // $example off$
    sc.stop();
}
