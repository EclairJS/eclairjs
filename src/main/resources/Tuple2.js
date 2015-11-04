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

var Tuple2 = function(x, y) { 
	if ( y == null) {
		print("Java object");
		this._jvmTuple2 = x;
	} else {
		var features = org.apache.spark.mllib.linalg.Vectors.dense(y)
		this._jvmLabeledPoint = new org.apache.spark.mllib.regression.LabeledPoint(x, features);

	}
	
}

Tuple2.prototype.getLabel = function() {
	return this._jvmLabeledPoint.label();
}

Tuple2.prototype.getFeatures = function() {
	// FIXME: need to convert Vector to array before returning
	return this._jvmLabeledPoint.features();
}

/*LabeledPoint.prototype.toString() = function() {
	return this._jvmLabeledPoint.toString();
}*/

LabeledPoint.prototype.parse = function(string) {
	var lp = org.apache.spark.mllib.regression.LabeledPoint.parse(s);
	var l = new LabeledPoint(lp);
}

Tuple2.prototype.getJavaObject = function(string) {
	return this._jvmLabeledPoint;
}

var labeledPointFromJavaObject = function(javaObject) {
	return new LabeledPoint(javaObject);
}



