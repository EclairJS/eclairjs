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
     * @classdesc
     * Registering user-defined functions.
     * @example
     * sqlContext.udf().register("udfTest", function(col1, ...col22) {
     *       return col1 + ...col22;
     * }, DataTypes.StringType);
     * var smt = "SELECT *, udfTest(mytable.col1,...mytable.col22) as transformedByUDF FROM mytable";
     * var result = sqlContext.sql(smt).collect();
     *
     * @since EclairJS 0.5 Spark  1.3.0
     * @class
     * @memberof module:eclairjs/sql
     */


    var UDFRegistration = function (jvmObject) {

        this.logger = Logger.getLogger("sql_UDFRegistration_js");
        JavaWrapper.call(this, jvmObject);

    };

    UDFRegistration.prototype = Object.create(JavaWrapper.prototype);

    UDFRegistration.prototype.constructor = UDFRegistration;

    /**
     * set/retuns the SparkContext, this is needed for loading modules in LAMDA works script engine
     * @param {module:eclairjs.SparkContext} [sc]
     * @returns {module:eclairjs.SparkContext}
     * @private
     */
    UDFRegistration.prototype.sparkContext = function (sc) {
        if (sc) {
            this.sc = sc;
        }
        return this.sc;
    };


    /**
     * Register a Scala closure of 0 arguments as user-defined function (UDF).
     * @since EclairJS 0.5 Spark  1.3.0
     * @param {string} name
     * @param {func} func function with 1 to 20 arguments
     * @param {module:eclairjs/sql/types.DataType} returnType DataType returned from the UDF function
     * @param {object[]} [bindArgs]
     * @returns {module:eclairjs/sql.UserDefinedFunction}
     *
     */
    UDFRegistration.prototype.register = function (name, func, returnType, bindArgs) {

        var f = func.toString().replace(/ /g, ''); // removes all whitespace
        var end = f.indexOf("{");
        var f1 = f.substring(0, end - 1);
        var f2 = f1.replace(/function\(/g, '');
        var args = f2.split(",");
        var bindArgsLen = bindArgs ? bindArgs.length : 0;
        var udfArgLen = args.length - bindArgsLen;

        var udfClass;
        switch (udfArgLen) {
            case 1:
                udfClass = org.eclairjs.nashorn.sql.JSUDF1;
                break;
            case 2:
                udfClass = org.eclairjs.nashorn.sql.JSUDF2;
                break;
            case 3:
                udfClass = org.eclairjs.nashorn.sql.JSUDF3;
                break;
            case 4:
                udfClass = org.eclairjs.nashorn.sql.JSUDF4;
                break;
            case 5:
                udfClass = org.eclairjs.nashorn.sql.JSUDF5;
                break;
            case 6:
                udfClass = org.eclairjs.nashorn.sql.JSUDF6;
                break;
            case 7:
                udfClass = org.eclairjs.nashorn.sql.JSUDF7;
                break;
            case 8:
                udfClass = org.eclairjs.nashorn.sql.JSUDF8;
                break;
            case 9:
                udfClass = org.eclairjs.nashorn.sql.JSUDF9;
                break;
            case 10:
                udfClass = org.eclairjs.nashorn.sql.JSUDF10;
                break;
            case 11:
                udfClass = org.eclairjs.nashorn.sql.JSUDF11;
                break;
            case 12:
                udfClass = org.eclairjs.nashorn.sql.JSUDF12;
                break;
            case 13:
                udfClass = org.eclairjs.nashorn.sql.JSUDF13;
                break;
            case 14:
                udfClass = org.eclairjs.nashorn.sql.JSUDF14;
                break;
            case 15:
                udfClass = org.eclairjs.nashorn.sql.JSUDF15;
                break;
            case 16:
                udfClass = org.eclairjs.nashorn.sql.JSUDF16;
                break;
            case 17:
                udfClass = org.eclairjs.nashorn.sql.JSUDF17;
                break;
            case 18:
                udfClass = org.eclairjs.nashorn.sql.JSUDF18;
                break;
            case 19:
                udfClass = org.eclairjs.nashorn.sql.JSUDF19;
                break;
            case 20:
                udfClass = org.eclairjs.nashorn.sql.JSUDF20;
                break;
            case 21:
                udfClass = org.eclairjs.nashorn.sql.JSUDF21;
                break;
            case 22:
                udfClass = org.eclairjs.nashorn.sql.JSUDF22;
                break;

            default:
                throw "Unsupported number of argument for UDF"
                break;
        }
        var fn = Utils.createLambdaFunction(func, udfClass, this.sparkContext(), bindArgs);
        var returnType_uw = Utils.unwrapObject(returnType);
        fn.setReturnType(returnType_uw);
        var javaObject = this.getJavaObject().register(name, fn, returnType_uw);
        return Utils.javaToJs(javaObject);
    };



    module.exports = UDFRegistration;
})();