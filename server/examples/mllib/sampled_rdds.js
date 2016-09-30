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
/*
Usage:
 "bin/eclairjs examples/mllib/sampled_rdds.js"
 */

var datapath = "examples/data/mllib/sample_binary_classification_data.txt";
var fraction = 0.1  // fraction of data to sample

function run(sc) {

    var MLUtils = require("eclairjs/mllib/MLUtils");

    var examples = MLUtils.loadLibSVMFile(sc, datapath);
    var result = {};
    result.numExamples = examples.count();
    if (result.numExamples == 0) {
        print("Error: Data file had no samples to load. ");
        exit(1);
    }
    result.expectedSampleSize = parseInt(result.numExamples * fraction);
    var sampledRDD = examples.sample(true, fraction);
    result.sampledRDD_count = sampledRDD.count();
    result.sampledArray_length = examples.takeSample(true, result.expectedSampleSize).length;
    return result;
}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("SampledRDDs");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print("Loaded data with " + result.numExamples + " examples from file: "  +  datapath );

// Example: RDD.sample() and RDD.takeSample()

    print('Sampling RDD using fraction ' + fraction + ' Expected sample size = ' + result.expectedSampleSize);
    print('  RDD.sample(): sample has '+  result.sampledRDD_count + ' examples');
    print('  RDD.takeSample(): sample has ' + result.sampledArray_length + ' examples');

    print()

    sc.stop();
}