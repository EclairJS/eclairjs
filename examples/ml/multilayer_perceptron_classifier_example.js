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
 bin/eclairjs.sh examples/ml/multilayer_perceptron_classifier_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var MultilayerPerceptronClassifier = require("eclairjs/ml/classification/MultilayerPerceptronClassifier");
    var MulticlassClassificationEvaluator = require("eclairjs/ml/evaluation/MulticlassClassificationEvaluator");


    var sqlContext = new SQLContext(sc);

    var path = "examples/data/mllib/sample_multiclass_classification_data.txt";
    var dataFrame = sqlContext.read().format("libsvm").load(path);
    // Split the data into train and test
    var splits = dataFrame.randomSplit([0.6, 0.4], 1234);
    var train = splits[0];
    var test = splits[1];
    // specify layers for the neural network:
    // input layer of size 4 (features), two intermediate of size 5 and 4
    // and output of size 3 (classes)
    var layers = [4, 5, 4, 3];
    // create the trainer and set its parameters
    var trainer = new MultilayerPerceptronClassifier()
        .setLayers(layers)
        .setBlockSize(128)
        .setSeed(1234)
        .setMaxIter(100);
    // train the model
    var model = trainer.fit(train);
    // compute precision on the test set
    var result = model.transform(test);
    var predictionAndLabels = result.select("prediction", "label");
    var evaluator = new MulticlassClassificationEvaluator()
        .setMetricName("precision");
    return  evaluator.evaluate(predictionAndLabels);


}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("KMeans Example");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    print("Precision = " + results);

    sc.stop();
}