
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
{
    var DataType = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType');

    /**
     * @constructor
     * @extends DataType
     * @classdesc The data type representing calendar time intervals.
     * The calendar time interval is stored internally in two components: number of months the number of microseconds.
     * Note that calendar intervals are not comparable.
     * @memberof module:eclairjs/sql/types
     */

    var CalendarIntervalType = function (jvmObj) {

        DataType.call(this, jvmObj);
    };


    CalendarIntervalType.prototype = Object.create(DataType.prototype);


    CalendarIntervalType.prototype.constructor = CalendarIntervalType;

    /**
     * The default size of a value of this data type, used internally for size estimation.
     * @returns {integer}
     */
    CalendarIntervalType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };

    module.exports = CalendarIntervalType;
}

