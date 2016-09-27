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
 bin/eclairjs.sh examples/ml/pipeline_example.js"
 */

function run(spark) {
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require("eclairjs/sql/types/StructType");
    var StructField = require("eclairjs/sql/types/StructField");
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var Tokenizer = require("eclairjs/ml/feature/Tokenizer");
    var HashingTF = require("eclairjs/ml/feature/HashingTF");
    var LogisticRegression = require("eclairjs/ml/classification/LogisticRegression");
    var Pipeline = require("eclairjs/ml/Pipeline");


    var schema = new StructType([
        new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("text", DataTypes.StringType, false, Metadata.empty()),
        new StructField("label", DataTypes.DoubleType, false, Metadata.empty())
    ]);

    // Prepare training documents, which are labeled.
    var training = spark.createDataFrame([
        RowFactory.create(0, "a b c d e spark", 1.0),
        RowFactory.create(1, "b d", 0.0),
        RowFactory.create(2, "spark f g h", 1.0),
        RowFactory.create(3, "hadoop mapreduce", 0.0)
    ], schema);

    // Configure an ML pipeline, which consists of three stages: tokenizer, hashingTF, and lr.
    var tokenizer = new Tokenizer()
        .setInputCol("text")
        .setOutputCol("words");
    var hashingTF = new HashingTF()
        .setNumFeatures(1000)
        .setInputCol(tokenizer.getOutputCol())
        .setOutputCol("features");
    var lr = new LogisticRegression()
        .setMaxIter(10)
        .setRegParam(0.01);
    var pipeline = new Pipeline()
        .setStages([tokenizer, hashingTF, lr]);

    // Fit the pipeline to training documents.
    var model = pipeline.fit(training);

    var schema2 = new StructType([
        new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("text", DataTypes.StringType, false, Metadata.empty())
    ]);

    // Prepare test documents, which are unlabeled.
    var test = spark.createDataFrame([
        RowFactory.create(4, "spark i j k"),
        RowFactory.create(5, "l m n"),
        RowFactory.create(6, "mapreduce spark"),
        RowFactory.create(7, "apache hadoop")
    ], schema2);

    // Make predictions on test documents.
    var predictions = model.transform(test);
    var rows = predictions.select("id", "text", "probability", "prediction").collect();


    return rows;

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Pipeline Example")
            .getOrCreate();
    var result = run(spark);
    result.forEach(function (r) {
        print("(" + r.get(0) + ", " + r.get(1) + ") --> prob=" + r.get(2)
            + ", prediction=" + r.get(3));
    });

    spark.stop();
}
