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
     * A more class to represent a rating than array[Int, Int, float].
     * @classdesc
     */

    /**
     * @param {integer} user
     * @param {integer} product
     * @param {float} rating
     *  @class Rating
     *  @memberof module:eclairjs/mllib/recommendation
     */
    var Rating = Java.type('org.eclairjs.nashorn.wrap.mllib.recommendation.Rating');

    /**
     * @function module:eclairjs/mllib/recommendation.Rating#user
     * @returns {integer}
     */

    /**
     * @function module:eclairjs/mllib/recommendation.Rating#product
     * @returns {integer}
     */

    /**
     * @function module:eclairjs/mllib/recommendation.Rating#rating
     * @returns {float}
     */

    module.exports = Rating;

})();