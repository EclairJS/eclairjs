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
     * sql types module.
     * @example
     * var sqlTypes = require('sql/types');
     * var at = new sqlTypes.ArrayType(sqlTypes.IntegerType, true);
     * @module sql/types
     */
    module.exports = {
        ArrayType: require('sql/types/ArrayType'),
        BinaryType: require('sql/types/BinaryType'),
        BooleanType: require('sql/types/BooleanType'),
        CalendarIntervalType: require('sql/types/CalendarIntervalType'),
        DataType: require('sql/types/DataType'),
        DataTypes: require('sql/types/DataTypes'),
        DateType: require('sql/types/DateType'),
        DoubleType: require('sql/types/DoubleType'),
        FloatType: require('sql/types/FloatType'),
        IntegerType: require('sql/types/IntegerType'),
        MapType: require('sql/types/MapType'),
        Metadata: require('sql/types/Metadata'),
        NullType: require('sql/types/NullType'),
        NumericType: require('sql/types/NumericType'),
        StringType: require('sql/types/StringType'),
        StructField: require('sql/types/StructField'),
        StructType: require('sql/types/StructType'),
        TimestampType: require('sql/types/TimestampType')
    }
})();
