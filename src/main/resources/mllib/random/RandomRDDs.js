/*
 * Copyright 2016 IBM Corp.
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

var RandomRDDs = function(jvmObj) {
  JavaWrapper.call(this, jvmObj);

  // Initialize our Row-specific properties
  this.logger = Logger.getLogger("RandomRDDs_js");
};

RandomRDDs.prototype = Object.create(JavaWrapper.prototype);
RandomRDDs.prototype.constructor = RandomRDDs;

//
// static methods
//

/**
 * Generates an RDD comprised of `i.i.d.` samples from the uniform distribution `U(0.0, 1.0)`.
 *
 * To transform the distribution in the generated RDD from `U(0.0, 1.0)` to `U(a, b)`, use
 * `RandomRDDs.uniformRDD(sc, n, p, seed).map(v => a + (b - a) * v)`.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ `U(0.0, 1.0)`.
 */
RandomRDDs.uniformRDD = function(sc,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.uniformRDD(sc_uw,size,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#uniformRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.uniformJavaRDD0 = function(jsc,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.uniformJavaRDD(jsc_uw,size,numPartitions,seed);
};


/**
 * [[RandomRDDs#uniformJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} size
 * @param {number} numPartitions
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.uniformJavaRDD1 = function(jsc,size,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.uniformJavaRDD(jsc_uw,size,numPartitions);
};


/**
 * [[RandomRDDs#uniformJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} size
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.uniformJavaRDD2 = function(jsc,size) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.uniformJavaRDD(jsc_uw,size);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the standard normal distribution.
 *
 * To transform the distribution in the generated RDD from standard normal to some other normal
 * `N(mean, sigma^2^)`, use `RandomRDDs.normalRDD(sc, n, p, seed).map(v => mean + sigma * v)`.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Optional Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Optional Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] Optional comprised of `i.i.d.` samples ~ N(0.0, 1.0).
 */
RandomRDDs.normalRDD = function(sc,size,numPartitions,seed) {
  var sc_uw = Utils.unwrapObject(sc);

  var javaObject;

  if (seed) {
    javaObject = org.apache.spark.mllib.random.RandomRDDs.normalJavaRDD(sc_uw,size, numPartitions,seed);
  } else if (numPartitions) {
    javaObject = org.apache.spark.mllib.random.RandomRDDs.normalJavaRDD(sc_uw,size, numPartitions);
  } else {
    javaObject = org.apache.spark.mllib.random.RandomRDDs.normalJavaRDD(sc_uw,size);
  }

  return Utils.javaToJs(javaObject);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the Poisson distribution with the input
 * mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or lambda, for the Poisson distribution.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.poissonRDD = function(sc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.poissonRDD(sc_uw,mean,size,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#poissonRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.poissonJavaRDD0 = function(jsc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.poissonJavaRDD(jsc_uw,mean,size,numPartitions,seed);
};


/**
 * [[RandomRDDs#poissonJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.poissonJavaRDD1 = function(jsc,mean,size,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.poissonJavaRDD(jsc_uw,mean,size,numPartitions);
};


/**
 * [[RandomRDDs#poissonJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.poissonJavaRDD2 = function(jsc,mean,size) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.poissonJavaRDD(jsc_uw,mean,size);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the exponential distribution with
 * the input mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or 1 / lambda, for the exponential distribution.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.exponentialRDD = function(sc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.exponentialRDD(sc_uw,mean,size,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#exponentialRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.exponentialJavaRDD0 = function(jsc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.exponentialJavaRDD(jsc_uw,mean,size,numPartitions,seed);
};


/**
 * [[RandomRDDs#exponentialJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.exponentialJavaRDD1 = function(jsc,mean,size,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.exponentialJavaRDD(jsc_uw,mean,size,numPartitions);
};


/**
 * [[RandomRDDs#exponentialJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.exponentialJavaRDD2 = function(jsc,mean,size) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.exponentialJavaRDD(jsc_uw,mean,size);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the gamma distribution with the input
 *  shape and scale.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} shape  shape parameter (> 0) for the gamma distribution
 * @param {number} scale  scale parameter (> 0) for the gamma distribution
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.gammaRDD = function(sc,shape,scale,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.gammaRDD(sc_uw,shape,scale,size,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#gammaRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.gammaJavaRDD0 = function(jsc,shape,scale,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.gammaJavaRDD(jsc_uw,shape,scale,size,numPartitions,seed);
};


/**
 * [[RandomRDDs#gammaJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} size
 * @param {number} numPartitions
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.gammaJavaRDD1 = function(jsc,shape,scale,size,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.gammaJavaRDD(jsc_uw,shape,scale,size,numPartitions);
};


/**
 * [[RandomRDDs#gammaJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} size
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.gammaJavaRDD2 = function(jsc,shape,scale,size) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.gammaJavaRDD(jsc_uw,shape,scale,size);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the log normal distribution with the input
 *  mean and standard deviation
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  mean for the log normal distribution
 * @param {number} std  standard deviation for the log normal distribution
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.logNormalRDD = function(sc,mean,std,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.logNormalRDD(sc_uw,mean,std,size,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#logNormalRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.logNormalJavaRDD0 = function(jsc,mean,std,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.logNormalJavaRDD(jsc_uw,mean,std,size,numPartitions,seed);
};


/**
 * [[RandomRDDs#logNormalJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} size
 * @param {number} numPartitions
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.logNormalJavaRDD1 = function(jsc,mean,std,size,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.logNormalJavaRDD(jsc_uw,mean,std,size,numPartitions);
};


/**
 * [[RandomRDDs#logNormalJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} size
 * @returns {JavaDoubleRDD}
 */
RandomRDDs.logNormalJavaRDD2 = function(jsc,mean,std,size) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   return  org.apache.spark.mllib.random.RandomRDDs.logNormalJavaRDD(jsc_uw,mean,std,size);
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * uniform distribution on `U(0.0, 1.0)`.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD.
 * @param {number} seed  Seed for the RNG that generates the seed for the generator in each partition.
 * @returns {RDD}  RDD[Vector] with vectors containing i.i.d samples ~ `U(0.0, 1.0)`.
 */
RandomRDDs.uniformVectorRDD = function(sc,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.uniformVectorRDD(sc_uw,numRows,numCols,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#uniformVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.uniformJavaVectorRDD0 = function(jsc,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.uniformJavaVectorRDD(jsc_uw,numRows,numCols,numPartitions,seed);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#uniformJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.uniformJavaVectorRDD1 = function(jsc,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.uniformJavaVectorRDD(jsc_uw,numRows,numCols,numPartitions);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#uniformJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.uniformJavaVectorRDD2 = function(jsc,numRows,numCols) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.uniformJavaVectorRDD(jsc_uw,numRows,numCols);
//   return new JavaRDD(javaObject);
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * standard normal distribution.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Optional Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Optional Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ `N(0.0, 1.0)`.
 */
RandomRDDs.normalVectorRDD = function(sc,numRows,numCols,numPartitions,seed) {
  var sc_uw = Utils.unwrapObject(sc);

  var javaObject;

  if (seed) {
    javaObject = org.apache.spark.mllib.random.RandomRDDs.normalJavaVectorRDD(sc_uw, numRows, numCols, numPartitions, seed);
  } else if (numPartitions) {
    javaObject = org.apache.spark.mllib.random.RandomRDDs.normalJavaVectorRDD(sc_uw, numRows, numCols, numPartitions);
  } else {
    javaObject = org.apache.spark.mllib.random.RandomRDDs.normalJavaVectorRDD(sc_uw, numRows, numCols);
  }

  return Utils.javaToJs(javaObject);
};



/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from a
 * log normal distribution.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean of the log normal distribution.
 * @param {number} std  Standard deviation of the log normal distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples.
 */
RandomRDDs.logNormalVectorRDD = function(sc,mean,std,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.logNormalVectorRDD(sc_uw,mean,std,numRows,numCols,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#logNormalVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.logNormalJavaVectorRDD0 = function(jsc,mean,std,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.logNormalJavaVectorRDD(jsc_uw,mean,std,numRows,numCols,numPartitions,seed);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#logNormalJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.logNormalJavaVectorRDD1 = function(jsc,mean,std,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.logNormalJavaVectorRDD(jsc_uw,mean,std,numRows,numCols,numPartitions);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#logNormalJavaVectorRDD]] with the default number of partitions and
 * the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.logNormalJavaVectorRDD2 = function(jsc,mean,std,numRows,numCols) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.logNormalJavaVectorRDD(jsc_uw,mean,std,numRows,numCols);
//   return new JavaRDD(javaObject);
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * Poisson distribution with the input mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or lambda, for the Poisson distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`)
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.poissonVectorRDD = function(sc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.poissonVectorRDD(sc_uw,mean,numRows,numCols,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#poissonVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.poissonJavaVectorRDD0 = function(jsc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.poissonJavaVectorRDD(jsc_uw,mean,numRows,numCols,numPartitions,seed);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#poissonJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.poissonJavaVectorRDD1 = function(jsc,mean,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.poissonJavaVectorRDD(jsc_uw,mean,numRows,numCols,numPartitions);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#poissonJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.poissonJavaVectorRDD2 = function(jsc,mean,numRows,numCols) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.poissonJavaVectorRDD(jsc_uw,mean,numRows,numCols);
//   return new JavaRDD(javaObject);
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * exponential distribution with the input mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or 1 / lambda, for the Exponential distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`)
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ Exp(mean).
 */
RandomRDDs.exponentialVectorRDD = function(sc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.exponentialVectorRDD(sc_uw,mean,numRows,numCols,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#exponentialVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.exponentialJavaVectorRDD0 = function(jsc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.exponentialJavaVectorRDD(jsc_uw,mean,numRows,numCols,numPartitions,seed);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#exponentialJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.exponentialJavaVectorRDD1 = function(jsc,mean,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.exponentialJavaVectorRDD(jsc_uw,mean,numRows,numCols,numPartitions);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#exponentialJavaVectorRDD]] with the default number of partitions
 * and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.exponentialJavaVectorRDD2 = function(jsc,mean,numRows,numCols) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.exponentialJavaVectorRDD(jsc_uw,mean,numRows,numCols);
//   return new JavaRDD(javaObject);
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * gamma distribution with the input shape and scale.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} shape  shape parameter (> 0) for the gamma distribution.
 * @param {number} scale  scale parameter (> 0) for the gamma distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`)
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ Exp(mean).
 */
RandomRDDs.gammaVectorRDD = function(sc,shape,scale,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.gammaVectorRDD(sc_uw,shape,scale,numRows,numCols,numPartitions,seed);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of [[RandomRDDs#gammaVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.gammaJavaVectorRDD0 = function(jsc,shape,scale,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.gammaJavaVectorRDD(jsc_uw,shape,scale,numRows,numCols,numPartitions,seed);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#gammaJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.gammaJavaVectorRDD1 = function(jsc,shape,scale,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.gammaJavaVectorRDD(jsc_uw,shape,scale,numRows,numCols,numPartitions);
//   return new JavaRDD(javaObject);
};


/**
 * [[RandomRDDs#gammaJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.gammaJavaVectorRDD2 = function(jsc,shape,scale,numRows,numCols) {
  throw "not implemented by ElairJS";
//   var jsc_uw = Utils.unwrapObject(jsc);
//   var javaObject =  org.apache.spark.mllib.random.RandomRDDs.gammaJavaVectorRDD(jsc_uw,shape,scale,numRows,numCols);
//   return new JavaRDD(javaObject);
};
