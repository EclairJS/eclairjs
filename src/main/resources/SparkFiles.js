 var SparkFiles = {};
  
  
  /**
   * Public Static methods 
   */
  SparkFiles.get = function(fileName) {

		  print("SparkFiles.get nash");
		  return org.apache.spark.SparkFiles.get(fileName);  

	  
  };

