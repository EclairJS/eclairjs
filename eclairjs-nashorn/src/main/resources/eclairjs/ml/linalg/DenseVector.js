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
     * A dense vector represented by a value array.
     * @classdesc
     */

    /**
     * @param {number[]} values
     * @class DenseVector
     * @memberof module:eclairjs/ml/linalg
     * @extends module:eclairjs/ml/linalg.Vector
     */
    var DenseVector = Java.type('org.eclairjs.nashorn.wrap.ml.linalg.DenseVector');


    /**
     * @function
     * @name module:eclairjs/ml/linalg.DenseVector#values
     * @returns {number[]}
     */


    module.exports = DenseVector;

})();
