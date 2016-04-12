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
 bin/eclairjs.sh examples/mllib/power_iteration_clustering_example.js"
 */

var PowerIterationClustering = require('eclairjs/mllib/clustering/PowerIterationClustering');

function run(sc) {

    var similarities = sc.parallelize([
        new Tuple(0, 1, 0.9),
        new Tuple(1, 2, 0.9),
        new Tuple(2, 3, 0.9),
        new Tuple(3, 4, 0.1),
        new Tuple(4, 5, 0.9)
    ]);

    var pic = new PowerIterationClustering()
        .setK(2)
        .setMaxIterations(10);
    var model = pic.run(similarities);

    return model.assignments().collect();

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {

    var sparkConf = new SparkConf().setAppName("PowerIterationClusteringExample");
    var sc = new SparkContext(sparkConf);
    var results = run(sc);
    results.forEach(function(a){
        print(a.id() + " -> " + a.cluster());
    });

    sc.stop();
}
