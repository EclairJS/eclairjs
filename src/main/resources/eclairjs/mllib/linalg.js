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
     * mllib linalg module.
     * @example
     * var mllibLinalg = require('eclairjs/mllib/linalg');
     * var dv = new mllibLinalg.Vectors.DenseVector([0.0, 0.1, 0.2]);
     * @module eclairjs/mllib/linalg
     */
    module.exports = {
        Matrix: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Matrices').Matrix,
        DenseMatrix: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Matrices').DenseMatrix,
        SparseMatrix: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Matrices').SparseMatrix,
        Matrices: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Matrices').Matrices,
        QRDecomposition: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/SingularValueDecomposition').QRDecomposition,
        SingularValueDecomposition: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/SingularValueDecomposition').SingularValueDecomposition,
        Vectors: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vectors').Vectors,
        Vector: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vectors').Vector,
        VectorUDT: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vectors').VectorUDT,
        DenseVector: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vectors').DenseVector,
        SparseVector: require(EclairJS_Globals.NAMESPACE + '/mllib/linalg/Vectors').SparseVector
    }
})();
