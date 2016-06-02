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
 bin/eclairjs.sh examples/ml/movie_recommender.js"
 */

function run(sc) {

    var Tuple2 = require('eclairjs/Tuple2');
    var ALS = require('eclairjs/mllib/recommendation/ALS');
    var Rating = require('eclairjs/mllib/recommendation/Rating');



    /*
     In order to build our recommender model, we will use the complete dataset.

     */
    var complete_ratings_raw_data = sc.textFile("examples/data/mllib/ml-latest/ratings.csv");
   // print("complete_ratings_raw_data count  " + complete_ratings_raw_data.count());
    var complete_ratings_raw_data_header = complete_ratings_raw_data.take(1)[0];
    //print("complete_ratings_raw_data_header " + complete_ratings_raw_data_header);
    var start = new Date().getTime();
    var filterHeader = function(line) {
        return line != "userId,movieId,rating,timestamp";
    }
   var complete_ratings_data = complete_ratings_raw_data//.filter(filterHeader)
       .filter(function(line) {
            // filters out the header
            return line != "userId,movieId,rating,timestamp"; //complete_ratings_raw_data_header;
        })
        .map(function(line, Rating) {
            var tokens = line.split(",");
            // tokenes are userId,movieId,rating,timestamp
            return new Rating(tokens[0],tokens[1],tokens[2]);
        }, [Rating]).cache()




    print("There are recommendations in the complete dataset:  " + complete_ratings_data.count());

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