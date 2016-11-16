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

  var ds = sparkSession.sparkContext().textFile('swift://sales.salesdemodata/part-00000.dat');

  ds.collect(10).then(function(res) {
    res.forEach(function(r) { console.log(r); });
  }).catch(function(err) {
    console.log(err);
  });
}).catch(function(err) {
  console.log(err);
});
