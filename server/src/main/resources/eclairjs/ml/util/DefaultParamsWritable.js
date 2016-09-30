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

    var MLWritable = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWritable');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    //var DefaultParamsWritable = Java.type('org.apache.spark.ml.util.DefaultParamsWritable');
    
    
    /**
     * @classdesc
     * :: DeveloperApi ::
     *
     * Helper trait for making simple [[Params]] types writable.  If a {@link Params} class stores
     * all data as {@link Param} values, then extending this trait will provide
     * a default implementation of writing saved instances of the class.
     * This only handles simple {@link Param} types; e.g., it will not handle
     * {@link Dataset}.
     *
     * @see  {@link DefaultParamsReadable}, the counterpart to this trait
     * @class
     * @memberof module:eclairjs/ml/util
     * @extends module:eclairjs/ml/util.MLWritable
     */
    
    var DefaultParamsWritable = function(jvmObject) {
        //throw "Can't instantiate abstract class - DefaultParamsWritable";
        this.logger = Logger.getLogger("ml_util_DefaultParamsWritable_js");
        MLWritable.call(this, jvmObject);
    
    };

    DefaultParamsWritable.prototype = Object.create(MLWritable.prototype);

    DefaultParamsWritable.prototype.constructor = DefaultParamsWritable; 
    
    /**
     * @returns {??} 
     * @function
     * @name module:eclairjs/ml/util.DefaultParamsWritable#$init$
     */
    //DefaultParamsWritable.prototype.$init$ = function() {
      //var javaObject =  this.getJavaObject().$init$();
      //return Utils.javaToJs(javaObject);
    //};
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/util.DefaultParamsWritable#write
     */
    DefaultParamsWritable.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };

    module.exports = DefaultParamsWritable;
})();
