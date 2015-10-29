var file = "src/test/resources/dream.txt"; // Should be some file on your system
var conf = new SparkConf().setAppName("JavaScript word count").setMaster("local[*]"); 
var sparkContext = new SparkContext(conf);
var rdd = sparkContext.textFile(file).cache();


var rdd2 = rdd.flatMap(function(sentence) {
    return sentence.split(" ");
});

var rdd3 = rdd2.filter(function(word) {
    return word.trim().length > 0;
});

var rdd4 = rdd3.mapToPair(function(word) {
    return [word, 1];
});

var rdd5 = rdd4.reduceByKey(function(a, b) {
    return a + b;
});

var rdd6 = rdd5.mapToPair(function(tuple) {
    return [tuple[1]+0.0, tuple[0]];
})

var rdd7 = rdd6.sortByKey(false);
print("top 10 words = " + JSON.stringify(rdd7.take(10)));


