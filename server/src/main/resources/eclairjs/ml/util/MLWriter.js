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


    /**
     * @classdesc
     * Utility classes that can save ML instances.
     * @class
     * @memberof module:eclairjs/ml/util
     */

    var MLWriter = function (jvmObject) {
        this.logger = Logger.getLogger("ml_util_MLWriter_js");
        JavaWrapper.call(this, jvmObject);

    };

    MLWriter.prototype = Object.create(JavaWrapper.prototype);

    MLWriter.prototype.constructor = MLWriter;


    /**
     * Saves the ML instances to the input path.
     * @param {string} path
     */
    MLWriter.prototype.save = function (path) {
            this.getJavaObject().save(path);
    };


    /**
     * Overwrites if the output path already exists.
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    MLWriter.prototype.overwrite = function () {
           var javaObject =  this.getJavaObject().overwrite();
           return new MLWriter(javaObject);
    };


    /**
     * @param {module:eclairjs/sql.SQLContext} sqlContext
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    MLWriter.prototype.context = function (sqlContext) {
           var sqlContext_uw = Utils.unwrapObject(sqlContext);
           var javaObject =  this.getJavaObject().context(sqlContext_uw);
           return new MLWriter(javaObject);
    };

    /**
     * @param {module:eclairjs/sql.SparkSession} sparkSession
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    MLWriter.prototype.session = function(sparkSession) {
       var sparkSession_uw = Utils.unwrapObject(sparkSession);
       var javaObject =  this.getJavaObject().session(sparkSession_uw);
       return new MLWriter(javaObject);
    };
    

    module.exports = MLWriter;
})();
