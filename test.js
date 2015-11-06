

/**
 * Represents a rdd.
 * @constructor
 * @param {object} jrdd - The title of the book.
  */
var RDD = function(jrdd) {
	this.jvmRdd = jrdd;
	this.logger = Logger.getLogger("RDD_js");
};

/**
* Return a new RDD containing only the elements that satisfy a predicate.
* @param func
* @returns {RDD}
*/
RDD.prototype.filter = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.filter(fn));

	return result;

};