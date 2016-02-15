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

var conf = new SparkConf().setAppName("JavaScriptWord2VecExample").setMaster("local[*]");
var sc = new SparkContext(conf);
var sqlContext = new SQLContext(sc);

// Input data: Each row is a bag of words from a sentence or document.
var rdd = sc.parallelize([
    RowFactory.create(["Hi I heard about Spark".split(" ")]),
    RowFactory.create(["I wish Java could use case classes".split(" ")]),
    RowFactory.create(["Logistic regression models are neat".split(" ")])
]);
var sf = new StructField("text", new ArrayType(DataTypes.StringType, true), false, Metadata.empty());
var sfa = [sf];
var schema = new StructType(sfa);
var documentDF = sqlContext.createDataFrame(rdd, schema);

// Learn a mapping from words to Vectors.
var word2Vec = new MLWord2Vec()
    .setInputCol("text")
    .setOutputCol("result")
    .setVectorSize(3)
    .setMinCount(0);
var model = word2Vec.fit(documentDF);
var result = model.transform(documentDF);
var rows = result.select("result").take(3);
rows.forEach(function (r) {
    print(r);
})

