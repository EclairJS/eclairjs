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
 bin/eclairjs.sh examples/ml/tokenizer_example.js"
 */

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Tokenizer = require('eclairjs/ml/feature/Tokenizer');
    var RegexTokenizer = require('eclairjs/ml/feature/RegexTokenizer');
    var functions = require('eclairjs/sql/functions');

    var sqlContext = new SQLContext(sc);

    var jrdd = sc.parallelize([
      RowFactory.create(0, "Hi I heard about Spark"),
      RowFactory.create(1, "I wish Java could use case classes"),
      RowFactory.create(2, "Logistic,regression,models,are,neat")
    ]);

    var schema = new StructType([
      new StructField("label", DataTypes.IntegerType, false, Metadata.empty()),
      new StructField("sentence", DataTypes.StringType, false, Metadata.empty())
    ]);

    var sentenceDataFrame = sqlContext.createDataFrame(jrdd, schema);

    var tokenizer = new Tokenizer().setInputCol("sentence").setOutputCol("words");

    var regexTokenizer = new RegexTokenizer()
      .setInputCol("sentence")
      .setOutputCol("words")
      .setPattern("\\W");  // alternatively .setPattern("\\w+").setGaps(false);

    sqlContext.udf().register("countTokens", function(words){
        return words.length;
    }, DataTypes.IntegerType);

    var tokenized = tokenizer.transform(sentenceDataFrame);
    var tokenizedResult = tokenized.select("sentence", "words")
        .withColumn("tokens", functions.callUDF("countTokens", functions.col("words")));

    var regexTokenized = regexTokenizer.transform(sentenceDataFrame);
    var regexTokenizedResult = regexTokenized.select("sentence", "words")
        .withColumn("tokens", functions.callUDF("countTokens", functions.col("words")));

    return {
                "tokenizedResult": tokenizedResult,
                "regexTokenizedResult": regexTokenizedResult
            };

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript TokenizerExample");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    results.tokenizedResult.show(false);
    results.regexTokenizedResult.show(false);

    sc.stop();
}
