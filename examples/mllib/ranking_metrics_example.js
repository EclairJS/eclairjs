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

var sparkConf = new SparkConf()
  .setAppName("Ranking Metrics Example")
  .setMaster("local[*]");

var sc = new SparkContext(sparkConf);
var data = data = sc.textFile("examples/data/mllib/sample_movielens_data.txt");

var ratings = data.map(function(line) {
    var arr = line.split("::");
    return new Rating(parseInt(arr[0]),
                      parseInt(arr[1]),
                      parseFloat(arr[2]) - 2.5);
}).cache();

var model = ALS.train(ratings, 10, 10, 0.01);
var userRecs = model.recommendProductsForUsers(10);

var userRecsScaled = userRecs.mapToPair(function(val) {
  print(val[1][0]);
  var newRatings = val[1].map(function(r) {
    var newRating = Math.max(Math.min(r.rating(), 1.0), 0.0);
    return new Rating(r.user(), r.product(), newRating);
  });

  return [val[0], newRatings];
});

print("userRecsScaled = " + userRecsScaled.take(10));
