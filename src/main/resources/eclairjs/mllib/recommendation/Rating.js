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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');

    /**
     * A more class to represent a rating than array[Int, Int, float].
     * @classdesc
     */

    /**
     * @param {integer} user
     * @param {integer} product
     * @param {float} rating
     *  @class
     *  @memberof module:eclairjs/mllib/recommendation
     */
    var Rating = function () {
        this.logger = Logger.getLogger("Rating_js");
        var jvmObject = arguments[0];
        if (arguments.length > 1) {
            jvmObject = new org.apache.spark.mllib.recommendation.Rating(arguments[0], arguments[1], arguments[2]);
        }

        JavaWrapper.call(this, jvmObject);

    };

    Rating.prototype = Object.create(JavaWrapper.prototype);

    Rating.prototype.constructor = Rating;

    Rating.prototype.user = function () {
        return this.getJavaObject().user();
    };

    Rating.prototype.product = function () {
        return this.getJavaObject().product();
    };

    Rating.prototype.rating = function () {
        return this.getJavaObject().rating();
    };

    Rating.prototype.toString = function () {
        return "{Rating: [" + this.user() + "," + this.product() + "," + this.rating() + "]}";
    };

    module.exports = Rating;

})();