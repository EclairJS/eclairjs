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
 bin/eclairjs.sh examples/mllib/recommendation_example.js"
 */

var ALS = require('eclairjs/mllib/recommendation/ALS');
var MatrixFactorizationModel = require('eclairjs/mllib/recommendation/MatrixFactorizationModel');
var Rating = require('eclairjs/mllib/recommendation/Rating');
var Tuple = require('eclairjs/Tuple');
var FloatRDD = require('eclairjs/FloatRDD');
var PairRDD = require('eclairjs/PairRDD');

function run(sc) {

// Load and parse the data
    var path = "examples/data/mllib/als/test.data";
    var data = sc.textFile(path);
    var ratings = data.map(function (s) {
        var sarray = s.split(",");
        return new Rating(parseInt(sarray[0]), parseInt(sarray[1]), parseFloat(sarray[2]));
    });

// Build the recommendation model using ALS
    var rank = 10;
    var numIterations = 10;
    var model = ALS.train(ratings, rank, numIterations, 0.01);

// Evaluate the model on rating data
    var userProducts = ratings.map(function (r) {
        return new Tuple(r.user(), r.product());

    });

    var predictions = PairRDD.fromRDD(model.predict(userProducts).map(function (r) {
        return new Tuple(new Tuple(r.user(), r.product()), r.rating());
    }));

    var ratesAndPreds =  PairRDD.fromRDD(ratings.map(function (r) {
        return new Tuple(new Tuple(r.user(), r.product()), r.rating());
    })).join(predictions).values();

    var MSE = FloatRDD.fromRDD(ratesAndPreds.map(function (pair) {
        var err = pair[0] - pair[1];
        return err * err;

    })).mean();

    var result = {};
    result.model = model;
    result.MSE = MSE;
    return result;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("Collaborative Filtering Example");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    print("Mean Squared Error = " + results.MSE);
    // Save and load model
    results.model.save(sc, "target/tmp/myCollaborativeFilter");
    var sameModel = MatrixFactorizationModel.load(sc,
        "target/tmp/myCollaborativeFilter");


    sc.stop();
}