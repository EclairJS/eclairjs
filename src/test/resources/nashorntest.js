
//load("src/main/resources/SparkContext.js");
//load("src/main/resources/SparkConf.js");

var logFile = "/Users/billreed/cfa_dev/fallside/srv/tmp/dream.txt"; // Should be some file on your system
//var master = "spark://MacBook-Pro.local:7077";
var master = "local[*]";
var conf = new SparkConf().setAppName("Simple Application").setMaster(master); 
//var sc = new JavaSparkContext(conf);
var sc = new SparkContext(conf);
var logData = sc.textFile(logFile).cache();
//var x = 2;
var numAs = logData.filter(function (s) {
    //print("filter x = " + x);
    var ret = (s.indexOf("a") > -1);
    print(ret);
    return ret;
}).count();
var numBs = logData.filter(function (s) {
    print("filter 2 " + s);
    var ret = (s.indexOf("b") > -1);
    print(ret);
    return ret;
}).count();
//var y = x.count();
print(" numAs = " + numAs + " numBs = " + numBs);
print(" count = " + logData.count());
