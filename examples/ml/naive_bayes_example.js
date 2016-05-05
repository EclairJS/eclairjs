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
 bin/eclairjs.sh examples/ml/naive_bayes_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var NaiveBayes = require("eclairjs/ml/classification/NaiveBayes");
    var MulticlassClassificationEvaluator = require("eclairjs/ml/evaluation/MulticlassClassificationEvaluator");


    var sqlContext = new SQLContext(sc);

    // Load training data
    var dataFrame = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");
    // Split the data into train and test
    var splits = dataFrame.randomSplit([0.6, 0.4], 1234);
    var train = splits[0];
    var test = splits[1];

    // create the trainer and set its parameters
    var nb = new NaiveBayes();
    // train the model
    var model = nb.fit(train);
    // compute precision on the test set
    var result = model.transform(test);
    var predictionAndLabels = result.select("prediction", "label");
    var evaluator = new MulticlassClassificationEvaluator()
        .setMetricName("precision");
    return evaluator.evaluate(predictionAndLabels);

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    print("Precision = " + results);

    sc.stop();
}