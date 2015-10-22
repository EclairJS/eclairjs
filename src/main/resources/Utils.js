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

  Utils.createJavaParams = function(args) {
  	  var parmas = {};
  	  parmas.scopeVars = null;
  	  parmas.funcStr = args[0].toString();
  	  // if (arguments.length > 1) {
  		  parmas.scopeVars = [];
  		  for (var i = 1; i < args.length; i++) {
  			  print(args[i]);
  			  parmas.scopeVars.push(args[i]);
  		  }
  	  //}
      print("parmas.funcStr " + parmas.funcStr);
  	  return parmas;

    };
  

