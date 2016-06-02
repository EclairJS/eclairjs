package examples;/*
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

import org.apache.spark.SparkConf;
import org.apache.spark.rdd.RDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaDoubleRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.api.java.function.DoubleFunction;
import org.apache.spark.ml.evaluation.RegressionEvaluator;
import org.apache.spark.mllib.recommendation.ALS;
import org.apache.spark.mllib.recommendation.Rating;
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel;
import org.apache.spark.ml.recommendation.ALSModel;
import org.apache.spark.sql.DataFrame;
import org.apache.spark.sql.SQLContext;
import org.apache.spark.sql.types.DataTypes;
import scala.Tuple2;
import scala.Tuple3;
import scala.collection.JavaConversions;

import java.lang.Math;
import java.util.*;

import java.io.Serializable;
import java.util.Arrays;

/*
Example based on https://github.com/jadianes/spark-movie-lens/blob/master/notebooks/building-recommender.ipynb
 */
public class MovieRecommender {


    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("movie recommender").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext sqlContext = new SQLContext(jsc);

        long start = new Date().getTime();
        /*
        Load Ratings dataset
         */
        JavaRDD small_ratings_raw_data = jsc.textFile("examples/data/mllib/ml-latest-small/ratings.csv");
        String small_ratings_raw_data_header = small_ratings_raw_data.take(1).get(0).toString();
        JavaRDD small_ratings_data = small_ratings_raw_data.filter(new Function<String, Boolean>() {
            public Boolean call(String line) {

                if (line.equals(small_ratings_raw_data_header)) {
                    return false;
                } else {
                    return true;
                }
            }
        })
                .map(new Function<String, Rating>() {
                    public Rating call(String line) {
                        String[] fields = line.split(",");
                        int userId = Integer.parseInt(fields[0]);
                        int movieId = Integer.parseInt(fields[1]);
                        double rating = Double.parseDouble(fields[2]);
                        //long timestamp = Long.parseLong(fields[3]);
                        return new Rating(userId, movieId, rating);

                    }
                }).cache();

        System.out.println(small_ratings_data.take(3));


        /*
        Load movie dataset
         */
        JavaRDD small_movies_raw_data = jsc.textFile("examples/data/mllib/ml-latest-small/movies.csv");
        String small_movies_raw_data_header = small_movies_raw_data.take(1).get(0).toString();
        JavaRDD small_movies_data = small_movies_raw_data.filter(new Function<String, Boolean>() {
            public Boolean call(String line) {

                if (line.equals(small_movies_raw_data_header)) {
                    return false;
                } else {
                    return true;
                }
            }
        })
                .map(new Function<String, Tuple2>() {
                    public Tuple2 call(String line) {
                        String[] fields = line.split(",");
                        return new Tuple2(Integer.parseInt(fields[0]), fields[1]);

                    }
                }).cache();

