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
     * mllib regression module.
     * @example
     * var mllibRegress = require('eclairjs/mllib/regression');
     * var mllibLinalg = require('eclairjs/mllib/linalg');
     * var lp = new mllibRegress.LabeledPoint(0, new DenseVector([0.0, 0.1, 0.2]));
     * @module eclairjs/mllib/regression
     */
    module.exports = {
        GeneralizedLinearModel: require(EclairJS_Globals.NAMESPACE + '/mllib/regression/GeneralizedLinearModel'),
        IsotonicRegression: require(EclairJS_Globals.NAMESPACE + '/mllib/regression/IsotonicRegression').IsotonicRegression,
        IsotonicRegressionModel: require(EclairJS_Globals.NAMESPACE + '/mllib/regression/IsotonicRegression').IsotonicRegressionModel,
        LabeledPoint: require(EclairJS_Globals.NAMESPACE + '/mllib/regression/LabeledPoint'),
        LinearRegressionModel: require(EclairJS_Globals.NAMESPACE + '/mllib/regression/LinearRegressionModel'),
        LinearRegressionWithSGD: require(EclairJS_Globals.NAMESPACE + '/mllib/regression/LinearRegressionWithSGD')
    }
})();
