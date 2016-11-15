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
 * eclairjs swift module.
 * @example
 * var ejsKafka = require('eclairjs-swift');
 * @module eclairjs-kafka
 */
function EclairJSSwift(spark, jarUrl) {
  var kafkaPromise = new Promise(function (resolve, reject) {
    spark.addJar(jarUrl).then(function() {
      resolve(spark.getKernelP());
    }).catch(reject);
  });

  return {};
}

module.exports = EclairJSSwift;
