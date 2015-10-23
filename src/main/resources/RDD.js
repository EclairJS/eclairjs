var RDD = function(jrdd) {
    this.jvmRdd = jrdd;
};

RDD.prototype.getJavaObject = function() {
    return this.jvmRdd;
};

RDD.prototype.filter = function() { 
    var sv = Utils.createJavaParams(arguments);
    var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
    var result = new RDD(this.jvmRdd.filter(fn));

    return result;

};

RDD.prototype.flatMap = function() { 
    var sv = Utils.createJavaParams(arguments);
    var fn = new com.ibm.eclair.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
    var result = new RDD(this.jvmRdd.flatMap(fn));

    return result;

};

RDD.prototype.reduceByKey = function() { 
    var sv = Utils.createJavaParams(arguments);
    var fn = new com.ibm.eclair.JSFunction2(sv.funcStr, sv.scopeVars);
    var result = new RDD(this.jvmRdd.reduceByKey(fn));

    return result;

};

RDD.prototype.sortByKey = function(ascending) { 
    var result = new RDD(this.jvmRdd.sortByKey(ascending));

    return result;
}

RDD.prototype.map = function() { 
    var sv = Utils.createJavaParams(arguments);
    var fn = new com.ibm.eclair.JSFunction(sv.funcStr, sv.scopeVars);
    var result = new RDD(this.jvmRdd.map(fn));

    return result;

};

RDD.prototype.mapToPair = function() { 

    var sv = Utils.createJavaParams(arguments);

    var fn = new com.ibm.eclair.JSPairFunction(sv.funcStr, sv.scopeVars);
    var result = new RDD(this.jvmRdd.mapToPair(fn));

    return result;

};

RDD.prototype.cache = function () {
    this.jvmRdd.cache();
    return this;
};

RDD.prototype.count = function() {
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
