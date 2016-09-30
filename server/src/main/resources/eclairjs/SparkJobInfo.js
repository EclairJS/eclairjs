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
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var logger = Logger.getLogger("SparkJobInfo_js");


    /**
     *
     *
     * @constructor
     * @memberof module:eclairjs
     */
    var SparkJobInfo = function (jvmObject) {

        JavaWrapper.call(this, jvmObject);

    };

    SparkJobInfo.prototype = Object.create(JavaWrapper.prototype);

    SparkJobInfo.prototype.constructor = SparkJobInfo;


    /**
     * @returns {number}
     */
    SparkJobInfo.prototype.jobId = function () {
        return this.getJavaObject().jobId();
    };

    /**
     * @returns {number[]}
     */
    SparkJobInfo.prototype.stageIds = function () {
        return this.getJavaObject().stageIds();
    };


    /**
     * @returns {JobExecutionStatus}
     */
    SparkJobInfo.prototype.status = function () {
        throw "not implemented by ElairJS";
        // var javaObject =  this.getJavaObject().status();
        // return new JobExecutionStatus(javaObject);
    };



    module.exports = SparkJobInfo;

})();
