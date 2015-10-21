load(
"nashorn:mozilla_compat.js");

var imported = new JavaImporter(
    org.apache.spark.SparkConf
);
//java.lang.Class.forName('org.apache.spark.SparkConf');
with (imported) {

    var jsSparkConf = function(conf) {
        print("==========SparkConf=================");
         this.jvmConf = new SparkConf();
    };

    jsSparkConf.prototype.setAppName = function(appName) {
        print("==========appName=================");
        this.jvmConf.setAppName(appName);
        return this;
    }

    jsSparkConf.prototype.setMaster = function(master) {
        print("==========master=================");
        this.jvmConf.setMaster(master);
        return this;
    }


}
