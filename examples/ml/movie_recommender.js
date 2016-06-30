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
 This example is based on https://github.com/jadianes/spark-movie-lens/blob/master/notebooks/building-recommender.ipynb
 */

/*
 Usage:
 bin/eclairjs.sh examples/ml/movie_recommender.js"
 */

function run(sc) {
    var start = new Date().getTime();

    function parseRating(str) {
        var RowFactory = require('eclairjs/sql/RowFactory');
        var fields = str.split(",");
        if (fields.length != 4) {
            throw("Each line must contain 4 fields");
        }
        var userId = parseInt(fields[0]);
        var movieId = parseInt(fields[1]);
        var rating = parseFloat(fields[2]);
        var timestamp = parseInt(fields[3]);

        return RowFactory.create([userId, movieId, rating, timestamp]);
    }

    function parseMovie(str) {
        // movieId,title,genres
        var RowFactory = require('eclairjs/sql/RowFactory');
        var fields = str.split(",");
       // print("str " + str + " length " + fields.length)
        var movieId = parseInt(fields[0]);
        var title = fields[1];
        var genres = fields[2]; // Adventure|Animation|Children|Comedy|Fantasy
        if (fields.length >3) {
            /*
            deal with movie titles that have a comma in them
             "American President, The (1995)"
             */
            title = fields[1] + fields[2];
            genres = fields[3]
        }

        return RowFactory.create([movieId, title, genres]);
    }

    var SQLContext = require('eclairjs/sql/SQLContext');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var ALS = require('eclairjs/ml/recommendation/ALS');
    var RegressionEvaluator = require('eclairjs/ml/evaluation/RegressionEvaluator');


    var sqlContext = new SQLContext(sc);

    /*
    load ratings small dataset
     */

    var small_ratings_raw_data = sc.textFile('examples/data/mllib/ml-latest-small/ratings.csv');
    var small_ratings_raw_data_header = small_ratings_raw_data.take(1)[0];
    var small_ratings_data = small_ratings_raw_data.filter(function(line, small_ratings_raw_data_header) {
            // filters out the header
            return line != small_ratings_raw_data_header;
        }, [small_ratings_raw_data_header])
        .map(parseRating);

    var ratingSchema = new StructType([
        new StructField("userId", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("movieId", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("rating", DataTypes.FloatType, false, Metadata.empty()),
        new StructField("timestamp", DataTypes.DoubleType, false, Metadata.empty())
    ]);
    var small_ratings_dataframe = sqlContext.createDataFrame(small_ratings_data, ratingSchema);
    print("small_ratings_dataframe " + JSON.stringify(small_ratings_dataframe.take(3)));

    /*
    load movie dataset small
     */

    var small_movies_raw_data = sc.textFile('examples/data/mllib/ml-latest-small/movies.csv');
    var small_movies_raw_data_header = small_movies_raw_data.take(1)[0];
    var small_movies_data = small_movies_raw_data.filter(function(line, small_movies_raw_data_header) {
            // filters out the header
            return line != small_movies_raw_data_header;
        }, [small_movies_raw_data_header])
        .map(parseMovie).cache();

    var movieSchema = new StructType([
        new StructField("movieId", DataTypes.IntegerType, false, Metadata.empty()),
        new StructField("title", DataTypes.StringType, false, Metadata.empty()),
        new StructField("genres", DataTypes.StringType, false, Metadata.empty())
    ]);
    var small_movie_dataframe = sqlContext.createDataFrame(small_movies_data, movieSchema);
    print("small_ratings_dataframe " + JSON.stringify(small_ratings_dataframe.take(3)));

    var small_movies_titles = small_movie_dataframe.select("movieId", "title");
    print("small_movies_titles " + JSON.stringify(small_movies_titles.take(3)));


    var seed = 0;
    //var split = small_ratings_dataframe.randomSplit([0.6, 0.2, 0.2], seed)
    var split = small_ratings_dataframe.randomSplit([0.8, 0.2, 0.2])
    var training_DF = split[0];
    //var validation_DF = split[2];
    var test_DF = split[1];

   /* var  validation_for_predict_DF = validation_DF.select("userId", "movieId");
     print("validation_for_predict_DF " + JSON.stringify(validation_for_predict_DF.take(3)));

    var test_for_predict_DF = test_DF.select("userId", "movieId");

    print("test_for_predict_DF " + JSON.stringify(test_for_predict_DF.take(3)));
*/
    seed = 5
    var iterations = 10
    var regularization_parameter = 0.1
    var ranks = [4, 8, 12];
    var errors = [0, 0, 0];
    var err = 0
    var tolerance = 0.02

    var min_error = Number.POSITIVE_INFINITY
    var best_rank = -1
    var best_iteration = -1
    var blocks = -1;
    var lambda = regularization_parameter;

    ranks.forEach(function(rank) {
        //print("rank " + rank);
       // var model = ALS.train(training_RDD, rank, iterations, regularization_parameter, blocks, seed);
        // Build the recommendation model using ALS on the training data
        var als = new ALS()
           // .setRank(rank)
            .setMaxIter(5)
            .setRegParam(0.01)
            //.setNumBlocks(blocks)
           // .setSeed(seed)
            .setUserCol("userId")
            .setItemCol("movieId")
            .setRatingCol("rating");
        var model = als.fit(training_DF);
        //print(JSON.stringify(model.userFeatures()));
        // Evaluate the model by computing the RMSE on the test data
        var rawPredictions = model.transform(test_DF);
        var predictions = rawPredictions
            .withColumn("rating", rawPredictions.col("rating").cast(DataTypes.DoubleType))
            .withColumn("prediction", rawPredictions.col("prediction").cast(DataTypes.DoubleType));
        print("rawPredictions " + JSON.stringify(rawPredictions));
        var evaluator = new RegressionEvaluator()
            .setMetricName("rmse")
            .setLabelCol("rating")
            .setPredictionCol("prediction");
        /*
        FIXME we are blocked until this issue is resolved
         RegressionEvaluator returns NaN for ALS in Spark ml
         https://issues.apache.org/jira/browse/SPARK-14489?jql=text%20~%20%22RegressionEvaluator%22
         */
        var rmse = evaluator.evaluate(predictions);

        errors[err] = rmse;
        err += 1;
        print("For rank " +  rank + " the RMSE is " +  rmse);
        if (rmse < min_error) {
            min_error = rmse;
            best_rank = rank;
        }

    });
    print("The best model was trained with rank " +best_rank);



    var end = new Date().getTime();
    var time = end - start;
    print('Execution time: ' + time + " milliseconds");


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript Movie");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

    sc.stop();
}
