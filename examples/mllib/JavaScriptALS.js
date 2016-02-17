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
 * to run this example:
 * bin/eclairjs.sh examples/mllib/JavaScriptALS.js  examples/data/mllib/als/test.data  12 4 /tmp
 */

function featuresToString(tuple) {
    return tuple[0] + "," + tuple[2];
}

if (args.length < 5) {
    print(
        "Usage: bin/eclairjs.sh examples/mllib/JavaScriptALS.js <ratings_file> <rank> <iterations> <output_dir> [<blocks>]");
    exit(1);
}
var sparkConf = new SparkConf().setAppName("JavaALS").setMaster("local[*]");
var rank = parseInt(args[2]);
var iterations = parseInt(args[3]);
var outputDir = args[4];
var blocks = -1;
if (args.length == 6) {
    blocks = parseInt(args[5]);
}

var sc = new SparkContext(sparkConf);
var lines = sc.textFile(args[1]);


var ratings = lines.map(function(line){
    var tok = line.split(",");
    var x = parseInt(tok[0]);
    var y = parseInt(tok[1]);
    var rating = parseFloat(tok[2]);
    return new Rating(x, y, rating);
});

var model = ALS.train(ratings, rank, iterations, 0.01, blocks);

var userFeaatureRDD = model.userFeatures()
                            .map(featuresToString)
                            .saveAsTextFile(outputDir + "/userFeatures");

var productFeaturesRDD = model.productFeatures()
                            .map(featuresToString)
                            .saveAsTextFile(outputDir + "/productFeatures");

print("Final user/product features written to " + outputDir);

sc.stop();
