/*
 * Copyright 2015 IBM Corp.
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
 bin/eclairjs.sh examples/ml/aft_survival_regression_example.js"
 */


function run(spark) {
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Vectors = require('eclairjs/ml/linalg/Vectors');
    var VectorUDT = require('eclairjs/ml/linalg/VectorUDT');
    var AFTSurvivalRegression = require('eclairjs/ml/regression/AFTSurvivalRegression');

    var data = [
        RowFactory.create([1.218, 1.0, Vectors.dense(1.560, -0.605)]),
        RowFactory.create([2.949, 0.0, Vectors.dense(0.346, 2.158)]),
        RowFactory.create([3.627, 0.0, Vectors.dense(1.380, 0.231)]),
        RowFactory.create([0.273, 1.0, Vectors.dense(0.520, 1.151)]),
        RowFactory.create([4.199, 0.0, Vectors.dense(0.795, -0.226)])
    ];

    var schema = new StructType([
        new StructField("label", DataTypes.DoubleType, false, Metadata.empty()),
            new StructField("censor", DataTypes.DoubleType, false, Metadata.empty()),
            new StructField("features", new VectorUDT(), false, Metadata.empty())
    ]);
    var training = spark.createDataFrame(data, schema);
    var quantileProbabilities = [0.3, 0.6];
    var aft = new AFTSurvivalRegression()
        .setQuantileProbabilities(quantileProbabilities)
        .setQuantilesCol("quantiles");

    var model = aft.fit(training);
    var ret = {};
    ret.model = model;
    ret.dataframe = model.transform(training);

    return ret;
}

/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined')  {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript AFTSurvivalRegressionExample")
            .getOrCreate();

    var result = run(spark);
    // Print the coefficients, intercept and scale parameter for AFT survival regression
    print("Coefficients: " + result.model.coefficients() + " Intercept: "
        + result.model.intercept() + " Scale: " + result.model.scale());
    result.dataframe.show(5);
    spark.stop();
}



