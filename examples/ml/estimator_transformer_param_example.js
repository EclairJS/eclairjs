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
 bin/eclairjs.sh examples/ml/estimator_transformer_param_example.js"
 */


function run(sc) {

    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');
    var LabeledPoint = require('eclairjs/mllib/regression/LabeledPoint');
    var ParamMap = require('eclairjs/ml/param/ParamMap');
    var LogisticRegression = require('eclairjs/ml/classification/LogisticRegression');

    var result = {};
    var sqlContext = new SQLContext(sc);
    var fields = [
        DataTypes.createStructField("label", DataTypes.DoubleType, false),
        DataTypes.createStructField("features", new VectorUDT(), true)
    ];

    var schema = DataTypes.createStructType(fields);

    // Prepare training data.
    // DataFrames, where it uses the bean metadata to infer the schema.
    var training = sqlContext.createDataFrame(
        [
            RowFactory.create(1.0, Vectors.dense(0.0, 1.1, 0.1)),
            RowFactory.create(0.0, Vectors.dense(2.0, 1.1, -1.0)),
            RowFactory.create(0.0, Vectors.dense(2.0, 1.3, 1.0)),
            RowFactory.create(1.0, Vectors.dense(0.0, 1.2, -0.5))
        ], schema);

    // Create a LogisticRegression instance. This instance is an Estimator.
    var lr = new LogisticRegression();
    result.lr_explainParams = lr.explainParams();

    // We may set parameters using setter methods.
    lr.setMaxIter(10).setRegParam(0.01);

    // Learn a LogisticRegression model. This uses the parameters stored in lr.
    var model1 = lr.fit(training);
    // Since model1 is a Model (i.e., a Transformer produced by an Estimator),
    // we can view the parameters it used during fit().
    // This prints the parameter (name: value) pairs, where names are unique IDs for this
    // LogisticRegression instance.
    result.model1_extractParamMap = model1.parent().extractParamMap();


    // We may alternatively specify parameters using a ParamMap.
    var paramMap = new ParamMap()
        .put(lr.maxIter().w(20))  // Specify 1 Param.
        .put(lr.maxIter(), 30)  // This overwrites the original maxIter.
        .put(lr.regParam().w(0.1), lr.threshold().w(0.55));  // Specify multiple Params.

    // One can also combine ParamMaps.
    var paramMap2 = new ParamMap()
        .put(lr.probabilityCol().w("myProbability"));  // Change output column name
    var paramMapCombined = paramMap.$plus$plus(paramMap2);

    // Now learn a new model using the paramMapCombined parameters.
    // paramMapCombined overrides all parameters set earlier via lr.set* methods.
    var model2 = lr.fit(training, paramMapCombined);
    result.model2_extractParamMap = model2.parent().extractParamMap();


    // Prepare test documents.
   var test = sqlContext.createDataFrame([
        RowFactory.create(1.0, Vectors.dense(-1.0, 1.5, 1.3)),
        RowFactory.create(0.0, Vectors.dense(3.0, 2.0, -0.1)),
        RowFactory.create(1.0, Vectors.dense(0.0, 2.2, -1.5))
    ], schema);

    // Make predictions on test documents using the Transformer.transform() method.
    // LogisticRegression.transform will only use the 'features' column.
    // Note that model2.transform() outputs a 'myProbability' column instead of the usual
    // 'probability' column since we renamed the lr.probabilityCol parameter previously.
    var results = model2.transform(test);

    result.rows = results.select("features", "label", "myProbability", "prediction").collect();

    return result;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript Estimator Transformer Param Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    // Print out the parameters, documentation, and any default values.
    print("LogisticRegression parameters:\n" + result.lr_explainParams + "\n");
    print("Model 1 was fit using parameters: " + result.model1_extractParamMap);
    print("Model 2 was fit using parameters: " + result.model2_extractParamMap);
    result.rows.forEach(function(r){
        print("(" + r.get(0) + ", " + r.get(1) + ") -> prob=" + r.get(2)
            + ", prediction=" + r.get(3));
    });

    sc.stop();
}