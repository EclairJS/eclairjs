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

var Utils = {};



  /**
   * This function needs to parse the arguments that are being passed to the LAMDA function 
   * and get references to the arguments that will need to be added to the closer of the Nashorn 
   * engine when the LAMDA function runs on the worker. A standard spark LAMDA would look like:
   * function(sparkArg){...}, but we need any variables declared outside the closer of the LAMDA 
   * to be passed into the LAMDA so we can add them to the args when we call the LAMDA function from
   * a new Nashorn engine context. Are LAMDA function must include the out of closer variables ex.
   * function(sparkArg, scopeArg1, scopeArg2, .....) 
   * @param  {function} func LAMDA function that will be passed to spark. The functions 
   *                      will have the format function(sparkArg, scopeArg1, scopeArg2, .....)
   * @param  {sparkArgumentsPassed} the number of arguments passed to the LAMDA by spark defaults to 1
   *                     
   * @return {Object}   {
   * 						funcStr:  stringified funciton that was passed in,
   *                        scopeVars: Array of references to the out of closer args
   *                      }
   */
  Utils.createJavaParams = function(func, sparkArgumentsPassed) {
	  
	  var scopeVarsStartingPosion = sparkArgumentsPassed ? sparkArgumentsPassed : 1;
  	  var parmas = {};
  	  parmas.scopeVars = null;
  	  /*
  	   * First we stringify the function
  	   */
  	  parmas.funcStr = func.toString();
      /*
       * Start parsing the arguments passed to the function
       */
      var start = parmas.funcStr.indexOf("(");
      var stop = parmas.funcStr.indexOf(")");
      var agrsStr = parmas.funcStr.substring(start +1, stop);
      var args = agrsStr.split(","); // get all the arguments names
      parmas.scopeVars = [];
      for (var i = scopeVarsStartingPosion; i < args.length; i++) { 
		  parmas.scopeVars.push(eval(args[i])); // eval the argument name to get a reference to the variable
	  }
      return parmas;

  };

  Utils.javaToJs = function(javaObj) {
	  return org.eclairjs.nashorn.Utils.javaToJs(javaObj,org.eclairjs.nashorn.NashornEngineSingleton.getEngine()); 
  };
  
  Utils.unwrapObject = function(obj) {
	  return (obj && obj.getJavaObject) ? obj.getJavaObject() : obj; 
  };
  
  
  function convertJavaTuple2(o1, o2) { 
	  return [o1 ,o2 ]
  };
  
  function convertJavaJSONObject(str) {
	  return JSON.parse(str);
  };
  
  function createJavaWrapperObject(className, obj) {
	  return eval("new " + className + "(obj)");
  };
