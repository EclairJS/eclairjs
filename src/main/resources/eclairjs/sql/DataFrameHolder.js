/*
 * Copyright 2015 IBM Corp.
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
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');

    /**
     * @constructor
     * @memberof module:sql
     * @classdesc A container for a DataFrame, used for implicit conversions.
     */
    var DataFrameHolder = function (jvmDataFrame) {
        JavaWrapper.call(this, jvmDataFrame);

        // Initialize our Row-specific properties
        this.logger = Logger.getLogger("sql.DataFrameHolder_js");
    };

    DataFrameHolder.prototype = Object.create(JavaWrapper.prototype);

    DataFrameHolder.prototype.constructor = DataFrameHolder;

    /**
     * @returns {DataFrame}
     */
    DataFrameHolder.prototype.toDF = function () {
        return Utils.javaToJs(this.getJavaObject().toDF());
    };

    module.exports = DataFrameHolder;

})();