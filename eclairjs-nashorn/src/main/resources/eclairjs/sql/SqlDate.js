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
   // var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
   // var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');

    /**
     * @constructor SqlDate
     * @memberof module:eclairjs/sql
     * @classdesc A thin wrapper around a millisecond value that allows JDBC to identify this as an SQL DATE value.
     * A milliseconds value represents the number of milliseconds that have passed since January 1, 1970 00:00:00.000 GMT.
     * To conform with the definition of SQL DATE, the millisecond values wrapped by a java.sql.Date instance must be 'normalized'
     * by setting the hours, minutes, seconds, and milliseconds to zero in the particular time zone with which the instance is associated.
     * @param {number | string | Date} number of millisecond, string date representation, or Date object
     */
    var SqlDate = Java.type('org.eclairjs.nashorn.wrap.sql.SqlDate');
 /*   var SqlDate = function(o) {
        var jvmObj;
        if (!o) {
            var d = new Date();
            jvmObj = new java.sql.Date(d.getTime());
        } else if (typeof o === 'number') {
            // assume millisec
            jvmObj = new java.sql.Date(o);
        } else if (typeof o === 'string' || o instanceof String) {
            var d = new Date(o);
            jvmObj = new java.sql.Date(d.getTime());
        } else if (o instanceof Date) {
            jvmObj = new java.sql.Date(o.getTime());
        } else {
            jvmObj = o;
        }
        JavaWrapper.call(this, jvmObj);

        this.logger = Logger.getLogger("sql.SqlDate_js");
        this.logger.debug("SqlDate constructor");
    };

    SqlDate.prototype = Object.create(JavaWrapper.prototype);

    SqlDate.prototype.constructor = SqlDate;*/

    /**
     * Tests if this date is after the specified date.
     * @function
     * @name module:eclairjs/sql.SqlDate#after
     * @param {module:eclairjs/sql.SqlDate} when
     * @returns {boolean}
     */
   /* SqlDate.prototype.after = function (when) {
        return this.getJavaObject().after(Utils.unwrapObject(when));
    };*/
    /**
     * Tests if this date is before the specified date.
     * @function
     * @name module:eclairjs/sql.SqlDate#before
     * @param {module:eclairjs/sql.SqlDate} when
     * @returns {boolean}
     */
   /* SqlDate.prototype.before = function (when) {
        return this.getJavaObject().before(Utils.unwrapObject(when));
    };*/
    /**
     * Return a copy of this object.
     * @function
     * @name module:eclairjs/sql.SqlDate#clone
     * @returns {module:eclairjs/sql.SqlDate}
     */
   /* SqlDate.prototype.clone = function () {
        return new SqlDate(this.getJavaObject().clone());
    };*/
    /**
     * Compares two Dates for ordering
     * @function
     * @name module:eclairjs/sql.SqlDate#compareTo
     * @param {module:eclairjs/sql.SqlDate} anotherDate
     * @returns {integer}
     */
  /*  SqlDate.prototype.compareTo = function (anotherDate) {
        return this.getJavaObject().compareTo(Utils.unwrapObject(anotherDate));
    };*/
    /**
     * Compares two dates for equality.
     * @function
     * @name module:eclairjs/sql.SqlDate#equals
     * @param {module:eclairjs/sql.SqlDate} when
     * @returns {boolean}
     */
  /*  SqlDate.prototype.equals = function (when) {
        return this.getJavaObject().equals(Utils.unwrapObject(when));
    };
*/
    /**
     * Sets an existing Date object using the given milliseconds time value.
     * @function
     * @name module:eclairjs/sql.SqlDate#setTime
     * @param milliseconds
     */
  /*  SqlDate.prototype.setTime = function (milliseconds) {
        this.setJavaObject(new java.sql.Date(milliseconds));
    };*/
    /**
     * Formats a date in the date escape format yyyy-mm-dd.
     * @function
     * @name module:eclairjs/sql.SqlDate#toString
     * @returns {string}
     */
  /*  SqlDate.prototype.toString = function () {
        return this.getJavaObject().toString();
    };*/

 /*   SqlDate.prototype.toJSON = function () {
        return this.getJavaObject().toString();
    };*/

    /*SqlDate.prototype.valueOf = function(s) {
     return new SqlDate(java.sql.Date.valueOf(s));
     };*/

    module.exports = SqlDate;

})();