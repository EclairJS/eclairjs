
/**
 * @constructor
 * @classdesc Class that represents the features and labels of a data point.
 * @param {double} label
 * @param {Vector} features
 */

var LabeledPoint = function(label, features) { 
	this.logger = Logger.getLogger("mllib.regression.LabeledPoint_js");
	var jvmObj;
	if ( features == null) {
  	 	this.logger.debug("Java object ");
  	 	jvmObj = label;
	} else {
		jvmObj = new org.apache.spark.mllib.regression.LabeledPoint(label, Utils.unwrapObject(features));

	}
	JavaWrapper.call(this, jvmObj);
};

LabeledPoint.prototype = Object.create(JavaWrapper.prototype); 

LabeledPoint.prototype.constructor = LabeledPoint;
/**
 * Returns features
 * @returns {Vector} 
 */
LabeledPoint.prototype.getFeatures = function() {
	return this.getJavaObject().features();
};
/**
 * Returns label
 * @returns {double}
 */
LabeledPoint.prototype.getLabel = function() {
	return this.getJavaObject().label();
};
/**
 * Parses a string resulted from LabeledPoint#toString into an LabeledPoint.
 * @param string
 * @returns {LabeledPoint}
 */
LabeledPoint.prototype.parse = function(string) {
	var lp = org.apache.spark.mllib.regression.LabeledPoint.parse(s);
	var l = new LabeledPoint(lp);
	return l;
};
/**
 * Returns string representation of object
 * @returns {string}
 */
LabeledPoint.prototype.toString = function() {
	return "[" + this.getLabel() + ", [" + this.getFeatures() + "]]";
};
/**
 * Returns string representation of JSON object
 * @returns {string}
 */
LabeledPoint.prototype.toJSON = function() {
	return "{label: " + this.getLabel() + ", features: " + this.getFeatures() + " }";
};

/** 
 * @constructor
 * @classdesc Model produced by LinearRegression.
 */
var LinearRegressionModel = function(jvmObj) { 
	this.logger = Logger.getLogger("mllib.regression.LinearRegressionModel_js");

	JavaWrapper.call(this, jvmObj);
};

LinearRegressionModel.prototype = Object.create(JavaWrapper.prototype); 

LinearRegressionModel.prototype.constructor = LinearRegressionModel;
/**
 * Predict label for the given features.
 * @param {Vector} features
 * @returns {float}
 */
LinearRegressionModel.prototype.predict = function(features) {

	var p = this.getJavaObject().predict(Utils.unwrapObject(features));
	this.logger.debug("p " + p);
	return p;
};

/** 
 * Construct a LinearRegression object with default parameters: {stepSize: 1.0, numIterations: 100, miniBatchFraction: 1.0}.
 * @constructor
 * @classdesc Train a linear regression model with no regularization using Stochastic Gradient Descent. 
 * This solves the least squares regression formulation f(weights) = 1/n ||A weights-y||^2^ (which is the mean squared error). 
 * Here the data matrix has n rows, and the input RDD holds the set of rows of A, each with its corresponding right hand side label y. 
 * See also the documentation for the precise formulation.
 */
var LinearRegressionWithSGD = {}

LinearRegressionWithSGD.DEFAULT_NUM_ITERATIONS = 100;

/**
 * Train a LinearRegression model given an RDD of (label, features) pairs.
 * @param {RDD} rdd of LabeledPoints
 * @param {integer} numIterations
 * @returns {LinearRegressionModel}
 */
LinearRegressionWithSGD.train = function(rdd, numIterations) {
	var logger = Logger.getLogger("LinearRegressionWithSGD_js");
	logger.debug("JavaRDD " + rdd);
	var jo = rdd.getJavaObject();
	logger.debug("jo = " + jo);
	var lrdd = org.apache.spark.api.java.JavaRDD.toRDD(jo);
	logger.debug("calling train");
	var model = org.apache.spark.mllib.regression.LinearRegressionWithSGD.train(lrdd, numIterations);
	logger.debug("return model");
	return new LinearRegressionModel(model);

};
