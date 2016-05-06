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
 bin/eclairjs.sh examples/ml/random_forest_classifier_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var StringIndexer = require("eclairjs/ml/feature/StringIndexer");
    var VectorIndexer = require("eclairjs/ml/feature/VectorIndexer");
    var IndexToString = require("eclairjs/ml/feature/IndexToString");
    var RandomForestClassifier = require("eclairjs/ml/classification/RandomForestClassifier");
    var MulticlassClassificationEvaluator = require("eclairjs/ml/evaluation/MulticlassClassificationEvaluator");
    var Pipeline = require("eclairjs/ml/Pipeline");


    var sqlContext = new SQLContext(sc);

    var data =
        sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

    // Index labels, adding metadata to the label column.
    // Fit on whole dataset to include all labels in index.
    var labelIndexer = new StringIndexer()
        .setInputCol("label")
        .setOutputCol("indexedLabel")
        .fit(data);
    // Automatically identify categorical features, and index them.
    // Set maxCategories so features with > 4 distinct values are treated as continuous.
    var featureIndexer = new VectorIndexer()
        .setInputCol("features")
        .setOutputCol("indexedFeatures")
        .setMaxCategories(4)
        .fit(data);

    // Split the data into training and test sets (30% held out for testing)
    var splits = data.randomSplit([0.7, 0.3]);
    var trainingData = splits[0];
    var testData = splits[1];

    // Train a RandomForest model.
    var rf = new RandomForestClassifier()
        .setLabelCol("indexedLabel")
        .setFeaturesCol("indexedFeatures");

    // Convert indexed labels back to original labels.
    var labelConverter = new IndexToString()
        .setInputCol("prediction")
        .setOutputCol("predictedLabel")
        .setLabels(labelIndexer.labels());

    // Chain indexers and forest in a Pipeline
    var pipeline = new Pipeline()
        .setStages([labelIndexer, featureIndexer, rf, labelConverter]);

    // Train model. This also runs the indexers.
    var model = pipeline.fit(trainingData);

    // Make predictions.
    var predictions = model.transform(testData);

    var ret = {};

    // Select example rows to display.
    ret.predictionsDF = predictions.select("predictedLabel", "label", "features");


    // Select (prediction, true label) and compute test error
    var evaluator = new MulticlassClassificationEvaluator()
        .setLabelCol("indexedLabel")
        .setPredictionCol("prediction")
        .setMetricName("precision");
    var accuracy = evaluator.evaluate(predictions);

    ret.accuracy = 1.0 - accuracy;
    ret.model = model.stages()[2];

    return ret;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.predictionsDF.show(5);
    print("Test Error = " + result.accuracy);
    print("Learned classification forest model:\n" + result.model.toDebugString());

    sc.stop();
}