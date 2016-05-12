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
 bin/eclairjs.sh examples/ml/vector_slicer_example.js"
 */

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var LinearRegression = require('eclairjs/ml/regression/LinearRegression');
    var ParamGridBuilder = require('eclairjs/ml/tuning/ParamGridBuilder');
    var TrainValidationSplit = require('eclairjs/ml/tuning/TrainValidationSplit');
    var RegressionEvaluator = require('eclairjs/ml/evaluation/RegressionEvaluator');


    var RowFactory = require('eclairjs/sql/RowFactory');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var StructField = require('eclairjs/sql/types/StructField');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');
    var VectorAssembler = require('eclairjs/ml/feature/VectorAssembler');

    var sqlContext = new SQLContext(sc);

    var data = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

    // Prepare training and test data.
    var splits = data.randomSplit([0.9, 0.1], 12345);
    var training = splits[0];
    var test = splits[1];

    var lr = new LinearRegression();

    // We use a ParamGridBuilder to construct a grid of parameters to search over.
    // TrainValidationSplit will try all combinations of values and determine best model using
    // the evaluator.
    var paramGrid = new ParamGridBuilder()
      .addGridDouble(lr.regParam(), [ 0.1, 0.01])
      .addGridBoolean(lr.fitIntercept())
      .addGridDouble(lr.elasticNetParam(), [ 0.0, 0.5, 1.0])
      .build();

    // In this case the estimator is simply the linear regression.
    // A TrainValidationSplit requires an Estimator, a set of Estimator ParamMaps, and an Evaluator.
    var trainValidationSplit = new TrainValidationSplit()
      .setEstimator(lr)
      .setEvaluator(new RegressionEvaluator())
      .setEstimatorParamMaps(paramGrid);

    // 80% of the data will be used for training and the remaining 20% for validation.
    trainValidationSplit.setTrainRatio(0.8);

print("TRAINGIN="+training)
    // Run train validation split, and choose the best set of parameters.
    var model = trainValidationSplit.fit(training);

    // Make predictions on test data. model is the model with combination of parameters
    // that performed best.
    var output=model.transform(test)
      .select("features", "label", "prediction");


    return output;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript TrainValidationSplitExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

    result.show();
    // $example off$
    sc.stop();
}
