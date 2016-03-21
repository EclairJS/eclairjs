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
 bin/eclairjs.sh examples/mllib/kmeans_example.js [<input_file>] [<k>] [<max_iterations>] [<runs>]"
 */

var inputFile = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "examples/data/mllib/kmeans_data.txt";
var k = 3;
var iterations = 10;
var runs = 1;

function run(sc) {


    var lines = sc.textFile(inputFile);

    var points = lines.map(function (line) {
        var tok = line.split(" ");
        var point = [];
        tok.forEach(function (t) {
            point.push(parseFloat(t));
        });
        return Vectors.dense(point);
    });

    var model = KMeans.train(points, k, iterations, runs, KMeans.K_MEANS_PARALLEL);
    var center = model.clusterCenters();
    var cost = model.computeCost(points);

    return {"center": center, "cost": cost};

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    if (args.length > 1) {
        inputFile = args[1];
    }
    if (args.length > 2) {
        k = parseInt(args[2]);
    }
    if (args.length > 3) {
        iterations = parseInt(args[3]);
    }
    if (args.length > 4) {
        runs = parseInt(args[4]);
    }
    var sparkConf = new SparkConf().setAppName("KMeans Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Cluster centers:");
    print(JSON.stringify(result.center));
    print("Cost: " + result.cost);

    sc.stop();
}