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
 * @constructor
 * @classdesc A factory class used to construct Row objects.
 */

var RowFactory =  {
	
};
/**
 * Create a Row from the given arguments. Position i in the argument list becomes position i in the created Row object.
 * @param {object} values
 * @returns {Row}
 */
RowFactory.create = function(values) {
	//public static Row create(java.lang.Object... values)
	Logger.getLogger("sql.RowFactory_js").debug("RowFactory.create= " + values);
	var row = org.apache.spark.sql.RowFactory.create(values);
	var r = new Row(row);
	//print("RowFactory.create row = " + r);
	return r;
};
