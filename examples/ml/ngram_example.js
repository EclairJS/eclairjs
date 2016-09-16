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
 bin/eclairjs.sh examples/ml/ngram_example.js"
 */

function run(spark) {
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require("eclairjs/sql/types/StructType");
    var StructField = require("eclairjs/sql/types/StructField");
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var NGram = require("eclairjs/ml/feature/NGram");

    var data = [
        RowFactory.create(0.0, ["Hi", "I", "heard", "about", "Spark"]),
        RowFactory.create(1.0, ["I", "wish", "Java", "could", "use", "case", "classes"]),
        RowFactory.create(2.0, ["Logistic", "regression", "models", "are", "neat"])
    ];

    var schema = new StructType([
        new StructField("label", DataTypes.DoubleType, false, Metadata.empty()),
        new StructField(
            "words", DataTypes.createArrayType(DataTypes.StringType), false, Metadata.empty())
    ]);

    var wordDataFrame = spark.createDataFrame(data, schema);

    var ngramTransformer = new NGram().setInputCol("words").setOutputCol("ngrams");

    var ngramDataFrame = ngramTransformer.transform(wordDataFrame);

    return ngramDataFrame.select("ngrams", "label").take(3);


}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript NGram Example")
            .getOrCreate();
    var result = run(spark);
    print(JSON.stringify(result));
    result.forEach(function (r) {
        var ngrams = r.getList(0);
        var ngram = "";
        ngrams.forEach(function (n) {
            ngram = n + " --- " + ngram;
        });
        print(ngram);
    });

    spark.stop();
}
