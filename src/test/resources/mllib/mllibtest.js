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

var sparkContext = new SparkContext("local[*]", "mllib Unit test");

var LinearRegressionWithSGDTest = function(file) {
	
	var sc = sparkContext;
	
	var data = sc.textFile(file).cache();
	var scopeVars = {};
	var parsedData = data.map( function(s) { 
		var parts = s.split(",");
		var features = parts[1].split(" "); 
		return new LabeledPoint(parts[0], new DenseVector(features));
	 });
	//var t = parsedData.take(5);
	//print("take 5 = " + JSON.stringify(parsedData.take(5)));
	var numIterations = 3;
	/* var */ linearRegressionModel = LinearRegressionWithSGD.train(parsedData, numIterations); // Due to JUNIT scoping these need to be global
	/* var */ delta = 17; // Due to JUNIT scoping these need to be global
	var valuesAndPreds = parsedData.mapToPair(function(lp, linearRegressionModel, delta) {
		var label = lp.getLabel();
		var f = lp.getFeatures();
		var prediction = linearRegressionModel.predict(f) + delta;
		return [prediction, label];
	}, [linearRegressionModel, delta]); // end MapToPair
	
	//print("valuesAndPreds: " + valuesAndPreds.take(10).toString());
	return valuesAndPreds.take(10).toString();
}

var AssociationRulesTest = function() {
    load("examples/mllib/JavaScriptAssociationRulesExample.js");
    return run(sparkContext);
}



