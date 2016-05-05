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
 bin/eclairjs.sh examples/ml/min_max_scaler_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var MinMaxScaler = require("eclairjs/ml/feature/MinMaxScaler");

    var sqlContext = new SQLContext(sc);

    var dataFrame = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");
    var scaler = new MinMaxScaler()
        .setInputCol("features")
        .setOutputCol("scaledFeatures");

    // Compute summary statistics and generate MinMaxScalerModel
    var scalerModel = scaler.fit(dataFrame);

    // rescale each feature to range [min, max].
    return scalerModel.transform(dataFrame);

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    results.show();

    sc.stop();
}