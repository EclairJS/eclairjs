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
(function () {
    /**
     * ml feature module.
     * @example
     * var param = require('eclairjs/ml');
     * @module eclairjs/ml
     */
    module.exports = {
        Model: require(EclairJS_Globals.NAMESPACE + '/ml/Model'),
        Transformer: require(EclairJS_Globals.NAMESPACE + '/ml/Transformer'),
        Estimator: require(EclairJS_Globals.NAMESPACE + '/ml/Estimator'),
        Pipeline: require(EclairJS_Globals.NAMESPACE + '/ml/Pipeline'),
        PipelineModel: require(EclairJS_Globals.NAMESPACE + '/ml/PipelineModel'),
        PipelineStage: require(EclairJS_Globals.NAMESPACE + '/ml/PipelineStage'),
        Predictor: require(EclairJS_Globals.NAMESPACE + '/ml/Predictor'),
        PredictionModel: require(EclairJS_Globals.NAMESPACE + '/ml/PredictionModel'),
        UnaryTransformer: require(EclairJS_Globals.NAMESPACE + '/ml/UnaryTransformer')
    }

})();