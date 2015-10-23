

      var LinearRegressionWithSGD = {}
      
      LinearRegressionWithSGD.DEFAULT_NUM_ITERATIONS = 100;
      
     
      LinearRegressionWithSGD.train = function(rdd, numIterations) {
    	 var logger = Logger.getLogger("LinearRegressionWithSGD_js");
    	 logger.debug("JavaRDD " + rdd);
    	 var jo = rdd.getJavaObject();
    	 logger.debug("jo = " + jo);
	  	var lrdd = org.apache.spark.api.java.JavaRDD.toRDD(jo);
	  	logger.debug("calling train");
		var model = org.apache.spark.mllib.regression.LinearRegressionWithSGD.train(lrdd, numIterations);
		logger.debug("return model");
		return model;
		
	  }





