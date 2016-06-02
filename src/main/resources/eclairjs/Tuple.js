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
     * Simple tuple implementation. This constructor will create new instances
     * and store immutable values within them.
     * @classdesc
     * @class
     * @memberof module:eclairjs
     * @param {objects[]} List of values to store within the tuple.
     */
    var Tuple = function () {
        throw ("Tuple deprecated");
        /**
         * Contains the number of elements held within the tuple.
         */
        this.logger = Logger.getLogger("Tuple_js");
        var i = this.length = arguments.length;
        this._objectTypes = [];
        if ((arguments[0] instanceof Serialize.scalaProductClass) && (arguments[0].getClass().getName().indexOf("scala.Tuple") > -1)) {
            this.setJavaObject(arguments[0]);
        } else {
            for (var i = 0; i < arguments.length; i++) {
                this[i] = arguments[i];
                /*
                 for some reason javaScript numbers with the type of java.lang.Double and
                 a no fractional value eg 1.0 ar stored as java.lang.integers. so we need save the type
                 of the object so if it is a double we can force them
                 back to java.lang.Double on the way out in getJavaObject
                 */
                this._objectTypes[i] = arguments[i].class ? arguments[i].class : null;
            }
        }

    }
    Tuple.prototype = Object.create(Tuple.prototype);

    Tuple.prototype.constructor = Tuple;

    /**
     * Passes the values as arguments, in the same order they were set, to the
     * provided unpacker function. It will return the value that the unpacker
     * returns.
     *
     * @param {Function} unpacker Is passed all of the tuples values in order, it's return value will be returned.
     * @return {object} The value that the unpacker function returns.
     */
    Tuple.prototype.unpack = function (unpacker) {
        return unpacker.apply(this, this);
    };

    /**
     * Flattens the tuples values into a string.
     *
     * @return {String} A textual representation of the tuples contents.
     */
    Tuple.prototype.toString = function () {
        var values = this.toArray().join(',');
        return ['(', values, ')'].join('');
    };

    /**
     * Coerces the tuple into an array. This runs through
     * `Array.prototype.slice.call` because tuples are array-like objects.
     *
     * @return {object[]} All of the tuples values contained within an array.
     */
    Tuple.prototype.toArray = function () {
        return Array.prototype.slice.call(this);
    };

    /**
     * Iterates over every value within the tuple and pass the said values to
     * the provided callback individually.
     *
     * The callback is also passed the current index and tuple instance in that
     * order. This matches the normal `forEach` API found in most libraries and
     * modern JavaScript.
     *
     * @param {Function} callback Is passed every value in the tuple, one at a time.
     */
    Tuple.prototype.forEach = function (callback) {
        var length = this.length;
        var i;

        for (i = 0; i < length; i += 1) {
            callback(this[i], i, this);
        }
    };

    /**
     * Compares each value in both tuples, one value at a time in order. Both
     * tuples have to be of the same length and need to contain the exact same
     * values for this to return true. This can be used to compare against any
     * array-like object.
     *
     * @param {Object} target A tuple instance or any other array-like object you wish to compare to.
     * @return {Boolean} True if the tuples length and values match, false if not.
     */
    Tuple.prototype.equals = function (target) {
        var i = this.length;

        if (i !== target.length) {
            return false;
        }

        while (i--) {
            if (this[i] !== target[i]) {
                return false;
            }
        }

        return true;
    };

    /**
     * Returns the product of adding all contained values together. If you only
     * have numbers within your tuple you will get back all of those numbers
     * added together. If you have strings too then you will get a string
     * containing all of the values.
     *
     * This function is called automatically when using greater or less than
     * comparisons on tuples. So `tuple1 > tuple2` will add all of the
     * containing values together and then compare them.
     *
     * @return {object} The product of all values contained within the tuple.
     */
    Tuple.prototype.valueOf = function () {
        var value = this[0];
        var length = this.length;
        var i;

        for (i = 1; i < length; i += 1) {
            value = value + this[i];
        }

        return value;
    };

    Tuple.prototype.getJavaObject = function () {
        var length = this.length;
        var i;
        var javaObj = [];
        var Tuple = Java.type('scala.Tuple' + length);
        var expression = "new Tuple(";
        for (i = 0; i < length; i += 1) {
            //javaObj.push(org.eclairjs.nashorn.Utils.jsToJava(this[i]));
            /*
             for some reason javaScript numbers with the type of java.lang.Double and
             a no fractional value eg 1.0 ar stored as java.lang.integers. so we need to force them
             back to java.lang.Double on the way out
             */
            var obj;
            if (this._objectTypes[i]) {
                this.logger.debug("de-serialized this._objectTypes[i]" + this._objectTypes[i]);
                if (this._objectTypes[i] == java.lang.Double.class) {
                    obj = Serialize.jsToJava(Number(this[i])); // returns Double type
                    expression += "javaObj[" + i + "]";
               } else if (this._objectTypes[i] == java.lang.Integer.class) {
                    this.logger.debug("force to int");
                    obj =  + this[i]; // force to Integer type
                    expression += "java.lang.Integer.parseInt(javaObj[" + i + "])";
                } else if (this._objectTypes[i] == java.lang.Long.class) {
                    this.logger.debug("force to int");
                    obj =  + this[i]; // force to Long type
                    expression += "java.lang.Long.parseLong(javaObj[" + i + "])";
                } else {
                    obj = Serialize.jsToJava(this[i]);
                    expression += "javaObj[" + i + "]";
                }
            } else {
                obj = Serialize.jsToJava(this[i]);
                expression += "javaObj[" + i + "]";

            }
            this.logger.debug("de-serialized " + obj);
            javaObj.push(obj);

            //expression += "javaObj[" + i + "]";
            if (i < length - 1) {
                expression += ",";
            }
        }
        expression += ")";
        this.logger.debug("javaObj " + javaObj);
        this.logger.debug("expression " + expression);
        var retObj = eval('(' + expression + ')');
        this.logger.debug("getJavaObj returning " + retObj.class + " with value " + retObj.toString());
        return retObj;

    };

    Tuple.prototype.setJavaObject = function (obj) {
        var list = obj.productIterator();
        var x = 0;
        while (list.hasNext()) {
            var o = list.next();
            var r = Serialize.javaToJs(o);
            this[x] = r;
            x++
        }

        this.length = x;
        this.logger.debug("setJavaObject " + JSON.stringify(this));
    };


    Tuple.prototype.toJSON = function () {
        this.logger.debug("toJSON");
        var jsonObj = {};
        jsonObj.length = this.length;
        for (var i = 0; i < this.length; i++) {
            jsonObj[i] = this[i];
        }
        // no need to copy the _objectTypes, that is for use with Java
        return jsonObj;
    };

    module.exports = Tuple;

})();