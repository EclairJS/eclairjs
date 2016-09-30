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
     * Represents a numeric vector, whose index type is Int and value type is Double.
     *
     * Note: Users should not implement this interface.
     * @classdesc
     * @constructor Vector
     * @abstract
     * @memberof module:eclairjs/ml/linalg
     */

    var Vector = Java.type('org.eclairjs.nashorn.wrap.ml.linalg.DenseVector');


    /**
     * Size of the vector.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#size
     * @returns {integer}
     */



    /**
     * Converts the instance to a double array.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#toArray
     * @returns {float[]}
     */


    /**
     * @function
     * @name module:eclairjs/ml/linalg.Vector#equals
     * @param {object} other
     * @returns {boolean}
     */



    /**
     *
     * Returns a hash code value for the vector. The hash code is based on its size and its first 128
     * nonzero entries, using a hash algorithm similar to {@link hashCode}.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#hashCode
     * @returns {number}
     */



    /**
     * Gets the value of the ith element.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#apply
     * @param {number} i  index
     * @returns {number}
     */



    /**
     * Makes a deep copy of this vector.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#copy
     * @returns {module:eclairjs/ml/linalg.Vector}
     */


    /**
     * Number of active entries.  An "active entry" is an element which is explicitly stored,
     * regardless of its value.  Note that inactive entries have value 0.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#numActives
     * @returns {integer}
     */


    /**
     * Number of nonzero elements. This scans all active values and count nonzeros.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#numNonzeros
     * @returns {integer}
     */


    /**
     * Converts this vector to a sparse vector with all explicit zeros removed.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#toSparse
     * @returns {module:eclairjs/ml/linalg.SparseVector}
     */


    /**
     * Converts this vector to a dense vector.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#toDense
     * @returns {module:eclairjs/ml/linalg.DenseVector}
     */


    /**
     * Returns a vector in either dense or sparse format, whichever uses less storage.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#compressed
     * @returns {module:eclairjs/ml/linalg.Vector}
     */


    /**
     * Find the index of a maximal element.  Returns the first maximal element in case of a tie.
     * Returns -1 if vector has length 0.
     * @function
     * @name module:eclairjs/ml/linalg.Vector#argmax
     * @returns {integer}
     */



    module.exports = Vector;

})();
