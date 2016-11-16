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
function EclairJSSwift(obj) {
  var jarUrl = obj.jarUrl 
    ? obj.jarUrl 
    : ""

  var credentials = {};
  if(obj.credentials) {
    credentials = obj.credentials;
  } else if(process.env.VCAP_SERVICES) {
    var vcap = JSON.parse(process.env.VCAP_SERVICES);   
    if(vcap['Object-Storage']) {
      credentials = vcap['Object-Storage'][0]['credentials'];
    }
  }

  var swiftPromise = new Promise(function (resolve, reject) {
    obj.eclairjs.addJar(jarUrl).then(function() {
      var prefix = "fs.swift.service."+obj.service+".";
      var sc = obj.sparkSession.sparkContext();
      var p = Promise.all([
      obj.eclairjs.getKernelP(),
      sc.setHadoopConfiguration(prefix+"auth.url", credentials.auth_url + "/v3/auth/tokens"),
      sc.setHadoopConfiguration(prefix+"auth.endpoint.prefix", "endpoints"),
      sc.setHadoopConfiguration(prefix+"tenant", credentials.projectId),
      sc.setHadoopConfiguration(prefix+"username", credentials.userId),
      sc.setHadoopConfiguration(prefix+"password", credentials.password),
      sc.setHadoopConfiguration(prefix+"apikey", credentials.password)
      ]);

      resolve(p)
    }).catch(reject);
  });

  return swiftPromise;
}

module.exports = EclairJSSwift;
