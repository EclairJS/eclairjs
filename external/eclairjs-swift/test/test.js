var eclairjs = require('eclairjs')
var spark = new eclairjs();

var SparkSession = spark.sql.SparkSession;
var sparkSession = SparkSession
  .builder()
  .appName("Test Swift Module")
  .getOrCreate();

var swift = require('../client/lib/index.js')({
  sparkSession: sparkSession,
  jarUrl: 'file:'+__dirname + '/../server/target/eclairjs-swift-0.9-jar-with-dependencies.jar',
  eclairjs: spark,
  service: 'salesdemodata'
}).then(function() {

  var ds = sparkSession.sparkContext().textFile('swift2d://sales.salesdemodata/part-00000.dat');
  //var ds = sparkSession.sparkContext().textFile('swift://wordcount.softlayer/dream.txt');

  ds.collect(10).then(function(res) {
    res.forEach(function(r) { console.log(r); });
  }).catch(function(err) {
    console.log("error = " + err);
  });
}).catch(function(err) {
  console.log(err);
});
