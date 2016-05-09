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

    var LabeledPoint = require('eclairjs/mllib/regression/LabeledPoint');
    var Vectors = require('eclairjs/mllib/linalg/Vectors');
    var LogisticRegression = require('eclairjs/ml/classification/LogisticRegression');
    var ParamMap = require('eclairjs/ml/param/ParamMap');
    var VectorUDT = require('eclairjs/mllib/linalg/VectorUDT');


    var sqlContext = new SQLContext(sc);



    // Prepare training data.
    // We use LabeledPoint, which is a JavaBean.  Spark SQL can convert RDDs of JavaBeans
    // into DataFrames, where it uses the bean metadata to infer the schema.
    var localTraining = [
      new LabeledPoint(1.0, Vectors.dense(0.0, 1.1, 0.1)),
      new LabeledPoint(0.0, Vectors.dense(2.0, 1.0, -1.0)),
      new LabeledPoint(0.0, Vectors.dense(2.0, 1.3, 1.0)),
      new LabeledPoint(1.0, Vectors.dense(0.0, 1.2, -0.5))];
    var training = sqlContext.createDataFrameFromJson(sc.parallelize(localTraining), {
      "label" : "Double",
      "features" : new VectorUDT()
    });

    // Create a LogisticRegression instance.  This instance is an Estimator.
    var lr = new LogisticRegression();
    // Print out the parameters, documentation, and any default values.
    print("LogisticRegression parameters:\n" + lr.explainParams() + "\n");

    // We may set parameters using setter methods.
    lr.setMaxIter(10)
      .setRegParam(0.01);

    // Learn a LogisticRegression model.  This uses the parameters stored in lr.
    var model1 = lr.fit(training);
    // Since model1 is a Model (i.e., a Transformer produced by an Estimator),
    // we can view the parameters it used during fit().
    // This prints the parameter (name: value) pairs, where names are unique IDs for this
    // LogisticRegression instance.
    print("Model 1 was fit using parameters: " + model1.parent().extractParamMap());

    // We may alternatively specify parameters using a ParamMap.
    var paramMap = new ParamMap();
    paramMap.put(lr.maxIter().w(20)); // Specify 1 Param.
    paramMap.put(lr.maxIter(), 30); // This overwrites the original maxIter.
    var thresholds  = [0.45, 0.55];
    paramMap.put(lr.regParam().w(0.1), lr.thresholds().w(thresholds)); // Specify multiple Params.

    // One can also combine ParamMaps.
    var paramMap2 = new ParamMap();
    paramMap2.put(lr.probabilityCol().w("myProbability")); // Change output column name
    var paramMapCombined = paramMap.$plus$plus(paramMap2);

    // Now learn a new model using the paramMapCombined parameters.
    // paramMapCombined overrides all parameters set earlier via lr.set* methods.
    var model2 = lr.fit(training, paramMapCombined);
    print("Model 2 was fit using parameters: " + model2.parent().extractParamMap());

    // Prepare test documents.
    var localTest = [
        new LabeledPoint(1.0, Vectors.dense(-1.0, 1.5, 1.3)),
        new LabeledPoint(0.0, Vectors.dense(3.0, 2.0, -0.1)),
        new LabeledPoint(1.0, Vectors.dense(0.0, 2.2, -1.5))];
    var test = sqlContext.createDataFrameFromJson(sc.parallelize(localTest), {
      "label" : "Double",
      "features" : new VectorUDT()
    });
    // Make predictions on test documents using the Transformer.transform() method.
    // LogisticRegressionModel.transform will only use the 'features' column.
    // Note that model2.transform() outputs a 'myProbability' column instead of the usual
    // 'probability' column since we renamed the lr.probabilityCol parameter previously.
    var results = model2.transform(test);

    var rows=results.select("features", "label", "myProbability", "prediction").collect();
    return rows;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript SimpleParamsExample");
    var sc = new SparkContext(sparkConf);
    var output = run(sc);

    for (var i=0;i<output.length;i++)
    {
      var r=output[i];
      print("(" + r.get(0) + ", " + r.get(1) + ") -> prob=" + r.get(2) +
          ", prediction=" + r.get(3));
    }

    // $example off$
    sc.stop();
}
