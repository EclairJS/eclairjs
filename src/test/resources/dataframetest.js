var sparkContext = new SparkContext();
var sqlContext = new SQLContext(sparkContext);

var test = function(file) {
    var dataFrame = sqlContext.read.json(file);
    var gd = dataFrame.groupBy(dataFrame.col("first"));
    var df2 = gd.count();

    df2.show();
    return df2.count();
}