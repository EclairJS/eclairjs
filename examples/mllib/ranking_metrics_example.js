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
 bin/eclairjs.sh examples/mllib/ranking_metrics_example.js  [<path to file>]
 */

var RankingMetrics = require('eclairjs/mllib/evaluation').RankingMetrics;
var RegressionMetrics = require('eclairjs/mllib/evaluation').RegressionMetrics;
var ALS = require('eclairjs/mllib/recommendation/ALS');
var Rating = require('eclairjs/mllib/recommendation/Rating');
var List = require('eclairjs/List');
var Tuple = require('eclairjs/Tuple');
var PairRDD = require('eclairjs/PairRDD');

function run(sc) {

    var data = data = sc.textFile(filename);

    var ratings = data.map(function (line, Rating) {
        var arr = line.split("::");
        var r = new Rating(parseInt(arr[0]),
            parseInt(arr[1]),
            parseFloat(arr[2]) - 2.5);
        return r;
    }, [Rating]).cache();

    var model = ALS.train(ratings, 10, 10, 0.01);
    var userRecs = model.recommendProductsForUsers(10);

    var userRecommendedScaled = userRecs.map(function (val, Rating, Tuple) {
        var myRating = Rating; // FIXME: For now make a copy to pass to inner lambda
        var newRatings = val[1].map(function (r) {
            var newRating = Math.max(Math.min(r.rating(), 1.0), 0.0);
            return new Rating(r.user(), r.product(), newRating);
        });
        
        return new Tuple(val[0], newRatings);
    }, [Rating, Tuple]);

    var userRecommended = PairRDD.fromRDD(userRecommendedScaled);

    var binarizedRatings = ratings.map(function (r, Rating) {
        var binaryRating = 0.0;
        if (r.rating() > 0.0) {
            binaryRating = 1.0;
        }

        return new Rating(r.user(), r.product(), binaryRating);
    }, [Rating]);

    var userMovies = binarizedRatings.groupBy(function (r) {
        return r.user();
    });

    var userMoviesList = userMovies.mapValues(function (docs, List) {
        var products = new List();
        docs.forEach(function (r) {
            if (r.rating() > 0.0) {
                products.add(r.product());
            }
        });
        return products;
    }, [List]);

    var userRecommendedList = userRecommended.mapValues(function (docs, List) {
        print("List: "+List.toString ? List.toString() : List);
        var products = new List();
        docs.forEach(function (r) {
            products.add(r.product());
        });
        return products;
    }, [List]);

    var relevantDocs = userMoviesList.join(userRecommendedList).values();

    var metrics = RankingMetrics.of(relevantDocs);

// Precision and NDCG at k
    [1, 3, 5].forEach(function (k) {
        print("Precision at " + k + " = " + metrics.precisionAt(k));
        print("NDCG at " + k + " = " + metrics.ndcgAt(k));
    });

    print("Mean average precision = " + metrics.meanAveragePrecision());

    var userProducts = ratings.map(function (r, Tuple) {
        return new Tuple(r.user(), r.product());
    }, [Tuple]);


    var predictions = PairRDD.fromRDD(model.predict(userProducts).map(function (r, Tuple) {
        return new Tuple(new Tuple(r.user(), r.product()), r.rating());
    }, [Tuple]));


    var ratesAndPreds = PairRDD.fromRDD(ratings.map(function (r, Tuple) {
        return new Tuple(new Tuple(r.user(), r.product()), r.rating());
    }, [Tuple])).join(predictions).values();

// Create regression metrics object
    var regressionMetrics = new RegressionMetrics(ratesAndPreds);
    var ret = {};
    ret.RMSE = regressionMetrics.rootMeanSquaredError();
    ret.r2 = regressionMetrics.r2();
    return ret;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */
var filename = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_movielens_data.txt";

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var conf = new SparkConf().setAppName("Ranking Metrics Example");
    var sc = new SparkContext(conf);
    var result = run(sc);
    // Root mean squared error
    print("RMSE = " + result.RMSE);

    // R-squared
    print("R-squared = " + result.r2);

    sc.stop();
}
