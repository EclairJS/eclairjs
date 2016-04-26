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
/*
 Usage:
 bin/eclairjs.sh examples/ml/vector_slicer_example.js"
 */

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var VectorIndexer = require('eclairjs/ml/feature/VectorIndexer');

    var sql = new SQLContext(sc);


    // $example on$
    var data = sql.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

    var indexer = new VectorIndexer()
      .setInputCol("features")
      .setOutputCol("indexed")
      .setMaxCategories(10);
    var indexerModel = indexer.fit(data);

    var categoryMaps = indexerModel.categoryMaps();

    var str="Chose " + categoryMaps.size() + " categorical features:";

    for (var feature in categoryMaps) {
      str += " " + feature;
    }
    print(str);

    // Create new column "indexed" with categorical values transformed to indices
    var indexedData = indexerModel.transform(data);
    indexedData.show(20,true);




    return indexedData;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript VectorIndexerExample");
    var sc = new SparkContext(sparkConf);
    var output = run(sc);

    // $example off$
    sc.stop();
}
