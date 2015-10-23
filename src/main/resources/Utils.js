var Utils = {};

  /**
   * Public Static methods
   */
  Utils.createJavaHashMap = function(obj) {
	  print("createJavaHashMap");
	var sv = null;
    if (obj) {
  	  sv = new java.util.HashMap();
  	  for (var property in obj) {
  		  var o = obj[property];
  		  /*if (o.java) {
  			  o = o.java
  		  }*/
  		  print("adding to hash map " + property + " " + o);
  		  sv.put(property, o);
  	  }
    }
    return sv;

  };


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
