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
(function() {

    /**
     *
     * @constructor Vectors
     * @memberof module:eclairjs/ml/linalg
     */
    var Vectors = Java.type('org.eclairjs.nashorn.wrap.ml.linalg.Vectors');

    //
    // static methods
    //

    /**
     * Creates a dense vector from a double array.
     * @function
     * @name module:eclairjs/ml/linalg.Vectors#dense
     * @param {...float} values Array of floats or float1, ....., floatN
     * @returns {module:eclairjs/ml/linalg.Vector}
     */


    /**
     * Creates a sparse vector providing its index array and value array.
     * @function
     * @name module:eclairjs/ml/linalg.Vectors#sparse
     * @param {integer} size  vector size.
     * @param {integer[]} indices  index array, must be strictly increasing.
     * @param {float[]} values  value array, must have the same length as indices.
     * @returns {module:eclairjs/ml/linalg.Vector}
     */


    /**
     * Creates a vector of all zeros.
     * @function
     * @name module:eclairjs/ml/linalg.Vectors#zeros
     * @param {integer} size  vector size
     * @returns {module:eclairjs/ml/linalg.Vector}  a zero vector
     */


    /**
     * Returns the p-norm of this vector.
     * @function
     * @name module:eclairjs/ml/linalg.Vectors#norm
     * @param {module:eclairjs/ml/linalg.Vector} vector  input vector.
     * @param {float} p  norm.
     * @returns {float}  norm in L^p^ space.
     */


    /**
     * Returns the squared distance between two Vectors.
     * @function
     * @name module:eclairjs/ml/linalg.Vectors#sqdist
     * @param {module:eclairjs/ml/linalg.Vector} v1  first Vector.
     * @param {module:eclairjs/ml/linalg.Vector} v2  second Vector.
     * @returns {float}  squared distance between two Vectors.
     */


    module.exports = Vectors;


})();
