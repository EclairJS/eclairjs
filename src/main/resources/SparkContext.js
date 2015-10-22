load(
  "nashorn:mozilla_compat.js");

  var imported = new JavaImporter(
    org.apache.spark.api.java,
    org.apache.log4j.Logger,
    org.apache.log4j.Level
);

with (imported) {

  Logger.getLogger("org").setLevel(Level.WARN);
  Logger.getLogger("akka").setLevel(Level.WARN);

  var SparkContext = function(conf) {
    if (conf) {
    	this.jvmSC = new JavaSparkContext(conf.jvmConf);
    } else {
    	this.jvmSC = new JavaSparkContext(sc);
    }
  };

  SparkContext.prototype.getJavaObject = function() {
      return this.jvmSC;
  };

  SparkContext.prototype.parallelize = function(seq) {
    return new RDD(this.jvmSC.parallelize(seq));
  };

  SparkContext.prototype.textFile = function(path) {
    return new RDD(this.jvmSC.textFile(path));
  };

  SparkContext.prototype.addJar = function(path) {
    this.jvmSC.addJar(path);
  };

  SparkContext.prototype.addFile = function(path) {
    this.jvmSC.addFile(path);
  };

  SparkContext.prototype.broadcast = function(o) {
    return this.jvmSC.broadcast(o);
  };
}
