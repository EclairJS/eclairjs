var eclairjs = require('eclairjs')
var spark = new eclairjs();

var Swift = require('../client/lib/index.js')
spark.addModule(new Swift({
  jar: 'file:'+__dirname + '/../server/target/eclairjs-swift-0.9-jar-with-dependencies.jar',
  eclairjs: spark,
  service: 'salesdemodata'
}));


var sparkContext = new spark.SparkContext('local[*]', 'foo');

var ds = sparkContext.textFile('swift2d://sales.salesdemodata/part-00000.dat');

ds.collect(10).then(function(res) {
  res.forEach(function(r) { console.log(r); });
}).catch(function(err) {
  console.log("error = " + err);
});
