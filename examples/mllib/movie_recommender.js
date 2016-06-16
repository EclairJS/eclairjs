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
 bin/eclairjs.sh examples/mllib/movie_recommennder.js"
 */

function run(sc) {
   /* var x = parseInt("1");
    print(x.getClass())
    parseInt = java.lang.Integer.parseInt;
    x = parseInt("1");
    print(x.getClass())
    */

    var start = new Date().getTime();

    //var Tuple = require('eclairjs/Tuple');
    var Tuple2 = require('eclairjs/Tuple2');
    var Tuple3 = require('eclairjs/Tuple3');
    var List = require('eclairjs/List');
    var ALS = require('eclairjs/mllib/recommendation/ALS');
    var Rating = require('eclairjs/mllib/recommendation/Rating');

    var small_ratings_raw_data = sc.textFile('examples/data/mllib/ml-latest-small/ratings.csv');
    var small_ratings_raw_data_header = small_ratings_raw_data.take(1)[0];
    var small_ratings_data = small_ratings_raw_data.filter(function(line, small_ratings_raw_data_header) {
        // filters out the header
        return line != small_ratings_raw_data_header;
    }, [small_ratings_raw_data_header])
    .map(function(line) {
        var tokens = line.split(",");
        return new Rating(tokens[0],tokens[1],tokens[2]);
    })
    .cache()
    //print(small_ratings_data.take(3));

    var small_movies_raw_data = sc.textFile('examples/data/mllib/ml-latest-small/movies.csv');
    var small_movies_raw_data_header = small_movies_raw_data.take(1)[0];
    var small_movies_data = small_movies_raw_data.filter(function(line, small_movies_raw_data_header) {
            // filters out the header
            return line != small_movies_raw_data_header;
        }, [small_movies_raw_data_header])

        .map(function(line) {
            var fields = line.split(",");
            return new Tuple2(parseInt(fields[0]), fields[1]);

        }).cache();

    var small_movies_titles = small_movies_data.mapToPair(
        function( tuple2) { // Tuple2
           // print("tuple2 = " + tuple2);
           // print("tuple2 JSON= " + JSON.stringify(tuple2));
           // print("JSON= " + JSON.stringify(["a", {"a":1}]));
            return new Tuple2(tuple2._1(), tuple2._2());

        });
    print("small_movies_titles " + small_movies_titles.take(3));

    var seed = 0;
    var split = small_ratings_data.randomSplit([0.6, 0.2, 0.2], seed)
    var training_RDD = split[0];
    var validation_RDD = split[1];
    var test_RDD = split[2];

    var  validation_for_predict_RDD = validation_RDD.map(function(rating) {
            return new Tuple2(rating.user(), rating.product());

    });
   // print(validation_for_predict_RDD.take(3));

    var test_for_predict_RDD = test_RDD.map(function(rating) {
            return new Tuple2(rating.user(), rating.product());

    });

    //print(test_for_predict_RDD.take(3));

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
        var model = ALS.train(training_RDD, rank, iterations, regularization_parameter, blocks, seed);
        //print(JSON.stringify(model.userFeatures()));
        var predictions = model.predict(validation_for_predict_RDD)
            .mapToPair(function(rating) {
                return new Tuple2(new Tuple2(rating.user(), rating.product()), rating.rating());
            }
        );

        //print("predict " + predictions.take(3));

        var rates_and_preds = validation_RDD.mapToPair( function(rating) {
                return new Tuple2(new Tuple2(rating.user(), rating.product()), rating.rating());

        })
        .join(predictions);

        //print("rates_and_preds " + rates_and_preds.take(3));

        var t = rates_and_preds.mapToFloat(function(tuple) {
                // Rating object
                /*System.out.println("x._1 " + x._1);
                 System.out.println("x._2 " + x._2);*/
                var x1 = tuple._1(); // Tuple2
           // print("x1 " + x1);
                var x2 = tuple._2(); // Tuple2
           // print("x2 " + x2);
                var a =  x2._1();
                var y =x2._1() - x2._2(); // ([1][0] - r[1][1])**2
           // print("y " + y);
                return Math.pow(y, 2);

        });
        var error = Math.sqrt(t.mean());
       // print("error " + error);
        errors[err] = error;
        err += 1;
       // print("For rank " +  rank + " the RMSE is " +  error);
        if (error < min_error) {
            min_error = error;
            best_rank = rank;
        }

    });
    print("The best model was trained with rank " +best_rank);

    /*
     In order to build our recommender model, we will use the complete dataset.

     */
  //  var complete_ratings_raw_data = sc.textFile("examples/data/mllib/ml-latest-small/ratings.csv");
    var complete_ratings_raw_data = sc.textFile("examples/data/mllib/ml-latest/ratings.csv");
    var complete_ratings_raw_data_header = complete_ratings_raw_data.take(1)[0];

    var complete_ratings_data = complete_ratings_raw_data.filter(function (line, complete_ratings_raw_data_header) {
        return line != complete_ratings_raw_data_header;
    }, [complete_ratings_raw_data_header])
    .map(function( line) {
        var fields = line.split(",");
        var userId = parseInt(fields[0]);
        var movieId = parseInt(fields[1]);
        var rating = parseFloat(fields[2]);
        return new Rating(userId, movieId, rating);

    })
    .cache();

   // print("There are recommendations in the complete dataset:  " + complete_ratings_data.count());

    var splits2 = complete_ratings_data.randomSplit([0.7, 0.3], 0);
    training_RDD = splits2[0];
    test_RDD = splits2[1];

    var complete_model = ALS.train(training_RDD, best_rank, iterations, regularization_parameter, blocks, seed);
    //print("complete_model:  " + complete_model.userFeatures());
    /*
     Now we test on our testing set.
     */
    test_for_predict_RDD = test_RDD.map(function (rating) {
            return new Tuple2(rating.user(), rating.product());

    } );

    var predictions = complete_model.predict(test_for_predict_RDD)
        .mapToPair(function( rating) {
            return new Tuple2(new Tuple2(rating.user(), rating.product()), rating.rating());

        });

    var rates_and_preds = test_RDD.mapToPair(function( rating) {
            return new Tuple2(new Tuple2(rating.user(), rating.product()), rating.rating());

    })
    .join(predictions);


    var t = rates_and_preds.mapToFloat( function( x) {
            // Rating object
            /*System.out.println("x._1 " + x._1);
             System.out.println("x._2 " + x._2);*/
            var x1 = x._1();
            var x2 = x._2();
            var a =  x2._1();
            var y = x2._1() - x2._2(); // ([1][0] - r[1][1])**2
            //return new Tuple2(x.user(), x.product());
            return Math.pow(y, 2);


    });
    var error = Math.sqrt(t.mean());
    print("For testing data the RMSE is " + error);

    /*
     How to make recommendations
     So let's first load the movies complete file for later use.
     */

    var complete_movies_raw_data = sc.textFile('examples/data/mllib/ml-latest/movies.csv');
    //var complete_movies_raw_data = sc.textFile('examples/data/mllib/ml-latest-small/movies.csv');
    var complete_movies_raw_data_header = complete_movies_raw_data.take(1)[0];
    var complete_movies_data = complete_movies_raw_data.filter(function(line, complete_movies_raw_data_header) {
            // filters out the header
            return line != complete_movies_raw_data_header;
        }, [complete_movies_raw_data_header])

        .map(function(line) {
            var fields = line.split(",");
            //var x = java.lang.Integer.parseInt(fields[0]);
            var x = parseInt(fields[0]);
            //print("x " + x)
           // var t = new Tuple2(x, fields[1]);
            //print("t " + t);
            return new Tuple2(x, fields[1]);

        }).cache();

    var complete_movies_titles = complete_movies_data.mapToPair(
        function( tuple2) { // Tuple2
            return new Tuple2(tuple2._1(), tuple2._2());

        });

    //print("There are movies in the complete dataset " + complete_movies_titles.count());

    /*
     Another thing we want to do, is give recommendations
     of movies with a certain minimum number of ratings. For that, we need to count the number of ratings per movie.
     */
    var movie_ID_with_ratings_RDD = complete_ratings_data.mapToPair(function( rating) {
            return new Tuple2(rating.product(), rating.rating());

    })
    .groupByKey();

    var movie_ID_with_avg_ratings_RDD = movie_ID_with_ratings_RDD.mapToPair(function( ID_and_ratings_tuple) {

            var w = ID_and_ratings_tuple._2();
       // print("w " + w);
        var count = 0;
        var sum = 0;
        for (var i = 0; i < w.length; i++) {
            var r = w[i];
            //print("r " + r);
            sum += r;
            count++;
        }

            var avgRating = sum / count;
            return new Tuple2(ID_and_ratings_tuple._1(), new Tuple2(count, avgRating));

        });
   // print("movie_ID_with_avg_ratings_RDD  " + movie_ID_with_avg_ratings_RDD.take(10));

    var movie_rating_counts_RDD = movie_ID_with_avg_ratings_RDD.mapToPair(function( ID_with_avg_ratings) {
            var x =  ID_with_avg_ratings;
            var coutAvg = ID_with_avg_ratings._2();
            return new Tuple2(ID_with_avg_ratings._1(), coutAvg._1()); // movieID, rating count


    });

    /*
     Now we need to rate some movies for the new user.
     */

    var new_user_ID = 0;

    // The format of each line is (userID, movieID, rating)
    var new_user_ratings = [
        new Rating(0, 260, 9), // Star Wars (1977)
        new Rating(0, 1, 8), // Toy Story (1995)
        new Rating(0, 16, 7), // Casino (1995)
        new Rating(0, 25, 8), // Leaving Las Vegas (1995)
        new Rating(0, 32, 9), // Twelve Monkeys (a.k.a. 12 Monkeys) (1995)
        new Rating(0, 335, 4), // Flintstones, The (1994)
        new Rating(0, 379, 3), // Timecop (1994)
        new Rating(0, 296, 7), // Pulp Fiction (1994)
        new Rating(0, 858, 10), // Godfather, The (1972)
        new Rating(0, 50, 8) // Usual Suspects, The (1995)
    ];
    var new_user_ratings_RDD = sc.parallelize(new_user_ratings);
    //print("New user ratings: " + new_user_ratings_RDD.take(10));

    /*
     Now we add them to the data we will use to train our recommender model.
     */
    var complete_data_with_new_ratings_RDD = complete_ratings_data.union(new_user_ratings_RDD);


    var new_ratings_model = ALS.train(complete_data_with_new_ratings_RDD, best_rank, iterations, regularization_parameter, blocks, seed);

    /*
     Let's now get some recommendations
     */

    //  get just movie IDs
    var new_user_ratings_ids = [];
    for (var i = 0; i < new_user_ratings.length; i++) {
        new_user_ratings_ids.push(new_user_ratings[i].product());
    }

    // keep just those not on the ID list
    //print("complete_movies_data " + complete_movies_data.take(3))
    //print("complete_movies_data " + complete_movies_data.count())
    var new_user_unrated_movies_RDD = complete_movies_data.filter(function( tuple, new_user_ratings_ids) {
       // print(" tuple " + tuple[0])
        //return true;
            if (new_user_ratings_ids.indexOf(tuple._1()) < 0) {
                return true;
            } else {
                return false;
            }
    }, [new_user_ratings_ids])
    .map(function( tuple, new_user_ID) {
       // print("map tuple " + tuple[0])
            return new Tuple2(new_user_ID, tuple._1());

    }, [new_user_ID]);
    //print("new_user_unrated_movies_RDD " + new_user_unrated_movies_RDD.take(3));
    //print("new_user_unrated_movies_RDD " + new_user_unrated_movies_RDD.count());
    // Use the input RDD, new_user_unrated_movies_RDD, with new_ratings_model.predictAll() to predict new ratings for the movies
    var new_user_recommendations_RDD = new_ratings_model.predict(new_user_unrated_movies_RDD);

    // Transform new_user_recommendations_RDD into pairs of the form (Movie ID, Predicted Rating)
    var new_user_recommendations_rating_RDD = new_user_recommendations_RDD.mapToPair( function( rating) {
            return new Tuple2(rating.product(), rating.rating());

    });
    //print("new_user_recommendations_rating_RDD" + new_user_recommendations_rating_RDD.take(3));
    //print("complete_movies_titles " + complete_movies_titles.take(3))
    var aRDD = new_user_recommendations_rating_RDD.join(complete_movies_titles);
    //print("aRDD " + aRDD.collect());
    //print("aRDD " + aRDD.count());
    var new_user_recommendations_rating_title_and_count_RDD =
        /*new_user_recommendations_rating_RDD.join(complete_movies_titles)*/ aRDD.join(movie_rating_counts_RDD);

   // print("new_user_recommendations_rating_title_and_count_RDD " + new_user_recommendations_rating_title_and_count_RDD.count());

    /*
     So we need to flat this down a bit in order to have (Title, Rating, Ratings Count).
     */

    var new_user_recommendations_rating_title_and_count_RDD2 =
        new_user_recommendations_rating_title_and_count_RDD.map(function( t) {
            //System.out.println(t);
            // ( 27456,( (7.553736917670094,Shackleton's Antarctic Adventure (2001) ),1) )
            // a = (27456, b)
            var a = /*(Tuple2)*/ t;
            // b = ( c ,1)
            var b = /*(Tuple2)*/ a._2();
            // c = (7.553736917670094,Shackleton's Antarctic Adventure (2001) )
            var c = /*(Tuple2)*/ b._1();
            var x = new Tuple3(c._2(), c._1(), b._2());
            //lambda r: (r[1][0][1], r[1][0][0], r[1][1])
            //return new Tuple2(new_user_ID, ((Tuple2)t)._1);
            return x;

    });

    //print("new_user_recommendations_rating_title_and_count_RDD2" + new_user_recommendations_rating_title_and_count_RDD2.take(3));

    /*
     Finally, get the highest rated recommendations for the new user, filtering out movies with less than 25 ratings.
     */


    var new_user_recommendations_rating_title_and_count_RDD2_filtered =
        new_user_recommendations_rating_title_and_count_RDD2.filter(function( tuple3) {
           // print("tuple3 " + tuple3);
            if (tuple3._3() < 25) {
                return false;
            } else {
                return true;
            }
        });

    //print("new_user_recommendations_rating_title_and_count_RDD2_filtered" + new_user_recommendations_rating_title_and_count_RDD2_filtered.take(3));

    /*
    list top 25
     */

    var top_movies = new_user_recommendations_rating_title_and_count_RDD2_filtered.takeOrdered(25, function(tuple3_a, tuple3_b){

            var aRate = tuple3_a._2();
            var bRate = tuple3_b._2();
            return aRate > bRate ? -1 : aRate == bRate? 0 : 1;

    });
    print("TOP recommended movies (with more than 25 reviews):");
    for (var i = 0; i < top_movies.length; i++) {
        print(JSON.stringify(top_movies[i]));
    }

    /*
     Another useful usecase is getting the predicted rating for a particular movie for a given user.
     */

    var my_movie = sc.parallelizePairs([new Tuple2(0, 500)]); // Quiz Show (1994)
    var individual_movie_rating_RDD = new_ratings_model.predict(my_movie);

    print("Predicted rating for movie " + individual_movie_rating_RDD.take(1));

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
