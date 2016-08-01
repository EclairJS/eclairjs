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
     * A sparse vector represented by an index array and an value array.
     *
     * @param size size of the vector.
     * @param indices index array, assume to be strictly increasing.
     * @param values value array, must have the same length as the index array.
     * @classdesc
     */


    /**
     * @param {integer} size
     * @param {integer[]} indices
     * @param {float[]} values
     * @class SparseVector
     * @memberof module:eclairjs/ml/linalg
     * @extends module:eclairjs/ml/linalg.Vector
     */
    var SparseVector = Java.type('org.eclairjs.nashorn.wrap.ml.linalg.SparseVector');

    /**
     * @function
     * @name module:eclairjs/ml/linalg.SparseVector#indices
     * @returns {integer[]}
     */


    /**
     * @function
     * @name module:eclairjs/ml/linalg.SparseVector#values
     * @returns {module:eclairjs.Tuple}
     */


    module.exports = SparseVector;

})();

