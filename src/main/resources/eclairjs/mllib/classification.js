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
     * mllib classification module.
     * @example
     * var mllibClassif = require('eclairjs/mllib/classification');
     * @module eclairjs/mllib/classification
     */
    module.exports = {
        ClassificationModel: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/ClassificationModel'),
        LogisticRegressionModel: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/LogisticRegression').LogisticRegressionModel,
        LogisticRegressionWithSGD: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/LogisticRegression').LogisticRegressionWithSGD,
        LogisticRegressionWithLBFGS: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/LogisticRegression').LogisticRegressionWithLBFGS,
        NaiveBayes: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/NaiveBayes').NaiveBayes,
        NaiveBayesModel: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/NaiveBayes').NaiveBayesModel,
        SVMModel: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/SVM').SVMModel,
        SVMWithSGD: require(EclairJS_Globals.NAMESPACE + '/mllib/classification/SVM').SVMWithSGD
    }
})();
