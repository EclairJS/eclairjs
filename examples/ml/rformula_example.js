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
/*
 Usage:
 bin/eclairjs.sh examples/ml/rformula_example.js"
 */

function run(spark) {
    var DataTypes = require("eclairjs/sql/types/DataTypes");
    var RowFactory = require("eclairjs/sql/RowFactory");
    var RFormula = require("eclairjs/ml/feature/RFormula");

    var schema = DataTypes.createStructType([
        DataTypes.createStructField("id", DataTypes.IntegerType, false),
        DataTypes.createStructField("country", DataTypes.StringType, false),
        DataTypes.createStructField("hour", DataTypes.IntegerType, false),
        DataTypes.createStructField("clicked", DataTypes.DoubleType, false)
    ]);

    var data = [
        RowFactory.create(7, "US", 18, 1.0),
        RowFactory.create(8, "CA", 12, 0.0),
        RowFactory.create(9, "NZ", 15, 0.0)
    ];

    var dataset = spark.createDataFrame(data, schema);
    var formula = new RFormula()
        .setFormula("clicked ~ country + hour")
        .setFeaturesCol("features")
        .setLabelCol("label");
    var output = formula.fit(dataset).transform(dataset);
    return output.select("features", "label");

}


/*
 check if SparkSession is defined, if it is we are being run from Unit Test
 */

if (typeof sparkSession === 'undefined') {
    var SparkSession = require(EclairJS_Globals.NAMESPACE + '/sql/SparkSession');
    var spark = SparkSession
            .builder()
            .appName("JavaScript RFormula Example")
            .getOrCreate();
    var result = run(spark);
    result.show();

    spark.stop();
}
