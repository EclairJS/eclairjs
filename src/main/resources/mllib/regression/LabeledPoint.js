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
	this.logger = Logger.getLogger("mllib.regression.LabeledPoint_js");
	var jvmObj;
	if ( y == null) {
  	 	this.logger.debug("Java object ");
  	 	jvmObj = x;
	} else {
		var features = org.apache.spark.mllib.linalg.Vectors.dense(y)
		jvmObj = new org.apache.spark.mllib.regression.LabeledPoint(x, features);

	}
	JavaWrapper.call(this, jvmObj);
};

LabeledPoint.prototype = Object.create(JavaWrapper.prototype); 

LabeledPoint.prototype.constructor = LabeledPoint;

LabeledPoint.prototype.getLabel = function() {
	return this.getJavaObject().label();
}

LabeledPoint.prototype.getFeatures = function() {
	// FIXME: need to convert Vector to array before returning
	return this.getJavaObject().features();
}

LabeledPoint.prototype.toString = function() {
	return "{label: " + this.getLabel() + ", features: " + this.getFeatures() + " }";
}

LabeledPoint.prototype.toJSON = function() {
	return this.toString();
}

LabeledPoint.prototype.parse = function(string) {
	var lp = org.apache.spark.mllib.regression.LabeledPoint.parse(s);
	var l = new LabeledPoint(lp);
}


var labeledPointFromJavaObject = function(javaObject) {
	var l = Logger.getLogger("LabeledPoint_js");
	l.debug("labeledPointFromJavaObject");
	return new LabeledPoint(javaObject);
}



