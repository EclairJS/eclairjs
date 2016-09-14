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
 bin/eclairjs.sh examples/ml/word2vec_example.js"
 */

var ArrayType = require('eclairjs/sql/types/ArrayType');
var DataTypes = require('eclairjs/sql/types/DataTypes');
var StructField = require('eclairjs/sql/types/StructField');
var StructType = require('eclairjs/sql/types/StructType');
var Metadata = require('eclairjs/sql/types/Metadata');
var SQLContext = require('eclairjs/sql/SQLContext');
var RowFactory = require('eclairjs/sql/RowFactory');
var Word2Vec = require('eclairjs/ml/feature/Word2Vec');


function run(spark) {
    // Input data: Each row is a bag of words from a sentence or document.
    var rows = [
        RowFactory.create(["Hi I heard about Spark".split(" ")]),
        RowFactory.create(["I wish Java could use case classes".split(" ")]),
        RowFactory.create(["Logistic regression models are neat".split(" ")])
    ] ;
    var sf = new StructField("text", new ArrayType(DataTypes.StringType, true), false, Metadata.empty());
    var sfa = [sf];
    var schema = new StructType(sfa);
    var documentDF = spark.createDataFrame(rows, schema);

    // Learn a mapping from words to Vectors.
    var word2Vec = new Word2Vec()
        .setInputCol("text")
        .setOutputCol("result")
        .setVectorSize(3)
        .setMinCount(0);
    var model = word2Vec.fit(documentDF);
    var result = model.transform(documentDF);
    var rows = result.select("result").take(3);
    return rows;
}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Word2Vec Example")
            .getOrCreate();
    var result = run(spark);
    result.forEach(function (r) {
        print(r);
    })
    spark.stop();
}


