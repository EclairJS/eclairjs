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
     * var sql = require('sql');
     * var at = new sql.Column("name");
     * @module sql
     */
    module.exports = {
        Column: require('sql/Column'),
        DataFrame: require('sql/DataFrame'),
        DataFrameHolder: require('sql/DataFrameHolder'),
        DataFrameReader: require('sql/DataFrameReader'),
        DataFrameStatFunctions: require('sql/DataFrameStatFunctions'),
        DataFrameWriter: require('sql/DataFrameWriter'),
        functions: require('sql/functions'),
        GroupedData: require('sql/GroupedData'),
        Row: require('sql/Row'),
        RowFactory: require('sql/RowFactory'),
        SQLContext: require('sql/SQLContext'),
        SqlDate: require('sql/SqlDate'),
        SqlTimestamp: require('sql/SqlTimestamp')
    }
})();
