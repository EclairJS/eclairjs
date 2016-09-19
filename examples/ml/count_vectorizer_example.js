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
 bin/eclairjs.sh examples/ml/count_vertorizer_example.js"
 */


function run(spark) {

    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var ArrayType = require('eclairjs/sql/types/ArrayType');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var CountVectorizer = require('eclairjs/ml/feature/CountVectorizer');
    var CountVectorizerModel = require('eclairjs/ml/feature/CountVectorizerModel');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');

    // Input data: Each row is a bag of words from a sentence or document.
    var rdd = spark.sparkContext().parallelize([
        RowFactory.create([["a", "b", "c"]]),
        RowFactory.create([["a", "b", "b", "c", "a"]])
    ]);
    var schema = new StructType([
        new StructField("text", new ArrayType(DataTypes.StringType, true), false, Metadata.empty())
    ]);
    var df = spark.createDataFrame(rdd, schema);

    // fit a CountVectorizerModel from the corpus
    var cvModel = new CountVectorizer()
        .setInputCol("text")
        .setOutputCol("feature")
        .setVocabSize(3)
        .setMinDF(2)
        .fit(df);

    // alternatively, define CountVectorizerModel with a-priori vocabulary
    var cvm = new CountVectorizerModel(["a", "b", "c"])
        .setInputCol("text")
        .setOutputCol("feature");

    return cvModel.transform(df);
}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Vectorizer Example")
            .getOrCreate();
    var result = run(spark);
    result.show();
    spark.stop();
}

