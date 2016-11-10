//include the eclairjs module.
var eclairjs = require('eclairjs')

//create an eclairjs client instance.
var spark = new eclairjs();

//Build a spark session.  Will default to local[*] for spark master.
var session = spark.sql.SparkSession.builder()
  .appName("Hello World")
  .getOrCreate()

//Create a simple array dataset.
var ds = session.sparkContext().parallelize([1,2,3,4,5])

//Map over the dataset and add 1 to each element.  collect() returns a 
//a promise that resolves to the results.
ds.map(function(i) {
  return i+1
}).collect().then(function(r) {
  console.log(r)
})

