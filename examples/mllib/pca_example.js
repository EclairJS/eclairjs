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
 bin/eclairjs.sh examples/mllib/pca_example.js"
 */

var Vector = require("mllib/linalg/Vectors").Vector;
var Vectors = require("mllib/linalg/Vectors").Vectors;
var RowMatrix = require("mllib/linalg/distributed/RowMatrix");

function run(sc) {

    var rowsList = [Vectors.dense([1.12, 2.05, 3.12]), Vectors.dense([5.56, 6.28, 8.94]), Vectors.dense([10.2, 8.0, 20.5])];

    var rows = sc.parallelize(rowsList);

// Create a RowMatrix from JavaRDD<Vector>.
    var mat = new RowMatrix(rows);

// Compute the top 3 principal components.
    var pc = mat.computePrincipalComponents(3);
    var projected = mat.multiply(pc);

//Vector[] collectPartitions = (Vector[])projected.rows().collect();
    var collectPartitions = projected.rows().collect();
    return collectPartitions;
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var sparkConf = new SparkConf().setAppName("PCA Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Projected vector of principal component:");
    result.forEach(function(vector){
        print("\t" + JSON.stringify(vector));
    });
}
