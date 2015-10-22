var JSFlatMapFunction = Java.type('com.ibm.eclair.JSFlatMapFunction');
var JSFunction = Java.type('com.ibm.eclair.JSFunction');
var JSPairFunction = Java.type('com.ibm.eclair.JSPairFunction');

var DStream = function(jDStream) {
    this.jDStream = jDStream;
}

DStream.prototype.getJavaObject = function() {
    return this.jDStream;
}

DStream.prototype.flatMap = function() {
    var sv = Utils.createJavaParams(arguments);
    var fn = new JSFlatMapFunction(sv.funcStr, sv.scopeVars);
    return new DStream(this.jDStream.flatMap(fn));
};

DStream.prototype.map = function() {
    var sv = Utils.createJavaParams(arguments);
    var fn = new JSFunction(sv.funcStr, sv.scopeVars);
    return new DStream(this.jDStream.map(fn));
};

DStream.prototype.window = function(duration) {
    return new DStream(this.jDStream.window(duration.getJavaObject()));
};

DStream.prototype.foreachRDD = function() {
    var sv = Utils.createJavaParams(arguments);
    var fn = new JSFunction(sv.funcStr, sv.scopeVars);
    this.jDStream.foreachRDD(fn);
}

DStream.prototype.print = function() {
    this.jDStream.print();
};
