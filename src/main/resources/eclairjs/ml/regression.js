
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
     * ml feature module.
     * @example
     * var ml = require('eclairjs/ml/regression');
     * @module eclairjs/ml/regression
     */
    module.exports = {
        DecisionTreeRegressor: require(EclairJS_Globals.NAMESPACE + '/ml/regression/DecisionTreeRegressor'),
        DecisionTreeRegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/regression/DecisionTreeRegressionModel'),
        AFTSurvivalRegression: require(EclairJS_Globals.NAMESPACE + '/ml/regression/AFTSurvivalRegression'),
        AFTSurvivalRegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/regression/AFTSurvivalRegressionModel'),
        GBTRegressor: require(EclairJS_Globals.NAMESPACE + '/ml/regression/GBTRegressor'),
        GBTRegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/regression/GBTRegressionModel'),
        LinearRegression: require(EclairJS_Globals.NAMESPACE + '/ml/regression/LinearRegression'),
        RegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/regression/RegressionModel'),
        RandomForestRegressor: require(EclairJS_Globals.NAMESPACE + '/ml/regression/RandomForestRegressor'),
        RandomForestRegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/regression/RandomForestRegressionModel'),
        LinearRegressionModel: require(EclairJS_Globals.NAMESPACE + '/ml/regression/LinearRegressionModel'),
        LinearRegressionSummary: require(EclairJS_Globals.NAMESPACE + '/ml/regression/LinearRegressionSummary'),
        LinearRegressionTrainingSummary: require(EclairJS_Globals.NAMESPACE + '/ml/regression/LinearRegressionTrainingSummary')
    }

})();
