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

    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var Param = require(EclairJS_Globals.NAMESPACE + '/ml/param/Param');


    /**
     * @param {string} parent
     * @param {string} name
     * @param {string} doc
     *  @class
     *  @extends module:eclairjs/ml/param.Param
     *  @memberof module:eclairjs/ml/param
     */
    var StringArrayParam = function (parent,  name,  doc) {
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.ml.param.StringArrayParam) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.ml.param.StringArrayParam(parent,  name,  doc);
        }

        this.logger = Logger.getLogger("StringArrayParam_js");
        Param.call(this, jvmObject);

    };

    StringArrayParam.prototype = Object.create(Param.prototype);

    StringArrayParam.prototype.constructor = StringArrayParam;



    module.exports = StringArrayParam;

})();

