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

function run(sc) {

    var filename = ((typeof args !== "undefined") && (args.length > 1)) ?
        args[1] : "examples/data/mllib/sample_binary_classification_data.txt";

    var data = MLUtils.loadLibSVMFile(sc, filename);

//Split data into training (60%) and test (40%)
    var split = data.randomSplit([0.6, 0.4], 11)
    var training = split[0].cache();
    var test = split[1];

    var model = new LogisticRegressionWithLBFGS()
        .setNumClasses(2)
        .run(training);

    var predictionAndLabels = test.mapToPair(function (lp, model) {
        return new Tuple(model.predict(lp.getFeatures()), lp.getLabel());
    }, [model]);

    var metrics = new BinaryClassificationMetrics(predictionAndLabels);

// Precision by threshold
    var precision = metrics.precisionByThreshold();
    print("Precision by threshold: " + precision.collect());

// Recall by threshold
    var recall = metrics.recallByThreshold();
    print("Recall by threshold: " + recall.collect());

// F Score by threshold
    var f1Score = metrics.fMeasureByThreshold();
    print("F1 Score by threshold: " + f1Score.collect());

    var f2Score = metrics.fMeasureByThreshold(2.0);
    print("F2 Score by threshold: " + f2Score.collect());

// Precision-recall curve
    var prc = metrics.pr();
    print("Precision-recall curve: " + prc.collect());

    return true;
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {

    var sparkConf = new SparkConf().setAppName("Binary Classification Metrics Test");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

    sc.stop();
}