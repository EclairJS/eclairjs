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
 bin/eclairjs.sh examples/mllib/rdd_generation_example.js"
 */

function run(sc) {
  var result = {};

  var numExamples = 10000; // # number of examples to generate
  var fraction = 0.1;     // fraction of data to sample

  // Example: RandomRDDs.normalRDD
  var normalRDD = RandomRDDs.normalRDD(sc, numExamples);

  result.count = normalRDD.count();
  result.samples = normalRDD.take(5);


  // Example: RandomRDDs.normalVectorRDD
  var normalVectorRDD = RandomRDDs.normalVectorRDD(sc, numExamples, 2);

  result.normalVectorCount = normalVectorRDD.count();
  result.normalVectorSamples = normalVectorRDD.take(5);

  return result;
}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
  var sparkConf = new SparkConf().setAppName("Random RDD Generation Example");
  var sc = new SparkContext(sparkConf);
  var result = run(sc);

  print("Generated RDD examples sampled from the standard normal distribution = " + result.count);

  print("First 5 samples:");
  result.samples.forEach(print);

  print("Generated RDD examples of length-2 vectors: " + result.normalVectorCount);

  print("First 5 samples:");
  result.normalVectorSamples.forEach(print);

  sc.stop();
}

