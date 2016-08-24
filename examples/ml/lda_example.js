/*
 * Copyright 2016 IBM Corp.
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
/*
 Usage:
 bin/eclairjs.sh examples/ml/lda_example.js"
 */


function run(spark) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var StructField = require("eclairjs/sql/types/StructField");
    var StructType = require("eclairjs/sql/types/StructType");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var RowFactory = require("eclairjs/sql/RowFactory");
    var Vectors = require("eclairjs/ml/linalg/Vectors");
    var LDA = require("eclairjs/ml/clustering/LDA");
    var Vector = require("eclairjs/ml/linalg/Vector");
    var VectorUDT = require("eclairjs/ml/linalg/VectorUDT");

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

    var inputFile = "examples/data/mllib/sample_lda_data.txt";

    // Loads data
    var points = sc.textFile(inputFile).map(function(line, RowFactory, Vectors){
        var tok = line.split(" ");
        var point = [];
        for (var i = 0; i < tok.length; ++i) {
            point[i] = parseFloat(tok[i]);
        }
        var points = Vectors.dense(point);
        return RowFactory.create(points);
    }, [RowFactory, Vectors]);
    var fields = [new StructField("features", new VectorUDT(), false, Metadata.empty())];
    var schema = new StructType(fields);
    var dataset = sqlContext.createDataFrame(points, schema);

    // Trains a LDA model
    var lda = new LDA()
        .setK(10)
        .setMaxIter(10);
    var model = lda.fit(dataset);
    var ret = {};
    ret.logLikelihood = model.logLikelihood(dataset);
    ret.logPerplexity = model.logPerplexity(dataset);


    // Shows the result
    ret.topics = model.describeTopics(3);

    ret.transformed = model.transform(dataset);

    return ret;

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript IDA Example")
            .getOrCreate();
    var result = run(spark);
    print(result.logLikelihood);
    print(result.logPerplexity);
    result.topics.show(10);
    result.transformed.show(10);

    spark.stop();
}
