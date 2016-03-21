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
 bin/eclairjs.sh examples/mllib/naive_bayes_example.js"
 */


function run(sc) {

    var path =  ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_libsvm_data.txt";
    var inputData = MLUtils.loadLibSVMFile(sc, path);
    var tmp = inputData.randomSplit([0.6, 0.4], 12345);
    var training = tmp[0]; // training set
    var test = tmp[1]; // test set
    var model = NaiveBayes.train(training, 1.0);

    var predictionAndLabel = test.mapToPair(function (lp, model) {
        return new Tuple(model.predict(lp.getFeatures()), lp.getLabel());
    }, [model]);

    var ret = {};
    ret.model = model;
    ret.accuracy = predictionAndLabel.filter(function (tuple) {
            return tuple[0] == tuple[1];
        }).count() / test.count();

    return ret;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("Naive Bayes Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("accuracy = " + result.accuracy);
    // Save and load model
    result.model.save(sc, "target/tmp/myNaiveBayesModel");
    var sameModel = NaiveBayesModel.load(sc, "target/tmp/myNaiveBayesModel");
}