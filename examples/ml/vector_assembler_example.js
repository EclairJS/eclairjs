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
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var StructField = require('eclairjs/sql/types/StructField');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');
    var VectorAssembler = require('eclairjs/ml/feature/VectorAssembler');

    var sqlContext = new SQLContext(sc);

    var schema = DataTypes.createStructType([
      DataTypes.createStructField("id", DataTypes.IntegerType, false),
      DataTypes.createStructField("hour", DataTypes.IntegerType, false),
      DataTypes.createStructField("mobile", DataTypes.DoubleType, false),
      DataTypes.createStructField("userFeatures", new VectorUDT(), false),
      DataTypes.createStructField("clicked", DataTypes.DoubleType, false)
    ]);
    var row = RowFactory.create([0, 18, 1.0, Vectors.dense([0.0, 10.0, 0.5]), 1.0]);
    var rdd = sc.parallelize([row]);
    var dataset = sqlContext.createDataFrame(rdd, schema);

    var assembler = new VectorAssembler()
      .setInputCols(["hour", "mobile", "userFeatures"])
      .setOutputCol("features");

    var output = assembler.transform(dataset);



    return output;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript VectorAssemblerExample");
    var sc = new SparkContext(sparkConf);
    var output = run(sc);

    print(output.select("features", "clicked").first());
    // $example off$
    sc.stop();
}
