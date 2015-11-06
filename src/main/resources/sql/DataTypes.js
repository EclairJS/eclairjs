
var DataTypes = function() {
	//this.jvmObject = new org.apache.spark.sql.types.DataTypes();
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
	print(dataType)
	//var dt = dataType.getJavaObject ? dataType.getJavaObject() : dataType;
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
		field.getJavaObject ? f.push(field.getJavaObject()) : f.push(field);
	});
	var ret = new StructType(org.apache.spark.sql.types.DataTypes.createStructType(f));
	return ret;
};

