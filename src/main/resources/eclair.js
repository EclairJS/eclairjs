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
     * eclairjs module.
     * @example
     * var eclairjs = require('eclairjs');
     * var eclairjs = new eclairjs.List([1,2]);
     * @module eclairjs
     */
    module.exports = {
        List: require(EclairJS_Globals.NAMESPACE + '/List'),
        Tuple: require(EclairJS_Globals.NAMESPACE + '/Tuple'),
        Serializable: require(EclairJS_Globals.NAMESPACE + '/Serializable'),
        Accumulable: require(EclairJS_Globals.NAMESPACE + '/Accumulable'),
        AccumulableParam: require(EclairJS_Globals.NAMESPACE + '/AccumulableParam'),
        Accumulator: require(EclairJS_Globals.NAMESPACE + '/Accumulator'),
        AccumulatorParam: require(EclairJS_Globals.NAMESPACE + '/AccumulatorParam'),
        IntAccumulatorParam: require(EclairJS_Globals.NAMESPACE + '/IntAccumulatorParam'),
        FloatAccumulatorParam: require(EclairJS_Globals.NAMESPACE + '/FloatAccumulatorParam'),
        SparkConf: require(EclairJS_Globals.NAMESPACE + '/SparkConf'),
        SparkContext: require(EclairJS_Globals.NAMESPACE + '/SparkContext'),
        SparkFiles: require(EclairJS_Globals.NAMESPACE + '/SparkFiles'),
        SparkJobInfo: require(EclairJS_Globals.NAMESPACE + '/SparkJobInfo'),
        SparkStageInfo: require(EclairJS_Globals.NAMESPACE + '/SparkStageInfo'),
        SparkStatusTracker: require(EclairJS_Globals.NAMESPACE + '/SparkStatusTracker'),
        RDD: require(EclairJS_Globals.NAMESPACE + '/RDD'),
        FloatRDD: require(EclairJS_Globals.NAMESPACE + '/FloatRDD'),
        PairRDD: require(EclairJS_Globals.NAMESPACE + '/PairRDD'),
        FutureAction: require(EclairJS_Globals.NAMESPACE + '/FutureAction'),
        Partitioner: require(EclairJS_Globals.NAMESPACE + '/Partitioner'),
        HashPartitioner: require(EclairJS_Globals.NAMESPACE + '/HashPartitioner'),
        RangePartitioner: require(EclairJS_Globals.NAMESPACE + '/RangePartitioner'),
        Logger: require(EclairJS_Globals.NAMESPACE + '/Logger')

    }
})();

