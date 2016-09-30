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
 bin/eclairjs.sh examples/ml/bisecting_kmeans_example.js"
 */


function run(spark) {
    var BisectingKMeans = require("eclairjs/ml/clustering/BisectingKMeans");


    // Load the data
    var dataset = spark.read().format("libsvm").load("examples/data/mllib/sample_kmeans_data.txt");

    // Trains a bisecting-k-means model
    var bkm = new BisectingKMeans()
        .setK(2)
        .setSeed(1);
    var model = bkm.fit(dataset);

    // Shows the result
    var centers = model.clusterCenters();

    return centers;
}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript BisectingKMeans Example")
            .getOrCreate();
    var result = run(spark);
    print("Cluster Centers: ");
    result.forEach(function (center) {
        print(center);
    });

    spark.stop();
}
