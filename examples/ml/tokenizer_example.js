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

function run(spark) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Tokenizer = require('eclairjs/ml/feature/Tokenizer');
    var RegexTokenizer = require('eclairjs/ml/feature/RegexTokenizer');

    var rows = [
      RowFactory.create(0, "Hi I heard about Spark"),
      RowFactory.create(1, "I wish Java could use case classes"),
      RowFactory.create(2, "Logistic,regression,models,are,neat")
    ];

    var schema = new StructType([
      new StructField("label", DataTypes.IntegerType, false, Metadata.empty()),
      new StructField("sentence", DataTypes.StringType, false, Metadata.empty())
    ]);

    var sentenceDataFrame = spark.createDataFrame(rows, schema);

    var tokenizer = new Tokenizer().setInputCol("sentence").setOutputCol("words");

    var wordsDataFrame = tokenizer.transform(sentenceDataFrame);
    var output="";
    var wordList=wordsDataFrame.select("words", "label"). take(3);

    print(JSON.stringify(wordList))
    for (var i=0;i<wordList.length;i++) {
      var words = wordList[i].getList(0);
        words = words.concat(['cccc', 'yyy']);
      for (var inx=0;inx<words.length;inx++) output+=words[inx] + " ";
      output+="\n";
    }

    var regexTokenizer = new RegexTokenizer()
      .setInputCol("sentence")
      .setOutputCol("words")
      .setPattern("\\W");  // alternatively .setPattern("\\w+").setGaps(false);


    return output;

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Tokenizer Example")
            .getOrCreate();
    var result = run(spark);

    print(result);
    // $example off$
    spark.stop();
}
