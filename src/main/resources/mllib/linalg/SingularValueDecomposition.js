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


/**
 * Represents singular value decomposition (SVD) factors.
 * @classdesc
 * @param {UType} U
 * @param {Vector} s
 * @param {VType} V
 * @class
 */
var SingularValueDecomposition = function (U, s, V) {
    var jvmObject;
    this.logger = Logger.getLogger("SingularValueDecomposition_js");
    if (arguments[0] instanceof org.apache.spark.mllib.linalg.SingularValueDecomposition) {
        jvmObject = arguments[0];
    } else {
        jvmObject = new org.apache.spark.mllib.linalg.SingularValueDecomposition(
            Utils.unwrapObject(U),
            Utils.unwrapObject(s),
            Utils.unwrapObject(V)
        );
    }

    JavaWrapper.call(this, jvmObject);

};

SingularValueDecomposition.prototype = Object.create(JavaWrapper.prototype);

SingularValueDecomposition.prototype.constructor = SingularValueDecomposition;

/**
 * @returns {Vector}
 */
SingularValueDecomposition.prototype.s = function() {
    return Utils.javaToJs(this.getJavaObject().s());
};

/**
 * @returns {UType}
 */
SingularValueDecomposition.prototype.U = function() {
    return Utils.javaToJs(this.getJavaObject().U());
};

/**
 * @returns {VType}
 */
SingularValueDecomposition.prototype.V = function() {
    return Utils.javaToJs(this.getJavaObject().V());
};


/**
 * :: Experimental ::
 * Represents QR factors.
 * @classdesc
 * @param {QType} Q
 * @param {RType} R
 * @class
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

module.exports = {
    SingularValueDecomposition: SingularValueDecomposition,
    QRDecomposition: QRDecomposition
};
