var sparkContext = new SparkContext();

var wordCount = function(file) {
    var rdd = sparkContext.textFile(file);


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

    return rdd7.take(10);
}
