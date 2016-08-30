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
 bin/eclairjs.sh examples/ml/kmeans_example.js [<input_file>] [<k>]"
 */


var inputFile = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/sample_kmeans_data.txt";
var k = 2;

function run(spark) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var StructField = require("eclairjs/sql/types/StructField");
    var StructType = require("eclairjs/sql/types/StructType");
    var Metadata = require("eclairjs/sql/types/Metadata");
    var RowFactory = require("eclairjs/sql/RowFactory");
    var Vectors = require("eclairjs/ml/linalg/Vectors");
    var BisectingKMeans = require("eclairjs/ml/clustering/BisectingKMeans");
    var Vector = require("eclairjs/ml/linalg/Vector");
    var VectorUDT = require("eclairjs/ml/linalg/VectorUDT");

    var sc = spark.sparkContext();
    var sqlContext = new SQLContext(sc);

    var points = sc.textFile(inputFile).map(function (line, RowFactory, Vectors) {
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

    // Trains a k-means model
    var bkm = new BisectingKMeans()
        .setK(k)
        .setSeed(1);
    var model = bkm.fit(dataset);

    // Shows the result
    var centers = model.clusterCenters();

    return centers;
}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    if (args.length > 1) {
        inputFile = args[1];
    }
    if (args.length > 2) {
        k = parseInt(args[2]);
    }
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript BisectingKMeans Example")
            .getOrCreate();
    var result = run(spark);
    print("Cluster Centers: ");
    result.forEach(function (center) {
        print(center);
    });

    spark.stop();
}
