var sparkContext = new SparkContext();

var rdd = sparkContext.parallelize([1, 2, 3])


var test = function() {
    return rdd.collect();
}
