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



/**
 * :: Experimental ::
 * Statistic functions for {@link DataFrame}s.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @classdesc
 */

var DataFrameStatFunctions = function(jvmObject) {
	 
	 this.logger = Logger.getLogger("DataFrameStatFunctions_js");
	 JavaWrapper.call(this, jvmObject);

};

DataFrameStatFunctions.prototype = Object.create(JavaWrapper.prototype);

DataFrameStatFunctions.prototype.constructor = DataFrameStatFunctions;



/**
 * Calculate the sample covariance of two numerical columns of a DataFrame.
 * @param {string} col1  the name of the first column
 * @param {string} col2  the name of the second column
 *
 * @example 
 *    var stat = peopleDataFrame.stat().cov("income", "networth");
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {number}  the covariance of the two columns.
 */
DataFrameStatFunctions.prototype.cov = function(col1,col2) {
	return this.getJavaObject().cov(col1,col2);
}


/**
 * Calculates the correlation of two columns of a DataFrame. Currently only supports the Pearson
 * Correlation Coefficient. For Spearman Correlation, consider using RDD methods found in
 * MLlib's Statistics.
 *
 * @param {string} col1  the name of the column
 * @param {string} col2  the name of the column to calculate the correlation against
 * @param {string} method Optional currently only supports the "pearson"
 * @example 
 *    var stat = peopleDataFrame.stat().cov("income", "networth", "pearson");
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {number}  The Pearson Correlation Coefficient.
 */
DataFrameStatFunctions.prototype.corr = function(col1,col2,method) {
	if (method) {
		return  this.getJavaObject().corr(col1,col2,method);
	} else {
		return  this.getJavaObject().corr(col1,col2);
	}

}


/**
 * Computes a pair-wise frequency table of the given columns. Also known as a contingency table.
 * The number of distinct values for each column should be less than 1e4. At most 1e6 non-zero
 * pair frequencies will be returned.
 * The first column of each row will be the distinct values of `col1` and the column names will
 * be the distinct values of `col2`. The name of the first column will be `$col1_$col2`. Counts
 * will be returned as `Long`s. Pairs that have no occurrences will have zero as their counts.
 * Null elements will be replaced by "null", and back ticks will be dropped from elements if they
 * exist.
 *
 *
 * @param {string} col1  The name of the first column. Distinct items will make the first item of
 *             each row.
 * @param {string} col2  The name of the second column. Distinct items will make the column names
 *             of the DataFrame.
 *
 * @example 
 *   val df = sqlContext.createDataFrame(Seq((1, 1), (1, 2), (2, 1), (2, 1), (2, 3), (3, 2),
 *         (3, 3))).toDF("key", "value")
 *    val ct = df.stat.crosstab("key", "value")
 *    ct.show()
 *    +---------+---+---+---+
 *    |key_value|  1|  2|  3|
 *    +---------+---+---+---+
 *    |        2|  2|  0|  1|
 *    |        1|  1|  1|  0|
 *    |        3|  0|  1|  1|
 *    +---------+---+---+---+
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A DataFrame containing for the contingency table.
 */
DataFrameStatFunctions.prototype.crosstab = function(col1,col2) {
   var javaObject =  this.getJavaObject().crosstab(col1,col2);
   return new DataFrame(javaObject);
}


/**
 * Finding frequent items for columns, possibly with false positives. Using the
 * frequent element count algorithm described in
 * [[http://dx.doi.org/10.1145/762471.762473, proposed by Karp, Schenker, and Papadimitriou]].
 * The `support` should be greater than 1e-4.
 *
 * This function is meant for exploratory data analysis, as we make no guarantee about the
 * backward compatibility of the schema of the resulting {@link DataFrame}.
 *
 * @param {string[]} cols  the names of the columns to search frequent items in.
 * @param {number} support  The minimum frequency for an item to be considered `frequent`. Should be greater
 *                than 1e-4.
 *
 * @example 
 *    // find the items with a frequency greater than 0.4 (observed 40% of the time) for columns
 *    // "a" and "b"
 *    val freqSingles = df.stat.freqItems(["a", "b"]), 0.4)
 *    freqSingles.show()
 *    +-----------+-------------+
 *    |a_freqItems|  b_freqItems|
 *    +-----------+-------------+
 *    |    [1, 99]|[-1.0, -99.0]|
 *    +-----------+-------------+
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A Local DataFrame with the Array of frequent items for each column.
 */
DataFrameStatFunctions.prototype.freqItems0 = function(cols,support) {
   var javaObject =  this.getJavaObject().freqItems(cols,support);
   return new DataFrame(javaObject);
}


/**
 * Finding frequent items for columns, possibly with false positives. Using the
 * frequent element count algorithm described in
 * [[http://dx.doi.org/10.1145/762471.762473, proposed by Karp, Schenker, and Papadimitriou]].
 * Uses a `default` support of 1%.
 *
 * This function is meant for exploratory data analysis, as we make no guarantee about the
 * backward compatibility of the schema of the resulting {@link DataFrame}.
 *
 * @param {string[]} cols  the names of the columns to search frequent items in.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A Local DataFrame with the Array of frequent items for each column.
 */
