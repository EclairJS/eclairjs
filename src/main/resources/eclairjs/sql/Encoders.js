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

    //var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    //var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    //var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    //var logger = Logger.getLogger("sql.Encoders_js");



    var Encoders = Java.type('org.eclairjs.nashorn.wrap.sql.Encoders');
    
    
    /**
     * @constructor
     * @class
     * @memberof module:eclairjs/sql
     */
    //var Encoders = function(jvmObject) {
    //
    //	 this.logger = Logger.getLogger("Encoders_js");
    //	 JavaWrapper.call(this, jvmObject);
    //
    //};
    //
    //Encoders.prototype = Object.create(JavaWrapper.prototype);
    //
    //Encoders.prototype.constructor = Encoders;
    //
    
    
    /**
     * An encoder for nullable boolean type.
     * The Scala primitive encoder is available as {@link scalaBoolean}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.BOOLEAN = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.BOOLEAN();
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for nullable byte type.
     * The Scala primitive encoder is available as {@link scalaByte}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.BYTE = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.BYTE();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable short type.
     * The Scala primitive encoder is available as {@link scalaShort}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.SHORT = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.SHORT();
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for nullable int type.
     * The Scala primitive encoder is available as {@link scalaInt}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.INT = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.INT();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable long type.
     * The Scala primitive encoder is available as {@link scalaLong}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.LONG = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.LONG();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable float type.
     * The Scala primitive encoder is available as {@link scalaFloat}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.FLOAT = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.FLOAT();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable double type.
     * The Scala primitive encoder is available as {@link scalaDouble}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.DOUBLE = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.DOUBLE();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable string type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.STRING = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.STRING();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable decimal type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.DECIMAL = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.DECIMAL();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable date type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.DATE = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.DATE();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable timestamp type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.TIMESTAMP = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.TIMESTAMP();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for arrays of bytes.
     *
     * @since EclairJS 0.5 Spark  1.6.1
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.BINARY = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.BINARY();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * Creates an encoder for Java Bean of type T.
     *
     * T must be publicly accessible.
     *
     * supported types for java bean field:
     *  - primitive types: boolean, int, double, etc.
     *  - boxed types: Boolean, Integer, Double, etc.
     *  - String
     *  - java.math.BigDecimal
     *  - time related: java.sql.Date, java.sql.Timestamp
     *  - collection types: only array and java.util.List currently, map support is in progress
     *  - nested java bean.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {Class} beanClass
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.bean = function(beanClass) {
    //throw "not implemented by ElairJS";
    ////   var beanClass_uw = Utils.unwrapObject(beanClass);
    ////   var javaObject =  org.apache.spark.sql.Encoders.bean(beanClass_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * Creates an encoder that serializes objects of type T using Kryo.
     * This encoder maps T into a single byte array (binary) field.
     *
     * T must be publicly accessible.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {Class} [clazz]
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.kryo = function(clazz) {
    //throw "not implemented by ElairJS";
    ////   var clazz_uw = Utils.unwrapObject(clazz);
    ////
    ////   if (arguments[0]) {
    ////   var javaObject =  org.apache.spark.sql.Encoders.kryo(clazz_uw);
    ////   return Utils.javaToJs(javaObject);
    ////   } else {
    ////   var javaObject =  org.apache.spark.sql.Encoders.kryo();
    ////   return Utils.javaToJs(javaObject);
    ////   }
    //};
    
    
    /**
     * Creates an encoder that serializes objects of type T using generic Java serialization.
     * This encoder maps T into a single byte array (binary) field.
     *
     * Note that this is extremely inefficient and should only be used as the last resort.
     *
     * T must be publicly accessible.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {Class} [clazz]
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.javaSerialization = function(clazz) {
    //throw "not implemented by ElairJS";
    ////   var clazz_uw = Utils.unwrapObject(clazz);
    ////
    ////   if (arguments[0]) {
    ////   var javaObject =  org.apache.spark.sql.Encoders.javaSerialization(clazz_uw);
    ////   return Utils.javaToJs(javaObject);
    ////   } else {
    ////   var javaObject =  org.apache.spark.sql.Encoders.javaSerialization();
    ////   return Utils.javaToJs(javaObject);
    ////   }
    //};
    //
    
    /**
     * An encoder for 2-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple0 = function(e1,e2) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for 3-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple1 = function(e1,e2,e3) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var e3_uw = Utils.unwrapObject(e3);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for 4-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple2 = function(e1,e2,e3,e4) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var e3_uw = Utils.unwrapObject(e3);
    ////   var e4_uw = Utils.unwrapObject(e4);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for 5-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @param {module:eclairjs/sql.Encoder} e5
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple3 = function(e1,e2,e3,e4,e5) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var e3_uw = Utils.unwrapObject(e3);
    ////   var e4_uw = Utils.unwrapObject(e4);
    ////   var e5_uw = Utils.unwrapObject(e5);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw,e5_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for Scala's product type (tuples, case classes, etc).
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.product = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.product();
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for Scala's primitive int type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaInt = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaInt();
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for Scala's primitive long type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaLong = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaLong();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for Scala's primitive double type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaDouble = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaDouble();
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for Scala's primitive float type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaFloat = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaFloat();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for Scala's primitive byte type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaByte = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaByte();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for Scala's primitive short type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaShort = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaShort();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for Scala's primitive boolean type.
     * @since EclairJS 0.5 Spark  2.0.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.scalaBoolean = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.scalaBoolean();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    //
    // static methods
    //
    
    
    /**
     * An encoder for nullable boolean type.
     * The Scala primitive encoder is available as {@link scalaBoolean}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.BOOLEAN = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.BOOLEAN();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable byte type.
     * The Scala primitive encoder is available as {@link scalaByte}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.BYTE = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.BYTE();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable short type.
     * The Scala primitive encoder is available as {@link scalaShort}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.SHORT = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.SHORT();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable int type.
     * The Scala primitive encoder is available as {@link scalaInt}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.INT = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.INT();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable long type.
     * The Scala primitive encoder is available as {@link scalaLong}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.LONG = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.LONG();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable float type.
     * The Scala primitive encoder is available as {@link scalaFloat}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.FLOAT = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.FLOAT();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable double type.
     * The Scala primitive encoder is available as {@link scalaDouble}.
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.DOUBLE = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.DOUBLE();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable string type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.STRING = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.STRING();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable decimal type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.DECIMAL = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.DECIMAL();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable date type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.DATE = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.DATE();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for nullable timestamp type.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.TIMESTAMP = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.TIMESTAMP();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for arrays of bytes.
     *
     * @since EclairJS 0.5 Spark  1.6.1
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.BINARY = function() {
    //throw "not implemented by ElairJS";
    ////   var javaObject =  org.apache.spark.sql.Encoders.BINARY();
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * Creates an encoder for Java Bean of type T.
     *
     * T must be publicly accessible.
     *
     * supported types for java bean field:
     *  - primitive types: boolean, int, double, etc.
     *  - boxed types: Boolean, Integer, Double, etc.
     *  - String
     *  - java.math.BigDecimal
     *  - time related: java.sql.Date, java.sql.Timestamp
     *  - collection types: only array and java.util.List currently, map support is in progress
     *  - nested java bean.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {Class} beanClass
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.bean = function(beanClass) {
    //throw "not implemented by ElairJS";
    ////   var beanClass_uw = Utils.unwrapObject(beanClass);
    ////   var javaObject =  org.apache.spark.sql.Encoders.bean(beanClass_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * Creates an encoder that serializes objects of type T using Kryo.
     * This encoder maps T into a single byte array (binary) field.
     *
     * T must be publicly accessible.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {Class} [clazz]
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.kryo = function(clazz) {
    //throw "not implemented by ElairJS";
    ////   var clazz_uw = Utils.unwrapObject(clazz);
    ////
    ////   if (arguments[0]) {
    ////   var javaObject =  org.apache.spark.sql.Encoders.kryo(clazz_uw);
    ////   return Utils.javaToJs(javaObject);
    ////   } else {
    ////   var javaObject =  org.apache.spark.sql.Encoders.kryo();
    ////   return Utils.javaToJs(javaObject);
    ////   }
    //};
    
    
    /**
     * Creates an encoder that serializes objects of type T using generic Java serialization.
     * This encoder maps T into a single byte array (binary) field.
     *
     * Note that this is extremely inefficient and should only be used as the last resort.
     *
     * T must be publicly accessible.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {Class} [clazz]
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.javaSerialization = function(clazz) {
    //throw "not implemented by ElairJS";
    ////   var clazz_uw = Utils.unwrapObject(clazz);
    ////
    ////   if (arguments[0]) {
    ////   var javaObject =  org.apache.spark.sql.Encoders.javaSerialization(clazz_uw);
    ////   return Utils.javaToJs(javaObject);
    ////   } else {
    ////   var javaObject =  org.apache.spark.sql.Encoders.javaSerialization();
    ////   return Utils.javaToJs(javaObject);
    ////   }
    //};
    //
    
    /**
     * An encoder for 2-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple0 = function(e1,e2) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    //
    
    /**
     * An encoder for 3-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple1 = function(e1,e2,e3) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var e3_uw = Utils.unwrapObject(e3);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for 4-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple2 = function(e1,e2,e3,e4) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var e3_uw = Utils.unwrapObject(e3);
    ////   var e4_uw = Utils.unwrapObject(e4);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    
    
    /**
     * An encoder for 5-ary tuples.
     *
     * @since EclairJS 0.5 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @param {module:eclairjs/sql.Encoder} e5
     * @returns {module:eclairjs/sql.Encoder} 
     */
    //Encoders.tuple3 = function(e1,e2,e3,e4,e5) {
    //throw "not implemented by ElairJS";
    ////   var e1_uw = Utils.unwrapObject(e1);
    ////   var e2_uw = Utils.unwrapObject(e2);
    ////   var e3_uw = Utils.unwrapObject(e3);
    ////   var e4_uw = Utils.unwrapObject(e4);
    ////   var e5_uw = Utils.unwrapObject(e5);
    ////   var javaObject =  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw,e5_uw);
    ////   return Utils.javaToJs(javaObject);
    //};
    

    
    module.exports = Encoders;
})();