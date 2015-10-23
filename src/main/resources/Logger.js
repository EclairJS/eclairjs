/**
 * http://usejsdoc.org/
 */


var Logger = {};

Logger.getLogger = function(str) {
	var logger = org.apache.log4j.Logger.getLogger("com.ibm.eclair.resource."+str);
	return logger;
}
