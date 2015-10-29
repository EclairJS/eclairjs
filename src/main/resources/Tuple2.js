

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



