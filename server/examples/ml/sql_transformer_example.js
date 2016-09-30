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
    var StructField = require('eclairjs/sql/types/StructField');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Metadata = require('eclairjs/sql/types/Metadata');
    var SQLTransformer = require('eclairjs/ml/feature/SQLTransformer');


    // $example on$
    var data = [
      RowFactory.create([0, 1.0, 3.0]),
      RowFactory.create([2, 2.0, 5.0])
    ];
    var schema = new StructType( [
      new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
      new StructField("v1", DataTypes.DoubleType, false, Metadata.empty()),
      new StructField("v2", DataTypes.DoubleType, false, Metadata.empty())
    ]);
    var df = spark.createDataFrame(data, schema);

    var sqlTrans = new SQLTransformer().setStatement(
      "SELECT *, (v1 + v2) AS v3, (v1 * v2) AS v4 FROM __THIS__");

    var output=sqlTrans.transform(df);
    return output;


}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript SQLTransformer Example")
            .getOrCreate();
    var result = run(spark);
    result.show(20,true);

    // $example off$
    spark.stop();
}
