var Row = function(jvmRow) {
    this.jvmRow = jvmRow;
}

Row.prototype.get = function(i) {
    return jvmRow.get(i);
};

Row.prototype.mkString = function(sep) {
    return jvmRow.mkString(sep);
};

Row.prototype.length = function() {
    return jvmRow.length();
};

Row.prototype.size = function() {
    return jvmRow.size();
};

Row.prototype.getValuesMap = function(fields) {
    return jvmRow.getValuesMap(fields);
};

var Column = function(jvmColumn) {
    this.jvmColumn = jvmColumn;
};

Column.prototype.equalTo = function(obj) {
    return new Column(jvmColumn.equalTo(obj));
};

Column.prototype.getJavaObject = function() {
    return this.jvmColumn;
}

var GroupedData = function(jvmGroupedData) {
    this.jvmGroupedData = jvmGroupedData;
}

GroupedData.prototype.count = function() {
    var jdf = this.jvmGroupedData.count();
    var df = new DataFrame(jdf);

    return df;
};

GroupedData.prototype.avg = function(cols) {
    return new DataFrame(this.jvmGroupedData.avg(cols));
};

GroupedData.prototype.mean = function(cols) {
    return new DataFrame(this.jvmGroupedData.mean(cols));
};

GroupedData.prototype.sum = function(cols) {
    return new DataFrame(this.jvmGroupedData.sum(cols));
};

GroupedData.prototype.min = function(cols) {
    return new DataFrame(this.jvmGroupedData.min(cols));
};

GroupedData.prototype.max = function(cols) {
    return new DataFrame(this.jvmGroupedData.max(cols));
};

var DataFrameWriter = function(javaDataFrameWriter) {
    this.javaDataFrameWriter = javaDataFrameWriter;
}


DataFrameWriter.prototype.mode = function(mode) {
    return new DataFrameWriter(this.javaDataFrameWriter.mode(mode));
};

DataFrameWriter.prototype.saveAsTable = function(tableName) {
    this.javaDataFrameWriter.saveAsTable(tableName);
};


var DataFrame = function(jvmDataFrame) { 
    this.jvmDataFrame = jvmDataFrame;
}

DataFrame.prototype.groupByWithColumns = function(args) {
    var jCols = args.map(function(v) {
        return v.getJavaObject();
    });

    var jGroupedData = this.jvmDataFrame.groupBy(jCols);
    var gd = new GroupedData(jGroupedData);

    return gd;
};

DataFrame.prototype.groupByWithStrings = function(args) {
    var jGroupedData = this.jvmDataFrame.groupBy(args);
    var gd = new GroupedData(jGroupedData);

    return gd;
};

DataFrame.prototype.selectWithStrings = function(args) {
    var jdf = this.jvmDataFrame.select(args);
    var df = new DataFrame(jdf);

    return df;
};

DataFrame.prototype.filterWithString = function(columnExpr) {
    return new DataFrame(this.jvmDataFrame.filter(columnExpr));
};

DataFrame.prototype.filterWithColumn = function(col) {
    return new DataFrame(this.jvmDataFrame.filter(col.getJavaObject()));
};

DataFrame.prototype.as = function(alias) {
    return new DataFrame(this.jvmDataFrame.as(alias));
};

DataFrame.prototype.cache = function() {
    return new DataFrame(this.jvmDataFrame.cache());
};

DataFrame.prototype.col = function(name) {
    return new Column(this.jvmDataFrame.col(name));
};

DataFrame.prototype.select = function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;

    if(args.length == 0)
        return self;

    if(typeof args[0] === 'object') 
        return this.selectWithColumns(args);
    else 
        return this.selectWithStrings(args);
};

DataFrame.prototype.filter = function(arg) {
    if(typeof arg === 'object') 
        return this.filterWithColumn(arguments[0]);
    else 
        return this.filterWithString(arguments[0]);
};

DataFrame.prototype.show = function() {
    this.jvmDataFrame.show();
};

DataFrame.prototype.count = function() {
    return this.jvmDataFrame.count();
};

DataFrame.prototype.columns = function() {
    return this.jvmDataFrame.columns();
};

DataFrame.prototype.groupBy = function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;

    if(args.length == 0)
        return self;

    if(typeof args[0] === 'object') 
        return this.groupByWithColumns(args);
    else 
        return this.groupByWithStrings(args);
};

DataFrame.prototype.flatMap = function(func) {
    var sv = Utils.createJavaParams(arguments);
    var fn = new com.ibm.eclair.JSFlatMapFunction(sv.funcStr, sv.scopeVars);
    return new RDD(this.jvmDataFrame.flatMap(fn));
};

DataFrame.prototype.where = function(condition) {
    return new DataFrame(this.jvmDataFrame.where(condition));
};

DataFrame.prototype.withColumn = function(name, col) {
    return new DataFrame(this.jvmDataFrame.withColumn(name, col));
};

DataFrame.prototype.head = function() {
    return new Row(this.jvmDataFrame.head());
};

DataFrame.prototype.registerTempTable = function(name) {
    this.jvmDataFrame.registerTempTable(name);
};

DataFrame.prototype.take = function(num) {
    var rows = this.jvmDataFrame.take(num);
    return rows.map(function(row) {
        return new Row(row);
    })
};

DataFrame.prototype.toJSON = function() {
    return new RDD(this.jvmDataFrame.toJSON());
};

DataFrame.prototype.write = function() {
    return new DataFrameWriter(this.jvmDataFrame.write());
};