        JavaPairRDD small_movies_titles = small_movies_data.mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object x) {
                        Tuple2 t = (Tuple2) x;
                        return new Tuple2(t._1, t._2);

                    }
                }
                );

        System.out.println(small_movies_data.take(3));

        JavaRDD[] splits = small_ratings_data.randomSplit(new double[]{0.6, 0.2, 0.2}, 0L);
        JavaRDD training_RDD = splits[0];
        JavaRDD validation_RDD = splits[1];
        JavaRDD test_RDD = splits[2];
        JavaRDD validation_for_predict_RDD = validation_RDD.map(new Function<Rating, Tuple2>() {
                                                            public Tuple2 call(Rating x) {
                                                                // Rating object

                                                                return new Tuple2(x.user(), x.product());

                                                            }
                                                        });

        System.out.println(validation_for_predict_RDD.take(3));

        JavaRDD test_for_predict_RDD = test_RDD.map(new Function<Rating, Tuple2>() {
            public Tuple2 call(Rating x) {
                // Rating object

                return new Tuple2(x.user(), x.product());

            }
        });

        System.out.println(test_for_predict_RDD.take(3));

        long seed = 5L;
        int iterations = 10;
        double regularization_parameter = 0.1;
        int[] ranks = {4, 8, 12};
        int blocks = -1;
        double[] errors = {0, 0, 0};
        int err = 0;
        double tolerance = 0.02;

        double min_error = Double.POSITIVE_INFINITY;
        int best_rank = -1;
        int best_iteration = -1;

        for (int i=0; i < ranks.length; i++ ) {
            MatrixFactorizationModel model = ALS.train(training_RDD.rdd(), ranks[i], iterations, regularization_parameter, blocks, seed);
            JavaPairRDD predictions = model.predict(validation_for_predict_RDD.rdd()).toJavaRDD()
                    .mapToPair(
                    new PairFunction() {
                        public Tuple2 call(Object x) {
                            // Rating object
                            Rating c = (Rating) x;
                            return new Tuple2(new Tuple2(c.user(), c.product()), c.rating());
                        }
                    }
            );

            System.out.println("predict " + predictions.take(3));

            JavaPairRDD rates_and_preds = validation_RDD.mapToPair(
                    new PairFunction() {
                        public Tuple2 call(Object x) {
                            // Rating object
                            Rating c = (Rating) x;
                            return new Tuple2(new Tuple2(c.user(), c.product()), c.rating());

                        }
                    }
            )
            .join(predictions);

            System.out.println("rates_and_preds " + rates_and_preds.take(3));

            JavaDoubleRDD t = rates_and_preds.mapToDouble(
                    new DoubleFunction<Tuple2>() {
                        public double call(Tuple2 x) {
                            // Rating object
                            /*System.out.println("x._1 " + x._1);
                            System.out.println("x._2 " + x._2);*/
                            Tuple2 x1 = (Tuple2)x._1;
                            Tuple2 x2 = (Tuple2)x._2;
                            double a = (double) x2._1;
                            double y = ((double)x2._1 - (double)x2._2); // ([1][0] - r[1][1])**2
                            //return new Tuple2(x.user(), x.product());
                            return Math.pow(y, 2);

                        }
                    }

            );
            double error = Math.sqrt(t.mean());
            System.out.println("error " + error);
            errors[err] = error;
            err += 1;
            System.out.println("For rank " +  ranks[i] + " the RMSE is " +  error);
            if (error < min_error) {
                min_error = error;
                best_rank = ranks[i];
            }

        }

        System.out.println("The best model was trained with rank " +best_rank);

        /*
        In order to build our recommender model, we will use the complete dataset.

         */
        JavaRDD complete_ratings_raw_data = jsc.textFile("examples/data/mllib/ml-latest/ratings.csv");
        String complete_ratings_raw_data_header = complete_ratings_raw_data.take(1).get(0).toString();
        JavaRDD complete_ratings_data = complete_ratings_raw_data.filter(new Function<String, Boolean>() {
            public Boolean call(String line) {

                if (line.equals(complete_ratings_raw_data_header)) {
                    return false;
                } else {
                    return true;
                }
            }
        })
                .map(new Function<String, Rating>() {
                    public Rating call(String line) {
                        String[] fields = line.split(",");
                        int userId = Integer.parseInt(fields[0]);
                        int movieId = Integer.parseInt(fields[1]);
                        double rating = Double.parseDouble(fields[2]);
                        //long timestamp = Long.parseLong(fields[3]);
                        return new Rating(userId, movieId, rating);

                    }
                }).cache();

        System.out.println("There are recommendations in the complete dataset:  " + complete_ratings_data.count());

        JavaRDD[] splits2 = complete_ratings_data.randomSplit(new double[]{0.7, 0.3}, 0L);
        training_RDD = splits2[0];
        test_RDD = splits2[1];

        MatrixFactorizationModel complete_model = ALS.train(training_RDD.rdd(), best_rank, iterations, regularization_parameter, blocks, seed);
        /*
        Now we test on our testing set.
         */
        test_for_predict_RDD = test_RDD.map(
                new Function() {
                    public Tuple2 call(Object rating) {
                        Rating r = (Rating)rating;
                        return new Tuple2(r.user(), r.product());

                    }
                }
        );

        JavaPairRDD predictions = complete_model.predict(test_for_predict_RDD.rdd()).toJavaRDD().mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object rating) {
                        Rating r = (Rating)rating;
                        return new Tuple2(new Tuple2(r.user(), r.product()), r.rating());

                    }
                }
        );

        JavaPairRDD rates_and_preds = test_RDD.mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object x) {
                        // Rating object
                        Rating c = (Rating) x;
                        return new Tuple2(new Tuple2(c.user(), c.product()), c.rating());

                    }
                }

        ).join(predictions);

        JavaDoubleRDD t = rates_and_preds.mapToDouble(
                new DoubleFunction<Tuple2>() {
                    public double call(Tuple2 x) {
                        // Rating object
                            /*System.out.println("x._1 " + x._1);
                            System.out.println("x._2 " + x._2);*/
                        Tuple2 x1 = (Tuple2)x._1;
                        Tuple2 x2 = (Tuple2)x._2;
                        double a = (double) x2._1;
                        double y = ((double)x2._1 - (double)x2._2); // ([1][0] - r[1][1])**2
                        //return new Tuple2(x.user(), x.product());
                        return Math.pow(y, 2);

                    }
                }

        );
        double error = Math.sqrt(t.mean());
        System.out.println("For testing data the RMSE is " + error);

        /*
        How to make recommendations
        So let's first load the movies complete file for later use.
         */
        JavaRDD complete_movies_raw_data = jsc.textFile("examples/data/mllib/ml-latest/movies.csv");
        String complete_movies_raw_data_header = complete_movies_raw_data.take(1).get(0).toString();
        JavaRDD complete_movies_data = complete_movies_raw_data.filter(new Function<String, Boolean>() {
            public Boolean call(String line) {

                if (line.equals(complete_movies_raw_data_header)) {
                    return false;
                } else {
                    return true;
                }
            }
        })
                .map(new Function<String, Tuple2>() {
                    public Tuple2 call(String line) {
                        String[] fields = line.split(",");
                        return new Tuple2(Integer.parseInt(fields[0]), fields[1]);

                    }
                }).cache();

        JavaPairRDD complete_movies_titles = complete_movies_data.mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object x) {
                        Tuple2 t = (Tuple2) x;
                        return new Tuple2(t._1, t._2);

                    }
                }
        );

        System.out.println("There are %s movies in the complete dataset" + complete_movies_titles.count());

       /*
        Another thing we want to do, is give recommendations
        of movies with a certain minimum number of ratings. For that, we need to count the number of ratings per movie.
         */
        JavaPairRDD movie_ID_with_ratings_RDD = complete_ratings_data.mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object x) {
                        // Rating object
                        Rating c = (Rating) x;
                        return new Tuple2(c.product(), c.rating());

                    }
                }
        ).groupByKey();
        JavaPairRDD movie_ID_with_avg_ratings_RDD = movie_ID_with_ratings_RDD.mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object ID_and_ratings_tuple) {
                        Tuple2 x = (Tuple2) ID_and_ratings_tuple;
                       // System.out.println("236 " + x._2.getClass());
                        scala.collection.convert.Wrappers.IterableWrapper w = (scala.collection.convert.Wrappers.IterableWrapper)x._2;
                        Iterator iterator = w.iterator();
                        int count = 0;
                        double sum = 0;
                        while (iterator.hasNext()) {
                            double r = (double) iterator.next();
                            //System.out.println("obj " + r);
                            sum += r;
                            count++;
                        }
                         double avgRating = sum / count;
                        return new Tuple2(x._1, new Tuple2(count, avgRating));

                    }
                }
        );
        JavaPairRDD movie_rating_counts_RDD = movie_ID_with_avg_ratings_RDD.mapToPair(
                new PairFunction() {
                    public Tuple2 call(Object ID_with_avg_ratings) {
                        Tuple2 x = (Tuple2) ID_with_avg_ratings;
                        Tuple2 coutAvg = (Tuple2) x._2;
                        return new Tuple2(x._1, coutAvg._1); // movieID, rating count

                    }
                }
        );

        /*
        Now we need to rate some movies for the new user.
        */

        int new_user_ID = 0;

        // The format of each line is (userID, movieID, rating)
        List new_user_ratings = Arrays.asList(
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
        );
        JavaRDD new_user_ratings_RDD = jsc.parallelize(new_user_ratings);
        System.out.println("New user ratings: " + new_user_ratings_RDD.take(10));

        /*
        Now we add them to the data we will use to train our recommender model.
         */
        JavaRDD complete_data_with_new_ratings_RDD = complete_ratings_data.union(new_user_ratings_RDD);


        MatrixFactorizationModel new_ratings_model = ALS.train(complete_data_with_new_ratings_RDD.rdd(), best_rank, iterations, regularization_parameter, blocks, seed);

        /*
        Let's now get some recommendations
         */

        //  get just movie IDs
        List new_user_ratings_ids = new ArrayList();
        for (int i = 0; i < new_user_ratings.size(); i++) {
            new_user_ratings_ids.add(((Rating)new_user_ratings.get(i)).product());
        }

        // keep just those not on the ID list
        JavaRDD new_user_unrated_movies_RDD = complete_movies_data.filter(new Function<Tuple2, Boolean>() {
            public Boolean call(Tuple2 r) {

                if (new_user_ratings_ids.contains(r._1)) {
                    return false;
                } else {
                    return true;
                }
            }
        }).map(new Function() {
            public Tuple2 call(Object t) {
                return new Tuple2(new_user_ID, ((Tuple2)t)._1);

            }
        });

        // Use the input RDD, new_user_unrated_movies_RDD, with new_ratings_model.predictAll() to predict new ratings for the movies
        JavaRDD new_user_recommendations_RDD = new_ratings_model.predict(new_user_unrated_movies_RDD.rdd()).toJavaRDD();

        // Transform new_user_recommendations_RDD into pairs of the form (Movie ID, Predicted Rating)
        JavaPairRDD new_user_recommendations_rating_RDD = new_user_recommendations_RDD.mapToPair(new PairFunction() {
            public Tuple2 call(Object x) {
                Rating r = (Rating) x;
                return new Tuple2(r.product(), r.rating());

            }
        });
        System.out.println("complete_movies_titles" + complete_movies_titles.take(3));
        System.out.println("new_user_recommendations_rating_RDD" + new_user_recommendations_rating_RDD.take(3));
        JavaPairRDD aRDD = new_user_recommendations_rating_RDD.join(complete_movies_titles);
        System.out.println("aRDD " + aRDD.take(3));
        JavaPairRDD new_user_recommendations_rating_title_and_count_RDD =
            /*new_user_recommendations_rating_RDD.join(complete_movies_titles)*/ aRDD.join(movie_rating_counts_RDD);

        System.out.println("new_user_recommendations_rating_title_and_count_RDD" + new_user_recommendations_rating_title_and_count_RDD.take(3));

        /*
        So we need to flat this down a bit in order to have (Title, Rating, Ratings Count).
         */

        JavaRDD new_user_recommendations_rating_title_and_count_RDD2 =
         new_user_recommendations_rating_title_and_count_RDD.map(
                new Function() {
                    public Tuple3 call(Object t) {
                        //System.out.println(t);
                       // ( 27456,( (7.553736917670094,Shackleton's Antarctic Adventure (2001) ),1) )
                        // a = (27456, b)
                        Tuple2 a = (Tuple2) t;
                        // b = ( c ,1)
                        Tuple2 b = (Tuple2) a._2;
                         // c = (7.553736917670094,Shackleton's Antarctic Adventure (2001) )
                        Tuple2 c = (Tuple2) b._1;
                        Tuple3 x = new Tuple3(c._2, c._1, b._2);
                        //lambda r: (r[1][0][1], r[1][0][0], r[1][1])
                        //return new Tuple2(new_user_ID, ((Tuple2)t)._1);
                        return x;
                    }
                }

        );

        System.out.println("new_user_recommendations_rating_title_and_count_RDD2" + new_user_recommendations_rating_title_and_count_RDD2.take(3));

        /*
        Finally, get the highest rated recommendations for the new user, filtering out movies with less than 25 ratings.
        */

        class RateComparator implements Comparator<Tuple3>,  Serializable{
            @Override
            public int compare(Tuple3 a, Tuple3 b) {
                //System.out.println("compare");
                double aRate = (double) a._2();
                double bRate = (double) b._2();
                return aRate > bRate ? -1 : aRate == bRate? 0 : 1;

            }
        }

        JavaRDD new_user_recommendations_rating_title_and_count_RDD2_filtered = new_user_recommendations_rating_title_and_count_RDD2.filter(
                new Function<Tuple3, Boolean>() {
                    public Boolean call(Tuple3 r) {
                        //System.out.println("filter " + r);
                        int num = (int) r._3();
                        if (num < 25) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }

        );

        System.out.println("new_user_recommendations_rating_title_and_count_RDD2_filtered" + new_user_recommendations_rating_title_and_count_RDD2_filtered.take(3));

        List top_movies = new_user_recommendations_rating_title_and_count_RDD2_filtered.takeOrdered(25, new RateComparator());
        System.out.println("TOP recommended movies (with more than 25 reviews):");
        for (int i = 0; i < top_movies.size(); i++) {
            System.out.println(top_movies.get(i));
        }

        /*
        Another useful usecase is getting the predicted rating for a particular movie for a given user.
         */

        JavaPairRDD my_movie = jsc.parallelizePairs(Arrays.asList(new Tuple2(0, 500))); // Quiz Show (1994)
        JavaRDD individual_movie_rating_RDD = new_ratings_model.predict(my_movie);

        System.out.println("Predicted rating for movie " + individual_movie_rating_RDD.take(1));

        long end = new Date().getTime();
        long time = end - start;
        System.out.println("Execution time: " + time + " milliseconds");

        jsc.stop();
    }
}

