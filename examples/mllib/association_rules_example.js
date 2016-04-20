
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

var AssociationRules = require('eclairjs/mllib/fpm/AssociationRules');
var FreqItemset = require('eclairjs/mllib/fpm/FreqItemset');

function run(sc) {

    var freqItemsets = sc.parallelize([
        new FreqItemset(["a"], 15),
        new FreqItemset(["b"], 35),
        new FreqItemset(["a","b"], 12)
    ]);

    var arules = new AssociationRules()
        .setMinConfidence(0.8);
    var results = arules.run(freqItemsets);
    var rules = results.collect();
    var str = "";
    rules.forEach(function(rule){
        str += rule.antecedent() + " => " + rule.consequent() + ", " + rule.confidence();
    });
    return str;
}

/*
    check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScriptAssociationRulesExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    print(result);
}
