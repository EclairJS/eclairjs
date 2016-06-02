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
    var javaTuple3 = Java.type('scala.Tuple3');
    /**
     * @classdesc
     * @param {object} obj
     * @param {object} obj
     * @constructor
     * @memberof module:eclairjs
     */
    var Tuple3 = function () {
        this.logger = Logger.getLogger("Tuple3_js");
        var jvmObject;
        //print("length " + arguments.length)
        if (arguments.length == 3) {

            jvmObject = new javaTuple3(Serialize.jsToJava(arguments[0]), Serialize.jsToJava(arguments[1]), Serialize.jsToJava(arguments[2]));
        } else {
            jvmObject = Utils.unwrapObject(arguments[0]);
        }
        //print("Tuple3 " + jvmObject);
        JavaWrapper.call(this, jvmObject);

    };

    Tuple3.prototype = Object.create(JavaWrapper.prototype);

    Tuple3.prototype.constructor = Tuple3;

    /**
     *
     * @returns {object}
     */
    Tuple3.prototype._1 = function () {
        return Utils.javaToJs( this.getJavaObject()._1());
    };

    /**
     *
     * @returns {object}
     */
    Tuple3.prototype._2 = function () {
        return Utils.javaToJs( this.getJavaObject()._2());
    };

    /**
     *
     * @returns {object}
     */
    Tuple3.prototype._3 = function () {
        return Utils.javaToJs( this.getJavaObject()._3());
    };

    Tuple3.prototype.toJSON = function () {
        var jsonObj = {};
        jsonObj[0] = this._1();
        jsonObj[1] = this._2();
        jsonObj[2] = this._3();
        jsonObj.length = 3;
        return jsonObj;

    };

    module.exports = Tuple3;

})();