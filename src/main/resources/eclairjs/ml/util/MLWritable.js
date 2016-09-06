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

    //var MLWritable = Java.type('org.apache.spark.ml.util.MLWritable');
    
    
    /**
     * @classdesc
     *
     * Trait for classes that provide {@link MLWriter}.
     * @class
     * @memberof module:eclairjs/ml/util
     */
    var MLWritable = function(jvmObject) {

        //throw "Can't instantiate abstract class - MLWritable";
        this.logger = Logger.getLogger("ml_util_MLWritable_js");
        JavaWrapper.call(this, jvmObject);
    
    };

    MLWritable.prototype = Object.create(JavaWrapper.prototype);

    MLWritable.prototype.constructor = MLWritable;    
    
    /**
     * @returns {??} 
     * @function
     * @name module:eclairjs/ml/util.MLWritable#$init$
     */
    //MLWritable.prototype.$init$ = function() {
      //var javaObject =  this.getJavaObject().$init$();
      //return Utils.javaToJs(javaObject);
    //};
    
    /**
     * Returns an {@link MLWriter} instance for this ML instance.
     * @returns {module:eclairjs/ml/util.MLWriter} 
     * @function
     * @name module:eclairjs/ml/util.MLWritable#write
     */
    MLWritable.prototype.write = function() {
      var javaObject =  this.getJavaObject().write();
      return Utils.javaToJs(javaObject);
    };
    
    /**
     * Saves this ML instance to the input path, a shortcut of `write.save(path)`.
     * @param {string} path
     * @function
     * @name module:eclairjs/ml/util.MLWritable#save
     */
    MLWritable.prototype.save = function(path) {
       this.getJavaObject().save(path);
    };

    module.exports = MLWritable;
})();
