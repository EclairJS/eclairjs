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


    /**
     * @constructor
     * @memberof module:eclairjs
     * @classdesc A JSON Serializable object that can be serialized and "shipped" to spark workers over the network.
     * This object mushed be used for spark serlization.
     * @example
     * var Serializable = require(EclairJS_Globals.NAMESPACE + '/Serializable');
     * var s = new Serializable();
     *  var result = pairRdd.aggregateByKey(s,
     *   function(hashSetA, b) {
     *      hashSetA[b] = hashSetA[b] ? hashSetA[b] + 1 : 1;
     *      return hashSetA;
     *  },
     *  function(setA, setB){
     *     for (var k in setA) {
     *        if (setB.hasOwnProperty(k)) {
     *             setA[k] += setB[k];
     *           }
     *      }
     *      return setA;
     *  });
     *
     * @param {object} jsObject JavaScript object, the properties of the object will be mixin to this object.
     */
    var Serializable = function (jsObject) {
        for (var k in jsObject) {
            if (jsObject.hasOwnProperty(k)) {
                this[k] = jsObject[k];
            }
        }

    };

    /**
     * Returns the JSONSerializer object that implements java.io.Serializable, this object is converted to a
     * JSON string and stored in JSONSerializer for serialization ad shippment to the spark workers.
     * where is is converted bacl to a JavaScript object by Serialize.JSONSerializer
     * @private
     * @returns {Serialize.JSONSerializer}
     */
    Serializable.prototype.getJavaObject = function () {
        var jsonStr = JSON.stringify(this);
        var obj = new org.eclairjs.nashorn.JSONSerializer(jsonStr);
        return obj;
    };


    module.exports = Serializable;


})();
