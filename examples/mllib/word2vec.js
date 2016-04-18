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

This example uses text8 file from http://mattmahoney.net/dc/text8.zip
The file was downloadded, unziped and split into multiple lines using

wget http://mattmahoney.net/dc/text8.zip
unzip text8.zip
grep -o -E '\w+(\W+\w+){0,15}' text8 > text8_lines
This was done so that the example can be run in local mode
NOTE: this example can take 5-10 minutes to run

 */
var SparkConf = require(EclairJS_Globals.NAMESPACE + '/SparkConf');
var USAGE = "bin/eclairjs examples/mllib/word2vec.js text8_lines";

if (args.length < 2) {
    print(USAGE);
    exit(1);
}

var Word2Vec = require('eclairjs/mllib/feature/Word2Vec');
var List = require('eclairjs/List');

var file_path = args[1];
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');
var conf = new SparkConf().setAppName("Word2Vec");
var sc = new SparkContext(conf);
var inp = sc.textFile(file_path).map(function(s, List) {
    return new List(s.split(" "));
}, [List]);

var word2vec = new Word2Vec();

var model = word2vec.fit(inp)

var synonyms = model.findSynonyms('china', 40);
synonyms.forEach(function(item){
    var word = item[0];
    var cosine_distance = item[1];
    print(word + ", " + cosine_distance);
})

sc.stop()
