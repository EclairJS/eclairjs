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
    var logger = Logger.getLogger("sql_UserDefinedFunction_js");

    
    
    /**
     * Scala only
     * @classdesc
     * A user-defined function. To create one, use the `udf` functions in {@link functions}.
     * As an example:
     * @example 
     *   // Defined a UDF that returns true or false based on some numeric score.
     *   val predict = udf((score: Double) => if (score > 0.5) true else false)
     *
     *   // Projects a column that adds a prediction column based on the score column.
     *   df.select( predict(df("score")) )
     *  
     *
     * @since EclairJS 0.5 Spark  1.3.0
     * @class
     * @memberof module:eclairjs/sql
     * @ignore
     */
    
    
    var UserDefinedFunction = function(jvmObject) {
    	 
    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    UserDefinedFunction.prototype = Object.create(JavaWrapper.prototype);
    
    UserDefinedFunction.prototype.constructor = UserDefinedFunction;
    
    
    
    /**
     * @param {...module:eclairjs/sql.Column} exprs
     * @returns {module:eclairjs/sql.Column}
     * @ignore
     */
    UserDefinedFunction.prototype.apply = function(exprs) {
        throw "Not supported in EclairJS"
/*       var exprs_uw = Utils.unwrapObject(exprs);
       var javaObject =  this.getJavaObject().apply(exprs_uw);
       return  Utils.javaToJs(javaObject);*/
    };
    
    module.exports = UserDefinedFunction;
})();