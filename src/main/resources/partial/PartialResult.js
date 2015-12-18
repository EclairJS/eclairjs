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





var PartialResult = function(initialVal,isFinal) {
var jvmObject = new org.apache.spark.partial.PartialResult(initialVal,isFinal);
this.logger = Logger.getLogger("PartialResult_js");
JavaWrapper.call(this, jvmObject);

};

PartialResult.prototype = Object.create(JavaWrapper.prototype);

PartialResult.prototype.constructor = PartialResult;




PartialResult.prototype.initialValue = function() {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().initialValue();
//   return new object(javaObject);
}



PartialResult.prototype.isInitialValueFinal = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().isInitialValueFinal();
}


/**
 * Blocking method to wait for and return the final value.
 * @returns {object} 
 */
PartialResult.prototype.getFinalValue = function() {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().getFinalValue();
//   return new object(javaObject);
}


/**
 * Set a handler to be called when this PartialResult completes. Only one completion handler
 * is supported per PartialResult.
 * @returns {PartialResult} 
 */
PartialResult.prototype.onComplete = function(handler) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(handler);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().onComplete(fn);
//   return new PartialResult(javaObject);
}


/**
 * Set a handler to be called if this PartialResult's job fails. Only one failure handler
 * is supported per PartialResult.
 */
PartialResult.prototype.onFail = function(handler) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(handler);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//    this.getJavaObject().onFail(fn);
}


/**
 * Transform this PartialResult into a PartialResult of type T.
 * @returns {PartialResult} 
 */
PartialResult.prototype.map = function(f) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject =  this.getJavaObject().map(fn);
//   return new PartialResult(javaObject);
}



PartialResult.prototype.toString = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().toString();
}
