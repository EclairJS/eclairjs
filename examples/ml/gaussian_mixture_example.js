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
 bin/eclairjs.sh examples/ml/gaussian_mixture_example.js
 */

function run(spark) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var GaussianMixture = require("eclairjs/ml/clustering/GaussianMixture");

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

    // Load training data
    var dataset = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_kmeans_data.txt");

    // Trains a GaussianMixture model
    var gmm = new GaussianMixture()
        .setK(2);
    var model = gmm.fit(dataset);

    // Shows the result
    var ret = {};
    ret.weights = model.weights();
    ret.gaussianDF = model.gaussiansDF();

    return ret;
}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript GaussianMixture Example")
            .getOrCreate();
    var result = run(spark);
    print("weights=", result.weights);
    result.gaussianDF.show(5);

    spark.stop();
}
