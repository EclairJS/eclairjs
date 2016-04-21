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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

   // var SqlDate = require('sql/SqlDate');
    //var SqlTimestamp = require('sql/SqlTimestamp');
    //var StructType = require('sql/types/StructType');

// Define the Row constructor
    /*
     * NOTE: the following have not been implemented
     *
     <K,V> java.util.Map<K,V>	getJavaMap(int i)
     Returns the value at position i of array type as a Map.
     <T> java.util.List<T>	getList(int i)
     Returns the value at position i of array type as List.
     <K,V> scala.collection.Map<K,V>	getMap(int i)
     Returns the value at position i of map type as a Scala Map.
     <T> scala.collection.Seq<T>	getSeq(int i)
     Returns the value at position i of array type as a Scala Seq.
     <T> scala.collection.immutable.Map<java.lang.String,T>	getValuesMap(scala.collection.Seq<java.lang.String> fieldNames)
     Returns a Map(name -> value) for the requested fieldNames
     scala.collection.Seq<java.lang.Object>	toSeq()
     Return a Scala Seq representing the row.
     */
    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdesc Represents one row of output from a relational operator. Allows both generic access by ordinal, which will incur boxing overhead for primitives, as well as native primitive access.
     * It is invalid to use the native primitive interface to retrieve a value that is null, instead a user must check isNullAt before attempting to retrieve a value that might be null.
     * To create a new Row, use RowFactory.create()
     *
     */
    var Row = function (jvmObj) {
        // Call the parent constructor, making sure (using Function#call)
        // that "this" is set correctly during the call
        JavaWrapper.call(this, jvmObj);

        // Initialize our Row-specific properties
        this.logger = Logger.getLogger("sql.Row_js");
        this.logger.debug("Row constructor");
    };

