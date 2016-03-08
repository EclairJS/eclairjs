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


/**
 * @constructor
 * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming,
 * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
 * @param {object} jDStream
  */
var PairDStream = function(jPairDStream, streamingContext) {
	var jvmObj = jPairDStream;
	this.streamingContext = streamingContext;
	this.logger = Logger.getLogger("streaming.dtream.PairDStream_js");
	JavaWrapper.call(this, jvmObj);
};

PairDStream.prototype = Object.create(DStream.prototype);

PairDStream.prototype.constructor = PairDStream;


/**
 * Return a new DStream by applying `reduceByKey` to each RDD. The values for each key are
 * merged using the associative reduce function. Hash partitioning is used to generate the RDDs
 * with Spark's default number of partitions.
 * @param {func} func
 * @returns {PairDStream}
 */
PairDStream.prototype.reduceByKey = function(func,bindArgs) {
      var fn = Utils.createLambdaFunction(func, org.eclairjs.nashorn.JSFunction2, bindArgs);
  var javaObject =  this.getJavaObject().reduceByKey(fn);
  return new PairDStream(javaObject, this.streamingContext);
};
