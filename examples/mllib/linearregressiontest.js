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
 * We need to load SparkContext.js and SparkConf.js in order to create SparkContext
 * The SparkContext will load the rest of sparkJS files. So these are the oly two 
 * the user has to explicitly load. 
 */

var sparkConf = new SparkConf()
  .setAppName("Linear Regression Test")
  .setMaster("local[*]");
  //.setMaster("spark://MacBook-Pro.local:7077");

var sc = new SparkContext(sparkConf);

var data = sc.textFile("examples/data/lpsa.data").cache();
var scopeVars = {};
var parsedData = data.map( function(s) { 
	var parts = s.split(",");
	var features = parts[1].split(" "); 
	return new LabeledPoint(parts[0], new DenseVector(features));
 });
var t = parsedData.take(5);
print("take 5 = " + JSON.stringify(parsedData.take(5)));
var numIterations = 3;
var linearRegressionModel = LinearRegressionWithSGD.train(parsedData, numIterations);

var delta = 17;
var valuesAndPreds = parsedData.mapToPair(function(lp, linearRegressionModel, delta) { // FIXME
					var label = lp.getLabel();
					var f = lp.getFeatures();
		    	    var prediction = linearRegressionModel.predict(f) + delta;
		    	    return [prediction, label];

		        }); // end MapToPair

print("valuesAndPreds: " + valuesAndPreds.take(10).toString());




