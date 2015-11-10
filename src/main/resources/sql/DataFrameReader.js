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

var DataFrameReader = function(javaDataFrameReader) {
	var jvmObj;
	this.logger = Logger.getLogger("SQLContext_js");
	jvmObj = javaDataFrameReader;
    JavaWrapper.call(this, jvmObj);
}

DataFrameReader.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to DataFrameReader
DataFrameReader.prototype.constructor = DataFrameReader;

DataFrameReader.prototype.jsonFromPath = function(path) {
    return new DataFrame(this.getJavaObject().json(path));
}

DataFrameReader.prototype.jsonFromRDD = function(rdd) {
    return new DataFrame(this.getJavaObject().json(rdd.getJavaObject()));
}

DataFrameReader.prototype.json = function() {
    if(typeof arguments[0] === 'object')
        return this.jsonFromRDD(arguments[0]);

    return this.jsonFromPath(arguments[0]);
}

DataFrameReader.prototype.parquet = function(path) {
    return new DataFrame(this.getJavaObject().parquet(path));
}