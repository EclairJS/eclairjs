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
 * We need to load SparkContext.js and SparkConf.js in order to create SparkContext
 * The SparkContext will load the rest of sparkJS files. So these are the oly two 
 * the user has to explicitly load. 
 */
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');
var sparkContext = new SparkContext("local[*]", "ml Unit test");

var Word2VecExample = function() {

    load("examples/ml/word2vec_example.js");
    var rows = run(sparkContext);
    return JSON.stringify(rows);
}

var AFTSurvivalRegressionExample = function() {

    load("examples/ml/aft_survival_regression_example.js");
    var result = run(sparkContext);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }

}

var ALSExample = function() {

    load("examples/ml/als_example.js");
    var result = run(sparkContext);
    if (result > 0) {
        return "passed"
    } else {
        return "failed";
    }
}


var BinarizerExample = function() {

    load("examples/ml/binarizer_example.js");
    var rows = run(sparkContext);
    return JSON.stringify(rows);
}

var BucketizerExample = function() {

    load("examples/ml/bucketizer_example.js");
    var rows = run(sparkContext).collect();
    return JSON.stringify(rows);
}

var ChiSqSelectorExample = function() {

    load("examples/ml/chi_sq_selector_example.js");
    var rows = run(sparkContext).collect();
    return JSON.stringify(rows);
}

var CountVectorizerExample = function() {

    load("examples/ml/count_vectorizer_example.js");
    var rows = run(sparkContext).collect();
    return JSON.stringify(rows);
}

var DCTExample = function() {

    load("examples/ml/dct_example.js");
    var rows = run(sparkContext).collect();
    return JSON.stringify(rows);
}

var DecisionTreeClassificationExample = function() {

    load("examples/ml/decision_tree_classification_example.js");
    var result = run(sparkContext);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var DecisionTreeRegressionExample = function() {

    load("examples/ml/decision_tree_regression_example.js");
    var result = run(sparkContext);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var ElementwiseProductExample = function() {

    load("examples/ml/elementwise_product_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result.collect());
}

var EstimatorTransformerParamExample = function() {

    load("examples/ml/estimator_transformer_param_example.js");
    var result = run(sparkContext);

    return JSON.stringify(result.rows);
}

var GradientBoostedTreeClassifierExample = function() {

    load("examples/ml/gradient_boosted_tree_classifier_example.js");
    var result = run(sparkContext);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var GradientBoostedTreeRegressorExample = function() {

    load("examples/ml/gradient_boosted_tree_regressor_example.js");
    var result = run(sparkContext);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var IndexToStringExample = function() {

    load("examples/ml/index_to_string_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result.collect());
}

var PCAExample = function() {

    load("examples/ml/pca_example.js");
    var rows = run(sparkContext).collect();
    return JSON.stringify(rows);
}
