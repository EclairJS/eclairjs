/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
    /**
     * ml classification module.
     * @module eclairjs/ml/classification
     */
    module.exports = {
        Classifier: require(EclairJS_Globals.NAMESPACE + '/ml/classification/Classifier'),
        ClassificationModel: require(EclairJS_Globals.NAMESPACE + '/ml/classification/ClassificationModel'),
        ProbabilisticClassifier: require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassifier'),
        ProbabilisticClassifierModel: require(EclairJS_Globals.NAMESPACE + '/ml/classification/ProbabilisticClassifierModel'),
        DecisionTreeClassifier: require(EclairJS_Globals.NAMESPACE + '/ml/classification/DecisionTreeClassifier'),
        DecisionTreeClassificationModel: require(EclairJS_Globals.NAMESPACE + '/ml/classification/DecisionTreeClassificationModel'),
        GBTClassification: require(EclairJS_Globals.NAMESPACE + '/ml/classification/GBTClassification'),
        GBTClassificationModel: require(EclairJS_Globals.NAMESPACE + '/ml/classification/GBTClassificationModel'),
        LogisticRegression: require(EclairJS_Globals.NAMESPACE + '/ml/classification/LogisticRegression'),
        LogisticRegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/classification/LogisticRegressionModel'),
        LogisticRegressionSummary: require(EclairJS_Globals.NAMESPACE + '/ml/classification/LogisticRegressionSummary'),
        LogisticRegressionTrainingSummary: require(EclairJS_Globals.NAMESPACE + '/ml/classification/LogisticRegressionTrainingSummary'),
        MultilayerPerceptronClassifier: require(EclairJS_Globals.NAMESPACE + '/ml/classification/MultilayerPerceptronClassifier'),
        MultilayerPerceptronClassificationModel: require(EclairJS_Globals.NAMESPACE + '/ml/classification/MultilayerPerceptronClassificationModel'),
        BinaryLogisticRegressionSummary: require(EclairJS_Globals.NAMESPACE + '/ml/classification/BinaryLogisticRegressionSummary'),
        BinaryLogisticRegressionTrainingSummary: require(EclairJS_Globals.NAMESPACE + '/ml/classification/BinaryLogisticRegressionTrainingSummary')
    }

})();

