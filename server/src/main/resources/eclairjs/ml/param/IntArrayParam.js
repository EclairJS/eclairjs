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

    var Param = require(EclairJS_Globals.NAMESPACE + '/ml/param/Param');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * @classdesc
     * :: DeveloperApi ::
     * Specialized version of [[Param[Array[Int]]]] for Java.
     * @class
     * @memberof module:eclairjs/ml/param
     * @extends module:eclairjs/ml/param.Param
     * @param {module:eclairjs/ml/param.Params} parent
     * @param {string} name
     * @param {string} doc
     */

    var IntArrayParam = function(parent,name,doc) {
        var jvmObject;
        this.logger = Logger.getLogger("ml_param_IntArrayParam_js");
        if (arguments[0] instanceof org.apache.spark.ml.param.IntArrayParam) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.ml.param.IntArrayParam(Utils.unwrapObject(parent),name,doc);
        }

    	 Param.call(this, jvmObject);
    
    };
    
    IntArrayParam.prototype = Object.create(Param.prototype);
    
    IntArrayParam.prototype.constructor = IntArrayParam;
    

    
    
    /**
     * @param {integer[]} value
     * @returns {string} 
     */
    IntArrayParam.prototype.jsonEncode = function(value) {
       return  this.getJavaObject().jsonEncode(value);
    };
    
    
    /**
     * @param {string} json
     * @returns {integer[]}
     */
    IntArrayParam.prototype.jsonDecode = function(json) {
        return  this.getJavaObject().jsonDecode(json);
    };
    
    module.exports = IntArrayParam;
})();