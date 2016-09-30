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
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');
var SQLContext = require(EclairJS_Globals.NAMESPACE + '/sql/SQLContext');
//var SqlTimestamp = require(EclairJS_Globals.NAMESPACE + '/sql/SqlTimestamp');

var sparkContext = new SparkContext("local[*]", "simple timestamp test");
var sqlContext = new SQLContext(sparkContext);

var file = "./src/test/resources/data/sql/timestamp.json";
var df = sqlContext.read().json(file);

var rddRow = df.map(function(row, RowFactory, SqlTimestamp) {
   var d = new Date(
       parseInt(row.get(12),
       parseInt(row.get(8)),
       parseInt(row.get(4)),
       parseInt(row.get(5)),
       parseInt(row.get(7)),
       parseInt(row.get(9)))
   );
   
   var newRow = RowFactory.create([
       row.get(13), //id
       row.get(2),  //alchemy_score
       row.get(3),  //alchemy_text
       row.get(6),  //imagebox
       row.get(10), //visual_image
       new SqlTimestamp(d) //timestamp
   ]);

    print("====>Created newRow in lambda: ", newRow.toString());
   
   return newRow;
}, [require("eclairjs/sql/RowFactory"), require("eclairjs/sql/SqlTimestamp")])

var rddNewRow = rddRow.collect();
print("====>rddNewRows: "+rddNewRow.toString());
