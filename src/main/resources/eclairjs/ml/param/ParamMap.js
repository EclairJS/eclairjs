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
     * A param to value map.
     * @classdesc
     */

    /**
     * Creates an empty param map.
     *  @class
     *  @memberof module:eclairjs/ml/param
     */
    var ParamMap = function (jvmObject) {

        this.logger = Logger.getLogger("ParamMap_js");
        JavaWrapper.call(this, jvmObject);

    };

    ParamMap.prototype = Object.create(JavaWrapper.prototype);

    ParamMap.prototype.constructor = ParamMap;


    /**
     * Puts a (param, value) pair (overwrites if the input param exists).
     * @param {module:eclairjs/ml/param.Param} param
     * @param {object} value
     * @returns {}
     */
    ParamMap.prototype.putwithValue = function (param, value) {
        throw "not implemented by ElairJS";
//   var param_uw = Utils.unwrapObject(param);
//   var value_uw = Utils.unwrapObject(value);
//   var javaObject =  this.getJavaObject().put(param_uw,value_uw);
//   return new (javaObject);
    };


    /**
     * Puts a list of param pairs (overwrites if the input params exists).
     * @param {...ParamPair} paramPairs
     * @returns {}
     */
    ParamMap.prototype.put = function (paramPairs) {
        throw "not implemented by ElairJS";
// // TODO: handle repeated parm 'paramPairs'
//   var paramPairs_uw = Utils.unwrapObject(paramPairs);
//   var javaObject =  this.getJavaObject().put(paramPairs_uw);
//   return new (javaObject);
    };


    /**
     * Optionally returns the value associated with a param.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {object}
     */
    ParamMap.prototype.get = function (param) {
        throw "not implemented by ElairJS";
//   var param_uw = Utils.unwrapObject(param);
//   var javaObject =  this.getJavaObject().get(param_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Returns the value associated with a param or a default value.
     * @param {module:eclairjs/ml/param.Param} param
     * @param {object} d
     * @returns {object}
     */
    ParamMap.prototype.getOrElse = function (param,
    d)
    {
        throw "not implemented by ElairJS";
//   var param_uw = Utils.unwrapObject(param);
//   var default_uw = Utils.unwrapObject(default);
//   var javaObject =  this.getJavaObject().getOrElse(param_uw,default_uw);
//   return Utils.javaToJs(javaObject);
    }
    ;


    /**
     * Gets the value of the input param or its default value if it does not exist.
     * Raises a NoSuchElementException if there is no value associated with the input param.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {object}
     */
    ParamMap.prototype.apply = function (param) {
        throw "not implemented by ElairJS";
//   var param_uw = Utils.unwrapObject(param);
//   var javaObject =  this.getJavaObject().apply(param_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Checks whether a parameter is explicitly specified.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {boolean}
     */
    ParamMap.prototype.contains = function (param) {
        throw "not implemented by ElairJS";
//   var param_uw = Utils.unwrapObject(param);
//   return  this.getJavaObject().contains(param_uw);
    };


    /**
     * Removes a key from this map and returns its value associated previously as an option.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {object}
     */
    ParamMap.prototype.remove = function (param) {
        throw "not implemented by ElairJS";
//   var param_uw = Utils.unwrapObject(param);
//   var javaObject =  this.getJavaObject().remove(param_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Filters this param map for the given parent.
     * @param {Params} parent
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.filter = function (parent) {
        throw "not implemented by ElairJS";
//   var parent_uw = Utils.unwrapObject(parent);
//   var javaObject =  this.getJavaObject().filter(parent_uw);
//   return new ParamMap(javaObject);
    };


    /**
     * Creates a copy of this param map.
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.copy = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().copy();
//   return new ParamMap(javaObject);
    };


    /**
     * @returns {string}
     */
    ParamMap.prototype.toString = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().toString();
    };


    /**
     * Returns a new param map that contains parameters in this map and the given map,
     * where the latter overwrites this if there exist conflicts.
     * @param {module:eclairjs/ml/param.ParamMap} other
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.$plus$plus = function (other) {
        throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().$plus$plus(other_uw);
//   return new ParamMap(javaObject);
    };


    /**
     * Adds all parameters from the input param map into this param map.
     * @param {module:eclairjs/ml/param.ParamMap} other
     * @returns {}
     */
    ParamMap.prototype.$plus$plus$eq = function (other) {
        throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().$plus$plus$eq(other_uw);
//   return new (javaObject);
    };


    /**
     * Converts this param map to a sequence of param pairs.
     * @returns {module:eclairjs/ml/param.ParamMap[]}
     */
    ParamMap.prototype.toSeq = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().toSeq();
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Number of param pairs in this map.
     * @returns {number}
     */
    ParamMap.prototype.size = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().size();
    };
//
// static methods
//


    /**
     * Returns an empty param map.
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.empty = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.ml.param.ParamMap.empty();
//   return new ParamMap(javaObject);
    };


    /**
     * Constructs a param map by specifying its entries.
     * @param {...module:eclairjs/ml/param.ParamMap} paramPairs
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.apply = function (paramPairs) {
        throw "not implemented by ElairJS";
// // TODO: handle repeated parm 'paramPairs'
//   var paramPairs_uw = Utils.unwrapObject(paramPairs);
//   var javaObject =  org.apache.spark.ml.param.ParamMap.apply(paramPairs_uw);
//   return new ParamMap(javaObject);
    };

    module.exports = ParamMap;

})();