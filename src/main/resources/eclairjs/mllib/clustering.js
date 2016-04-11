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
     * mllib clustering module.
     * @example
     * var mllibCluster = require('eclairjs/mllib/clustering');
     * @module eclairjs/mllib/clustering
     */
    module.exports = {
        BisectingKMeans: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/BisectingKMeans'),
        BisectingKMeansModel: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/BisectingKMeansModel'),
        KMeans: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/KMeans'),
        KMeansModel: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/KMeansModel'),
        LDA: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/LDA'),
        LDAModel: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/LDAModel').LDAModel,
        DistributedLDAModel: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/LDAModel').DistributedLDAModel,
        LocalLDAModel: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/LDAModel').LocalLDAModel,
        PowerIterationClustering: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/PowerIterationClustering').PowerIterationClustering,
        PowerIterationClusteringAssignment: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/PowerIterationClustering').PowerIterationClusteringAssignment,
        PowerIterationClusteringModel: require(EclairJS_Globals.NAMESPACE + '/mllib/clustering/PowerIterationClustering').PowerIterationClusteringModel
    }
})();
