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

    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');

    var JavaWrapper = function (jvmObj) {
        this._jvmObj = jvmObj;
        this.javaWrapperLogger = Logger.getLogger("JavaWrapper_js");
        this.javaWrapperLogger.debug("JavaWrapper constructor");
    };

    JavaWrapper.prototype.getJavaObject = function () {
        this.javaWrapperLogger.debug("getJavaObject");
        return this._jvmObj;
    };

    JavaWrapper.prototype.setJavaObject = function (obj) {
        this.javaWrapperLogger.debug("setJavaObject");
        this._jvmObj = obj;
    };

    JavaWrapper.prototype.toString = function () {
        return this._jvmObj.toString();
    }

    JavaWrapper.prototype.toJSON = function () {
        return this.toString();
    }

    module.exports = JavaWrapper;

})();