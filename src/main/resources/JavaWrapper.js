
var JavaWrapper = function(jvmObj) {
	this._jvmObj = jvmObj;
	this.javaWrapperLogger = Logger.getLogger("JavaWrapper_js");
	this.javaWrapperLogger.debug("JavaWrapper constructor");
};

JavaWrapper.prototype.getJavaObject = function() {
	this.javaWrapperLogger.debug("getJavaObject");
	return this._jvmObj;
};

JavaWrapper.prototype.toString = function() {
	return this._jvmObj.toString();
}

JavaWrapper.prototype.toJSON = function() {
	return this.toString();
}