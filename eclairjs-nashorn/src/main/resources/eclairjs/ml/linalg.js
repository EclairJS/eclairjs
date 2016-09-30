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
     * ml linalg module.
     * @example
     * var mlLinalg = require('eclairjs/ml/linalg');
     * var dv = new mlLinalg.Vectors.DenseVector([0.0, 0.1, 0.2]);
     * @module eclairjs/ml/linalg
     */
    module.exports = {
        //Matrix: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/Matrix'),
        //DenseMatrix: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/DenseMatrix'),
        //SparseMatrix: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/SparseMatrix'),
        //Matrices: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/Matrices'),
        //QRDecomposition: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/QRDecomposition'),
        //SingularValueDecomposition: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/SingularValueDecomposition'),
        Vectors: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/Vectors'),
        Vector: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/Vector'),
        VectorUDT: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/VectorUDT'),
        DenseVector: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/DenseVector'),
        SparseVector: require(EclairJS_Globals.NAMESPACE + '/ml/linalg/SparseVector')
    }
})();
