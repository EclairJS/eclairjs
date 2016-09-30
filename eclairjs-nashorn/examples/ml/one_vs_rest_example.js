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
 bin/eclairjs.sh examples/ml/one_vs_rest_example.js"
 */

function run(spark) {
    var LogisticRegression = require('eclairjs/ml/classification/LogisticRegression');
    var OneVsRest = require('eclairjs/ml/classification/OneVsRest');
    var MulticlassClassificationEvaluator = require('eclairjs/ml/evaluation/MulticlassClassificationEvaluator');


    var inputdata = spark.read().format("libsvm")
        .load("examples/data/mllib/sample_multiclass_classification_data.txt");

    // Split the data into train and test
    var splits = inputdata.randomSplit([0.8, 0.2]);
    var train = splits[0];
    var test = splits[1];

    // configure the base classifier.
    var classifier = new LogisticRegression()
      .setMaxIter(10)
      .setTol(1E-6)
      .setFitIntercept(true);

    // instantiate the One Vs Rest Classifier.
    var ovr = new OneVsRest().setClassifier(classifier);

    // train the multiclass model.
    var ovrModel = ovr.fit(train);

    
    // score the model on test data.
    var predictions = ovrModel.transform(test).select("prediction", "label");

    // obtain evaluator.
    var evaluator = new MulticlassClassificationEvaluator().setMetricName("accuracy");

    // compute the classification error on test data.
    var accuracy = evaluator.evaluate(predictions);
    return accuracy;
}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript OneVsRest Example")
            .getOrCreate();
    var result = run(spark);
    print("Test Error : " + (1 - result));

    spark.stop();
}
