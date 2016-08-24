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
 bin/eclairjs.sh examples/ml/decision_tree_regression_example.js"
 */


function run(spark) {

    var SQLContext = require('eclairjs/sql/SQLContext');
    var VectorIndexer = require('eclairjs/ml/feature/VectorIndexer');
    var DecisionTreeRegressor = require('eclairjs/ml/regression/DecisionTreeRegressor');
    var RegressionEvaluator = require('eclairjs/ml/evaluation/RegressionEvaluator');
    var Pipeline = require('eclairjs/ml/Pipeline');

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);
    // Load the data stored in LIBSVM format as a DataFrame.
    var data = sqlContext.read().format("libsvm")
        .load("examples/data/mllib/sample_libsvm_data.txt");

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

    // Train a DecisionTree model.
    var dt = new DecisionTreeRegressor()
        .setFeaturesCol("indexedFeatures");

    // Chain indexer and tree in a Pipeline
    var pipeline = new Pipeline()
        .setStages([featureIndexer, dt]);

    // Train model.  This also runs the indexer.
    var model = pipeline.fit(trainingData);

    // Make predictions.
    var predictions = model.transform(testData);
    var ret = {};
    ret.predictions = predictions;


    // Select (prediction, true label) and compute test error
    var evaluator = new RegressionEvaluator()
        .setLabelCol("label")
        .setPredictionCol("prediction")
        .setMetricName("rmse");
    ret.rmse = evaluator.evaluate(predictions);
    ret.treeModel = model.stages()[1];

    return ret;


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Decision Tree Regression Example")
            .getOrCreate();
    var result = run(spark);

    // Select example rows to display.
    result.predictions.select("label", "features").show(5);
    print("Root Mean Squared Error (RMSE) on test data = " + result.rmse);
    print("Learned regression tree model:\n" + result.treeModel.toDebugString());
    spark.stop();
}



