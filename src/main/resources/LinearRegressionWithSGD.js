

      var LinearRegressionWithSGD = {}
      
      LinearRegressionWithSGD.DEFAULT_NUM_ITERATIONS = 100;
      
     
      LinearRegressionWithSGD.train = function(rdd, numIterations) {
    	  print("JavaRDD " + rdd);
    	 var jo = rdd.getJavaObject();
    	 print("jo = " + jo);
	  	var lrdd = org.apache.spark.api.java.JavaRDD.toRDD(jo);
	  	print("calling train");
		var model = org.apache.spark.mllib.regression.LinearRegressionWithSGD.train(lrdd, numIterations);
		print("return model");
		return model;
		
	  }