//Create a Row.prototype object that inherits from JavaWrapper.prototype.

    Row.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to Row
    Row.prototype.constructor = Row;

    /**
     * Returns true if there are any NULL values in this row.
     * @returns {boolean}
     */
    Row.prototype.anyNull = function () {
        /*
         boolean	anyNull()
         Returns true if there are any NULL values in this row.
         */
        return this.getJavaObject().anyNull();
    };
    /**
     * Returns the value at position index.
     * @param index
     * @returns {object}
     */
    Row.prototype.apply = function (index) {
        /*
         java.lang.Object	apply(int i)
         Returns the value at position i.
         */
        return this.getJavaObject().apply(index);
    };
    /**
     * Make a copy of the current Row object
     * @returns {Row}
     */
    Row.prototype.copy = function () {
        /*
         Row	copy()
         Make a copy of the current Row object
         */
        return Utils.javaToJs(this.getJavaObject().copy());
    };
    /**
     * compares object o to this Row object
     * @param {object}o
     * @returns {boolean}
     */
    Row.prototype.equals = function (o) {
        /*
         boolean	equals(java.lang.Object o)
         */
        return this.getJavaObject().equals(Utils.unwrapObject(o));
    };
    /**
     * Returns the index of a given field name.
     * @param {string} name
     * @returns {integer}
     */
    Row.prototype.fieldIndex = function (name) {
        /*
         int	fieldIndex(java.lang.String name)
         Returns the index of a given field name.
         */
        return this.getJavaObject().fieldIndex(name);
    };
    /**
     * Returns the value at position index.
     * @param {integer} index
     * @returns {object}
     */
    Row.prototype.get = function (index) {
        /*
         java.lang.Object	get(int i)
         Returns the value at position i.
         */
        var v = this.getJavaObject().get(index);
        if (v !== null && v.getClass().getName() === 'java.sql.Timestamp') {
            v = this.getTimestamp(index);
        } else if (v !== null && v.getClass().getName() === 'java.sql.Date') {
            v = this.getDate(index);
        } else {
            v = Utils.javaToJs(v);
        }
        return v;
    };
    /**
     * Returns the value at position index as a primitive boolean.
     * @param {integer} index
     * @returns {boolean}
     */
    Row.prototype.getBoolean = function (index) {
        /*
         boolean	getBoolean(int i)
         Returns the value at position i as a primitive boolean.
         */
        return this.getJavaObject().getBoolean(index);
    };
    /**
     * Returns the value at position idex as a primitive byte.
     * @param {integer} index
     * @returns {byte}
     * @ignore
     */
    /* Not applicable to JavaScript
     Row.prototype.getByte = function(index) {
     return this.getJavaObject().getByte(index);
     };
     */
    /**
     * Returns the value at position index of type as Date.
     * @param {integer} index
     * @returns {SqlDate}
     */
    Row.prototype.getDate = function (index) {
        /*
         java.sql.Date	getDate(int i)
         Returns the value at position i of date type as java.sql.Date.
         */
        var javaSqlDate = this.getJavaObject().getDate(index);
        var date = Utils.javaToJs(javaSqlDate); // FIXME?
        return date;
    };
    /**
     * Returns the value at position index of type as decimal.
     * @param {integer} index
     * @returns {decimal}
     * @ignore
     */
    /*
     Row.prototype.getDecimal = function(index) {
     return this.getJavaObject().getDecimal(index);
     };
     */
    /**
     * Returns the value at position index of type as javascript float.
     * @param {integer} index
     * @returns {float}
     */
    Row.prototype.getDouble = function (index) {
        /*
         double	getDouble(int i)
         Returns the value at position i as a primitive double.
         */
        return this.getJavaObject().getDouble(index);
    };
    /**
     * Returns the value at position index of type as float.
     * @param {integer} index
     * @returns {float}
     */
    Row.prototype.getFloat = function (index) {
        /*
         float	getFloat(int i)
         Returns the value at position i as a primitive float..
         */
        /*
         * NOTE:
         * Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed.
         * You can use the Number() function to force a number to be a Double object
         * https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/api.html
         */
        //return this.getJavaObject().getFloat(index);
        return this.getDouble(index);
    };
    /**
     * Returns the value at position index of type as integer.
     * @param {integer} index
     * @returns {integer}
     */
    Row.prototype.getInt = function (index) {
        /*
         it	getInt(int i)
         Returns the value at position i as a primitive int..
         */
        return this.getJavaObject().getInt(index);
    };
    /**
     * Returns the value at position index of type as long.
     * @param {integer} index
     * @returns {long}
     * @ignore
     */
    /* not applicable for JavaScript
     Row.prototype.getLong = function(index) {
     return this.getJavaObject().getLong(index);
     };
     */
    /**
     * Returns the value at position index of type as short.
     * @param {integer} index
     * @returns {short}
     * @ignore
     */
    /* Not applicable to JavaScript
     Row.prototype.getShort = function(index) {
     return this.getJavaObject().getShort(index);
     };
     */
    /**
     * Returns the value at position index of type as String.
     * @param {integer} index
     * @returns {String}
     */
    Row.prototype.getString = function (index) {
        /*
         java.lang.String	getString(int i)
         Returns the value at position i as a String object.
         */
        return this.getJavaObject().getString(index);
    };
    /**
     * Returns the value at position i of array type as List.
     * @param {integer} index
     * @returns {Array}
     */
    Row.prototype.getList = function (index) {
        var l = this.getJavaObject().getList(index);
        return Serialize.javaList(l);
    };
    /**
     * Returns the value at position index of  struct type as an Row object.
     * @param {integer} index
     * @returns {String}
     */
    Row.prototype.getStruct = function (index) {
        /*
         Row	getStruct(int i)
         Returns the value at position i of struct type as an Row object.
         */
        return Utils.javaToJs(this.getJavaObject().getStruct(index)); // wrapper the java row object
    };
    /**
     * Returns the value at position index of Timestamp type as Date.
     * @param {integer} index
     * @returns {SqlTimestamp}
     */
    Row.prototype.getTimestamp = function (index) {
        /*
         java.sql.Timestamp	getTimestamp(int i)
         Returns the value at position i of date type as java.sql.Timestamp.
         */
        return Utils.javaToJs(this.getJavaObject().getTimestamp(index)); // FIXME
    };
    /**
     * Returns hash code
     * @returns {int}
     */
    Row.prototype.hashCode = function () {
        /*
         int	hashCode()
         */
        return this.getJavaObject().hashCode()
    };
    /**
     * Checks whether the value at position index is null.
     * @param {integer} index
     * @returns {boolean}
     */
    Row.prototype.isNullAt = function (index) {
        /*
         boolean	isNullAt(int i)
         Checks whether the value at position i is null.
         */
        return this.getJavaObject().isNullAt(index);
    };
    /**
     * Number of elements in the Row.
     * @returns {integer}
     */
    Row.prototype.length = function () {
        /*
         int	length()
         Number of elements in the Row.
         */
        return this.getJavaObject().length();
    };
    /**
     * Displays all elements of this traversable or iterator in a string using start, end, and separator strings.
     * @param {string} [separator]
     * @param {string} [start] start will be ignored if end parameter is not specified
     * @param {string} [end] Required if start specified
     * @returns {string}
     */
    Row.prototype.mkString = function (separator, start, end) {
        var str = "";

        for (var i = 0; i < this.length(); i++) {
            var v = this.get(i);
            if (separator && start && end && i === 0) {
                str = start;
            }
            if (v !== null) {
                str += v.toString();
            }
            if (separator && (i < this.length() - 1)) {
                str += separator
            }
            if (separator && start && end && (i === this.length() - 1)) {
                str += end;
            }
        }

        return str;

    };
    /**
     * Schema for the row.
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Row.prototype.schema = function () {

        /*
         StructType	schema()
         Schema for the row.
         */
        return  Utils.javaToJs(this.getJavaObject().schema());

    };
    /**
     * Number of elements in the Row.
     * @returns {integer}
     */
    Row.prototype.size = function () {

        /*
         int	size()
         Number of elements in the Row.
         */
        return this.getJavaObject().size();

    };

    Row.prototype.toString = function () {
        return this.mkString(",", "[", "]");
    };
    /*
     * java.lang.String	toString() implemented by parent class JavaWrapper
     */

    Row.prototype.toJSON = function () {
        /*
         * Row
         *  | values
         *    | [value, ...]
         *  | schema {module:eclairjs/sql/types.StructType}
         *    | fields {module:eclairjs/sql/types.StructField}
         */
        var jsonObj = {};
        jsonObj.values = [];
        for (var i = 0; i < this.length(); i++) {
            var v = (this.get(i) && this.get(i).toJSON) ? this.get(i).toJSON() : this.get(i);
            jsonObj.values.push(v);
        }
        jsonObj.schema = this.schema().toJSON();
        return jsonObj;
    };

    module.exports = Row;

})();
