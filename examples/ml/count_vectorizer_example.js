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


function run(sc) {

    var SQLContext = require('eclairjs/sql/SQLContext');
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

    var sqlContext = new SQLContext(sc);

    // Input data: Each row is a bag of words from a sentence or document.
    var rdd = sc.parallelize([
        RowFactory.create([["a", "b", "c"]]),
        RowFactory.create([["a", "b", "b", "c", "a"]])
    ]);
    var schema = new StructType([
        new StructField("text", new ArrayType(DataTypes.StringType, true), false, Metadata.empty())
    ]);
    var df = sqlContext.createDataFrame(rdd, schema);

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
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript Vectorizer Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.show();
    sc.stop();
}

