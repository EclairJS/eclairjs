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
 * Model representing the result of matrix factorization.
 *
 * Note: If you create the model directly using constructor, please be aware that fast prediction
 * requires cached user/product features and their associated partitioners.
 *
 * @param rank Rank for the features in this model.
 * @param userFeatures RDD of tuples where each tuple represents the userId and
 *                     the features computed for this user.
 * @param productFeatures RDD of tuples where each tuple represents the productId
 *                        and the features computed for this product.
 * @classdesc
 */

/**
 * @param {number} rank
 * @param {RDD} userFeatures
 * @param {RDD} productFeatures
 *  @class
 */
var MatrixFactorizationModel = function() {
	this.logger = Logger.getLogger("MatrixFactorizationModel_js");
	var jvmObject = arguments[0];
	if (arguments.length > 1) {
		var userFeatures = Utils.unwrapObject(arguments[1]);
		var productFeatures = Utils.unwrapObject(arguments[2]);
		jvmObject = new org.apache.spark.mllib.recommendation.MatrixFactorizationModel(arguments[0],userFeatures,productFeatures);
	}

	 JavaWrapper.call(this, jvmObject);

};

MatrixFactorizationModel.prototype = Object.create(JavaWrapper.prototype);

MatrixFactorizationModel.prototype.constructor = MatrixFactorizationModel;



/**
 * @param {number} user
 * @param {number} product
 * @returns {number} 
 */
MatrixFactorizationModel.prototype.predict0 = function(user,product) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().predict(user,product);
};


/**
 * Predict the rating of many users for many products.
 * The output RDD has an element per each element in the input RDD (including all duplicates)
 * unless a user or product is missing in the training set.
 *
 * @param {RDD} usersProducts   RDD of (user, product) pairs.
 * @returns {RDD}  RDD of Ratings.
 */
MatrixFactorizationModel.prototype.predict1 = function(usersProducts) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'usersProducts'
//   var usersProducts_uw = Utils.unwrapObject(usersProducts);
//   var javaObject =  this.getJavaObject().predict(usersProducts_uw);
//   return new RDD(javaObject);
};


/**
 * Java-friendly version of {@link predict}.
 * @param {JavaPairRDD} usersProducts
 * @returns {JavaRDD} 
 */
MatrixFactorizationModel.prototype.predict2 = function(usersProducts) {
throw "not implemented by ElairJS";
//   var usersProducts_uw = Utils.unwrapObject(usersProducts);
//   var javaObject =  this.getJavaObject().predict(usersProducts_uw);
//   return new JavaRDD(javaObject);
};


/**
 * Recommends products to a user.
 *
 * @param {number} user  the user to recommend products to
 * @param {number} num  how many products to return. The number returned may be less than this.
 *  "score" in the rating field. Each represents one recommended product, and they are sorted
 *  by score, decreasing. The first returned is the one predicted to be most strongly
 *  recommended to the user. The score is an opaque value that indicates how strongly
 *  recommended the product is.
 * @returns {Rating[]}  [[Rating]] objects, each of which contains the given user ID, a product ID, and a
 */
MatrixFactorizationModel.prototype.recommendProducts = function(user,num) {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().recommendProducts(user,num);
//   return Utils.javaToJs(javaObject);
};


/**
 * Recommends users to a product. That is, this returns users who are most likely to be
 * interested in a product.
 *
 * @param {number} product  the product to recommend users to
 * @param {number} num  how many users to return. The number returned may be less than this.
 *  "score" in the rating field. Each represents one recommended user, and they are sorted
 *  by score, decreasing. The first returned is the one predicted to be most strongly
 *  recommended to the product. The score is an opaque value that indicates how strongly
 *  recommended the user is.
 * @returns {Rating[]}  [[Rating]] objects, each of which contains a user ID, the given product ID, and a
 */
MatrixFactorizationModel.prototype.recommendUsers = function(product,num) {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().recommendUsers(product,num);
//   return Utils.javaToJs(javaObject);
};


/**
 * Save this model to the given path.
 *
 * This saves:
 *  - human-readable (JSON) model metadata to path/metadata/
 *  - Parquet formatted data to path/data/
 *
 * The model may be loaded using {@link load}.
 *
 * @param {SparkContext} sc   Spark context used to save model data.
 * @param {string} path   Path specifying the directory in which to save this model.
 *              If the directory already exists, this method throws an exception.
 */
MatrixFactorizationModel.prototype.save = function(sc,path) {
throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//    this.getJavaObject().save(sc_uw,path);
};


/**
 * Recommends topK products for all users.
 *
 * @param {number} num  how many products to return for every user.
 * rating objects which contains the same userId, recommended productID and a "score" in the
 * rating field. Semantics of score is same as recommendProducts API
 * @returns {RDD}  [(Int, Array[Rating])] objects, where every tuple contains a userID and an array of
 */
MatrixFactorizationModel.prototype.recommendProductsForUsers = function(num) {
   var javaObject =  this.getJavaObject().recommendProductsForUsers(num);
   return new RDD(javaObject.toJavaRDD());
};


/**
 * Recommends topK users for all products.
 *
 * @param {number} num  how many users to return for every product.
 * of rating objects which contains the recommended userId, same productID and a "score" in the
 * rating field. Semantics of score is same as recommendUsers API
 * @returns {RDD}  [(Int, Array[Rating])] objects, where every tuple contains a productID and an array
 */
MatrixFactorizationModel.prototype.recommendUsersForProducts = function(num) {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().recommendUsersForProducts(num);
//   return new RDD(javaObject);
};
/**
 *
 * @returns {RDD}
 */
MatrixFactorizationModel.prototype.userFeatures = function() {
   var javaObject =  this.getJavaObject().userFeatures();
   return new RDD(javaObject.toJavaRDD());
};
/**
 *
 * @returns {RDD}
 */
MatrixFactorizationModel.prototype.productFeatures = function() {
    var javaObject =  this.getJavaObject().productFeatures();
    return new RDD(javaObject.toJavaRDD());
};


//
// static methods
//


/**
 * Load a model from the given path.
 *
 * The model should have been saved by {@link save}.
 *
 * @param {SparkContext} sc   Spark context used for loading model files.
 * @param {string} path   Path specifying the directory to which the model was saved.
 * @returns {MatrixFactorizationModel}   Model instance
 */
MatrixFactorizationModel.load = function(sc,path) {
throw "not implemented by ElairJS";
//   var sc_uw = Utils.unwrapObject(sc);
//   var javaObject =  org.apache.spark.mllib.recommendation.MatrixFactorizationModel.load(sc_uw,path);
//   return new MatrixFactorizationModel(javaObject);
};

