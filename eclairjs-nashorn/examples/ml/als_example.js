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
 bin/eclairjs.sh examples/ml/als_example.js"
 */

function run(spark) {

    function parseRating(str) {
        var RowFactory = require('eclairjs/sql/RowFactory');
        var fields = str.split("::");
        if (fields.length != 4) {
            throw("Each line must contain 4 fields");
        }
        var userId = parseInt(fields[0]);
        var movieId = parseInt(fields[1]);
        var rating = parseFloat(fields[2]);
        var timestamp = parseInt(fields[3]);

        return RowFactory.create([userId, movieId, rating, timestamp]);
    }

    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var ALS = require('eclairjs/ml/recommendation/ALS');
    var RegressionEvaluator = require('eclairjs/ml/evaluation/RegressionEvaluator');

    var ratingsRDD = spark
        .read().textFile("examples/data/mllib/als/sample_movielens_ratings.txt").toRDD()
        .map(parseRating);

    var schema = new StructType([
        new StructField("userId", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("movieId", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("rating", DataTypes.FloatType, false, Metadata.empty()),
        new StructField("timestamp", DataTypes.DoubleType, false, Metadata.empty())
    ]);
    var ratings = spark.createDataFrame(ratingsRDD, schema);
    var splits = ratings.randomSplit([0.8, 0.2]);
    var training = splits[0];
    var test = splits[1];

// Build the recommendation model using ALS on the training data
    var als = new ALS()
        .setMaxIter(5)
        .setRegParam(0.01)
        .setUserCol("userId")
        .setItemCol("movieId")
        .setRatingCol("rating");
    var model = als.fit(training);

// Evaluate the model by computing the RMSE on the test data
    var rawPredictions = model.transform(test);
    var predictions = rawPredictions
        .withColumn("rating", rawPredictions.col("rating").cast(DataTypes.DoubleType))
        .withColumn("prediction", rawPredictions.col("prediction").cast(DataTypes.DoubleType));

    var evaluator = new RegressionEvaluator()
        .setMetricName("rmse")
        .setLabelCol("rating")
        .setPredictionCol("prediction");
    var rmse = evaluator.evaluate(predictions);
    return rmse;

}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript ALS Example")
            .getOrCreate();
    var result = run(spark);
    print("Root-mean-square error = " + result);
    spark.stop();
}
