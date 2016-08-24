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
 bin/eclairjs.sh examples/ml/gradient_boosted_tree_regressor_example.js"
 */


function run(spark) {

    var SQLContext = require('eclairjs/sql/SQLContext');
    var VectorIndexer = require('eclairjs/ml/feature/VectorIndexer');
    var GBTRegressor = require('eclairjs/ml/regression/GBTRegressor');
    var Pipeline = require('eclairjs/ml/Pipeline');
    var RegressionEvaluator = require('eclairjs/ml/evaluation/RegressionEvaluator');

    var result = {};
    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

    // Load and parse the data file, converting it to a DataFrame.
    var data =
        sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

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

    // Train a GBT model.
    var gbt = new GBTRegressor()
        .setLabelCol("label")
        .setFeaturesCol("indexedFeatures")
        .setMaxIter(10);

    // Chain indexer and GBT in a Pipeline
    var pipeline = new Pipeline().setStages([featureIndexer, gbt]);

    // Train model.  This also runs the indexer.
    var model = pipeline.fit(trainingData);

    // Make predictions.
    var predictions = model.transform(testData);

    // Select example rows to display.
    result.predictionDF = predictions.select("prediction", "label", "features");

    // Select (prediction, true label) and compute test error
    var evaluator = new RegressionEvaluator()
        .setLabelCol("label")
        .setPredictionCol("prediction")
        .setMetricName("rmse");
    result.rmse = evaluator.evaluate(predictions);
    result.gbtModel = model.stages()[1];

    return result;

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript Gradient Boosted Tree Regressor Example")
            .getOrCreate();
    var result = run(spark);
    result.predictionDF.show(5);
    print("Root Mean Squared Error (RMSE) on test data = " + result.rmse);
    print("Learned regression GBT model:\n" + result.gbtModel.toDebugString());

    spark.stop();
}
