var eclairjs = require('eclairjs');
var spark = new eclairjs();

var Kafka = require('../client/lib/index.js')(
  spark,
  'file:/Users/bburns/dev/eclairjs/external/eclairjs-kafka/server/target/eclairjs-kafka-0.9-jar-with-dependencies.jar'
);

console.log(Kafka);

var SparkSession = spark.sql.SparkSession;
var Duration = spark.streaming.Duration;
var StreamingContext = spark.streaming.StreamingContext;

var sparkSession = SparkSession
  .builder()
  .appName("Test Stream Module")
  .getOrCreate();

var ssc = new StreamingContext(sparkSession.sparkContext(), new Duration(2000));

var dstream = Kafka.KafkaUtils.createStream(
  ssc,
  "foo",
  "localhost:9092",
  "tlog"
);

var vals = dstream.flatMap(function(record) {                                   
  return record._2().split('\n');                                               
}); 

vals.foreachRDD(
  function(rdd) {
    return rdd.collect();
  }, [],
  function(data) {
    console.log(data);
  }
).then(function() {
  ssc.start();
});


process.on('SIGTERM', function() {
  console.log("done");
});
