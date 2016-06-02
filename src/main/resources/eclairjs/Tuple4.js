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
    var javaTuple4 = Java.type('scala.Tuple4');
    /**
     * @classdesc
     * @param {object} obj
     * @param {object} obj
     * @constructor
     * @memberof module:eclairjs
     */
    var Tuple4 = function () {
        this.logger = Logger.getLogger("Tuple4_js");
        var jvmObject;
        //print("length " + arguments.length)
        if (arguments.length == 3) {

            jvmObject = new javaTuple4(
                Serialize.jsToJava(arguments[0]),
                Serialize.jsToJava(arguments[1]),
                Serialize.jsToJava(arguments[2]),
                Serialize.jsToJava(arguments[3])
            );
        } else {
            jvmObject = Utils.unwrapObject(arguments[0]);
        }
        //print("Tuple3 " + jvmObject);
        JavaWrapper.call(this, jvmObject);

    };

    Tuple4.prototype = Object.create(JavaWrapper.prototype);

    Tuple4.prototype.constructor = Tuple4;

    /**
     *
     * @returns {object}
     */
    Tuple4.prototype._1 = function () {
        return Utils.javaToJs( this.getJavaObject()._1());
    };

    /**
     *
     * @returns {object}
     */
    Tuple4.prototype._2 = function () {
        return Utils.javaToJs( this.getJavaObject()._2());
    };

    /**
     *
     * @returns {object}
     */
    Tuple4.prototype._3 = function () {
        return Utils.javaToJs( this.getJavaObject()._3());
    };

    /**
     *
     * @returns {object}
     */
    Tuple4.prototype._4 = function () {
        return Utils.javaToJs( this.getJavaObject()._4());
    };

    Tuple4.prototype.toJSON = function () {
        var jsonObj = {};
        jsonObj[0] = this._1();
        jsonObj[1] = this._2();
        jsonObj[2] = this._3();
        jsonObj[3] = this._4();
        jsonObj.length = 4;
        return jsonObj;

    };

    module.exports = Tuple4;

})();