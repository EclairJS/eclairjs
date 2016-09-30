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
    var Transformer = require(EclairJS_Globals.NAMESPACE + '/ml/Transformer');

    
    
    /**
     * @classdesc
     * :: Experimental ::
     * Implements the transformations which are defined by SQL statement.
     * Currently we only support SQL syntax like 'SELECT ... FROM __THIS__ ...'
     * where '__THIS__' represents the underlying table of the input dataset.
     * The select clause specifies the fields, constants, and expressions to display in
     * the output, it can be any select clause that Spark SQL supports. Users can also
     * use Spark SQL built-in function and UDFs to operate on these selected columns.
     * For example, {@link SQLTransformer} supports statements like:
     *  - SELECT a, a + b AS a_b FROM __THIS__
     *  - SELECT a, SQRT(b) AS b_sqrt FROM __THIS__ where a > 5
     *  - SELECT a, b, SUM(c) AS c_sum FROM __THIS__ GROUP BY a, b
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Transformer
     */
    
    /**
     * @param {string} uid
     * @constructor
     */
    var SQLTransformer = function(uid) {
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.SQLTransformer) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.SQLTransformer(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.SQLTransformer();
        }
    	 this.logger = Logger.getLogger("SQLTransformer_js");
    	 Transformer.call(this, jvmObject);
    
    };
    
    SQLTransformer.prototype = Object.create(Transformer.prototype);
    
    SQLTransformer.prototype.constructor = SQLTransformer;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.SQLTransformer} 
     */
    SQLTransformer.prototype.setStatement = function(value) {
       var javaObject =  this.getJavaObject().setStatement(value);
       return new SQLTransformer(javaObject);
    };
    
    
    /**
     * @returns {string} 
     */
    SQLTransformer.prototype.getStatement = function() {
       return  this.getJavaObject().getStatement();
    };
    
    
    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset} 
     */
    SQLTransformer.prototype.transform = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().transform(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType} 
     */
    SQLTransformer.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.SQLTransformer} 
     */
    SQLTransformer.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new SQLTransformer(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.SQLTransformer} 
     */
    SQLTransformer.load = function(path) {
       var javaObject =  org.apache.spark.ml.feature.SQLTransformer.load(path);
       return new SQLTransformer(javaObject);
    };
    
    module.exports = SQLTransformer;
})();