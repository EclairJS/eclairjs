var Duration = require('eclairjs/streaming/Duration');
var StreamingContext = require('eclairjs/streaming/StreamingContext');
var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
var sparkSession = SparkSession
    .builder()
    .appName("dstream")
    .master("local[*]")
    .getOrCreate();
var sparkContext = sparkSession.sparkContext();
var streamingContext = null;
var duration = new Duration(500);
var data = [];

var foreachRDDTest = function() {
    streamingContext = new StreamingContext(sparkContext, duration);
    var dstream = streamingContext.socketTextStream("localhost", 9999);
    dstream.foreachRDD(function(rdd) {
        var d = rdd.collect(); // returns JavaScript Array
        if(d && d.length > 0) {
            var letters = d.get(0).split(",");
            letters.forEach(function(l) {
                data.push(l);
            });
        }
    })

    streamingContext.start();
}

var flatMapTest = function() {
    streamingContext = new StreamingContext(sparkContext, duration);
    var dstream = streamingContext.socketTextStream("localhost", 9999);
    var ds1 = dstream.flatMap(function(line) {
        return line.split(",");
    })

    ds1.foreachRDD(function(rdd) {
        var d = rdd.collect();
        if(d && d.length > 0) {
            d.forEach(function(letter) {
                data.push(letter)
            })
        }
    })

    streamingContext.start();
}

var flatMapToPairTest = function() {
    streamingContext = new StreamingContext(sparkContext, duration);
    var List = require('eclairjs/List');
    var Tuple2 = require('eclairjs/Tuple2');
    var dstream = streamingContext.socketTextStream("localhost", 9999);
    var ds1 = dstream.flatMapToPair(function(line, List, Tuple2) {
        var ret = new List();
        var arr = line.split(",");
        arr.forEach(function(letter) {
            ret.add(new Tuple2(letter,1));
        })
        return ret;
    }, [List, Tuple2])

    ds1.foreachRDD(function(rdd) {
        var d = rdd.collect();
        if(d && d.length > 0) {
            d.forEach(function(letter) {
                data.push(letter)
            })
        }
    })

    streamingContext.start();
}

var mapTest = function() {
    streamingContext = new StreamingContext(sparkContext, duration);
    var dstream = streamingContext.socketTextStream("localhost", 9999);
    var ds1 = dstream.flatMap(function(line) {
        return line.split(",");
    });
    var ds2 = ds1.map(function(letter){
        return letter.toUpperCase();
    });
    ds2.foreachRDD(function(rdd) {
        var d = rdd.collect();
        if(d && d.length > 0) {
            d.forEach(function(letter) {
                data.push(letter)
            })
        }
    })

    streamingContext.start();
}

var stop = function() {
    streamingContext.stop(false);
    streamingContext.awaitTermination();
};

var getData = function() {
    return data.join(",");
};

