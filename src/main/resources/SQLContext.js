/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
