package examples;
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

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.mllib.recommendation.Rating;
import org.apache.spark.sql.SQLContext;
import java.util.Date;

public class LargeDataset {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("movie recommender").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        long start = new Date().getTime();
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
        long end = new Date().getTime();
        long time = end - start;
        System.out.println("Execution time: " + time + " milliseconds");

    }
}
