load(
  "nashorn:mozilla_compat.js"
);


var DataFrameReader = function(javaDataFrameReader) {
    this.javaDataFrameReader = javaDataFrameReader;
}

DataFrameReader.prototype.jsonFromPath = function(path) {
    return new DataFrame(this.javaDataFrameReader.json(path));
}

DataFrameReader.prototype.jsonFromRDD = function(rdd) {
    return new DataFrame(this.javaDataFrameReader.json(rdd.getJavaObject()));
}

DataFrameReader.prototype.json = function() {
    if(typeof arguments[0] === 'object')
        return this.jsonFromRDD(arguments[0]);

    return this.jsonFromPath(arguments[0]);
}

DataFrameReader.prototype.parquet = function(path) {
    return new DataFrame(this.javaDataFrameReader.parquet(path));
}

var SQLContext = function(jsc) {
    print("==========SQLContext=================");
    var JavaSQLContext = Java.type("org.apache.spark.sql.SQLContext");
    print(jsc);
    this.javaSQLContext = new JavaSQLContext(jsc.getJavaObject());
    this.read = new DataFrameReader(this.javaSQLContext.read());
}

SQLContext.prototype.table = function(name) {
    return new DataFrame(this.javaSQLContext.table(name));
};

SQLContext.prototype.sql = function(sqlString) {
    return new DataFrame(this.javaSQLContext.sql(sqlString));
};
