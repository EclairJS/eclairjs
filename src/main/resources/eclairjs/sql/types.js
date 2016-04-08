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
     * var sqlTypes = require('eclairjs/sql/types');
     * var at = new sqlTypes.ArrayType(sqlTypes.IntegerType, true);
     * @module sql/types
     */
    module.exports = {
        ArrayType: require(EclairJS_Globals.NAMESPACE + '/sql/types/ArrayType'),
        BinaryType: require(EclairJS_Globals.NAMESPACE + '/sql/types/BinaryType'),
        BooleanType: require(EclairJS_Globals.NAMESPACE + '/sql/types/BooleanType'),
        CalendarIntervalType: require(EclairJS_Globals.NAMESPACE + '/sql/types/CalendarIntervalType'),
        DataType: require(EclairJS_Globals.NAMESPACE + '/sql/types/DataType'),
        DataTypes: require(EclairJS_Globals.NAMESPACE + '/sql/types/DataTypes'),
        DateType: require(EclairJS_Globals.NAMESPACE + '/sql/types/DateType'),
        DoubleType: require(EclairJS_Globals.NAMESPACE + '/sql/types/DoubleType'),
        FloatType: require(EclairJS_Globals.NAMESPACE + '/sql/types/FloatType'),
        IntegerType: require(EclairJS_Globals.NAMESPACE + '/sql/types/IntegerType'),
        MapType: require(EclairJS_Globals.NAMESPACE + '/sql/types/MapType'),
        Metadata: require(EclairJS_Globals.NAMESPACE + '/sql/types/Metadata'),
        NullType: require(EclairJS_Globals.NAMESPACE + '/sql/types/NullType'),
        NumericType: require(EclairJS_Globals.NAMESPACE + '/sql/types/NumericType'),
        StringType: require(EclairJS_Globals.NAMESPACE + '/sql/types/StringType'),
        StructField: require(EclairJS_Globals.NAMESPACE + '/sql/types/StructField'),
        StructType: require(EclairJS_Globals.NAMESPACE + '/sql/types/StructType'),
        TimestampType: require(EclairJS_Globals.NAMESPACE + '/sql/types/TimestampType')
    }
})();
