var sparkContext = new SparkContext();

var wordCount = function(file) {
    var rdd = sparkContext.textFile(file);

    var rdd2 = rdd.flatMap(function(sentence) {
        return sentence.split(" ");
    });


    var rdd3 = rdd2.filter(function(word) {
        return word.trim().length > 0;
    });

    return rdd3.count();
}
