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
 bin/eclairjs.sh examples/mllib/svd_example.js"
 */

var Vectors = require("eclairjs/mllib/linalg/Vectors").Vectors;
var RowMatrix = require("eclairjs/mllib/linalg/distributed/RowMatrix");

function run(sc) {

    var rows = sc.parallelize([
        Vectors.dense([1.12, 2.05, 3.12]),
        Vectors.dense([5.56, 6.28, 8.94]),
        Vectors.dense([10.2, 8.0, 20.5])
    ]);

// Create a RowMatrix from JavaRDD<Vector>.
    var mat = new RowMatrix(rows);

// Compute the top 3 singular values and corresponding singular vectors.
    var svd = mat.computeSVD(3, true, 0.000000001);

    var ret = {};
    ret.collectPartitions = svd.U().rows().collect();
    ret.s = svd.s();
    ret.V = svd.V();

    return ret;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {

    var sparkConf = new SparkConf().setAppName("SVD Example");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    print("U factor is:");
    results.collectPartitions.forEach(function (vector) {
        print("\t" + vector);
    });
    print("Singular values are: " + results.s);
    print("V factor is:\n" + results.V);

    sc.stop();
}

