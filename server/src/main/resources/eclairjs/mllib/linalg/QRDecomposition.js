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
     * :: Experimental ::
     * Represents QR factors.
     * @classdesc
     * @param {QType} Q
     * @param {RType} R
     * @class
     * @memberof module:eclairjs/mllib/linalg
     */
    var QRDecomposition = function (Q, R) {
        var jvmObject;
        this.logger = Logger.getLogger("QRDecomposition_js");
        if (arguments[0] instanceof org.apache.spark.mllib.linalg.QRDecomposition) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.linalg.QRDecomposition(
                Utils.unwrapObject(Q),
                Utils.unwrapObject(R)
            );
        }
        JavaWrapper.call(this, jvmObject);

    };

    QRDecomposition.prototype = Object.create(JavaWrapper.prototype);

    QRDecomposition.prototype.constructor = QRDecomposition;

    /**
     *
     * @returns {QType}
     */
    QRDecomposition.prototype.Q = function() {
        return Utils.javaToJs(this.getJavaObject().Q());
    };

    /**
     *
     * @returns {RType}
     */
    QRDecomposition.prototype.R = function() {
        return Utils.javaToJs(this.getJavaObject().R());
    };

    module.exports =  QRDecomposition;


})();

