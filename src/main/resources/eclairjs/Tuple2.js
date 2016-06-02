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
    var javaTuple2 = Java.type('scala.Tuple2');
    /**
     * @classdesc
     * @param {object} obj
     * @param {object} obj
     * @constructor
     * @memberof module:eclairjs
     */
    var Tuple2 = function () {
        this.logger = Logger.getLogger("Tuple2_js");
        var jvmObject;
        if (arguments.length == 2) {
            jvmObject = new javaTuple2(Serialize.jsToJava(arguments[0]), Serialize.jsToJava(arguments[1]));
        } else {
            jvmObject = Utils.unwrapObject(arguments[0]);
        }
        JavaWrapper.call(this, jvmObject);

    };

    Tuple2.prototype = Object.create(JavaWrapper.prototype);

    Tuple2.prototype.constructor = Tuple2;

    /**
     *
     * @returns {object}
     */
    Tuple2.prototype._1 = function () {
        return Utils.javaToJs( this.getJavaObject()._1());
    };

    /**
     *
     * @returns {object}
     */
    Tuple2.prototype._2 = function () {
        return Utils.javaToJs( this.getJavaObject()._2());
    };

    Tuple2.prototype.toJSON = function () {
        var jsonObj = {};
        jsonObj[0] = this._1();
        jsonObj[1] = this._2();
        jsonObj.length = 2;
        return jsonObj;

    };

    module.exports = Tuple2;

})();