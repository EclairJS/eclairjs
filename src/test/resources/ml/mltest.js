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
 * We need to load SparkSession.js order to create a SparkSession.  The
 * SparkSession will load the rest of sparkJS files. So this is the only  
 * one the user has to explicitly load. 
 */
var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
var sparkSession = SparkSession
    .builder()
    .appName("ml Unit test")
    .master("local[*]")
    .getOrCreate();


var Word2VecExample = function() {

    load("examples/ml/word2vec_example.js");
    var rows = run(sparkSession);
    if (rows && rows.length === 3) {
        return "passed";
    } else {
        return "failed";
    }
}

var AFTSurvivalRegressionExample = function() {

    load("examples/ml/aft_survival_regression_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }

}

var ALSExample = function() {

    load("examples/ml/als_example.js");
    var result = run(sparkSession);
    if (result > 0) {
        return "passed"
    } else {
        return "failed";
    }
}


var BinarizerExample = function() {

    load("examples/ml/binarizer_example.js");
    var rows = run(sparkSession);
    return JSON.stringify(rows);
}

var BisectingKMeansExample = function() {

    load("examples/ml/bisecting_kmeans_example.js");
    var result = run(sparkSession);
    return JSON.stringify(result);
}

var BucketizerExample = function() {

    load("examples/ml/bucketizer_example.js");
    var rows = run(sparkSession).collect();
    return JSON.stringify(rows);
}

var ChiSqSelectorExample = function() {

    load("examples/ml/chi_sq_selector_example.js");
    var rows = run(sparkSession).collect();
    return JSON.stringify(rows);
}

var CountVectorizerExample = function() {

    load("examples/ml/count_vectorizer_example.js");
    var rows = run(sparkSession).collect();
    return JSON.stringify(rows);
}

var DCTExample = function() {

    load("examples/ml/dct_example.js");
    var rows = run(sparkSession).collect();
    return JSON.stringify(rows);
}

var DecisionTreeClassificationExample = function() {

    load("examples/ml/decision_tree_classification_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var DecisionTreeRegressionExample = function() {

    load("examples/ml/decision_tree_regression_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var ElementwiseProductExample = function() {

    load("examples/ml/elementwise_product_example.js");
    var result = run(sparkSession);
    return JSON.stringify(result.collect());
}

var EstimatorTransformerParamExample = function() {

    load("examples/ml/estimator_transformer_param_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var GradientBoostedTreeClassifierExample = function() {

    load("examples/ml/gradient_boosted_tree_classifier_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var GradientBoostedTreeRegressorExample = function() {

    load("examples/ml/gradient_boosted_tree_regressor_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var IndexToStringExample = function() {

    load("examples/ml/index_to_string_example.js");
    var result = run(sparkSession);
    return JSON.stringify(result.collect());
}

var KMeansExample = function() {

    load("examples/ml/kmeans_example.js");
    var result = run(sparkSession);
    return JSON.stringify(result);
}

var LDAExample = function() {

    load("examples/ml/LDA_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var LinearRegressionWithElasticNetExample = function() {

    load("examples/ml/linear_regression_with_elastic_net_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result);
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var LogisticRegressionSummaryExample = function() {

    load("examples/ml/logistic_regression_summary_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result);
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var LogisticRegressionWithElasticNetExample = function() {

    load("examples/ml/logistic_regression_with_elastic_net_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result);
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var MinMaxScalerExample = function() {

    load("examples/ml/min_max_scaler_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result);
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var ModelSelectionViaTrainValidationSplitExample = function() {

    load("examples/ml/model_selection_via_train_validation_split_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result);
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var MultilayerPerceptronClassifierExample = function() {

    load("examples/ml/multilayer_perceptron_classifier_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var NaiveBayesExample = function() {

    load("examples/ml/naive_bayes_example.js");
    var result = run(sparkSession);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}

var NGramExample = function() {

    load("examples/ml/ngram_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var NormalizerExample = function() {

    load("examples/ml/normalizer_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var OneHotEncoderExample = function() {

    load("examples/ml/one_hot_encoder_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var PCAExample = function() {

    load("examples/ml/pca_example.js");
    var rows = run(sparkSession).collect();
    return JSON.stringify(rows);
}

var PipelineExample = function() {

    load("examples/ml/pipeline_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var PolynomialExpansionExample = function() {

    load("examples/ml/polynomial_expansion_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var QuantileDiscretizerExample = function() {

    load("examples/ml/quantile_discretizer_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var RandomForestClassifierExample = function() {

    load("examples/ml/random_forest_classifier_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var RandomForestRegressorExample = function() {

    load("examples/ml/random_forest_regressor_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var RFormulaExample = function() {

    load("examples/ml/rformula_example.js");
    var result = run(sparkSession);
    var str = JSON.stringify(result)
    if (str) {
        return "passed";
    } else {
        return "failed";
    }
}

var vectorsDense = function() {
    var Vectors = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vectors');
    var v = Vectors.dense(1.0, 2.0);
    var x = Vectors.dense([1.0, 2.0]);
    return x.equals(v);
}
