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

load("nashorn:mozilla_compat.js");

var imported = new JavaImporter(
    org.apache.spark.api.java,
    org.apache.log4j.Level
);

with (imported) {

	org.apache.log4j.Logger.getLogger("org").setLevel(Level.WARN);
	org.apache.log4j.Logger.getLogger("akka").setLevel(Level.WARN);

    var initSparkContext = function(conf) {
    	var logger = Logger.getLogger("SparkContext_js");
        if(kernel) {
            if(kernel.javaSparkContext() != null) {
                return kernel.javaSparkContext();
            } else {
                kernel.createSparkContext(Utils.unwrapObject(conf));
                return kernel.javaSparkContext();
            }
        }

        /*
         * Create a new JavaSparkContext from a conf
         * 
         */
        var jvmSC = new JavaSparkContext( Utils.unwrapObject(conf));
        /*
         * add the jar for the cluster
         */
        var decodedPath = org.eclairjs.nashorn.Utils.jarLoc();
        var devEnvPath = "/target/classes/";
        var jarEnvPath = ".jar";
        logger.info("jar decodedPath = " + decodedPath);
        if (decodedPath.indexOf(devEnvPath, 
                                decodedPath.length - devEnvPath.length) !== -1) 
        {
            /*
             * we are in the dev environment I hope...
             */
            jvmSC.addJar(decodedPath + "../eclairjs-nashorn-0.1.jar");
        } else if (decodedPath.indexOf(jarEnvPath, 
                                       decodedPath.length - jarEnvPath.length) !== -1) {
            /*
             * We are running from a jar
             */
            jvmSC.addJar(decodedPath);
        }

        return jvmSC
    };
	/**
	 * 
	 * @constructor
	 * @classdesc A JavaScript-friendly version of SparkContext that returns RDDs 
	 * Only one SparkContext may be active per JVM. You must stop() the active SparkContext before creating a new one. 
	 * This limitation may eventually be removed; see SPARK-2243 for more details.
	 * @param {SparkConf} conf - a object specifying Spark parameters
	 */
    var SparkContext = function() {
    	var jvmObj;
    	this.logger = Logger.getLogger("SparkContext_js");
        if(arguments.length == 2) {
            var conf = new SparkConf()
            conf.setMaster(arguments[0])
            conf.setAppName(arguments[1])
            jvmObj = initSparkContext(conf)
        } else {
        	jvmObj = initSparkContext(arguments[0])
        }
        JavaWrapper.call(this, jvmObj);
        this.logger.debug(this.version());
    };
    
    SparkContext.prototype = Object.create(JavaWrapper.prototype);

	//Set the "constructor" property to refer to SparkContext
	SparkContext.prototype.constructor = SparkContext;

	/**
	 * Add a file to be downloaded with this Spark job on every node. The path passed can be either a local file, 
	 * a file in HDFS (or other Hadoop-supported filesystems), or an HTTP, HTTPS or FTP URI. 
	 * To access the file in Spark jobs, use SparkFiles.get(fileName) to find its download location.
	 * @param {string} path - Path to the file
	 */
	SparkContext.prototype.addFile = function(path) {		
		this.getJavaObject().addFile(path);
	};
	/**
	 * Adds a JAR dependency for all tasks to be executed on this SparkContext in the future. The path passed can be either a local file, a file in HDFS (or other Hadoop-supported filesystems), or an HTTP, HTTPS or FTP URI.
	 * @param {string} path - Path to the jar
	 */
	SparkContext.prototype.addJar = function(path) {
		//public void addJar(java.lang.String path)
		this.getJavaObject().addJar(path);
	};
	/**
	 * Broadcast a read-only variable to the cluster, returning a Broadcast object for reading it in distributed functions. 
	 * The variable will be sent to each cluster only once.
	 * @param {object} value
	 * @returns {Broadcast} 
	 */
	SparkContext.prototype.broadcast = function(value) {
		return this.getJavaObject().broadcast(value);
	};

	/**
	 * Distribute a local Scala collection to form an RDD.
	 * @param {array} list
	 * @param {integer} numSlices - Optional
	 * @returns {RDD}
	 */
	SparkContext.prototype.parallelize = function(list, numSlices) {
		//public <T> JavaRDD<T> parallelize(java.util.List<T> list, int numSlices)
		var list_uw = [];
		list.forEach(function(item){
			list_uw.push(Utils.unwrapObject(item));
		});
		if (numSlices) {
			return new RDD(this.getJavaObject().parallelize(list_uw, numSlices));
		} else {
			return new RDD(this.getJavaObject().parallelize(list_uw));
		}
		
	};
	/**
	 * Read a text file from HDFS, a local file system (available on all nodes), or any Hadoop-supported file system URI, 
	 * and return it as an RDD of Strings.
	 * @param {string} path - path to file
	 * @param {int} minPartitions - Optional
	 * @returns {RDD}
	 */
	SparkContext.prototype.textFile = function(path, minPartitions) {
		if (minPartitions) {
			return new RDD(this.getJavaObject().textFile(path, minPartitions));
		} else {
			return new RDD(this.getJavaObject().textFile(path));
		}
		
	};

    /**
     * Set the directory under which RDDs are going to be checkpointed. 
     * The directory must be a HDFS path if running on a cluster.
     * @param {string} dir
     */
    SparkContext.prototype.setCheckpointDir = function(dir) {
          this.getJavaObject().setCheckpointDir(dir);
    };

	/**
	 * Shut down the SparkContext.
	 */
	SparkContext.prototype.stop = function() {
		  this.getJavaObject().stop();
    };
    
    /**
     * The version of EclairJS and Spark on which this application is running.
     * @returns {string}
     */
    SparkContext.prototype.version = function() {
    	var javaVersion = java.lang.System.getProperty("java.version");
    	var jv = javaVersion.split(".");
    	var wrongJavaVersionString = "Java 1.8.0_60 or greater required for EclairJS";
    	var wrongSparkVersionString = "Spark 1.5.1 or greater required for EclairJS";
    	if (jv[0] < 2) {
    		if (jv[0] == 1) {
    			if (jv[1] < 8) {
    				throw wrongJavaVersionString;
    			} else {
    				if(jv[1] == 8) {
    					// we are at 1.8
    					var f = jv[2]
    					var fix = f.split("_");
    					if ((fix[0] < 1) && (fix[1] < 60)) {
    						// less than 1.8.0_60
    						throw wrongJavaVersionString;
    					}
    				} else {
    					// 1.9 or greater
    				}
    			}
    		} else {
    			throw wrongJavaVersionString;
    		}
    		
    	} else {
    		// versions is 2.0 or greater
    	}
    	var sparkVersion = this.getJavaObject().version();
    	var sv = sparkVersion.split(".");
    	if (sv[0] < 2) {
    		if (sv[0] == 1) {
    			if (sv[1] < 5) {
    				throw wrongSparkVersionString;
    			} else {
    				if(sv[1] == 5) {
    					// we are at 1.5
    					if (sv[2] < 1) {
    						// less than 1.5.1
    						throw wrongSparkVersionString;
    					}
    				} else {
    					// 1.5 or greater
    				}
    			}
    		} else {
    			throw wrongSparkVersionString;
    		}
    		
    	} else {
    		// versions is 2.0 or greater
    	}
       return "EclairJS-nashorn 0.1 Spark " +  sparkVersion;
    };
}
