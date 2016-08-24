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


    var Tokenizer = require('eclairjs/ml/feature/Tokenizer');
    var HashingTF = require('eclairjs/ml/feature/HashingTF');
    var LogisticRegression = require('eclairjs/ml/classification/LogisticRegression');
    var Pipeline = require('eclairjs/ml/Pipeline');
    var PipelineModel = require('eclairjs/ml/PipelineModel');
    var PipelineStage = require('eclairjs/ml/PipelineStage');
    var StructType = require('eclairjs/sql/types/StructType');
    var StructField = require('eclairjs/sql/types/StructField');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Metadata = require('eclairjs/sql/types/Metadata');
    var RowFactory = require('eclairjs/sql/RowFactory');

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

   function LabeledDocument(id, text, label)
   {
    this.id=id;
    this.text=text;
    this.label=label;
   }

   function Document(id, text)
   {
    this.id=id;
    this.text=text;
    }

    // Prepare training documents, which are labeled.
    var localTraining = [
      new LabeledDocument(0 , "a b c d e spark", 1.0),
      new LabeledDocument(1 , "b d", 0.0),
      new LabeledDocument(2 , "spark f g h", 1.0),
      new LabeledDocument(3 , "hadoop mapreduce", 0.0)];
    var training = sqlContext.createDataFrameFromJson(sc.parallelize(localTraining), {
        id:"Integer",
        text:"String",
        label:"Double"
    });

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
      .setRegParam(0.001);
    var pipeline = new Pipeline()
      .setStages([ tokenizer, hashingTF, lr]);

    // Fit the pipeline to training documents.
    var model = pipeline.fit(training);

    // Prepare test documents, which are unlabeled.
    localTest = [
      new Document(4, "spark i j k"),
      new Document(5, "l m n"),
      new Document(6, "spark hadoop spark"),
      new Document(7, "apache hadoop")];
    var test = sqlContext.createDataFrameFromJson(sc.parallelize(localTest), {
        id:"Integer",
        text:"String"
    });

    // Make predictions on test documents.
    var predictions = model.transform(test);
    var rows = predictions.select("id", "text", "probability", "prediction").collect();
     return rows;

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript SimpleTextClassificationPipeline Example")
            .getOrCreate();
    var result = run(spark);

    for (var i=0;i<result.length;i++)
    {
        var r=result[i];
      print("(" + r.get(0) + ", " + r.get(1) + ") --> prob=" + r.get(2) +
           ", prediction=" + r.get(3));

    }

    // $example off$
    spark.stop();
}
