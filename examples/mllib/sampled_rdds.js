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

var USAGE = "bin/eclairjs examples/mllib/sampled_rdds.js examples/data/mllib/sample_binary_classification_data.txt";

if (args.length < 2) {
    print(USAGE);
    exit(1);
}

var datapath = args[1];
var conf = new SparkConf().setAppName("PythonSampledRDDs").setMaster("local[*]");
var sc = new SparkContext(conf);

var fraction = 0.1  // fraction of data to sample

var examples = MLUtils.loadLibSVMFile(sc, datapath);
var numExamples = examples.count();
if (numExamples == 0) {
    print("Error: Data file had no samples to load. ");
    exit(1) ;
}

print("Loaded data with " + numExamples + " examples from file: "  +  datapath );

// Example: RDD.sample() and RDD.takeSample()
var expectedSampleSize = parseInt(numExamples * fraction);
print('Sampling RDD using fraction ' + fraction + ' Expected sample size = ' + expectedSampleSize);

var sampledRDD = examples.sample(true, fraction);
print('  RDD.sample(): sample has '+  sampledRDD.count() + ' examples');
var sampledArray = examples.takeSample(true, expectedSampleSize);
print('  RDD.takeSample(): sample has ' + sampledArray.length + ' examples');

print()


sc.stop()

