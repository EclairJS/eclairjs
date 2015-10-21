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

  //var SparkContext = function(conf) {
  var SparkContext = function() {
    print("==========SparkContext=================");
    this.jvmSC = new JavaSparkContext(sc);
    //this.jvmSC = new JavaSparkContext("local[*]", "foo");
    //this.jvmSC = new JavaSparkContext(conf.jvmConf);
    /*
     * Now that we have a SparkContext load any jar files that will
     * be needed by the workers on the cluster
     */
    //this.jvmSC.addJar("/Users/bburns/dev/nashhorn/cfa.jar"); // FIXME needs to be environment var
    //this.jvmSC.addJar("/Users/bburns/dev/nashhorn/lib/json-simple-1.1.1.jar"); // FIXME needs to be environment var
    /*
     * Now add the all JavaScript files that make up sparkJS, they need to be distributed to the workers on the cluster.
     */
    //this.jvmSC.addFile("javascript/nashorn/RDD.js");
    //this.jvmSC.addFile("javascript/nashorn/SparkContext.js");
    //this.jvmSC.addFile("javascript/nashorn/jsSparkConf.js");
    //this.jvmSC.addFile("javascript/nashorn/LinearRegressionWithSGD.js");
    //this.jvmSC.addFile("javascript/nashorn/LabeledPoint.js");
    //this.jvmSC.addFile("javascript/nashorn/Utils.js");
    /*
     * Now load all the sparkJS script files into the Nashorn engine for use.
     */
    //com.ibm.spark.javascript.NashornEngineSingleton.loadSparkJS();
  };

  SparkContext.prototype.parallelize = function(seq) {
    print("==============parallelize ============");
    return new RDD(this.jvmSC.parallelize(seq));
  };

  SparkContext.prototype.textFile = function(path) {
    print("==============textFile ============");
    return new RDD(this.jvmSC.textFile(path));
  };

  SparkContext.prototype.addJar = function(path) {
    print("==============addJar ============");
    this.jvmSC.addJar(path);
  };

  SparkContext.prototype.addFile = function(path) {
    print("==============addJar ============");
    this.jvmSC.addFile(path);
  };

  SparkContext.prototype.broadcast = function(o) {
    print("==============addJar ============");
    return this.jvmSC.broadcast(o);
  };
}
