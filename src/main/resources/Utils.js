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

Utils.logger = Logger.getLogger("Utils_js");

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
	  Utils.logger.debug("createJavaParams func: " + func + " sparkArgumentsPassed: " + sparkArgumentsPassed);
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
    	  // unwrapObjects or we can have serialization problems
    	  Utils.logger.debug("scopeVar = " + args[i]);
    	  var a = eval(args[i]);
    	  Utils.logger.debug("got a ref to  = " + a);
		  parmas.scopeVars.push(Utils.unwrapObject(eval(args[i]))); // eval the argument name to get a reference to the variable
	  }
      return parmas;

  };

  Utils.javaToJs = function(javaObj) {
    if (Array.isArray(javaObj))
    {
      for (var i=0;i<javaObj.length;i++)
        javaObj[i]=org.eclairjs.nashorn.Utils.javaToJs(javaObj,org.eclairjs.nashorn.NashornEngineSingleton.getEngine());
      return javaObj;

    }
    else
  	  return org.eclairjs.nashorn.Utils.javaToJs(javaObj,org.eclairjs.nashorn.NashornEngineSingleton.getEngine());
  };

  Utils.unwrapObject = function(obj) {
    if (Array.isArray(obj))
    {
      for (var i=0;i<obj.length;i++)
        obj[i]= (obj[i] && obj[i].getJavaObject) ? obj[i].getJavaObject() : obj[i];
      return obj;

    }
    else
	    return (obj && obj.getJavaObject) ? obj.getJavaObject() : obj;
  };
  /**
   * Creates a argument list of Spark Java objects that can be passed to a Spark Java method.
   * If the objects passed in the argument list are an instanceof "type" then the object will be
   * unwrapped else will will create an instanceof "type" for that object.
   * If the object
   * for example:
   * // Spark Java
   * GoupedData.agg(Column expr, Column... exprs)
   * @private
   * @param {object | string} object,...object
   * @param {function} type this is the constructor of the desired object type for example Column
   * @returns {object[]} array of Java spark objects
   */
  Utils.createJavaObjectArguments = function(args, type) {
	  /*
		 * First convert any strings to Objects of type
		 */
		var a = Array.prototype.slice.call(args);
		for (var i = 0; i < a.length; i++) {
			var o = a[i];
			if (!(o instanceof type)) {
				o = new type(o);
			}
			a[i] = Utils.unwrapObject(o);
		}
		return a;
  };
  /**
   * Creates a Java HashMap from a JavaScript object.
   * @private
   * @param {object} obj hashMap
   * @returns {HashMap} java.util.HashMap
   */
  Utils.createJavaHashMap = function(obj, javaMapObj) {
	  var map = javaMapObj ? javaMapObj : new java.util.HashMap();
	   for(var colName in obj){
		   if (typeof obj[colName] === 'number') {
			   map.put(new java.lang.Double(colName), new java.lang.Double(obj[colName]));
		   } else {
			   map.put(colName, obj[colName]);
		   }

	   }
	   return map;
  };

  function convertJavaTuple2(o1, o2) {
	  return [o1 ,o2];
  };

  function convertJavaJSONObject(str) {
	  return JSON.parse(str);
  };

  function createJavaWrapperObject(className, obj) {
	  return eval("new " + className + "(obj)");
  };


