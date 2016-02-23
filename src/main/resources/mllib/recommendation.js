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

var Rating = function(user, product, rating) {
    //print("user = " + user);
    //print("product = " + product);
    //print("rating = " + rating);
	var jvmObj;
	if( product == null && rating  == null) {
  	 	jvmObj = user;
	} else {
        var jvmObj = new org.apache.spark.mllib.recommendation.Rating(
            user, 
            product,
            rating);
	}
	JavaWrapper.call(this, jvmObj);
};

Rating.prototype = Object.create(JavaWrapper.prototype); 

Rating.prototype.constructor = Rating;

Rating.prototype.user = function() {
  return this.getJavaObject().user();
};

Rating.prototype.product = function() {
  return this.getJavaObject().product();
};

Rating.prototype.rating = function() {
  return this.getJavaObject().rating();
};

Rating.prototype.toString = function() { 
    return "{product: ["+this.user()+","+this.product()+","+this.rating()+"]}";
};

var MatrixFactorizationModel = function(jvmObj) {
	JavaWrapper.call(this, jvmObj);
}

MatrixFactorizationModel.prototype = Object.create(JavaWrapper.prototype); 

MatrixFactorizationModel.prototype.constructor = MatrixFactorizationModel;

MatrixFactorizationModel.prototype.recommendProductsForUsers = function(num) {
    return new RDD(
        this.getJavaObject().recommendProductsForUsers(num).toJavaRDD()
    );
};

var ALS = {};

ALS.train = function(ratings, rank, iterations, lambda) {
  var obj = org.apache.spark.mllib.recommendation.ALS.train(
      org.apache.spark.api.java.JavaRDD.toRDD(ratings.getJavaObject()), 
      rank, 
      iterations, 
      lambda
  );

  return new MatrixFactorizationModel(obj);
}

