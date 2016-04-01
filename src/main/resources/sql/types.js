/**
 * Created by billreed on 4/1/16.
 */
{
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
}
