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

var DenseVector = require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/DenseVector');

/*
 * We need to load SparkContext.js and SparkConf.js in order to create SparkContext
 * The SparkContext will load the rest of sparkJS files. So these are the oly two 
 * the user has to explicitly load. 
 */

var sparkContext = new SparkContext("local[*]", "mllib Unit test");

var LinearRegressionWithSGDExample = function() {

    load("examples/mllib/linear_regression_example.js");
    return JSON.stringify(run(sparkContext));
}

var AssociationRulesTest = function() {
    load("examples/mllib/association_rules_example.js");
    return run(sparkContext);
}

var BisectingKMeansExample = function() {
    load("examples/mllib/bisecting_k_means_example.js");
    return JSON.stringify(run(sparkContext));
}

var DecisionTreeClassificationExample = function() {
    load("examples/mllib/decision_tree_classification_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testErr = result.testErr;
    json.depth = result.model.depth();
    json.nodes = result.model.numNodes();
    if (result) {
        return "successful";
    } else {
        return "failed";
    }
}

var DecisionTreeRegressionExample = function() {
    load("examples/mllib/decision_tree_regression_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testMSE = result.testMSE;
    json.depth = result.model.depth();
    json.nodes = result.model.numNodes();
    if (result) {
        return "successful";
    } else {
        return "failed";
    }
}

var fpGrowthExample = function() {
    load("examples/mllib/fp_growth_example.js");
    var result = run(sparkContext, true);
    return JSON.stringify(result);
}

var GradientBoostingClassificationExample = function() {
    load("examples/mllib/gradient_boosting_classification_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testErr = result.testErr;
    json.summary = result.model.toString();
    print(JSON.stringify(json))
    if (result) {
        return "successful";
    } else {
        return "failed"
    }
}

var GradientBoostingRegressionExample = function() {
    load("examples/mllib/gradient_boosting_regression_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testMSE = result.testMSE;
    json.summary = result.model.toString();
    if (result) {
        return "successful";
    } else {
        return "failed"
    }
}

var IsotonicRegressionExample = function() {
    load("examples/mllib/isotonic_regression_example.js");
    var result = run(sparkContext);
    var json = {};
    json.meanSquaredError = result.meanSquaredError;
    return JSON.stringify(json);
}

var KMeansExample = function() {
    load("examples/mllib/kmeans_example.js");
    var result = run(sparkContext);
    if (result.cost > 0) {
        return "all is good";
    } else {
        return "Error running test"
    }
}

var binaryClassificationMetricsExample = function() {
    load("examples/mllib/binary_classification_metrics_example.js");
    var result = run(sparkContext);
    if (result) {
        return "all is good";
    } else {
        return "Error running test"
    }
}

var lbfgsExample = function() {
    load("examples/mllib/lbfgs_example.js");
    var result = run(sparkContext);
    return result.auROC;
}

var ldaExample = function() {
    load("examples/mllib/lda_example.js");
    var result = run(sparkContext);
    return result.vocabSize;
}

var lrExample = function() {
    load("examples/mllib/lr_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result);
}

var multiclassClassificationMetricsExample = function() {
    load("examples/mllib/multiclass_classification_metrics_example.js");
    var result = run(sparkContext);
    return result.metrics.weightedFalsePositiveRate();
}

var RandomRDDGenerationExample = function() {
    load("examples/mllib/random_rdd_generation_example.js");
    var result = run(sparkContext);
    if (result.count > 0 && result.normalVectorCount > 0) {
        return "all is good";
    } else {
        return "Error running test"
    }
}

var multilabelClassificationMetricsExample = function() {
    load("examples/mllib/multilabel_classification_metrics_example.js");
    var metrics = run(sparkContext);
    return metrics.subsetAccuracy();
}

var naiveBayesExample = function() {
    load("examples/mllib/naive_bayes_example.js");
    var result = run(sparkContext);
    return result.accuracy;
}

var pcaExample = function() {
    load("examples/mllib/pca_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result);
}

var PowerIterationClusteringExample = function() {
    load("examples/mllib/power_iteration_clustering_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result);
}

var PrefixSpanExample = function() {
    load("examples/mllib/prefix_span_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result);
}

var RecommendationExample = function() {
    load("examples/mllib/recommendation_example.js");
    var result = run(sparkContext);
    if (result.MSE > 0) {
        return "successful";
    } else {
        return "failed";
    }
}

var SVDExample = function() {
    load("examples/mllib/svd_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result.s);
}

var SVMwithSGDExample = function() {
    load("examples/mllib/svm_with_sgd_example.js");
    var result = run(sparkContext);
    return result.auROC;
}


var RankingMetricExample = function() {
    load("examples/mllib/ranking_metrics_example.js");
    var result = run(sparkContext);
    if (result) {
        return "passed";
    } else {
        return "failed";
    }
}
