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


function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var StructField = require("eclairjs/sql/types/StructField");
    var StructType = require("eclairjs/sql/types/StructType");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var RowFactory = require("eclairjs/sql/RowFactory");
    var Vectors = require("eclairjs/mllib/linalg/Vectors");
    var LDA = require("eclairjs/ml/clustering/LDA");
    var Vector = require("eclairjs/mllib/linalg/Vector");
    var VectorUDT = require("eclairjs/mllib/linalg/VectorUDT");


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
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print(result.logLikelihood);
    print(result.logPerplexity);
    result.topics.show(false);
    result.transformed.show(false);

    sc.stop();
}
