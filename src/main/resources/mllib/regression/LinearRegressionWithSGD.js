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





