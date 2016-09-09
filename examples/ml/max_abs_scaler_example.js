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
 bin/eclairjs.sh examples/ml/max_abs_scaler_example.js"
 */

function run(spark) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var MaxAbsScaler = require("eclairjs/ml/feature/MaxAbsScaler");

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

    var dataFrame = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");
    var scaler = new MaxAbsScaler()
        .setInputCol("features")
        .setOutputCol("scaledFeatures");

    // Compute summary statistics and generate MaxAbsScalerModel
    var scalerModel = scaler.fit(dataFrame);

    // rescale each feature to range [min, max].
    return scalerModel.transform(dataFrame);

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript MaxAbsScaler Example")
            .getOrCreate();

    var result = run(spark);
    result.show();

    spark.stop();
}