DataFrameStatFunctions.prototype.freqItems1 = function(cols) {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().freqItems(cols);
//   return new DataFrame(javaObject);
}


/**
 * (Scala-specific) Finding frequent items for columns, possibly with false positives. Using the
 * frequent element count algorithm described in
 * [[http://dx.doi.org/10.1145/762471.762473, proposed by Karp, Schenker, and Papadimitriou]].
 *
 * This function is meant for exploratory data analysis, as we make no guarantee about the
 * backward compatibility of the schema of the resulting {@link DataFrame}.
 *
 * @param {Seq} cols  the names of the columns to search frequent items in.
 *
 * @example 
 *    val rows = Seq.tabulate(100) { i =>
 *      if (i % 2 == 0) (1, -1.0) else (i, i * -1.0)
 *    }
 *    val df = sqlContext.createDataFrame(rows).toDF("a", "b")
 *    // find the items with a frequency greater than 0.4 (observed 40% of the time) for columns
 *    // "a" and "b"
 *    val freqSingles = df.stat.freqItems(Seq("a", "b"), 0.4)
 *    freqSingles.show()
 *    +-----------+-------------+
 *    |a_freqItems|  b_freqItems|
 *    +-----------+-------------+
 *    |    [1, 99]|[-1.0, -99.0]|
 *    +-----------+-------------+
 *    // find the pair of items with a frequency greater than 0.1 in columns "a" and "b"
 *    val pairDf = df.select(struct("a", "b").as("a-b"))
 *    val freqPairs = pairDf.stat.freqItems(Seq("a-b"), 0.1)
 *    freqPairs.select(explode($"a-b_freqItems").as("freq_ab")).show()
 *    +----------+
 *    |   freq_ab|
 *    +----------+
 *    |  [1,-1.0]|
 *    |   ...    |
 *    +----------+
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A Local DataFrame with the Array of frequent items for each column.
 */
DataFrameStatFunctions.prototype.freqItems2 = function(cols,support) {
throw "not implemented by ElairJS";
//   var cols_uw = Utils.unwrapObject(cols);
//   var javaObject =  this.getJavaObject().freqItems(cols_uw,support);
//   return new DataFrame(javaObject);
}


/**
 * (Scala-specific) Finding frequent items for columns, possibly with false positives. Using the
 * frequent element count algorithm described in
 * [[http://dx.doi.org/10.1145/762471.762473, proposed by Karp, Schenker, and Papadimitriou]].
 * Uses a `default` support of 1%.
 *
 * This function is meant for exploratory data analysis, as we make no guarantee about the
 * backward compatibility of the schema of the resulting {@link DataFrame}.
 *
 * @param {Seq} cols  the names of the columns to search frequent items in.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A Local DataFrame with the Array of frequent items for each column.
 */
DataFrameStatFunctions.prototype.freqItems3 = function(cols) {
throw "not implemented by ElairJS";
//   var cols_uw = Utils.unwrapObject(cols);
//   var javaObject =  this.getJavaObject().freqItems(cols_uw);
//   return new DataFrame(javaObject);
}


/**
 * Returns a stratified sample without replacement based on the fraction given on each stratum.
 * @param {string} col  column that defines strata
 * @param {Map} fractions  sampling fraction for each stratum. If a stratum is not specified, we treat
 *                  its fraction as zero.
 * @param {number} seed  random seed
 *
 * @example 
 *    val df = sqlContext.createDataFrame(Seq((1, 1), (1, 2), (2, 1), (2, 1), (2, 3), (3, 2),
 *      (3, 3))).toDF("key", "value")
 *    val fractions = Map(1 -> 1.0, 3 -> 0.5)
 *    df.stat.sampleBy("key", fractions, 36L).show()
 *    +---+-----+
 *    |key|value|
 *    +---+-----+
 *    |  1|    1|
 *    |  1|    2|
 *    |  3|    2|
 *    +---+-----+
 *  
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {DataFrame}  a new [[DataFrame]] that represents the stratified sample
 */
DataFrameStatFunctions.prototype.sampleBywithnumber = function(col,fractions,seed) {
throw "not implemented by ElairJS";
//   var fractions_uw = Utils.unwrapObject(fractions);
//   var javaObject =  this.getJavaObject().sampleBy(col,fractions_uw,seed);
//   return new DataFrame(javaObject);
}


/**
 * Returns a stratified sample without replacement based on the fraction given on each stratum.
 * @param {string} col  column that defines strata
 * @param {Map} fractions  sampling fraction for each stratum. If a stratum is not specified, we treat
 *                  its fraction as zero.
 * @param {number} seed  random seed
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {DataFrame}  a new [[DataFrame]] that represents the stratified sample
 */
DataFrameStatFunctions.prototype.sampleBywithnumber = function(col,fractions,seed) {
throw "not implemented by ElairJS";
//   var fractions_uw = Utils.unwrapObject(fractions);
//   var javaObject =  this.getJavaObject().sampleBy(col,fractions_uw,seed);
//   return new DataFrame(javaObject);
}
