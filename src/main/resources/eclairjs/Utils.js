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
 /* Utils.createJavaParams = function(func, sparkArgumentsPassed) {
	  Utils.logger.debug("createJavaParams func: " + func + " sparkArgumentsPassed: " + sparkArgumentsPassed);
	  var scopeVarsStartingPosion = sparkArgumentsPassed ? sparkArgumentsPassed : 1;
  	  var parmas = {};
  	  parmas.scopeVars = null;
  	  /!*
  	   * First we stringify the function
  	   *!/
  	  parmas.funcStr = func.toString();
      /!*
       * Start parsing the arguments passed to the function
       *!/
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

  };*/

  Utils.javaToJs = function(javaObj) {
      return Serialize.javaToJs(javaObj);
     /* if (Array.isArray(javaObj) || javaObj.getClass().isArray() )
      {
          var ret = [];
          for (var i=0;i<javaObj.length;i++) {
              ret.push(org.eclairjs.nashorn.Utils.javaToJs(javaObj[i], org.eclairjs.nashorn.NashornEngineSingleton.getEngine()));
          }
          return ret;

      }
      else
          return org.eclairjs.nashorn.Utils.javaToJs(javaObj,org.eclairjs.nashorn.NashornEngineSingleton.getEngine());*/
  };

  Utils.unwrapObject = function(obj) {

      if (Array.isArray(obj))
      {
          var unObj = [];
          for (var i=0;i<obj.length;i++) {
              unObj.push(Utils.unwrapObject(obj[i]));
          }
          return unObj;
      }
      else
          return (obj && obj.getJavaObject) ? obj.getJavaObject() : obj;
  };


/*  Utils.unwrapTuple = function(obj) {
        Utils.logger.debug("unwrapTuple = " + obj);
    if (Array.isArray(obj) && obj.length>1)
    {
      var Tuple2 = Java.type('scala.Tuple2');
       return new Tuple2(Utils.unwrapObject(obj[0]),Utils.unwrapObject(obj[1]));
    }
    else
      throw "Expecting tuple, i.e. [1,2] ";
  };*/

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
   * @param {entryCallback} entryMapFunction callback to modify entry value
   * @returns {HashMap} java.util.HashMap
   */
  Utils.createJavaHashMap = function(obj, javaMapObj,entryMapFunction) {
	  var map = javaMapObj ? javaMapObj : new java.util.HashMap();
	   for(var colName in obj){
        if (entryMapFunction)
        {
         map.put(colName, entryMapFunction(colName, obj[colName]));
        }
		    else if (typeof obj[colName] === 'number') {
			   map.put(new java.lang.Double(colName), new java.lang.Double(obj[colName]));
		   } else {
			   map.put(colName, obj[colName]);
		   }

	   }
	   return map;
  };

  /**
   * Creates a Java Set from a JavaScript array.
   * @private
   * @param {object[]} obj array
   * @returns {Set} java.util.HashSet
   */
  Utils.createJavaSet = function(arr, javaSetObj) {
    if (!Array.isArray(arr))
      arr = [arr];
    var set = javaSetObj ? javaSetObj : new java.util.HashSet();
     for(var i=0; i<arr.length; i++){
        set.add(arr[i]);
     }
     return set;
  };

  /*function createJavaScriptArray(list) {
      var l = [];
      for(var i=0; i<list.size(); i++) {
        l.push(list.get(i));
      }

      return l;
  };*/

 /* function convertJavaJSONObject(str) {
	  return JSON.parse(str);
  };*/

  /*function createJavaWrapperObject(className, obj) {
	  return eval("new " + className + "(obj)");
  };*/

  function addModule(sc, module) {
    if (sc && !sc.isLocal() && module && !module.core) {
        //print("not local and not core so addingModule: " + module.id);
        // If module/file is under a subdir we need to zip it up to preserve directory structure
        // on worker node otherwise addFile it will flatten path and can lead to file-overwrites.
        if (module.inFolder) {
            sc.addModule(module);
        } else {
            sc.addFile(module.id, true);
        }

        // look for children modules
        if (module.children && module.children.length) {
            module.children.forEach(function(childname) {
                //print("addingModule for child: "+childname);
                addModule(sc, ModuleUtils.getRequiredFile(childname));
            });
        }
    }
  }

  Utils.createLambdaFunction = function(func, clazz, sc, bindArgs) {
    //var x = bindArgs ? org.eclairjs.nashorn.Utils.jsToJava(bindArgs) : []
    var unObj = [];
    // If one or more modules are found that are not in JAR we need to send entire
    // zipfile of custom modules because ew don't have child dependencies with the
    // way we have to load required filed for Nashorn.
    var modNotInJar = false;
    if (bindArgs) {
        for (var i = 0; i < bindArgs.length; i++) {
            //unObj.push(org.eclairjs.nashorn.Utils.jsToJava(bindArgs[i]));

            // If it's a bound module it will be a module.export so get the metadata object that can be serialized.
            if (ModuleUtils.isModule(bindArgs[i])) {
                //print("Utils.createLambdaFunction bindArg isModule: "+bindArgs[i]);
                bindArgs[i] = ModuleUtils.getRequiredFile(bindArgs[i]);
                modNotInJar = modNotInJar || !bindArgs[i].core;

                //print("modNotInJar: " + modNotInJar);
                // See note above - maybe in future will try and do single zipfile per module
                // to include only what lambda function truly needs.
                //if (sc) {
                    //addModule(sc, bindArgs[i]);
                //}
            }

            unObj.push(Serialize.jsToJava(bindArgs[i]));

            // Add the zipfile of non-JAR zipfiles to SparkContext.
            if (modNotInJar && sc && !sc.isLocal()) {
                //print("Found non-core modules and sc is NOT local to sending zipfile of all custom mods");
                sc.addCustomModules();
            }
        }
    }
    //return new clazz(func.toString(), bindArgs ? Utils.unwrapObject(bindArgs) : [])
    return new clazz(func.toString(), unObj /*x*/)
  };

  function Utils_invoke(func) {
      var fn = eval(func);
      var a = Array.prototype.slice.call(arguments);
      var args = (arguments.length > 1)
          ? a.slice(1).map(function(arg) {
              return Serialize.javaToJs(arg);
          })
          : [];

      var ret = null;
      try {
        ret = Serialize.jsToJava(fn.apply(this, args));
      } catch(err) {
        print("error invoking function");
        print(func);
        print(err);
        throw err;
      }

      return ret;
  };

module.exports = Utils;
