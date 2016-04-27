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

    var UnaryTransformer = require(EclairJS_Globals.NAMESPACE + '/ml/UnaryTransformer');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Outputs the Hadamard product (i.e., the element-wise product) of each input vector with a
     * provided "weight" vector.  In other words, it scales each column of the dataset by a scalar
     * multiplier.
     * @class
     * @extends module:eclairjs/ml.UnaryTransformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    var ElementwiseProduct = function(uid) {

    	 this.logger = Logger.getLogger("ml.feature.ElementwiseProduct_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.feature.ElementwiseProduct) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.feature.ElementwiseProduct(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.feature.ElementwiseProduct();
        }
        UnaryTransformer.call(this, jvmObject);
    
    };
    
    ElementwiseProduct.prototype = Object.create(UnaryTransformer.prototype);
    
    ElementwiseProduct.prototype.constructor = ElementwiseProduct;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    ElementwiseProduct.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    
    /**
     * @param {module:eclairjs/mllib/linalg.Vector} value
     * @returns {module:eclairjs/mllib/feature.ElementwiseProduct} 
     */
    ElementwiseProduct.prototype.setScalingVec = function(value) {
       var value_uw = Utils.unwrapObject(value);
       var javaObject =  this.getJavaObject().setScalingVec(value_uw);
       return new ElementwiseProduct(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/mllib/linalg.Vector} 
     */
    ElementwiseProduct.prototype.getScalingVec = function() {
       var javaObject =  this.getJavaObject().getScalingVec();
       return Utils.javaToJs(javaObject);
    };

    /**
     * the vector to multiply with input vectors
     * @returns {module:eclairjs/ml/param.Param}
     */
    ElementwiseProduct.prototype.scalingVec = function() {
        var javaObject =  this.getJavaObject().scalingVec();
        return Utils.javaToJs(javaObject);
    };
    
    module.exports = ElementwiseProduct;
})();