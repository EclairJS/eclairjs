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
     * sql module.
     * @example
     * var sql = require('eclairjs/sql');
     * var at = new sql.Column("name");
     * @module eclairjs/sql
     */
    module.exports = {
        Column: require(EclairJS_Globals.NAMESPACE + '/sql/Column'),
        DataFrame: require(EclairJS_Globals.NAMESPACE + '/sql/Dataset'),
        DataFrameHolder: require(EclairJS_Globals.NAMESPACE + '/sql/DataFrameHolder'),
        DataFrameReader: require(EclairJS_Globals.NAMESPACE + '/sql/DataFrameReader'),
        DataFrameStatFunctions: require(EclairJS_Globals.NAMESPACE + '/sql/DataFrameStatFunctions'),
        DataFrameWriter: require(EclairJS_Globals.NAMESPACE + '/sql/DataFrameWriter'),
        functions: require(EclairJS_Globals.NAMESPACE + '/sql/functions'),
        GroupedData: require(EclairJS_Globals.NAMESPACE + '/sql/RelationalGroupedDataset'),
        Row: require(EclairJS_Globals.NAMESPACE + '/sql/Row'),
        RowFactory: require(EclairJS_Globals.NAMESPACE + '/sql/RowFactory'),
        SQLContext: require(EclairJS_Globals.NAMESPACE + '/sql/SQLContext'),
        SQLContext: require(EclairJS_Globals.NAMESPACE + '/sql/SQLContext'),
        SparkSession: require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession'),
        SparkSessionBuilder: require(EclairJS_Globals.NAMESPACE + '/sql/SparkSessionBuilder'),
        SqlTimestamp: require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp'),
        UDFRegistration: require(EclairJS_Globals.NAMESPACE + '/sql/UDFRegistration')
        //UserDefinedFunction: require(EclairJS_Globals.NAMESPACE + '/sql/UserDefinedFunction') Scala only
    }
})();
