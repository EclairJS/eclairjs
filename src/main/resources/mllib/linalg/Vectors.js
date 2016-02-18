
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
 * Represents a numeric vector, whose index type is Int and value type is Double.
 *
 * Note: Users should not implement this interface.
 * @classdesc
 */


var Vector = function(jvmObject) {

    this.logger = Logger.getLogger("Vector_js");
    JavaWrapper.call(this, jvmObject);

};

Vector.prototype = Object.create(JavaWrapper.prototype);

Vector.prototype.constructor = Vector;



/**
 * @returns {??}
 */
Vector.prototype.$init$ = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().$init$();
//   return new ??(javaObject);
};


/**
 * Size of the vector.
 * @returns {number}
 */
Vector.prototype.size = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().size();
};


/**
 * Converts the instance to a double array.
 * @returns {number[]}
 */
Vector.prototype.toArray = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toArray();
};


/**
 * @param {object} other
 * @returns {boolean}
 */
Vector.prototype.equals = function(other) {
    throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   return  this.getJavaObject().equals(other_uw);
};


/**
 * Returns a hash code value for the vector. The hash code is based on its size and its first 128
 * nonzero entries, using a hash algorithm similar to {@link hashCode}.
 * @returns {number}
 */
Vector.prototype.hashCode = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().hashCode();
};


/**
 * Gets the value of the ith element.
 * @param {number} i  index
 * @returns {number}
 */
Vector.prototype.apply = function(i) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().apply(i);
};


/**
 * Makes a deep copy of this vector.
 * @returns {Vector}
 */
Vector.prototype.copy = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().copy();
//   return Utils.javaToJs(javaObject);
};


/**
 * Applies a function `f` to all the active elements of dense and sparse vector.
 *
 * @param {func} f  the function takes two parameters where the first parameter is the index of
 *          the vector with type `Int`, and the second parameter is the corresponding value
 *          with type `Double`.
 */
Vector.prototype.foreachActive = function(f) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//    this.getJavaObject().foreachActive(fn);
};


/**
 * Number of active entries.  An "active entry" is an element which is explicitly stored,
 * regardless of its value.  Note that inactive entries have value 0.
 * @returns {number}
 */
Vector.prototype.numActives = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().numActives();
};


/**
 * Number of nonzero elements. This scans all active values and count nonzeros.
 * @returns {number}
 */
Vector.prototype.numNonzeros = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().numNonzeros();
};


/**
 * Converts this vector to a sparse vector with all explicit zeros removed.
 * @returns {SparseVector}
 */
Vector.prototype.toSparse = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().toSparse();
//   return new SparseVector(javaObject);
};


/**
 * Converts this vector to a dense vector.
 * @returns {DenseVector}
 */
Vector.prototype.toDense = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().toDense();
//   return new DenseVector(javaObject);
};


/**
 * Returns a vector in either dense or sparse format, whichever uses less storage.
 * @returns {Vector}
 */
Vector.prototype.compressed = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().compressed();
//   return Utils.javaToJs(javaObject);
};


/**
 * Find the index of a maximal element.  Returns the first maximal element in case of a tie.
 * Returns -1 if vector has length 0.
 * @returns {number}
 */
Vector.prototype.argmax = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().argmax();
};


/**
 * Converts the vector to a JSON string.
 * @returns {string}
 */
Vector.prototype.toJson = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toJson();
};


/**
 * :: AlphaComponent ::
 *
 * User-defined type for {@link Vector} which allows easy interaction with SQL
 * via {@link DataFrame}.
 * @classdesc
 */

/**
 * @returns {??}
 *  @class
 */
var VectorUDT = function(jvmObject) {

    this.logger = Logger.getLogger("VectorUDT_js");
    JavaWrapper.call(this, jvmObject);

};

VectorUDT.prototype = Object.create(JavaWrapper.prototype);

VectorUDT.prototype.constructor = VectorUDT;



/**
 * @returns {StructType}
 */
VectorUDT.prototype.sqlType = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().sqlType();
//   return new StructType(javaObject);
};


/**
 * @param {object} obj
 * @returns {InternalRow}
 */
VectorUDT.prototype.serialize = function(obj) {
    throw "not implemented by ElairJS";
//   var obj_uw = Utils.unwrapObject(obj);
//   return  this.getJavaObject().serialize(obj_uw);
};


/**
 * @param {object} datum
 * @returns {Vector}
 */
VectorUDT.prototype.deserialize = function(datum) {
    throw "not implemented by ElairJS";
//   var datum_uw = Utils.unwrapObject(datum);
//   var javaObject =  this.getJavaObject().deserialize(datum_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * @returns {string}
 */
VectorUDT.prototype.pyUDT = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().pyUDT();
};


