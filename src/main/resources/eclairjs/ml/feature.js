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
     * var ml = require('eclairjs/ml/feature');
     * @module eclairjs/ml/feature
     */
    module.exports = {
        Binarizer: require(EclairJS_Globals.NAMESPACE + '/ml/feature/Binarizer'),
        Bucketizer: require(EclairJS_Globals.NAMESPACE + '/ml/feature/Bucketizer'),
        ChiSqSelector: require(EclairJS_Globals.NAMESPACE + '/ml/feature/ChiSqSelector'),
        ChiSqSelectorModel: require(EclairJS_Globals.NAMESPACE + '/ml/feature/ChiSqSelectorModel'),
        CountVectorizer: require(EclairJS_Globals.NAMESPACE + '/ml/feature/CountVectorizer'),
        CountVectorizerModel: require(EclairJS_Globals.NAMESPACE + '/ml/feature/CountVectorizerModel'),
        DCT: require(EclairJS_Globals.NAMESPACE + '/ml/feature/DCT'),
        Word2VecModel: require(EclairJS_Globals.NAMESPACE + '/ml/feature/Word2VecModel'),
        Word2Vec: require(EclairJS_Globals.NAMESPACE + '/ml/feature/Word2Vec')
    }

})();
