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

    var Transformer = require(EclairJS_Globals.NAMESPACE + '/ml/Transformer');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * A fitted model, i.e., a {@link module:eclairjs/ml.Transformer} produced by an {@link module:eclairjs/ml.Estimator}.
     *
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Transformer
     */
    var Model = function(jvmObject) {
        this.logger = Logger.getLogger("ml.Model_js");
        Transformer.call(this, jvmObject);
    
    };
    
    Model.prototype = Object.create(Transformer.prototype);
    
    Model.prototype.constructor = Model;
    
    
    
    /**
     * Sets the parent of this model.
     * @param {module:eclairjs/ml.Estimator} parent
     * @returns {object} 
     */
    Model.prototype.setParent = function(parent) {
       var parent_uw = Utils.unwrapObject(parent);
       var javaObject =  this.getJavaObject().setParent(parent_uw);
       return Utils.javaToJs(javaObject);
    };

    /**
     *
     * @returns {module:eclairjs/ml.Estimator}
     */
    Model.prototype.parent = function() {
        var javaObject =  this.getJavaObject().parent();
        return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @returns {boolean} 
     */
    Model.prototype.hasParent = function() {
       return  this.getJavaObject().hasParent();
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {object} 
     */
    Model.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return Utils.javaToJs(javaObject);
    };
    
    module.exports = Model;
})();