/**
 * @returns {Class}
 */
VectorUDT.prototype.userClass = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().userClass();
//   return new Class(javaObject);
};


/**
 * @param {object} o
 * @returns {boolean}
 */
VectorUDT.prototype.equals = function(o) {
    throw "not implemented by ElairJS";
//   var o_uw = Utils.unwrapObject(o);
//   return  this.getJavaObject().equals(o_uw);
};


/**
 * @returns {number}
 */
VectorUDT.prototype.hashCode = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().hashCode();
};


/**
 * @returns {string}
 */
VectorUDT.prototype.typeName = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().typeName();
};


/**
 * A dense vector represented by a value array.
 * @classdesc
 */

/**
 * @param {number[]} values
 * @returns {??}
 *  @class
 */
var DenseVector = function(arg) {
    this.logger = Logger.getLogger("DenseVector_js");
    var jvmObj;
    if (Array.isArray(arg)) {
        jvmObj = new org.apache.spark.mllib.linalg.DenseVector(arg);
    } else {
        jvmObj = arg;
    }
    Vector.call(this, jvmObj);

};

DenseVector.prototype = Object.create(Vector.prototype);

DenseVector.prototype.constructor = DenseVector;



/**
 * @returns {number}
 */
DenseVector.prototype.size = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().size();
};


/**
 * @returns {string}
 */
DenseVector.prototype.toString = function() {
     return  this.getJavaObject().toString();
};


/**
 * @returns {float[]}
 */
DenseVector.prototype.toArray = function() {

    return  this.getJavaObject().toArray();
};


/**
 * @param {number} i
 * @returns {number}
 */
DenseVector.prototype.apply = function(i) {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().apply(i);
};


/**
 * @returns {DenseVector}
 */
DenseVector.prototype.copy = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().copy();
//   return new DenseVector(javaObject);
};


/**
 * @param {func} f
 */
DenseVector.prototype.foreachActive = function(f) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//    this.getJavaObject().foreachActive(fn);
};


/**
 * @returns {number}
 */
DenseVector.prototype.hashCode = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().hashCode();
};


/**
 * @returns {number}
 */
DenseVector.prototype.numActives = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().numActives();
};


/**
 * @returns {number}
 */
DenseVector.prototype.numNonzeros = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().numNonzeros();
};


/**
 * @returns {SparseVector}
 */
DenseVector.prototype.toSparse = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().toSparse();
//   return new SparseVector(javaObject);
};


/**
 * @returns {number}
 */
DenseVector.prototype.argmax = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().argmax();
};


/**
 * @returns {string}
 */
DenseVector.prototype.toJson = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toJson();
};


/**
 * A sparse vector represented by an index array and an value array.
 *
 * @param size size of the vector.
 * @param indices index array, assume to be strictly increasing.
 * @param values value array, must have the same length as the index array.
 * @classdesc
 */

/**
 * @param {number} size
 * @param {number[]} indices
 * @param {number[]} values
 * @returns {??}
 *  @class
 */
var SparseVector = function(size,indices,values) {
    var jvmObject = new org.apache.spark.mllib.linalg.SparseVector(size,indices,values);
    this.logger = Logger.getLogger("SparseVector_js");
    Vector.call(this, jvmObject);

};

SparseVector.prototype = Object.create(Vector.prototype);

SparseVector.prototype.constructor = SparseVector;



/**
 * @returns {string}
 */
SparseVector.prototype.toString = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toString();
};


/**
 * @returns {number[]}
 */
SparseVector.prototype.toArray = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toArray();
};


/**
 * @returns {SparseVector}
 */
SparseVector.prototype.copy = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().copy();
//   return new SparseVector(javaObject);
};


/**
 * @param {func} f
 */
SparseVector.prototype.foreachActive = function(f) {
    throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction2(sv.funcStr, sv.scopeVars);
//    this.getJavaObject().foreachActive(fn);
};


/**
 * @returns {number}
 */
SparseVector.prototype.hashCode = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().hashCode();
};


/**
 * @returns {number}
 */
SparseVector.prototype.numActives = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().numActives();
};


/**
 * @returns {number}
 */
SparseVector.prototype.numNonzeros = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().numNonzeros();
};


/**
 * @returns {SparseVector}
 */
SparseVector.prototype.toSparse = function() {
    throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().toSparse();
//   return new SparseVector(javaObject);
};


/**
 * @returns {number}
 */
SparseVector.prototype.argmax = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().argmax();
};


/**
 * @returns {string}
 */
SparseVector.prototype.toJson = function() {
    throw "not implemented by ElairJS";
//   return  this.getJavaObject().toJson();
};


