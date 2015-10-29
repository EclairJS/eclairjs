/**
 * @author billreed
 *
 */

/**
 * 
 */
var RDD = function(jrdd) {
	this.jvmRdd = jrdd;
	this.logger = Logger.getLogger("RDD_js");
};
/**
 * 
 * @returns
 */
RDD.prototype.getJavaObject = function() {
	return this.jvmRdd;
};

RDD.prototype.filter = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.filter(fn));

	return result;

};

RDD.prototype.flatMap = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new com.ibm.eclair.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.flatMap(fn));

	return result;

};

RDD.prototype.reduceByKey = function(func) {
	var sv = Utils.createJavaParams(func, 2);
	var fn = new com.ibm.eclair.JSFunction2(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.reduceByKey(fn));

	return result;

};

RDD.prototype.sortByKey = function(ascending) {
	var result = new RDD(this.jvmRdd.sortByKey(ascending));

	return result;
}

RDD.prototype.map = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.map(fn));

	return result;

};

RDD.prototype.mapToPair = function(func) {

	var sv = Utils.createJavaParams(func);

	var fn = new com.ibm.eclair.JSPairFunction(sv.funcStr, sv.scopeVars);
	var result = new RDD(this.jvmRdd.mapToPair(fn));

	return result;

};

RDD.prototype.cache = function() {
	this.jvmRdd.cache();
	return this;
};

RDD.prototype.count = function() {
	var c = this.jvmRdd.count();
	return c;
};
/**
 * 
 * @param num
 * @returns {Array}
 */
RDD.prototype.take = function(num) {
	var res = this.jvmRdd.take(num);
	this.logger.debug("take " + res.getClass().getName());
	var results = [];
	for (var i = 0; i < res.size(); i++) {
		var value = res.get(i);
		this.logger.debug("take value: " + value.getClass().getName());
		var o = Utils.javaToJs(value);
		this.logger.debug("take o:" + o.toString());
		results.push(o);
	}
	this.logger.debug("results " + results);
	return results;
};

RDD.prototype.collect = function() {
	var res = this.jvmRdd.collect();
	return res;
};
