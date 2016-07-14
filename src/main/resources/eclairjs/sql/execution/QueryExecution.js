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
    var logger = Logger.getLogger("QueryExecution_js");

    /**
     * The primary workflow for executing relational queries using Spark.  Designed to allow easy
     * access to the intermediate phases of query execution for developers.
     *
     * While this is not a public class, we should avoid changing the function names for the sake of
     * changing them, because a lot of developers use the feature for debugging.
     * @classdesc
     */

    /**
     * @param {module:eclairjs/sql.SQLContext} sqlContext
     * @param {LogicalPlan} logical
     *
     *  @class
     *  @memberof module:eclairjs/sql/execution
     */
    var QueryExecution = function (sqlContext, logical) {
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.sql.execution.QueryExecution) {
            var jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.sql.execution.QueryExecution(Utils.unwrapObject(sqlContext), Utils.unwrapObject(logical));
        }

        JavaWrapper.call(this, jvmObject);

    };

    QueryExecution.prototype = Object.create(JavaWrapper.prototype);

    QueryExecution.prototype.constructor = QueryExecution;


    QueryExecution.prototype.assertAnalyzed = function () {
        throw "not implemented by ElairJS";
//    this.getJavaObject().assertAnalyzed();
    };


    /**
     * @returns {string}
     */
    QueryExecution.prototype.simpleString = function () {
         return  this.getJavaObject().simpleString();
    };


    /**
     * @returns {string}
     */
    QueryExecution.prototype.toString = function () {
        return  this.getJavaObject().toString();
    };

    module.exports = QueryExecution;

})();