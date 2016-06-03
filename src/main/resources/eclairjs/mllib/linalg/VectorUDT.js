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
     * :: AlphaComponent ::

     * NOTE User defined types not implemented in EclairJS
     *
     * User-defined type for {@link Vector} which allows easy interaction with SQL
     * via {@link module:eclairjs/sql.DataFrame}.
     * @classdesc
     * @class
     * @memberof module:eclairjs/mllib/linalg
     * @ignore
     *
     *
     */
    var VectorUDT = function (jvmObject) {

        this.logger = Logger.getLogger("VectorUDT_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.mllib.linalg.VectorUDT();
        }
        JavaWrapper.call(this, jvmObject);

    };

    VectorUDT.prototype = Object.create(JavaWrapper.prototype);

    VectorUDT.prototype.constructor = VectorUDT;


    /**
     * @returns {module:eclairjs/sql/types.StructType}
     */
    VectorUDT.prototype.sqlType = function () {
        var javaObject =  this.getJavaObject().sqlType();
        return Utils.javaToJs(javaObject);
    };


    /**
     * @param {object} obj
     * @returns {InternalRow}
     */
    VectorUDT.prototype.serialize = function (obj) {
        var obj_uw = Utils.unwrapObject(obj);
        return  this.getJavaObject().serialize(obj_uw);
    };


    /**
     * @param {object} datum
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    VectorUDT.prototype.deserialize = function (datum) {
        var datum_uw = Utils.unwrapObject(datum);
        var javaObject =  this.getJavaObject().deserialize(datum_uw);
        return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {string}
     * @ignore
     */
    VectorUDT.prototype.pyUDT = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().pyUDT();
    };


    /**
     * @returns {Class}
     * @ignore
     */
    VectorUDT.prototype.userClass = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().userClass();
        //   return new Class(javaObject);
    };


    /**
     * @param {object} o
     * @returns {boolean}
     */
    VectorUDT.prototype.equals = function (o) {
        var o_uw = Utils.unwrapObject(o);
        return  this.getJavaObject().equals(o_uw);
    };


    /**
     * @returns {number}
     */
    VectorUDT.prototype.hashCode = function () {
        return  this.getJavaObject().hashCode();
    };


    /**
     * @returns {string}
     */
    VectorUDT.prototype.typeName = function () {
        return  this.getJavaObject().typeName();
    };

    VectorUDT.prototype.toJSON = function () {
        return this.typeName();
    };

    module.exports = VectorUDT;

})();
