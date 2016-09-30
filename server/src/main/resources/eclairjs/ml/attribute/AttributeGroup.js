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
     * Attributes that describe a vector ML column.
     *
     * Creates an attribute group with attributes.
     * @param {string} name  name of the attribute group
     * @param {Attribute[]} attrs  array of attributes. Attributes will be copied with their corresponding indices in
     *              the array.
     * @class
     * @memberof module:eclairjs/ml/attribute
     * @constructor
     */
    var AttributeGroup = function(name,attrs) {
         var attrs_uw = Utils.unwrapObject(attrs);
    	 var jvmObject = new org.apache.spark.ml.attribute.AttributeGroup(name,attrs_uw);
    	 this.logger = Logger.getLogger("AttributeGroup_js");
    	 JavaWrapper.call(this, jvmObject);
    
    };
    
    AttributeGroup.prototype = Object.create(JavaWrapper.prototype);
    
    AttributeGroup.prototype.constructor = AttributeGroup;
    

    /**
     *  Size of the attribute group. Returns -1 if the size is unknown.
     * @returns {number}
     */
    AttributeGroup.prototype.size = function() {
       return  this.getJavaObject().size();
    };


    /**
     *  Test whether this attribute group contains a specific attribute.
     * @param {string} attrName
     * @returns {boolean}
     */
    AttributeGroup.prototype.hasAttr = function(attrName) {
       return  this.getJavaObject().hasAttr(attrName);
    };


    /**
     *  Index of an attribute specified by name.
     * @param {string} attrName
     * @returns {number}
     */
    AttributeGroup.prototype.indexOf = function(attrName) {
       return  this.getJavaObject().indexOf(attrName);
    };


    /**
     *  Gets an attribute by its name.
     * @param {string} attrName
     * @returns {module:eclairjs/sql/catalyst/expressions.Attribute}
     */
    AttributeGroup.prototype.applywithstring = function(attrName) {
       var javaObject =  this.getJavaObject().apply(attrName);
       return Utils.javaToJs(javaObject);
    };


    /**
     *  Gets an attribute by its name.
     * @param {string} attrName
     * @returns {module:eclairjs/sql/catalyst/expressions.Attribute}
     */
    AttributeGroup.prototype.getAttrwithstring = function(attrName) {
       var javaObject =  this.getJavaObject().getAttr(attrName);
       return Utils.javaToJs(javaObject);
    };


    /**
     *  Gets an attribute by its index.
     * @param {number} attrIndex
     * @returns {module:eclairjs/sql/catalyst/expressions.Attribute}
     */
    AttributeGroup.prototype.applywithnumber = function(attrIndex) {
       var javaObject =  this.getJavaObject().apply(attrIndex);
       return Utils.javaToJs(javaObject);
    };


    /**
     *  Gets an attribute by its index.
     * @param {number} attrIndex
     * @returns {module:eclairjs/sql/catalyst/expressions.Attribute}
     */
    AttributeGroup.prototype.getAttrwithnumber = function(attrIndex) {
       var javaObject =  this.getJavaObject().getAttr(attrIndex);
       return Utils.javaToJs(javaObject);
    };


    /**
     *  Converts to ML metadata with some existing metadata.
     * @param {module:eclairjs/sql/types.Metadata} [existingMetadata]
     * @returns {module:eclairjs/sql/types.Metadata}
     */
    AttributeGroup.prototype.toMetadata = function(existingMetadata) {

       if (arguments[0]) {
       var existingMetadata_uw = Utils.unwrapObject(existingMetadata);
       var javaObject =  this.getJavaObject().toMetadata(existingMetadata_uw);
       return Utils.javaToJs(javaObject);
       } else {
       var javaObject =  this.getJavaObject().toMetadata();
       return Utils.javaToJs(javaObject);
       }
    };


    /**
     *  Converts to a StructField with some existing metadata.
     * @param {module:eclairjs/sql/types.Metadata} [existingMetadata]
     * @returns {module:eclairjs/sql/types.StructField}
     */
    AttributeGroup.prototype.toStructField = function(existingMetadata) {

       if (arguments[0]) {
       var existingMetadata_uw = Utils.unwrapObject(existingMetadata);
       var javaObject =  this.getJavaObject().toStructField(existingMetadata_uw);
       return Utils.javaToJs(javaObject);
       } else {
       var javaObject =  this.getJavaObject().toStructField();
       return Utils.javaToJs(javaObject);
       }
    };



    /**
     *  Creates an attribute group from a {@link StructField} instance.
     * @param {module:eclairjs/sql/types.StructField} field
     * @returns {module:eclairjs/ml/attribute.AttributeGroup}
     */
    AttributeGroup.fromStructField = function(field) {
       var field_uw = Utils.unwrapObject(field);
       var javaObject =  org.apache.spark.ml.attribute.AttributeGroup.fromStructField(field_uw);
       return Utils.javaToJs(javaObject);
    };


    module.exports = AttributeGroup;
})();