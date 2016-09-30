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
    var logger = Logger.getLogger("broadcast_Broadcast_js");


    /**
     * @classdesc
     * A broadcast variable. Broadcast variables allow the programmer to keep a read-only variable
     * cached on each machine rather than shipping a copy of it with tasks. They can be used, for
     * example, to give every node a copy of a large input dataset in an efficient manner. Spark also
     * attempts to distribute broadcast variables using efficient broadcast algorithms to reduce
     * communication cost.
     *
     * Broadcast variables are created from a variable `v` by calling
     * {@link module:eclairjs.SparkContext#broadcast}.
     * The broadcast variable is a wrapper around `v`, and its value can be accessed by calling the
     * `value` method. The interpreter session below shows this:
     *
     *  After the broadcast variable is created, it should be used instead of the value `v` in any
     * functions run on the cluster so that `v` is not shipped to the nodes more than once.
     * In addition, the object `v` should not be modified after it is broadcast in order to ensure
     * that all nodes get the same value of the broadcast variable (e.g. if the variable is shipped
     * to a new node later).
     *
     * @example
     * 	var b = sparkContext.broadcast([1,2]);
     *  var bc = b.value(); // bc = [1,2]
     *
     * @class
     * @memberof module:eclairjs/broadcast
     */

    var Broadcast = function (jvmObject) {
        JavaWrapper.call(this, jvmObject);

    };

    Broadcast.prototype = Object.create(JavaWrapper.prototype);

    Broadcast.prototype.constructor = Broadcast;


    /**
     *  Get the broadcasted value.
     * @returns {object}
     */
    Broadcast.prototype.value = function () {
        var javaObject = this.getJavaObject().value();
        //return Utils.javaToJs(javaObject);
        return JSON.parse(javaObject);
    };


    /**
     * Delete cached copies of this broadcast on the executors. If the broadcast is used after
     * this is called, it will need to be re-sent to each executor.
     * @param {boolean} [blocking]  Whether to block until unpersisting has completed
     */
    Broadcast.prototype.unpersist = function (blocking) {

        if (arguments[0]) {
            this.getJavaObject().unpersist(blocking);
        } else {
            this.getJavaObject().unpersist();
        }
    };


    /**
     * Destroy all data and metadata related to this broadcast variable. Use this with caution;
     * once a broadcast variable has been destroyed, it cannot be used again.
     * This method blocks until destroy has completed
     */
    Broadcast.prototype.destroy = function () {
        this.getJavaObject().destroy();
    };


    /**
     * @returns {string}
     */
    Broadcast.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    module.exports = Broadcast;
})();