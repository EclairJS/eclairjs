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
 bin/eclairjs.sh examples/mllib/lbfgs_example.js"
 */

function run(sc) {

    var path = "examples/data/mllib/sample_libsvm_data.txt";
    var data = MLUtils.loadLibSVMFile(sc, path);
    var ret = {};

    var numFeatures = data.take(1)[0].getFeatures().size();

    // Split initial RDD into two... [60% training data, 40% testing data].
    var trainingInit = data.sample(false, 0.6, 11);
    var test = data.subtract(trainingInit);

    // Append 1 into the training data as intercept.
    var training = data.map(function (lp) {
        return new Tuple(lp.getLabel(), MLUtils.appendBias(lp.getFeatures()));
    });

    training.cache();

// Run training algorithm to build the model.
    var numCorrections = 10;
    var convergenceTol = 0.0001;
    var maxNumIterations = 20;
    var regParam = 0.1;
    var w = [];
    for (var i = 0; i < numFeatures + 1; i++) {
        w.push(0.0);
    }
    var initialWeightsWithIntercept = Vectors.dense(w);


    var result = LBFGS.runLBFGS(
        // training.rdd(),
        training,
        new LogisticGradient(),
        new SquaredL2Updater(),
        numCorrections,
        convergenceTol,
        maxNumIterations,
        regParam,
        initialWeightsWithIntercept);

    var weightsWithIntercept = result[0];
    ret.loss = result[1];


    var arrayWeightsWithIntercept = weightsWithIntercept.toArray();

    var copyOfWeightsWithIntercept = [];
    for (var ii = 0; ii < arrayWeightsWithIntercept.length - 1; ii++) {
        copyOfWeightsWithIntercept.push(arrayWeightsWithIntercept[ii]);
    }


    var model = new LogisticRegressionModel(Vectors.dense(copyOfWeightsWithIntercept), copyOfWeightsWithIntercept.length);


// Clear the default threshold.
    model.clearThreshold();

    var scoreAndLabels = test.map(function (lp, model) {
        return new Tuple(model.predict(lp.getFeatures()), lp.getLabel());
    }, [model]);

// Get evaluation metrics.
    var metrics = new BinaryClassificationMetrics(scoreAndLabels);
    ret.auROC = metrics.areaUnderROC();

    return ret;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("L-BFGS Example").setMaster("local[*]");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Loss of each step in training process");
    result.loss.forEach(function (l) {
        print(l);
    });
    print("Area under ROC = " + result.auROC);

    sc.stop();
}