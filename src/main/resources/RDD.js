load(
"nashorn:mozilla_compat.js");

var RDD = function(jrdd) { // RDD wrapper object
  this.jvmRdd = jrdd;
};

RDD.prototype.getJavaObject = function() { 
  return this.jvmRdd;

};

RDD.prototype.filter = function(func, scopeVar) { // Wrapper filter method
  //print("===== Filter =====  ");
  /*var nw2 = new NashornWrapper();
    var funcStr = func.toString();
    nw2.setFunc(funcStr);
    var lrdd = this.jvmRdd.filter(nw2);
    return new RDD(lrdd);*/

  var sv = Utils.createJavaHashMap(scopeVar);
  var funcStr = func.toString();
  //var fn = new com.ibm.spark.javascript.JSFunction(funcStr, sv);
  var fn = new com.ibm.spark.javascript.JSFunction(funcStr);
  var result = new RDD(this.jvmRdd.filter(fn));

  return result;

};

RDD.prototype.flatMap = function(func, scopeVar) { // Wrapper filter method
  //print("===== Filter =====  ");
  /*var nw2 = new NashornWrapper();
    var funcStr = func.toString();
    nw2.setFunc(funcStr);
    var lrdd = this.jvmRdd.filter(nw2);
    return new RDD(lrdd);*/

  var sv = Utils.createJavaHashMap(scopeVar);
  var funcStr = func.toString();
  //var fn = new com.ibm.spark.javascript.JSFlatMapFunction(funcStr, sv);
  var fn = new com.ibm.spark.javascript.JSFlatMapFunction(funcStr);
  var result = new RDD(this.jvmRdd.flatMap(fn));

  return result;

};

RDD.prototype.reduceByKey = function(func, scopeVars) { // Wrapper filter method
  //print("===== Filter =====  ");
  /*var nw2 = new NashornWrapper();
    var funcStr = func.toString();
    nw2.setFunc(funcStr);
    var lrdd = this.jvmRdd.map(nw2);
    return new RDD(lrdd);*/

  var sv = Utils.createJavaHashMap(scopeVars);
  var funcStr = func.toString();
  //var fn = new com.ibm.spark.javascript.JSFunction(funcStr, sv);
  var fn = new com.ibm.spark.javascript.JSFunction2(funcStr);
  var result = new RDD(this.jvmRdd.reduceByKey(fn));

  return result;

};

RDD.prototype.sortByKey = function(ascending, scopeVars) { // Wrapper filter method
  //var funcStr = func.toString();
  //var fn = new com.ibm.spark.javascript.JSFunction(funcStr, sv);
  //var fn = new com.ibm.spark.javascript.JSFunction2(funcStr);
  var result = new RDD(this.jvmRdd.sortByKey(ascending));

  return result;
}

RDD.prototype.mapToPair = function() { // Wrapper filter method
  //print("===== Filter =====  ");
  /*       var nw2 = new NashornWrapperPair();
           print("name = " + name + " value= " + obj);
           nw2.addVar(name, obj);
           var funcStr = func.toString();
           nw2.setFunc(funcStr);
           var lrdd = this.jvmRdd.mapToPair(nw2);
           return new RDD(lrdd);*/

  //var sv = Utils.createJavaHashMap(scopeVars);

  var funcStr = arguments[0].toString();
  var scopeVars = [];
  for (var i = 1; i < arguments.length; i++) {
    print(arguments[i]);
    scopeVars.push(arguments[i]);
  }

  //var fn = new com.ibm.spark.javascript.JSPairFunction2(funcStr, scopeVars);
  var fn = new com.ibm.spark.javascript.JSPairFunction(funcStr);
  var result = new RDD(this.jvmRdd.mapToPair(fn));

  return result;
};

RDD.prototype.cache = function () {
  print("==========cache==========")
  this.jvmRdd.cache();
  return this;
};

RDD.prototype.count = function() {
  print ("=== count ====");
  var c = this.jvmRdd.count();
  return c;
};

RDD.prototype.take = function(num) {
  var res = this.jvmRdd.take(num);
  return res;
}

RDD.prototype.collect = function() {
  var res = this.jvmRdd.collect();
  return res;
}
