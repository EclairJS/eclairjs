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

var BinaryClassificationMetrics = function(rdd) {
    var javaRdd = rdd.getJavaObject();
    this.classTag = javaRdd.classTag()
    var r = rdd.getJavaObject().rdd();
    JavaWrapper.call(this,
                     new org.apache.spark.mllib.evaluation.BinaryClassificationMetrics(r));
};

BinaryClassificationMetrics.prototype = Object.create(JavaWrapper.prototype); 

BinaryClassificationMetrics.prototype.precisionByThreshold = function() {
    var rdd = this.getJavaObject().precisionByThreshold();
    return new RDD(org.apache.spark.api.java.JavaRDD.fromRDD(rdd, this.classTag));
};

BinaryClassificationMetrics.prototype.recallByThreshold = function() {
    var rdd = this.getJavaObject().recallByThreshold();
    return new RDD(org.apache.spark.api.java.JavaRDD.fromRDD(rdd, this.classTag));
};

BinaryClassificationMetrics.prototype.fMeasureByThreshold = function(t) {
    if(arguments.length == 0) {
        var rdd = this.getJavaObject().fMeasureByThreshold();
        return new RDD(org.apache.spark.api.java.JavaRDD.fromRDD(rdd, this.classTag));
    } else {
        var rdd = this.getJavaObject().fMeasureByThreshold(t);
        return new RDD(org.apache.spark.api.java.JavaRDD.fromRDD(rdd, this.classTag));
    }
};

BinaryClassificationMetrics.prototype.pr = function() {
    var rdd = this.getJavaObject().pr();
    return new RDD(org.apache.spark.api.java.JavaRDD.fromRDD(rdd, this.classTag));
};


