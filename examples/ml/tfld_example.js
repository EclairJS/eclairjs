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

    var sqlContext = new SQLContext(sc);
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require('eclairjs/sql/types/StructType');
    var StructField = require('eclairjs/sql/types/StructField');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Metadata = require('eclairjs/sql/types/Metadata');
    var Tokenizer = require('eclairjs/ml/feature/Tokenizer');
    var HashingTF = require('eclairjs/ml/feature/HashingTF');
    var IDF = require('eclairjs/ml/feature/IDF');



    var jrdd = sc.parallelize([
      RowFactory.create(0, "Hi I heard about Spark"),
      RowFactory.create(0, "I wish Java could use case classes"),
      RowFactory.create(1, "Logistic regression models are neat")
    ]);
    var schema = new StructType([
      new StructField("label", DataTypes.DoubleType, false, Metadata.empty()),
      new StructField("sentence", DataTypes.StringType, false, Metadata.empty())
    ]);

    var sentenceData = sqlContext.createDataFrame(jrdd, schema);
    var tokenizer = new Tokenizer().setInputCol("sentence").setOutputCol("words");
    var wordsData = tokenizer.transform(sentenceData);
    var numFeatures = 20;
    var hashingTF = new HashingTF()
      .setInputCol("words")
      .setOutputCol("rawFeatures")
      .setNumFeatures(numFeatures);
    var featurizedData = hashingTF.transform(wordsData);
    var idf = new IDF().setInputCol("rawFeatures").setOutputCol("features");
    var idfModel = idf.fit(featurizedData);
    var rescaledData = idfModel.transform(featurizedData);
    var rows=rescaledData.select("features", "label").take(3);

    return rows;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript TfldExample");
    var sc = new SparkContext(sparkConf);
    var output = run(sc);

    for (var i=0; i<output.length; i++) {
        var r=output[i];
      var features = r.get(0);
      var label = r.getDouble(1);
      print(features);
      print(label);
    }

    // $example off$
    sc.stop();
}
