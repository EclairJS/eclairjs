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
    var Row = require(EclairJS_Globals.NAMESPACE + '/sql/Row');

    /**
     * @constructor
     * @memberof module:sql
     * @classdesc A factory class used to construct Row objects.
     */

    var RowFactory = {};
    /**
     * Create a Row from the given arguments. Position i in the argument list becomes position i in the created Row object.
     * @param {object} values
     * @returns {Row}
     */
    RowFactory.create = function (values) {
        var javaValues = [];
        values.forEach(function (o) {
            var uw_o = Utils.unwrapObject(o);
            if (Array.isArray(uw_o)) {
                /*
                 if we have a Row that has an ArrayType element need to convert to List
                 or we will get exceptions when we try to create a Dataframe with a JavaScript Array
                 Nashorn converts the top level JavaScript Array to a List for use but the JavaScript array
                 contained in the array is not converted. (Nashorn only seems to convert top level arrays for us)
                 Example:
                 StructField("text", new SqlArrayType(DataTypes.StringType, true), false, Metadata.empty());
                 */
                uw_o = java.util.Arrays.asList(uw_o);
            }
            javaValues.push(Utils.unwrapObject(uw_o));
        });
        //public static Row create(java.lang.Object... values)
        Logger.getLogger("sql.RowFactory_js").debug("RowFactory.create= " + javaValues);
        var row = org.apache.spark.sql.RowFactory.create(javaValues);
        var r = new Row(row);
        return r;
    };

    module.exports = RowFactory;

})();