var sparkContext = new SparkContext("local[*]", "dstream");
var streamingContext = new StreamingContext(sparkContext, new Duration(1000));

var dstream = streamingContext.socketTextStream("localhost", 9999);
var data = [];

dstream.foreachRDD(function(rdd) {
    var d = rdd.collect();
    if(!d.isEmpty()) {
        var letters = d.get(0).split(",");
        letters.forEach(function(l) {
            data.push(l);
        });
    }
});


var start = function() {
    streamingContext.start();
};

var stop = function() {
    streamingContext.stop();
};

var getData = function() {
    return data.join(",");
};


