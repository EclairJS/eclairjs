/**
 * A factory class used to construct Row objects.
 * @constructor
 */

var RowFactory =  {
	
};

RowFactory.create = function(values) {
	//public static Row create(java.lang.Object... values)
	print("RowFactory.create= " + values);
	var row = org.apache.spark.sql.RowFactory.create(values);
	var r = new Row(row);
	print("RowFactory.create row = " + r);
	return r;
};
