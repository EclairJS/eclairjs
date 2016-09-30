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
    var Attribute = require(EclairJS_Globals.NAMESPACE + '/ml/attribute/Attribute');
   var JavaNumericAttribute = Java.type('org.apache.spark.ml.attribute.NumericAttribute');

    
    
    /**
     * @classdesc
     * A numeric attribute with optional summary statistics.
     * @class
     * @memberof module:eclairjs/ml/attribute
     * @extends module:eclairjs/ml/attribute.Attribute
     */
    
    
    var NumericAttribute = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("NumericAttribute_js");
    	 Attribute.call(this, jvmObject);
    
    };
    
    NumericAttribute.prototype = Object.create(Attribute.prototype);
    
    NumericAttribute.prototype.constructor = NumericAttribute;
    
    
    

    /**
     * @returns {module:eclairjs/ml/attribute.AttributeType}
     */
    NumericAttribute.prototype.attrType = function() {
       var javaObject =  this.getJavaObject().attrType();
       return Utils.javaToJs(javaObject);
    };


    /**
     * @param {string} name
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withName = function(name) {
       var javaObject =  this.getJavaObject().withName(name);
       return new NumericAttribute(javaObject);
    };


    /**
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutName = function() {
       var javaObject =  this.getJavaObject().withoutName();
       return new NumericAttribute(javaObject);
    };


    /**
     * @param {number} index
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withIndex = function(index) {
       var javaObject =  this.getJavaObject().withIndex(index);
       return new NumericAttribute(javaObject);
    };


    /**
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutIndex = function() {
       var javaObject =  this.getJavaObject().withoutIndex();
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy with a new min value.
     * @param {number} min
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withMin = function(min) {
       var javaObject =  this.getJavaObject().withMin(min);
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy without the min value.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutMin = function() {
       var javaObject =  this.getJavaObject().withoutMin();
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy with a new max value.
     * @param {number} max
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withMax = function(max) {
       var javaObject =  this.getJavaObject().withMax(max);
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy without the max value.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutMax = function() {
       var javaObject =  this.getJavaObject().withoutMax();
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy with a new standard deviation.
     * @param {number} std
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withStd = function(std) {
       var javaObject =  this.getJavaObject().withStd(std);
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy without the standard deviation.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutStd = function() {
       var javaObject =  this.getJavaObject().withoutStd();
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy with a new sparsity.
     * @param {number} sparsity
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withSparsity = function(sparsity) {
       var javaObject =  this.getJavaObject().withSparsity(sparsity);
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy without the sparsity.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutSparsity = function() {
       var javaObject =  this.getJavaObject().withoutSparsity();
       return new NumericAttribute(javaObject);
    };


    /**
     *  Copy without summary statistics.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.prototype.withoutSummary = function() {
       var javaObject =  this.getJavaObject().withoutSummary();
       return new NumericAttribute(javaObject);
    };


    /**
     * @returns {boolean}
     */
    NumericAttribute.prototype.isNumeric = function() {
       return  this.getJavaObject().isNumeric();
    };


    /**
     * @returns {boolean}
     */
    NumericAttribute.prototype.isNominal = function() {
       return  this.getJavaObject().isNominal();
    };

    /**
     * The default numeric attribute.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.defaultAttr = function() {
       return Utils.javaToJs(JavaNumericAttribute.defaultAttr());

    };


    
    module.exports = NumericAttribute;
})();