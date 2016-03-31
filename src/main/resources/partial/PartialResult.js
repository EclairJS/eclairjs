/*                                                                         
* Copyright 2015 IBM Corp.                                                 
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




/**
  * @constructor
  * @classdesc PartialResult
 * @param {object} initialVal  23  * @param {boolean} isFinal
 */
var PartialResult = function(initialVal,isFinal) {
    this.logger = Logger.getLogger("PartialResult_js");
    var jvmObject;
    if (arguments[0] instanceof rg.apache.spark.partial.PartialResult ) {
        jvmObject = arguments[0];
    } else {
        jvmObject = new org.apache.spark.partial.PartialResult(Utils.unwrapObject(initialVal),isFinal);
    }


    JavaWrapper.call(this, jvmObject);
};

PartialResult.prototype = Object.create(JavaWrapper.prototype);

PartialResult.prototype.constructor = PartialResult;


/**
 * @returns {object}
 */
PartialResult.prototype.initialValue = function() {
throw "not implemented by ElairJS";
   var javaObject =  this.getJavaObject().initialValue();
    return Utils.javaToJs(javaObject);
}




/**
 * @returns {boolean}
 */
PartialResult.prototype.isInitialValueFinal = function() {
    return  this.getJavaObject().isInitialValueFinal();
};


/**
 * Blocking method to wait for and return the final value.
 * @returns {object}
 */
PartialResult.prototype.getFinalValue = function() {
   var javaObject =  this.getJavaObject().getFinalValue();
   return Utils.javaToJs(javaObject);
};


/**
 * Set a handler to be called when this PartialResult completes. Only one completion handler
 * is supported per PartialResult.
 * @param {func} handler
 * @returns {PartialResult}
 */
PartialResult.prototype.onComplete = function(handler) {
   var bindArgs;
  var fn = Utils.createLambdaFunction(handler,org.eclairjs.nashorn.JSFunction, null, bindArgs);
   var javaObject =  this.getJavaObject().onComplete(fn);
   return new PartialResult(javaObject);
};


/**
 * Set a handler to be called if this PartialResult's job fails. Only one failure handler
 * is supported per PartialResult.
 * @param {func} handler
 */
PartialResult.prototype.onFail = function(handler) {
   var bindArgs;
  var fn = Utils.createLambdaFunction(handler,org.eclairjs.nashorn.JSFunction, null, bindArgs);
    this.getJavaObject().onFail(fn);
};


/**
 * Transform this PartialResult into a PartialResult of type T.
 * @param {func} f
 * @returns {PartialResult}
 */
PartialResult.prototype.map = function(f) {
   var bindArgs;
  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction, null, bindArgs);
   var javaObject =  this.getJavaObject().map(fn);
   return new PartialResult(javaObject);
};


/**
 * @returns {string}
 */
PartialResult.prototype.toString = function() {
    return this.getJavaObject().toString();
};
