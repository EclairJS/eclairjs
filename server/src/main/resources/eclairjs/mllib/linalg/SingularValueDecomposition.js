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
     * Represents singular value decomposition (SVD) factors.
     * @classdesc
     * @param {UType} U
     * @param {module:eclairjs/mllib/linalg.Vector} s
     * @param {VType} V
     * @class
     * @memberof module:eclairjs/mllib/linalg
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
     * @returns {module:eclairjs/mllib/linalg.Vector}
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



    module.exports = SingularValueDecomposition;

})();
