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

   // var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
   // var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
   // var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * @constructor
     * @memberof module:eclairjs
     * @classdesc Resolves paths to files added through SparkContext.addFile().
     */
    var SparkFiles = function () {

    };
    /**
     * Get the absolute path of a file added through SparkContext.addFile().
     * @param {string} fileName
     * @returns {string}
     */
    SparkFiles.get = function (fileName) {
        return org.apache.spark.SparkFiles.get(fileName);
    };
    /**
     * Get the root directory that contains files added through SparkContext.addFile().
     * @param {string} fileName
     * @returns {string}
     */
    SparkFiles.getRootDirectory = function (fileName) {
        return org.apache.spark.SparkFiles.getRootDirectory(fileName);
    };

    module.exports = SparkFiles;


})();