/**
 *
 * @constructor
 */
var Vectors = function() {
    //var jvmObject = new org.apache.spark.mllib.linalg.SparseVector(size,indices,values);
    this.logger = Logger.getLogger("Vectors_js");
    //Vector.call(this, jvmObject);

};

//
// static methods
//

/**
 * Creates a dense vector from its values.
 * @param {number} firstValue
 * @param {...number} otherValues
 * @returns {Vector}
 */
Vectors.densewithOtherValues = function(firstValue,otherValues) {
    throw "not implemented by ElairJS";
// // TODO: handle repeated parm 'otherValues'
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.dense(firstValue,otherValues);
//   return Utils.javaToJs(javaObject);
};


/**
 * Creates a dense vector from a double array.
 * @param {float[]} values
 * @returns {Vector}
 */
Vectors.dense = function(values) {
    var javaObject =  org.apache.spark.mllib.linalg.Vectors.dense(values);
    return Utils.javaToJs(javaObject);
};


/**
 * Creates a sparse vector providing its index array and value array.
 *
 * @param {number} size  vector size.
 * @param {number[]} indices  index array, must be strictly increasing.
 * @param {number[]} values  value array, must have the same length as indices.
 * @returns {Vector}
 */
Vectors.sparse0 = function(size,indices,values) {
    throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,indices,values);
//   return Utils.javaToJs(javaObject);
};


/**
 * Creates a sparse vector using unordered (index, value) pairs.
 *
 * @param {number} size  vector size.
 * @param {Tuple2[]} elements  vector elements in (index, value) pairs.
 * @returns {Vector}
 */
Vectors.sparse1 = function(size,elements) {
    throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'elements'
//   var elements_uw = Utils.unwrapObject(elements);
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,elements_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * Creates a sparse vector using unordered (index, value) pairs in a Java friendly way.
 *
 * @param {number} size  vector size.
 * @param {JavaIterable} elements  vector elements in (index, value) pairs.
 * @returns {Vector}
 */
Vectors.sparse2 = function(size,elements) {
    throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'elements'
//   var elements_uw = Utils.unwrapObject(elements);
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.sparse(size,elements_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * Creates a vector of all zeros.
 *
 * @param {number} size  vector size
 * @returns {Vector}  a zero vector
 */
Vectors.zeros = function(size) {
    throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.zeros(size);
//   return Utils.javaToJs(javaObject);
};


/**
 * Parses a string resulted from [[Vector.toString]] into a {@link Vector}.
 * @param {string} s
 * @returns {Vector}
 */
Vectors.parse = function(s) {
    throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.parse(s);
//   return Utils.javaToJs(javaObject);
};


/**
 * Parses the JSON representation of a vector into a {@link Vector}.
 * @param {string} json
 * @returns {Vector}
 */
Vectors.fromJson = function(json) {
    throw "not implemented by ElairJS";
//   var javaObject =  org.apache.spark.mllib.linalg.Vectors.fromJson(json);
//   return Utils.javaToJs(javaObject);
};


/**
 * Returns the p-norm of this vector.
 * @param {Vector} vector  input vector.
 * @param {number} p  norm.
 * @returns {number}  norm in L^p^ space.
 */
Vectors.norm = function(vector,p) {
    throw "not implemented by ElairJS";
//   var vector_uw = Utils.unwrapObject(vector);
//   return  org.apache.spark.mllib.linalg.Vectors.norm(vector_uw,p);
};


/**
 * Returns the squared distance between two Vectors.
 * @param {Vector} v1  first Vector.
 * @param {Vector} v2  second Vector.
 * @returns {number}  squared distance between two Vectors.
 */
Vectors.sqdist = function(v1,v2) {
    throw "not implemented by ElairJS";
//   var v1_uw = Utils.unwrapObject(v1);
//   var v2_uw = Utils.unwrapObject(v2);
//   return  org.apache.spark.mllib.linalg.Vectors.sqdist(v1_uw,v2_uw);
};


/**
 * @param {DenseVector} dv
 * @returns {Array}
 */
DenseVector.unapply = function(dv) {
    throw "not implemented by ElairJS";
//   var dv_uw = Utils.unwrapObject(dv);
//   return  org.apache.spark.mllib.linalg.DenseVector.unapply(dv_uw);
};


/**
 * @param {SparseVector} sv
 * @returns {Tuple3}
 */
SparseVector.unapply = function(sv) {
    throw "not implemented by ElairJS";
//   var sv_uw = Utils.unwrapObject(sv);
//   var javaObject =  org.apache.spark.mllib.linalg.SparseVector.unapply(sv_uw);
//   return new Tuple3(javaObject);
};
