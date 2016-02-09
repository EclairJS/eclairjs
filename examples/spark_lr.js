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


  function showWarning() {
    var warning = "WARN: This is a naive implementation of Logistic Regression " +
            "and is given as an example!\n" +
            "Please use either org.apache.spark.mllib.classification.LogisticRegressionWithSGD " +
            "or org.apache.spark.mllib.classification.LogisticRegressionWithLBFGS " +
            "for more conventional use.";
    print(warning);
  }

  function printWeights( a) {
    print(a);
  }



  function dot(  a,  b) {
    var x = 0;
    for (var i = 0; i < D; i++) {
      x += a[i] * b[i];
    }
    return x;
  }


showWarning();


var D = 10;   // Number of dimensions

var file=(arguments.length>0) ? arguments[0] : "./examples/data/lr_data.txt";
var ITERATIONS =  (arguments.length > 1) ? 0+arguments[1] : 10;

var conf = new SparkConf().setAppName("JavaScript Logistic Regression ").setMaster("local[*]");
var sc = new SparkContext(conf);

    var lines = sc.textFile(file);
    var points = lines.map(function(line){
        var tok = line.split(/\s+/);
        var y = tok[0];
        var x = [];
        for (var i = 0; i < D; i++) {
          x[i] = tok[i + 1];
        }
      return {x:x,y:y} ;

    }).cache();

    // Initialize w to a random value
    var weights= [];
    for (var i = 0; i < D; i++) {
      weights[i] = 2 * Math.random() - 1;
    }

    print("Initial w: ");
    printWeights(weights);

    for (var i = 1; i <= ITERATIONS; i++) {
      print("On iteration " + i);

      var gradient = points.map( function (datapoint){
        var gradient = [];
        for (var i = 0; i < D; i++) {
          var d  = dot(weights, datapoint.x);
          gradient[i] = (1 / (1 + Math.exp(-datapoint.y * d)) - 1) * datapoint.y * datapoint.x[i];
        }
        return gradient;
      }).reduce(function(a,b){
        var result = [];
        for (var j = 0; j < D; j++) {
          result[j] = a[j] + b[j];
        }
        return result;
      });

      for (var j = 0; j < D; j++) {
        weights[j] -= gradient[j];
      }

    }

    print("Final w: ");
    printWeights(weights);


sc.stop();


