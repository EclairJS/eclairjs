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

    var SQLContext = require('eclairjs/sql/SQLContext');
    var NumericAttribute = require('eclairjs/ml/attribute/NumericAttribute');
    var AttributeGroup = require('eclairjs/ml/attribute/AttributeGroup');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var StructType = require('eclairjs/sql/types/StructType');
    var VectorSlicer = require('eclairjs/ml/feature/VectorSlicer');

    var sc = spark.sparkContext();
    var sql = new SQLContext(sc);

    // $example on$
    var attrs = [
      NumericAttribute.defaultAttr().withName("f1"),
      NumericAttribute.defaultAttr().withName("f2"),
      NumericAttribute.defaultAttr().withName("f3")
    ];

    var group = new AttributeGroup("userFeatures", attrs);

    var  rdd = sc.parallelize([
      RowFactory.create(Vectors.sparse(3, [0, 1], [-2.0, 2.3])),
      RowFactory.create(Vectors.dense([-2.0, 2.3, 0.0]))
    ]);

    var dataset = sql.createDataFrame(rdd, (new StructType()).add(group.toStructField()));

    var vectorSlicer = new VectorSlicer()
      .setInputCol("userFeatures").setOutputCol("features");

    vectorSlicer.setIndices([1]).setNames(["f3"]);
    // or slicer.setIndices(new int[]{1, 2}), or slicer.setNames(new String[]{"f2", "f3"})

    var output = vectorSlicer.transform(dataset);
    return output;

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript VectorSlicer Example")
            .getOrCreate();
    var result = run(spark);

    print(result.select("userFeatures", "features").first());
    // $example off$
    spark.stop();
}
