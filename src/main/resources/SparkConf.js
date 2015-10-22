

var SparkConf = function(conf) {
     this.jvmConf = new org.apache.spark.SparkConf();
};

SparkConf.prototype.setAppName = function(appName) {
    this.jvmConf.setAppName(appName);
    return this;
}

SparkConf.prototype.setMaster = function(master) {
    this.jvmConf.setMaster(master);
    return this;
}



