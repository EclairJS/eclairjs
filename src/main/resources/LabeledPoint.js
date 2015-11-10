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

/**
 * New LabeledPoint node file
 */

var LabeledPoint = function(x, y) { 
	this.logger = Logger.getLogger("LabeledPoint_js");
	if ( y == null) {
  	 	this.logger.debug("Java object ");
		this._jvmLabeledPoint = x;
	} else {
		var features = org.apache.spark.mllib.linalg.Vectors.dense(y)
		this._jvmLabeledPoint = new org.apache.spark.mllib.regression.LabeledPoint(x, features);

	}
	
}

LabeledPoint.prototype.getLabel = function() {
	return this._jvmLabeledPoint.label();
}

LabeledPoint.prototype.getFeatures = function() {
	// FIXME: need to convert Vector to array before returning
	return this._jvmLabeledPoint.features();
}

LabeledPoint.prototype.toString = function() {
	//return this._jvmLabeledPoint.toString();
	return "{label: " + this.getLabel() + ", features: " + this.getFeatures() + " }";
}

LabeledPoint.prototype.toJSON = function() {
	return this.toString();
}

LabeledPoint.prototype.parse = function(string) {
	var lp = org.apache.spark.mllib.regression.LabeledPoint.parse(s);
	var l = new LabeledPoint(lp);
}

LabeledPoint.prototype.getJavaObject = function() {
	this.logger.debug("getJavaObject");
	return this._jvmLabeledPoint;
}

var labeledPointFromJavaObject = function(javaObject) {
	var l = Logger.getLogger("LabeledPoint_js");
	l.debug("labeledPointFromJavaObject");
	return new LabeledPoint(javaObject);
}



