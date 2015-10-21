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
  

