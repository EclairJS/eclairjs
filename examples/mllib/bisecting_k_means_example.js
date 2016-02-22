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
    bin/eclairjs.sh examples/mllib/bisecting_k_means_example.js
 */

function run(sc) {
    var result = {};
    var localData = [
        Vectors.dense(0.1, 0.1), Vectors.dense(0.3, 0.3),
        Vectors.dense(10.1, 10.1), Vectors.dense(10.3, 10.3),
        Vectors.dense(20.1, 20.1), Vectors.dense(20.3, 20.3),
        Vectors.dense(30.1, 30.1), Vectors.dense(30.3, 30.3)
    ];

    var data = sc.parallelize(localData, 2);

    var bkm = new BisectingKMeans()
        .setK(4);
    var model = bkm.run(data);

    result.Compute_Cost =  model.computeCost(data);


    var clusterCenters = model.clusterCenters();

    for (var i = 0; i < clusterCenters.length; i++) {
        var clusterCenter = clusterCenters[i];
        result["Cluster_Center_" + i] = clusterCenter.toString();
    }
    return result;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var sparkConf = new SparkConf().setAppName("BisectingKMeansExample").setMaster("local[*]");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    for (var name in result) {
        print(name + ": " + result[name]);
    }

    sc.stop();
}


