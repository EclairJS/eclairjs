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
 * The base type of all Spark SQL data types.
 * @constructor
 */
var DataTypes = function() {

};

DataTypes.StringType = org.apache.spark.sql.types.DataTypes.StringType;

DataTypes.IntegerType = org.apache.spark.sql.types.DataTypes.IntegerType;
/**
 * Creates a StructField with empty metadata.
 * @param {String} fieldName
 * @param {DataType} dataType
 * @param {boolean} nullable
 * @returns {StructField}
 */
DataTypes.createStructField = function(fieldName, dataType, nullable) {
/*	public static StructField createStructField(java.lang.String name,
            DataType dataType,
            boolean nullable)
Creates a StructField with empty metadata.
*/
	Logger.getLogger("DataType_js").debug(dataType);

	return new StructField(org.apache.spark.sql.types.DataTypes.createStructField(fieldName, dataType, nullable));

};
/**
 * Creates a StructType with the given StructField array (fields).
 * @param {Array} fields
 * @returns {StructType}
 */
DataTypes.createStructType = function(fields) {
	//public static StructType createStructType(java.util.List<StructField> fields)
	//var list = new java.util.List();
	/*public static StructType createStructType(StructField[] fields)
	Creates a StructType with the given StructField array (fields).
	*/
	//return org.apache.spark.sql.types.DataTypes.createStructType(fields);
	var f = [];
	fields.forEach(function(field) {
		f.push(Utils.unwrapObject(field));
		//field.getJavaObject ? f.push(field.getJavaObject()) : f.push(field);
	});
	var ret = new StructType(org.apache.spark.sql.types.DataTypes.createStructType(f));
	return ret;
};

