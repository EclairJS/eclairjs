/*
 * Copyright 2015 IBM Corp.
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

    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    var NumericType = require(EclairJS_Globals.NAMESPACE + '/sql/types/NumericType');

    /*
     * Not a valid primitive type for JavaScript
     */
    var DecimalType = function () {
        throw "not implemented by ElairJS";
        /*var jvmObj;
         if (arguments[0] && (arguments[0] instanceof Object)) {
         jvmObj = arguments[0];
         } else if (arguments.length == 2) {
         jvmObj = new org.apache.spark.sql.types.DecimalType(arguments[0], arguments[1]);
         } else if (arguments[0]){
         jvmObj = new org.apache.spark.sql.types.DecimalType(arguments[0]);
         } else {
         jvmObj = new org.apache.spark.sql.types.DecimalType();
         }

         NumericType.call(this, jvmObj);
         */
    };


    DecimalType.prototype = Object.create(NumericType.prototype);


    DecimalType.prototype.constructor = DecimalType;


    DecimalType.MAX_PRECISION = function () {
        throw "not implemented by ElairJS";
        //return org.apache.spark.sql.types.DecimalType.MAX_PRECISION();
    };

    DecimalType.MAX_SCALE = function () {
        throw "not implemented by ElairJS";
        //return org.apache.spark.sql.types.DecimalType.MAX_SCALE();
    };

    DecimalType.SYSTEM_DEFAULT = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.SYSTEM_DEFAULT());
    };

    DecimalType.USER_DEFAULT = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.USER_DEFAULT());
    };

    DecimalType.Unlimited = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.Unlimited());
    };

    DecimalType.ByteDecimal = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.ByteDecimal());
    };

    DecimalType.ShortDecimal = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.ShortDecimal());
    };

    DecimalType.IntDecimal = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.IntDecimal());
    };

    DecimalType.LongDecimal = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.LongDecimal());
    };

    DecimalType.FloatDecimal = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.FloatDecimal());
    };

    DecimalType.DoubleDecimal = function () {
        throw "not implemented by ElairJS";
        //return new DecimalType(org.apache.spark.sql.types.DecimalType.DoubleDecimal());
    };

    DecimalType.apply = function () {
        return new DecimalType(org.apache.spark.sql.types.DecimalType.apply());
    };

    DecimalType.unapply = function (t) {
        throw "not implemented by ElairJS";
        //return org.apache.spark.sql.types.DecimalType.apply(Utils.unwrapObject(t));
    };

    DecimalType.prototype.precision = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().precision();
    };

    DecimalType.prototype.scale = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().scale();
    };
    DecimalType.prototype.tag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().tag();
    };
    DecimalType.prototype.numeric = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    DecimalType.prototype.fractional = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().numeric();
    };
    DecimalType.prototype.ordering = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().ordering();
    };
    DecimalType.prototype.asIntegral = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().asIntegral();
    };

    DecimalType.prototype.typeName = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().typeName();
    };
    DecimalType.prototype.toString = function () {
        throw "not implemented by ElairJS";
        return this.getJavaObject().toString();
    };

    DecimalType.prototype.defaultSize = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().defaultSize();
    };

    DecimalType.prototype.classTag = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().classTag();
    };


    DecimalType.prototype.simpleString = function () {
        throw "not implemented by ElairJS";
        //return this.getJavaObject().simpleString();
    };

    module.exports = DecimalType;

})();
