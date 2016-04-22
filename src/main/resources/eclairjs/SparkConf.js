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
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * @constructor
     * @memberof module:eclairjs
     * @classdesc Configuration for a Spark application. Used to set various Spark parameters as key-value pairs.
     * Most of the time, you would create a SparkConf object with new SparkConf(),  parameters you set directly on the SparkConf
     * object take priority over system properties.
     * All setter methods in this class support chaining. For example, you can write new SparkConf().setMaster("local").setAppName("My app").
     * Note that once a SparkConf object is passed to Spark, it is cloned and can no longer be modified by the user.
     * Spark does not support modifying the configuration at runtime.
     */
    var SparkConf = function (conf) {
        var jvmObj = new org.apache.spark.SparkConf();
        this.logger = Logger.getLogger("SparkConf_js");
        JavaWrapper.call(this, jvmObj);
    };

    SparkConf.prototype = Object.create(JavaWrapper.prototype);

    SparkConf.prototype.constructor = SparkConf;

    /**
     * Set a name for your application.
     * @param {string} appName
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setAppName = function (appName) {
        this.getJavaObject().setAppName(appName);
        return this;
    };
    /**
     * The master URL to connect to, such as "local" to run locally with one thread,
     * "local[4]" to run locally with 4 cores, or "spark://master:7077" to run on a Spark standalone cluster.
     * @param {string} master
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setMaster = function (master) {
        this.getJavaObject().setMaster(master);
        return this;
    };

    module.exports = SparkConf;


})();

